import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllBookChapters } from '@/lib/book';

export const metadata: Metadata = {
  title: 'Book',
  description: 'Notes and progress for Nicole Chen’s book on AI, context, judgment, work, and value.',
};

const keyPoints = [
  '这本书的定位已经清楚：它是一本关于 AI 时代价值重估的商业思考书，不是工具手册。',
  '当前最强的不是“资料量”，而是骨架：chapter map、core thesis、frameworks 都已经成型。',
  '最值钱的下一步不是继续囤材料，而是把最强判断推进成可读正文。',
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
            Book Project
          </p>
          <h1
            className="text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic' }}
          >
            模型越强，人越贵
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">
            A book-in-progress on AI, context, judgment, organizations, and how value gets repriced when model capability becomes abundant.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-4xl gap-12">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <p className="text-sm text-muted-foreground">Current status</p>
              <p className="mt-3 leading-7 text-foreground/90">
                现在已经不是一个想法，而是一套成型中的书稿系统。定位、章节结构、核心判断都在，缺的主要是把骨架继续推进成正文。
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <p className="text-sm text-muted-foreground">Core thesis</p>
              <p className="mt-3 leading-7 text-foreground/90">
                AI will keep compressing the premium on general-purpose capability, while increasing the value of context, judgment,
                organizational ability, and responsibility-bearing.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-light">Chapter navigation</h2>
                <p className="mt-1 text-sm text-muted-foreground">现在已经可以在站内继续加正文。第一章已开入口。</p>
              </div>
            </div>

            <div className="grid gap-4">
              {chapters.map((chapter) => {
                return (
                  <Link
                    key={chapter.number}
                    href={`/book/${chapter.slug}`}
                    className="group rounded-2xl border border-border bg-background px-5 py-5 transition-colors hover:border-foreground/30"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                          Chapter {chapter.number}
                        </p>
                        <h3 className="text-xl font-light group-hover:text-foreground/80">{chapter.title}</h3>
                        <p className="max-w-2xl leading-7 text-muted-foreground">{chapter.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground md:text-right">
                        <div>{chapter.status}</div>
                        <div className="mt-2 text-foreground">Open →</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-light">What is already strong</h2>
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
