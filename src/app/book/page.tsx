import type { Metadata } from 'next';
import Link from 'next/link';
import { bookEditLinks, getAllBookChapters } from '@/lib/book';

export const metadata: Metadata = {
  title: '书',
  description: 'Nicole 的写书项目：关于 AI、context、判断、组织与价值重估。',
};

const keyPoints = [
  '它写的不是技术本身，而是当世界越来越擅长替我们回答时，人怎样保有自己的看法。',
  '每一章从具体人物和现场出发：欲望、矛盾、选择、代价，再抵达一个更深的问题。',
  '第一章已完成初稿；后续会加入优秀朋友的深度访谈，让观点在真实生活里得到检验。',
];

export default function BookPage() {
  const chapters = getAllBookChapters();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border px-6 pt-28 pb-10">
        <div className="mx-auto max-w-4xl space-y-4">
          <p
            className="text-xs uppercase tracking-[0.22em] text-muted-foreground"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            写书计划
          </p>
          <h1
            className="text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic' }}
          >
            在平均答案之外
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            当世界越来越擅长替我们回答，如何仍然自己看、自己选、自己承担，并重新成为自己。
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={bookEditLinks.createChapter}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/40 hover:bg-card/50"
            >
              新建章节
            </a>
            <a
              href={bookEditLinks.editChapterTemplateFolder}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/40 hover:bg-card/50"
            >
              编辑章节目录
            </a>
            <a
              href={bookEditLinks.editBookHome}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm text-foreground transition-colors hover:border-foreground/40 hover:bg-card/50"
            >
              编辑书页说明
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-4xl gap-12">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <p className="text-sm text-muted-foreground">当前状态</p>
              <p className="mt-3 leading-7 text-foreground/90">
                书的叙事主线已经明确，第一章初稿已完成。接下来会持续补入真实人物、朋友访谈与可核验的现场，让它从观点走向故事。
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <p className="text-sm text-muted-foreground">核心命题</p>
              <p className="mt-3 leading-7 text-foreground/90">
                当答案越来越便宜，真正稀缺的不是更快给出答案，而是在真实处境中看见、选择并承担后果。
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-light">章节导航</h2>
                <p className="mt-1 text-sm text-muted-foreground">第一章初稿已上线；后续章节将随着访谈、案例和书写持续更新。</p>
              </div>
            </div>

            <div className="grid gap-4">
              {chapters.map((chapter) => {
                return (
                  <div
                    key={chapter.number}
                    className="group rounded-2xl border border-border bg-background px-5 py-5 transition-colors hover:border-foreground/30"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                          第 {chapter.number} 章
                        </p>
                        <h3 className="text-xl font-light group-hover:text-foreground/80">{chapter.title}</h3>
                        <p className="max-w-2xl leading-7 text-muted-foreground">{chapter.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right">
                        <div>{chapter.status}</div>
                        <div className="mt-2">
                          <Link
                            href={`/book/${chapter.slug}`}
                            className="text-foreground transition-colors hover:text-foreground/80"
                          >
                            进入 →
                          </Link>
                        </div>
                        <div className="mt-2">
                          <a
                            href={chapter.editUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-foreground/80 transition-colors hover:text-foreground"
                          >
                            编辑 Markdown
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-light">目前已经成立的部分</h2>
            <div className="space-y-4">
              {keyPoints.map((point) => (
                <div key={point} className="border-l border-border pl-4 text-muted-foreground leading-7">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
