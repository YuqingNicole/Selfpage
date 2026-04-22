export interface Reading {
  title: string;
  author: string;
  url: string;
  description?: string;
}

export const readings: Reading[] = [
  {
    title: 'Agents with taste',
    author: 'Emil Kowalski',
    url: 'https://emilkowal.ski/ui/agents-with-taste',
    description: 'On UI craft and the details that make interfaces feel considered.',
  },
];
