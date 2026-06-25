import type { Message, ReviewReport, ScriptLine, VideoMarker } from '../types';

// ============ 求职备战 - 模拟对话 ============
export const jobInterviewMessages: Message[] = [
  {
    id: 'j1',
    role: 'interviewer',
    content: '你好！欢迎参加今天的面试。我是今天的面试官，请你先做一个简单的自我介绍吧。',
    timestamp: Date.now() - 300000,
  },
  {
    id: 'j2',
    role: 'user',
    content: '面试官你好！我叫李明，是XX大学计算机科学专业的大三学生。在校期间我主修了数据结构、算法、操作系统等核心课程，GPA 3.8。我曾在腾讯做过前端开发的暑期实习，参与了一个内部管理系统的重构。平时我也喜欢在GitHub上分享自己的开源项目。希望能有机会加入贵公司的技术团队！',
    timestamp: Date.now() - 280000,
  },
  {
    id: 'j3',
    role: 'interviewer',
    content: '不错，你的经历听起来很丰富。那你觉得在之前的实习中，遇到的最大挑战是什么？你是如何解决的？',
    timestamp: Date.now() - 260000,
  },
  {
    id: 'j4',
    role: 'user',
    content: '最大的挑战是刚入职时需要快速上手一个完全陌生的技术栈。当时项目用的是React+TypeScript，而我之前只学过Vue。我花了一周时间系统地看了React官方文档，并且主动跟导师要了一些小bug来修，通过实践快速熟悉了代码库。最后在实习结束前，我独立完成了一个中等复杂度的功能模块。',
    timestamp: Date.now() - 240000,
  },
  {
    id: 'j5',
    role: 'interviewer',
    content: '很好的学习能力！那请问你对未来三年的职业规划是怎样的？',
    timestamp: Date.now() - 220000,
  },
  {
    id: 'j6',
    role: 'user',
    content: '短期内我希望在前端开发这个方向深耕，成为团队中能够独立负责复杂模块的工程师。中期来看，我想拓展到全栈方向，学习Node.js和后端架构知识，争取三年内成为能够独当一面的全栈开发者。同时我也希望能参与一些技术分享和开源贡献，提升自己的影响力。',
    timestamp: Date.now() - 200000,
  },
  {
    id: 'j7',
    role: 'interviewer',
    content: '最后想了解一下，你为什么选择我们公司？对我们有什么了解吗？',
    timestamp: Date.now() - 180000,
  },
  {
    id: 'j8',
    role: 'user',
    content: '我一直在关注贵公司的产品，特别是你们在AI+教育领域的创新让我非常认同。我看过你们最近发布的智能学习助手产品，觉得技术架构和用户体验都做得很好。而且我了解到贵公司有比较完善的新人培养体系，这对刚毕业的学生来说非常有吸引力。',
    timestamp: Date.now() - 160000,
  },
  {
    id: 'j9',
    role: 'interviewer',
    content: '好的，感谢你的回答！面试到这里就结束了，我们会尽快给你反馈结果。祝你顺利！',
    timestamp: Date.now() - 140000,
  },
];

