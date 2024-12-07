import { Question } from '../types'

// 定义测试维度
export const DIMENSIONS = {
  PERSONALITY: '性格匹配度',
  LIFESTYLE: '生活方式',
  VALUES: '价值观',
  COMMUNICATION: '沟通方式',
  EMOTION: '情感表达',
} as const

// 题目数据
export const questions: Question[] = [
  {
    id: 'q1',
    type: 'single',
    title: '你更倾向于哪种休闲方式?',
    description: '选择最符合你的选项',
    options: [
      { id: 'q1_1', text: '独处/安静的活动', value: 1 },
      { id: 'q1_2', text: '与朋友社交', value: 2 },
      { id: 'q1_3', text: '户外运动', value: 3 },
      { id: 'q1_4', text: '文化艺术活动', value: 4 },
    ],
    required: true,
    dimension: DIMENSIONS.LIFESTYLE
  },
  {
    id: 'q2',
    type: 'single',
    title: '在发生矛盾时,你通常会?',
    description: '可多选',
    options: [
      { id: 'q2_1', text: '直接表达不满', value: 1 },
      { id: 'q2_2', text: '先冷静思考', value: 2 },
      { id: 'q2_3', text: '寻求他人建议', value: 3 },
      { id: 'q2_4', text: '暂时回避', value: 4 },
    ],
    required: true,
    dimension: DIMENSIONS.COMMUNICATION
  },
  {
    id: 'q3',
    type: 'single',
    title: '你认为理想的未来生活是?',
    description: '选择最向往的选项',
    options: [
      { id: 'q3_1', text: '平静稳定', value: 1 },
      { id: 'q3_2', text: '充满挑战', value: 2 },
      { id: 'q3_3', text: '自由随性', value: 3 },
      { id: 'q3_4', text: '富足安逸', value: 4 },
    ],
    required: true,
    dimension: DIMENSIONS.VALUES
  },
  // ... 更多题目
] 