export type BookSection = { id: string; title: string };

/** Match the renderer's source-line IDs without treating fenced examples as headings. */
export function getBookSections(markdown: string): BookSection[] {
  const sections: BookSection[] = [];
  let fence: { character: string; length: number } | null = null;

  markdown.split('\n').forEach((line, index) => {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (marker) {
      const character = marker[1][0];
      if (!fence) fence = { character, length: marker[1].length };
      else if (character === fence.character && marker[1].length >= fence.length) fence = null;
      return;
    }
    const heading = !fence && line.match(/^##\s+(.+?)\s*#*\s*$/);
    if (heading) sections.push({ id: `section-${index + 1}`, title: heading[1] });
  });

  return sections;
}

export function getPageGeometry(width: number, extent: number, columns: number, gap: number) {
  const safeColumns = columns === 2 ? 2 : 1;
  const stride = (Math.max(1, width) + Math.max(0, gap)) / safeColumns;
  // A pixel of tolerance prevents fractional layout rounding from inventing a blank page.
  const total = Math.max(1, Math.ceil((Math.max(0, extent) + gap - 1) / stride));
  return { columns: safeColumns, stride, total };
}

export function getSpreadStart(page: number, total: number, columns: number) {
  const count = Math.max(1, columns);
  const last = Math.floor((Math.max(1, total) - 1) / count) * count;
  return Math.max(0, Math.min(last, Math.floor(Math.max(0, page) / count) * count));
}

export function canAnimatePageTurn(enabled: boolean, reducedMotion: boolean) {
  return enabled && !reducedMotion;
}
