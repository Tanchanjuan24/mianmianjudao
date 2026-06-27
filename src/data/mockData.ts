import type { Message, ReviewReport, ScriptLine, VideoMarker } from '../types';

// ============ 求职备战 - 模拟对话 ============
export const jobInterviewMessages: Message[] = [
  { id: 'j1', role: 'interviewer', content: '你好！欢迎参加今天的面试。我是今天的面试官，请你先做一个简单的自我介绍吧。', timestamp: Date.now() - 300000 },
  { id: 'j2', role: 'user', content: '面试官你好！我叫李明，是XX大学计算机科学专业的大三学生。', timestamp: Date.now() - 280000 },
  { id: 'j3', role: 'interviewer', content: '不错，你的经历听起来很丰富。那你觉得在之前的实习中，遇到的最大挑战是什么？', timestamp: Date.now() - 260000 },
  { id: 'j4', role: 'user', content: '最大的挑战是刚入职时需要快速上手一个完全陌生的技术栈。', timestamp: Date.now() - 240000 },
  { id: 'j5', role: 'interviewer', content: '很好的学习能力！那请问你对未来三年的职业规划是怎样的？', timestamp: Date.now() - 220000 },
  { id: 'j6', role: 'user', content: '短期内我希望在前端开发这个方向深耕，成为团队中能够独立负责复杂模块的工程师。', timestamp: Date.now() - 200000 },
  { id: 'j7', role: 'interviewer', content: '最后想了解一下，你为什么选择我们公司？', timestamp: Date.now() - 180000 },
  { id: 'j8', role: 'user', content: '我一直在关注贵公司的产品，特别是你们在AI+教育领域的创新让我非常认同。', timestamp: Date.now() - 160000 },
  { id: 'j9', role: 'interviewer', content: '好的，感谢你的回答！面试到这里就结束了，我们会尽快给你反馈结果。', timestamp: Date.now() - 140000 },
];

export const clubInterviewMessages: Message[] = [
  { id: 'c1', role: 'interviewer', content: '同学你好！欢迎参加学生会外联部的竞选面试。请先自我介绍一下，说说你为什么想加入外联部？', timestamp: Date.now() - 300000 },
  { id: 'c2', role: 'user', content: '各位学长学姐好！我是来自经管学院大一的王小雨。', timestamp: Date.now() - 280000 },
  { id: 'c3', role: 'interviewer', content: '如果让你去拉一笔赞助，对方企业一开始态度比较冷淡，你会怎么办？', timestamp: Date.now() - 260000 },
  { id: 'c4', role: 'user', content: '我觉得首先要做足功课，了解对方企业的需求和痛点。', timestamp: Date.now() - 240000 },
  { id: 'c5', role: 'interviewer', content: '外联部的工作有时候会和学业产生冲突，你打算怎么平衡？', timestamp: Date.now() - 220000 },
  { id: 'c6', role: 'user', content: '我觉得时间管理是一个大学生的必修课。', timestamp: Date.now() - 200000 },
  { id: 'c7', role: 'interviewer', content: '你觉得和其他竞选者相比，你最大的优势是什么？', timestamp: Date.now() - 180000 },
  { id: 'c8', role: 'user', content: '我觉得我最大的优势是真诚和韧性。', timestamp: Date.now() - 160000 },
  { id: 'c9', role: 'interviewer', content: '好的，面试到这里就结束了。你的表现让我们印象深刻！', timestamp: Date.now() - 140000 },
];

