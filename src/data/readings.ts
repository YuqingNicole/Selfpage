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
    title: 'Agents with taste',
    author: 'Emil Kowalski',
    url: 'https://emilkowal.ski/ui/agents-with-taste',
    description: 'On UI craft and the details that make interfaces feel considered.',
  },
];
