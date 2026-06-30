export interface Reading {
  title: string;
  author: string;
  url: string;
  description?: string;
}

export const readings: Reading[] = [
  {
    title: 'AI 2027',
    author: 'Daniel Kokotajlo et al.',
    url: 'https://ai-2027.com/summary',
    description: 'A scenario-based forecast of how AGI and ASI might unfold between 2025 and 2027, told as a narrative with technical grounding.',
  },
  {
    title: 'Zynga 创始人 Mark Pincus：consumer AI 的窗口，可能正在最冷的时候打开',
    author: 'Roger',
    url: 'https://mp.weixin.qq.com/s/ySiuEXlzgumQU2Ir6vwgZw',
    description: 'Mark Pincus 对 consumer AI 当下时机的判断——越冷的时候，往往是窗口刚打开的时候。',
  },
  {
    title: 'Agents with taste',
    author: 'Emil Kowalski',
    url: 'https://emilkowal.ski/ui/agents-with-taste',
    description: 'On UI craft and the details that make interfaces feel considered.',
  },
];