export const jobScriptLines: ScriptLine[] = [
  { id: 'js1', original: '我叫李明，是XX大学计算机科学专业的大三学生。', optimized: '面试官您好，我是李明，来自XX大学计算机科学与技术专业，目前大三在读。', hasChange: true },
  { id: 'js2', original: '我曾在腾讯做过前端开发的暑期实习。', optimized: '今年暑期，我在腾讯公司完成了为期三个月的前端开发实习。', hasChange: true },
  { id: 'js3', original: '最大的挑战是刚入职时需要快速上手一个完全陌生的技术栈。', optimized: '最大的挑战来自于技术栈切换——项目基于React+TypeScript技术栈，而我的技术积累主要在Vue方向。', hasChange: true },
  { id: 'js4', original: '我花了一周时间系统地看了React官方文档。', optimized: '我制定了详细的学习计划，利用一周时间通读React官方文档并做了完整的Demo练习。', hasChange: true },
  { id: 'js5', original: '短期内我希望在前端开发这个方向深耕。', optimized: '短期内（1年内），我希望在前端领域深耕，系统掌握性能优化、工程化等进阶技能。', hasChange: true },
  { id: 'js6', original: '我一直在关注贵公司的产品。', optimized: '我一直密切关注贵公司在AI+教育赛道的发展，特别是近期推出的智能学习助手产品。', hasChange: true },
];

export const clubScriptLines: ScriptLine[] = [
  { id: 'cs1', original: '各位学长学姐好！我是来自经管学院大一的王小雨。', optimized: '各位评委学长学姐，大家好！我是经管学院2024级的王小雨。', hasChange: true },
  { id: 'cs2', original: '高中时担任过班长，组织过几次班级联谊活动。', optimized: '高中阶段，我担任班长两年，期间主导策划并执行了5场跨班级联谊活动。', hasChange: true },
  { id: 'cs3', original: '我想加入外联部是因为我觉得自己的沟通能力还不错。', optimized: '选择外联部，是因为我希望将自身的人际沟通优势在更具挑战性的商业场景中进一步打磨。', hasChange: true },
  { id: 'cs4', original: '我觉得首先要做足功课，了解对方企业的需求和痛点。', optimized: '首先，我会提前做好深度调研，全方位了解目标企业的品牌定位、近期动态及潜在合作诉求。', hasChange: true },
  { id: 'cs5', original: '我觉得时间管理是一个大学生的必修课。', optimized: '时间管理是大学生涯的必修课，我认为关键在于前置规划而非被动应对。', hasChange: true },
  { id: 'cs6', original: '我觉得我最大的优势是真诚和韧性。', optimized: '我认为我最大的竞争优势是真诚的态度与强大的韧性。', hasChange: true },
];

export const jobVideoMarkers: VideoMarker[] = [
  { id: 'jm1', time: 45, label: '语速偏快', type: 'warning', description: '自我介绍阶段语速达到220字/分钟，建议控制在150-180字/分钟。' },
  { id: 'jm2', time: 95, label: '眼神飘忽', type: 'bad', description: '回答最大挑战时频繁看向右下方，显得不够自信。' },
  { id: 'jm3', time: 150, label: '逻辑清晰', type: 'good', description: '职业规划回答采用"短期-中期"递进结构，逻辑层次分明。' },
  { id: 'jm4', time: 210, label: '微笑加分', type: 'good', description: '回答对公司的了解时面带微笑，展现真诚和热情。' },
  { id: 'jm5', time: 260, label: '结束语仓促', type: 'info', description: '面试结束时只说了"好的谢谢"，建议补充对岗位的期待表达。' },
];

export const clubVideoMarkers: VideoMarker[] = [
  { id: 'cm1', time: 30, label: '开场紧张', type: 'warning', description: '自我介绍前10秒有明显停顿和"呃"等填充词。' },
  { id: 'cm2', time: 72, label: '案例生动', type: 'good', description: '"被拒7次第8次成功"的案例非常生动，用具体数字增强了说服力。' },
  { id: 'cm3', time: 120, label: '坐姿松散', type: 'bad', description: '回答时间管理问题时身体后仰、翘二郎腿。' },
  { id: 'cm4', time: 170, label: '眼神交流好', type: 'good', description: '回答优势问题时与每位面试官都有眼神交流。' },
  { id: 'cm5', time: 200, label: '音量下降', type: 'warning', description: '结尾部分音量逐渐降低，显得底气不足。' },
];

