import type { AIConfig, Message, SceneType } from '../types';
import { getNextMockQuestion } from '../data/mockData';

function buildSystemPrompt(scene: SceneType, isFollowUp: boolean, configContext: string): string {
  const contextBlock = configContext
    ? `\n\n## 候选人背景信息\n${configContext}\n\n请根据以上背景信息，提出与行业/岗位高度相关的专业问题。`
    : '';
  const basePrompt = scene === 'job'
    ? `你是一位资深的企业面试官，正在面试一位大学生候选人。

## 核心要求
1. **岗位针对性**：根据候选人的行业和岗位，提出高度相关的问题。技术岗问技术，产品岗问产品思维，运营岗问运营策略。
2. **实时追问**：仔细分析候选人的每一个回答，针对回答中的薄弱点、模糊处或亮点进行深入追问（STAR法则）。
3. **单轮单问**：每次只问一个问题，不要连问多个。
4. **追问深度**：至少追问一次再换话题，挖掘候选人的真实水平和思考深度。
5. **专业但亲和**：语气专业友好，但追问要有压力感，模拟真实面试。
6. **总轮次**：5-8轮对话。最后一轮请说"这是最后一个问题"。
7. **用中文交流**。`
    : `你是一位大学学生会/社团的面试官，正在面试一位竞选同学。

## 核心要求
1. **岗位针对性**：根据竞选的组织类型和职位，提出高度相关的问题。
2. **实时追问**：仔细分析候选人的每一个回答，针对回答中的亮点或不足进行追问。
3. **单轮单问**：每次只问一个问题。
4. **追问深度**：追问候选人过往经历的具体细节和反思。
5. **友善有洞察**：语气亲切但有深度。
6. **总轮次**：5-8轮对话。最后一轮请说"这是最后一个问题"。
7. **用中文交流**。`;
  const followUpInstruction = isFollowUp
    ? `\n\n## 当前任务\n候选人刚刚回答了你的问题。请：\n1. 先简短回应候选人的回答（1-2句）\n2. 然后基于回答内容提出追问或下一个问题\n3. 追问要针对回答中的具体细节`
    : `\n\n## 当前任务\n请开始面试，先让候选人做自我介绍。`;
  return basePrompt + contextBlock + followUpInstruction;
}

export async function callAI(config: AIConfig, messages: Message[], scene: SceneType, isFollowUp = false): Promise<string> {
  const systemMessages = messages.filter((m) => m.role === 'system');
  const configContext = systemMessages.map((m) => m.content).join('\n\n');
  if (!config.apiKey) {
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 1200));
    return getNextMockQuestion(scene);
  }
  const systemPrompt = buildSystemPrompt(scene, isFollowUp, configContext);
  const apiMessages = [
    { role: 'system', content: systemPrompt },
    ...messages.filter((m) => m.role !== 'system').map((m) => ({ role: m.role === 'interviewer' ? 'assistant' : 'user', content: m.content })),
  ];
  const url = `${config.baseUrl.replace(/\/$/, '')}/chat/completions`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` };
  if (config.provider === 'anthropic') {
    headers['x-api-key'] = config.apiKey;
    headers['anthropic-version'] = '2023-06-01';
    delete headers.Authorization;
    const anthropicMessages = apiMessages.filter((m) => m.role !== 'system').map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }));
    const res = await fetch(`${config.baseUrl.replace(/\/$/, '')}/v1/messages`, { method: 'POST', headers, body: JSON.stringify({ model: config.model || 'claude-3-haiku-20240307', max_tokens: 1024, system: systemPrompt, messages: anthropicMessages }) });
    if (!res.ok) { const err = await res.text(); throw new Error(`Anthropic API 错误 (${res.status}): ${err}`); }
    const data = await res.json();
    return data.content?.[0]?.text || '抱歉，请再说一次。';
  }
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify({ model: config.model || 'gpt-4o-mini', messages: apiMessages, max_tokens: 1024, temperature: 0.7 }) });
  if (!res.ok) { const err = await res.text(); throw new Error(`AI API 错误 (${res.status}): ${err}`); }
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '抱歉，请再说一次。';
}