// ============ 社团竞选 - 模拟对话 ============
export const clubInterviewMessages: Message[] = [
  {
    id: 'c1',
    role: 'interviewer',
    content: '同学你好！欢迎参加学生会外联部的竞选面试。请先自我介绍一下，说说你为什么想加入外联部？',
    timestamp: Date.now() - 300000,
  },
  {
    id: 'c2',
    role: 'user',
    content: '各位学长学姐好！我是来自经管学院大一的王小雨。我性格比较外向，喜欢和人打交道，高中时担任过班长，组织过几次班级联谊活动。我想加入外联部是因为我觉得自己的沟通能力还不错，而且想通过外联工作锻炼自己的商务谈判能力，为以后进入职场做准备。',
    timestamp: Date.now() - 280000,
  },
  {
    id: 'c3',
    role: 'interviewer',
    content: '如果让你去拉一笔赞助，对方企业一开始态度比较冷淡，你会怎么办？',
    timestamp: Date.now() - 260000,
  },
  {
    id: 'c4',
    role: 'user',
    content: '我觉得首先要做足功课，了解对方企业的需求和痛点。态度冷淡可能是因为之前的沟通没有让对方看到合作的价值。我会先调整沟通策略，不是一味地讲我们需要什么，而是站在对方角度分析这次合作能给他们带来什么——比如品牌曝光、校园用户触达等等。如果还是不行，我会尝试找到对方更感兴趣的合作切入点。',
    timestamp: Date.now() - 240000,
  },
  {
    id: 'c5',
    role: 'interviewer',
    content: '外联部的工作有时候会和学业产生冲突，你打算怎么平衡？',
    timestamp: Date.now() - 220000,
  },
  {
    id: 'c6',
    role: 'user',
    content: '我觉得时间管理是一个大学生的必修课。我会用日历工具把所有课程、作业截止日期和社团活动都提前规划好。如果遇到紧急的外联任务和考试冲突，我会提前和部长沟通，看看能不能调整分工。平时我也会利用碎片化时间处理一些事务性的工作，保证学习时间不被过度挤压。',
    timestamp: Date.now() - 200000,
  },
  {
    id: 'c7',
    role: 'interviewer',
    content: '你觉得和其他竞选者相比，你最大的优势是什么？',
    timestamp: Date.now() - 180000,
  },
  {
    id: 'c8',
    role: 'user',
    content: '我觉得我最大的优势是真诚和韧性。我不怕被拒绝——拉赞助本来就是一个会频繁被拒绝的事情。我之前帮班级拉活动赞助时被拒了7次，第8次才成功。另外我比较善于发现对方的需求，这可能和我平时喜欢观察和思考有关。',
    timestamp: Date.now() - 160000,
  },
  {
    id: 'c9',
    role: 'interviewer',
    content: '好的，面试到这里就结束了。你的表现让我们印象深刻，结果出来后我们会通知你的！',
    timestamp: Date.now() - 140000,
  },
];

// ============ 求职备战 - 文稿对比 ============
export const jobScriptLines: ScriptLine[] = [
  {
    id: 'js1',
    original: '我叫李明，是XX大学计算机科学专业的大三学生。在校期间我主修了数据结构、算法、操作系统等核心课程，GPA 3.8。',
    optimized: '面试官您好，我是李明，来自XX大学计算机科学与技术专业，目前大三在读。在校期间，我系统学习了数据结构与算法、操作系统、计算机网络等核心课程，专业GPA保持在3.8/4.0。',
    hasChange: true,
  },
  {
    id: 'js2',
    original: '我曾在腾讯做过前端开发的暑期实习，参与了一个内部管理系统的重构。',
    optimized: '今年暑期，我在腾讯公司完成了为期三个月的前端开发实习。期间深度参与了一个面向千人团队的内部管理系统重构项目，独立负责了报表模块的前端架构设计与实现。',
    hasChange: true,
  },
  {
    id: 'js3',
    original: '最大的挑战是刚入职时需要快速上手一个完全陌生的技术栈。当时项目用的是React+TypeScript，而我之前只学过Vue。',
    optimized: '最大的挑战来自于技术栈切换——项目基于React+TypeScript技术栈，而我的技术积累主要在Vue方向。面对这个落差，我没有退缩。',
    hasChange: true,
  },
  {
    id: 'js4',
    original: '我花了一周时间系统地看了React官方文档，并且主动跟导师要了一些小bug来修，通过实践快速熟悉了代码库。',
    optimized: '我制定了详细的学习计划，利用一周时间通读React官方文档并做了完整的Demo练习。同时，我主动向导师争取了一些低优先级的Bug修复任务，通过"边做边学"的方式快速融入了团队开发流程。',
    hasChange: true,
  },
  {
    id: 'js5',
    original: '短期内我希望在前端开发这个方向深耕，成为团队中能够独立负责复杂模块的工程师。',
    optimized: '短期内（1年内），我希望在前端领域深耕，系统掌握性能优化、工程化等进阶技能，成长为核心业务的模块Owner。',
    hasChange: true,
  },
  {
    id: 'js6',
    original: '我一直在关注贵公司的产品，特别是你们在AI+教育领域的创新让我非常认同。',
    optimized: '我一直密切关注贵公司在AI+教育赛道的发展。特别是近期推出的智能学习助手产品，其个性化推荐引擎的技术方案和"以学习者为中心"的设计理念，与我对教育科技的认知高度契合。',
    hasChange: true,
  },
];