export const jobReviewReport: ReviewReport = {
  scene: 'job', overallScore: 78,
  dimensions: [
    { name: '逻辑表达', score: 82, fullMark: 100 }, { name: '语言流畅', score: 72, fullMark: 100 },
    { name: '专业知识', score: 80, fullMark: 100 }, { name: '应变能力', score: 75, fullMark: 100 },
    { name: '仪态仪表', score: 78, fullMark: 100 }, { name: '自信程度', score: 70, fullMark: 100 },
  ],
  originalScript: jobScriptLines, optimizedScript: jobScriptLines, markers: jobVideoMarkers,
  summary: '你在本次模拟求职面试中表现良好，展现了扎实的专业基础和清晰的职业规划。逻辑表达是你的强项，但语言流畅度和自信心还有提升空间。',
  strengths: ['专业基础扎实，项目经历描述具体有说服力', '职业规划思路清晰', '对公司有充分的了解'],
  improvements: ['控制语速，避免因紧张导致的语速过快', '加强眼神交流', '面试结束时可以更加从容'],
  facialAnalysis: { eyeContact: 65, smileRate: 45, headStability: 72, facialExpression: 60, nervousness: 55,
    eyeContactFeedback: '眼神交流频率偏低（65%），建议练习直视摄像头。', expressionFeedback: '面部表情偏严肃，微笑频率仅45%。', overallFeedback: '整体面部表现中等偏上。主要问题是紧张情绪导致的微表情过多。' },
  answerAnalysis: [
    { question: '请做自我介绍', answer: '我叫李明...', score: 75, feedback: '自我介绍结构完整，但缺少记忆点。', keywords: ['GPA 3.8', '腾讯实习'] },
    { question: '遇到的最大挑战', answer: '最大的挑战是...', score: 80, feedback: 'STAR结构运用得当，但Result部分量化不够。', keywords: ['React', '一周学习'] },
    { question: '三年职业规划', answer: '短期内我希望...', score: 82, feedback: '规划清晰且递进合理。', keywords: ['前端深耕', '全栈拓展'] },
    { question: '为什么选择我们公司', answer: '我一直在关注...', score: 70, feedback: '对公司了解还不够深入。', keywords: ['AI+教育', '新人培养'] },
  ],
};

export const clubReviewReport: ReviewReport = {
  scene: 'club', overallScore: 74,
  dimensions: [
    { name: '逻辑表达', score: 76, fullMark: 100 }, { name: '语言流畅', score: 70, fullMark: 100 },
    { name: '沟通感染力', score: 82, fullMark: 100 }, { name: '应变能力', score: 78, fullMark: 100 },
    { name: '仪态仪表', score: 68, fullMark: 100 }, { name: '真诚度', score: 85, fullMark: 100 },
  ],
  originalScript: clubScriptLines, optimizedScript: clubScriptLines, markers: clubVideoMarkers,
  summary: '你在本次社团竞选模拟中展现出了真诚的态度和较强的沟通感染力。',
  strengths: ['真诚度高，案例生动具体', '沟通感染力强', '对自身优势有清晰的认知'],
  improvements: ['克服开场紧张', '注意坐姿和肢体语言', '结尾时保持音量'],
  facialAnalysis: { eyeContact: 78, smileRate: 70, headStability: 60, facialExpression: 75, nervousness: 45,
    eyeContactFeedback: '眼神交流表现优秀（78%）。', expressionFeedback: '面部表情丰富自然，微笑频率70%。', overallFeedback: '整体面部表现良好，真诚和亲和力是你的优势。' },
  answerAnalysis: [
    { question: '为什么想加入外联部', answer: '我性格比较外向...', score: 72, feedback: '动机表达清晰，但缺少对组织的了解。', keywords: ['性格外向', '班长经历'] },
    { question: '如何应对冷淡的企业', answer: '首先要做足功课...', score: 85, feedback: '思路清晰，展现了换位思考的能力。', keywords: ['深度调研', '价值主张'] },
    { question: '如何平衡学业和社团', answer: '时间管理...', score: 75, feedback: '方法合理，建议补充具体案例。', keywords: ['日历规划', '碎片时间'] },
    { question: '你的最大优势', answer: '真诚和韧性...', score: 88, feedback: '"被拒7次第8次成功"的故事极具说服力。', keywords: ['真诚', '韧性'] },
  ],
};

