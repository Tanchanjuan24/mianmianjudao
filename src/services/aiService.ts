import type { AIConfig, Message, SceneType } from '../types';
import { getNextMockQuestion } from '../data/mockData';

function buildSystemPrompt(scene: SceneType, isFollowUp: boolean): string {
  const basePrompt =
    scene === 'job'
      ? `你是一位资深的企业面试官，正在为一家公司面试一位大学生候选人。你的面试风格专业但不失亲和力。

面试规则：
1. 每次只问一个问题，不要一次问多个问题
2. 根据候选人的回答进行深入追问，挖掘细节（STAR法则）
3. 问题涵盖：自我介绍、项目经历、技术能力、职业规划、行为面试等
4. 问题难度适中，适合应届生/实习生
5. 总面试控制在5-8轮对话
6. 如果这是最后一轮，在问题结尾说明"这是最后一个问题"
7. 用中文交流，语气专业友好`
      : `你是一位大学学生会/社团的面试官，正在为社团竞选面试一位同学。你的面试风格友善但有洞察力。

面试规则：
1. 每次只问一个问题，不要一次问多个问题
2. 根据候选人的回答进行追问
3. 问题涵盖：自我介绍、沟通能力、团队协作、抗压能力、时间管理、竞选动机等
4. 问题贴近校园生活实际
5. 总面试控制在5-8轮对话
6. 如果这是最后一轮，在问题结尾说明"这是最后一个问题"
7. 用中文交流，语气亲切友好`;

  if (isFollowUp) {
    return basePrompt + '\n\n现在请根据候选人刚才的回答，提出下一个问题或进行追问。';
  }
  return basePrompt + '\n\n请开始面试，先让候选人做自我介绍。';
}

export async function callAI(
  config: AIConfig,
  messages: Message[],
  scene: SceneType,
  isFollowUp = false
): Promise<string> {
  // Mock 模式
  if (!config.apiKey) {
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));
    return getNextMockQuestion(scene);
  }

  // 构建 OpenAI 兼容格式的消息
  // system 角色的消息合并到系统提示中
  const systemMessages = messages.filter((m) => m.role === 'system');
  const configContext = systemMessages.map((m) => m.content).join('\n\n');

  const systemPrompt = buildSystemPrompt(scene, isFollowUp) +
    (configContext ? `\n\n候选人提供的背景信息：\n${configContext}` : '');

  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role === 'interviewer' ? 'assistant' : 'user',
        content: m.content,
      })),
  ];

  const url = `${config.baseUrl.replace(/\/$/, '')}/chat/completions`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.apiKey}`,
  };

  // Anthropic 特殊处理
  if (config.provider === 'anthropic') {
    headers['x-api-key'] = config.apiKey;
    headers['anthropic-version'] = '2023-06-01';
    delete headers.Authorization;

    const anthropicMessages = apiMessages
      .filter((m) => m.role !== 'system')
      .map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content,
      }));

    const res = await fetch(`${config.baseUrl.replace(/\/$/, '')}/v1/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: config.model || 'claude-3-haiku-20240307',
        max_tokens: 1024,
        system: systemPrompt,
        messages: anthropicMessages,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Anthropic API 错误 (${res.status}): ${err}`);
    }

    const data = await res.json();
    return data.content?.[0]?.text || '抱歉，我没有理解你的回答，请再说一次。';
  }

  // OpenAI / DeepSeek / 自定义兼容格式
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: config.model || 'gpt-4o-mini',
      messages: apiMessages,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`AI API 错误 (${res.status}): ${err}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '抱歉，我没有理解你的回答，请再说一次。';
}