// ============ 社团竞选 - 文稿对比 ============
export const clubScriptLines: ScriptLine[] = [
  {
    id: 'cs1',
    original: '各位学长学姐好！我是来自经管学院大一的王小雨。我性格比较外向，喜欢和人打交道。',
    optimized: '各位评委学长学姐，大家好！我是经管学院2024级的王小雨。我性格开朗外向，热爱人际沟通与协作，乐于在不同的社交场景中建立连接。',
    hasChange: true,
  },
  {
    id: 'cs2',
    original: '高中时担任过班长，组织过几次班级联谊活动。',
    optimized: '高中阶段，我担任班长两年，期间主导策划并执行了5场跨班级联谊活动，覆盖参与人数超过300人，积累了较为丰富的活动组织与沟通协调经验。',
    hasChange: true,
  },
  {
    id: 'cs3',
    original: '我想加入外联部是因为我觉得自己的沟通能力还不错，而且想通过外联工作锻炼自己的商务谈判能力。',
    optimized: '选择外联部，是因为我希望将自身的人际沟通优势在更具挑战性的商业场景中进一步打磨，同时通过拉赞助、谈合作等实战经历，系统性地锻炼自己的商务谈判与关系维护能力。',
    hasChange: true,
  },
  {
    id: 'cs4',
    original: '我觉得首先要做足功课，了解对方企业的需求和痛点。态度冷淡可能是因为之前的沟通没有让对方看到合作的价值。',
    optimized: '首先，我会提前做好深度调研，全方位了解目标企业的品牌定位、近期动态及潜在合作诉求。态度冷淡往往意味着价值主张不够清晰——因此我会调整沟通策略，从"我们要什么"转变为"我们能给对方带来什么"。',
    hasChange: true,
  },
  {
    id: 'cs5',
    original: '我觉得时间管理是一个大学生的必修课。我会用日历工具把所有课程、作业截止日期和社团活动都提前规划好。',
    optimized: '时间管理是大学生涯的必修课，我认为关键在于前置规划而非被动应对。我习惯使用Notion和Google Calendar将课程、作业DDL和社团活动可视化排布，每周日晚上做一次全局复盘和调整。',
    hasChange: true,
  },
  {
    id: 'cs6',
    original: '我觉得我最大的优势是真诚和韧性。我不怕被拒绝——拉赞助本来就是一个会频繁被拒绝的事情。',
    optimized: '我认为我最大的竞争优势是真诚的态度与强大的韧性。外联工作的本质决定了被拒绝是常态而非例外——我有充分的心理准备，并将每一次拒绝视为优化沟通策略的反馈信号。',
    hasChange: true,
  },
];

// ============ 求职备战 - 视频标记 ============
export const jobVideoMarkers: VideoMarker[] = [
  {
    id: 'jm1',
    time: 45,
    label: '语速偏快',
    type: 'warning',
    description: '自我介绍阶段语速达到220字/分钟，建议控制在150-180字/分钟，给面试官留出消化信息的时间。',
  },
  {
    id: 'jm2',
    time: 95,
    label: '眼神飘忽',
    type: 'bad',
    description: '回答最大挑战时频繁看向右下方，显得不够自信。建议在关键论点时直视镜头。',
  },
  {
    id: 'jm3',
    time: 150,
    label: '逻辑清晰',
    type: 'good',
    description: '职业规划回答采用"短期-中期"递进结构，逻辑层次分明，表达流畅自然。',
  },
  {
    id: 'jm4',
    time: 210,
    label: '微笑加分',
    type: 'good',
    description: '回答对公司的了解时面带微笑，展现出真诚和热情，给面试官留下良好印象。',
  },
  {
    id: 'jm5',
    time: 260,
    label: '结束语仓促',
    type: 'info',
    description: '面试结束时只说了"好的谢谢"，建议补充一句对岗位的再次表达兴趣和期待。',
  },
];

// ============ 社团竞选 - 视频标记 ============
export const clubVideoMarkers: VideoMarker[] = [
  {
    id: 'cm1',
    time: 30,
    label: '开场紧张',
    type: 'warning',
    description: '自我介绍前10秒有明显停顿和"呃"等填充词，建议多练习开场白形成肌肉记忆。',
  },
  {
    id: 'cm2',
    time: 72,
    label: '案例生动',
    type: 'good',
    description: '"被拒7次第8次成功"的案例非常生动，用具体数字增强了说服力，是一个亮点。',
  },
  {
    id: 'cm3',
    time: 120,
    label: '坐姿松散',
    type: 'bad',
    description: '回答时间管理问题时身体后仰、翘二郎腿，姿态显得不够正式。建议保持端正坐姿。',
  },
  {
    id: 'cm4',
    time: 170,
    label: '眼神交流好',
    type: 'good',
    description: '回答优势问题时与每位面试官都有眼神交流，展现出良好的沟通意识。',
  },
  {
    id: 'cm5',
    time: 200,
    label: '音量下降',
    type: 'warning',
    description: '结尾部分音量逐渐降低，显得底气不足。建议结尾时保持和开场同等的音量。',
  },
];