// ============ Mock AI - 能根据用户回答生成回应 ============
const jobFollowUps = [
  { keywords: ['自我介绍', '我叫', '大三', '专业', '学校'], response: '感谢你的自我介绍！听起来你的经历很丰富。我想进一步了解一下，在你提到的项目或实习经历中，你觉得哪一个最能体现你的技术能力？请具体说说你在其中承担的角色和取得的成果。' },
  { keywords: ['项目', '实习', '技术', '开发', '代码', '前端', '后端'], response: '不错，你的技术能力听起来很扎实。那如果你加入团队后发现实际工作内容和预期有差距，你会怎么处理这种情况？' },
  { keywords: ['差距', '预期', '适应', '学习', '调整'], response: '很好的心态！在团队协作中，如果你和同事在技术方案上有分歧，你会怎么做？能举一个具体的例子吗？' },
  { keywords: ['分歧', '团队', '协作', '沟通', '讨论'], response: '看来你很注重团队协作。那请问你对未来三年的职业规划是怎样的？希望在公司里达到什么样的成长？' },
  { keywords: ['规划', '未来', '目标', '成长', '发展'], response: '清晰的规划，很好！最后一个问题：你为什么选择我们公司？你对我们的业务有什么了解吗？' },
  { keywords: ['公司', '产品', '业务', '了解', '为什么'], response: '好的，感谢你的回答！面试到这里就结束了。你的表现不错，我们会尽快给你反馈结果。祝你顺利！' },
];

const clubFollowUps = [
  { keywords: ['自我介绍', '我叫', '大一', '大二', '专业', '性格'], response: '感谢你的自我介绍！那请问你有没有遇到过特别难沟通的合作方或同学？你是怎么处理的？' },
  { keywords: ['沟通', '难', '冲突', '处理', '解决'], response: '处理得很好！如果社团活动占用了你很多周末时间，你会怎么平衡学业和社团工作？' },
  { keywords: ['平衡', '时间', '学业', '周末', '安排'], response: '看来你的时间管理能力不错。你觉得我们社团目前的工作方式有什么可以改进的地方吗？' },
  { keywords: ['改进', '建议', '问题', '工作方式'], response: '很有见地！如果让你策划一场校园活动来吸引赞助商，你会怎么做？能简单描述一下你的思路吗？' },
  { keywords: ['活动', '策划', '赞助', '方案', '创意'], response: '很好的创意！最后一个问题：你觉得和其他竞选者相比，你最大的优势是什么？' },
  { keywords: ['优势', '特长', '特点', '比别人'], response: '好的，面试到这里就结束了。你的表现让我们印象深刻，结果出来后我们会通知你的！' },
];

let mockIndex = { job: 0, club: 0 };

export function getNextMockQuestion(scene: 'job' | 'club', userAnswer?: string): string {
  const followUps = scene === 'job' ? jobFollowUps : clubFollowUps;
  
  // 如果有用户回答，尝试根据关键词匹配
  if (userAnswer && userAnswer.length > 5) {
    for (const fu of followUps) {
      const matched = fu.keywords.some(kw => userAnswer.includes(kw));
      if (matched && mockIndex[scene] < followUps.length) {
        const response = followUps[mockIndex[scene]].response;
        mockIndex[scene]++;
        return response;
      }
    }
    // 没匹配到关键词，用通用回应
    const acks = ['嗯，我理解了你的意思。', '好的，这是一个很好的回答。', '我听到了，很有意思。', '谢谢你的分享。'];
    const ack = acks[Math.floor(Math.random() * acks.length)];
    if (mockIndex[scene] < followUps.length) {
      const next = followUps[mockIndex[scene]].response;
      mockIndex[scene]++;
      return `${ack} ${next}`;
    }
  }
  
  // 第一问（开场）或兜底
  if (mockIndex[scene] < followUps.length) {
    const response = followUps[mockIndex[scene]].response;
    mockIndex[scene]++;
    return response;
  }
  
  return '好的，面试到这里就结束了。感谢你的参与！';
}

export function resetMockQuestionIndex() {
  mockIndex = { job: 0, club: 0 };
}