// ============ 求职备战 - 完整复盘报告 ============
export const jobReviewReport: ReviewReport = {
  scene: 'job',
  overallScore: 78,
  dimensions: [
    { name: '逻辑表达', score: 82, fullMark: 100 },
    { name: '语言流畅', score: 72, fullMark: 100 },
    { name: '专业知识', score: 80, fullMark: 100 },
    { name: '应变能力', score: 75, fullMark: 100 },
    { name: '仪态仪表', score: 78, fullMark: 100 },
    { name: '自信程度', score: 70, fullMark: 100 },
  ],
  originalScript: jobScriptLines,
  optimizedScript: jobScriptLines,
  markers: jobVideoMarkers,
  summary: '你在本次模拟求职面试中表现良好，展现了扎实的专业基础和清晰的职业规划。逻辑表达是你的强项，但语言流畅度和自信心还有提升空间。建议多进行模拟练习，特别是在压力环境下保持稳定发挥。',
  strengths: [
    '专业基础扎实，项目经历描述具体有说服力',
    '职业规划思路清晰，短期和中期目标递进合理',
    '对公司有充分的了解，展现出了真诚的求职意愿',
  ],
  improvements: [
    '控制语速，避免因紧张导致的语速过快',
    '加强眼神交流，减少眼神飘忽和看地面的习惯',
    '面试结束时可以更加从容，补充对岗位的期待表达',
  ],
  facialAnalysis: {
    eyeContact: 65,
    smileRate: 45,
    headStability: 72,
    facialExpression: 60,
    nervousness: 55,
    eyeContactFeedback: '眼神交流频率偏低（65%），尤其在回答技术问题时频繁看向右下方。建议练习直视摄像头，将摄像头视为面试官的眼睛，回答关键问题时保持3-5秒的稳定眼神接触。',
    expressionFeedback: '面部表情偏严肃，微笑频率仅45%。建议在自我介绍和谈论个人兴趣时适当微笑，这能展现亲和力和自信。但注意不要过度微笑，保持自然即可。',
    overallFeedback: '整体面部表现中等偏上。头部稳定性较好，说明你有一定的镜头感。主要问题是紧张情绪导致的微表情过多（如抿嘴、眨眼频繁），建议面试前做深呼吸放松练习。',
  },
  answerAnalysis: [
    { question: '请做自我介绍', answer: '我叫李明，是XX大学计算机科学专业的大三学生...', score: 75, feedback: '自我介绍结构完整，但缺少记忆点。建议用一句话突出你的核心竞争力（如"擅长全栈开发，有2个star过百的开源项目"）。', keywords: ['GPA 3.8', '腾讯实习', '开源项目'] },
    { question: '遇到的最大挑战', answer: '最大的挑战是刚入职时需要快速上手一个完全陌生的技术栈...', score: 80, feedback: 'STAR结构运用得当，但"Result"部分量化不够。建议补充"在实习结束前独立完成了XX功能，代码review通过率95%"等数据。', keywords: ['React+TypeScript', '一周学习', '独立完成'] },
    { question: '三年职业规划', answer: '短期内我希望在前端开发这个方向深耕...', score: 82, feedback: '规划清晰且递进合理，展现了成长思维。建议补充"我希望在第一年就能独立负责一个核心模块"这样的短期可衡量目标。', keywords: ['前端深耕', '全栈拓展', '技术分享'] },
    { question: '为什么选择我们公司', answer: '我一直在关注贵公司的产品...', score: 70, feedback: '对公司了解还不够深入，停留在产品层面。建议提前研究公司的技术博客、近期融资情况和团队文化，找到与你个人价值观的契合点。', keywords: ['AI+教育', '智能学习助手', '新人培养'] },
  ],
};

// ============ 社团竞选 - 完整复盘报告 ============
export const clubReviewReport: ReviewReport = {
  scene: 'club',
  overallScore: 74,
  dimensions: [
    { name: '逻辑表达', score: 76, fullMark: 100 },
    { name: '语言流畅', score: 70, fullMark: 100 },
    { name: '沟通感染力', score: 82, fullMark: 100 },
    { name: '应变能力', score: 78, fullMark: 100 },
    { name: '仪态仪表', score: 68, fullMark: 100 },
    { name: '真诚度', score: 85, fullMark: 100 },
  ],
  originalScript: clubScriptLines,
  optimizedScript: clubScriptLines,
  markers: clubVideoMarkers,
  summary: '你在本次社团竞选模拟中展现出了真诚的态度和较强的沟通感染力，特别是用具体案例支撑论点的方式非常有效。但开场紧张和坐姿问题影响了整体仪态评分，建议加强面试礼仪方面的训练。',
  strengths: [
    '真诚度高，案例生动具体（"被拒7次第8次成功"令人印象深刻）',
    '沟通感染力强，眼神交流自然',
    '对自身优势有清晰的认知和定位',
  ],
  improvements: [
    '克服开场紧张，减少填充词和停顿',
    '注意坐姿和肢体语言，保持正式场合的得体姿态',
    '结尾时保持音量，避免底气不足的表现',
  ],
  facialAnalysis: {
    eyeContact: 78,
    smileRate: 70,
    headStability: 60,
    facialExpression: 75,
    nervousness: 45,
    eyeContactFeedback: '眼神交流表现优秀（78%），在回答优势问题时与面试官有自然的眼神互动。保持这个习惯，在紧张时也能维持将是很大的加分项。',
    expressionFeedback: '面部表情丰富自然，微笑频率70%，展现了良好的亲和力。在讲述"被拒7次"的故事时表情真挚，增强了感染力。注意控制紧张时的咬唇习惯。',
    overallFeedback: '整体面部表现良好，真诚和亲和力是你的优势。主要问题是头部晃动较多（稳定性60%），建议练习固定坐姿，将双手放在桌上减少无意识的小动作。',
  },
  answerAnalysis: [
    { question: '为什么想加入外联部', answer: '我性格比较外向，喜欢和人打交道...', score: 72, feedback: '动机表达清晰，但缺少对组织的了解。建议提前调研该组织近期活动，将个人能力与组织需求对接。', keywords: ['性格外向', '班长经历', '沟通能力'] },
    { question: '如何应对冷淡的企业', answer: '首先要做足功课，了解对方企业的需求...', score: 85, feedback: '思路清晰，展现了换位思考的能力。"从我们要什么转变为能给对方带来什么"这个表述很有深度。', keywords: ['深度调研', '价值主张', '合作切入点'] },
    { question: '如何平衡学业和社团', answer: '时间管理是大学生的必修课...', score: 75, feedback: '时间管理方法合理，但建议补充具体案例，如"上次期中考试期间我如何协调了3个社团任务"。', keywords: ['日历规划', '碎片时间', '提前沟通'] },
    { question: '你的最大优势', answer: '我觉得我最大的优势是真诚和韧性...', score: 88, feedback: '"被拒7次第8次成功"的故事极具说服力，用数据支撑了你的韧性。这是本次面试的最大亮点。', keywords: ['真诚', '韧性', '被拒7次'] },
  ],
};

// ============ Mock AI 响应（当不配置 API Key 时使用） ============
const jobQuestions = [
  '感谢你的自我介绍！我想进一步了解一下，在你提到的项目中，你觉得哪一个最能体现你的技术能力？为什么？',
  '如果你加入团队后发现实际工作内容和预期有差距，你会怎么处理？',
  '你提到喜欢在GitHub上分享开源项目，能具体说说你最近的一个项目吗？',
  '在团队协作中，如果你和同事在技术方案上有分歧，你会怎么做？',
  '你对加班怎么看？在什么情况下你愿意加班？',
];

const clubQuestions = [
  '说得很好！那请问你有没有遇到过特别难沟通的合作方？你是怎么处理的？',
  '如果社团活动占用了你很多周末时间，你会怎么调整心态？',
  '你觉得外联部目前的工作方式有什么可以改进的地方吗？',
  '如果让你策划一场校园活动来吸引赞助商，你会怎么做？',
  '最后一个问题：你希望一年后在外联部收获什么？',
];

let jobQIndex = 0;
let clubQIndex = 0;

export function getNextMockQuestion(scene: 'job' | 'club'): string {
  if (scene === 'job') {
    const q = jobQuestions[jobQIndex % jobQuestions.length];
    jobQIndex++;
    return q;
  } else {
    const q = clubQuestions[clubQIndex % clubQuestions.length];
    clubQIndex++;
    return q;
  }
}

export function resetMockQuestionIndex() {
  jobQIndex = 0;
  clubQIndex = 0;
}
