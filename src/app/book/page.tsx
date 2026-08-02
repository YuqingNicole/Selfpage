import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book',
  description: 'Notes and progress for Nicole Chen’s book on AI, context, judgment, work, and value.',
};

const chapterMap = [
  'What gets cheaper when AI gets stronger',
  'What does not get swallowed by models',
  'How companies avoid working for the model layer',
  'How individuals grow with AI instead of against it',
];

const keyPoints = [
  'The positioning is clear: this is a thought-driven commercial book about value re-pricing in the AI era, not a tool manual or prompt handbook.',
  'The structure is already strong: the table of contents, core thesis, and reusable frameworks are in place.',
  'The strongest asset right now is the skeleton — especially ideas like context as moat, responsibility density, and the shift from feature value to outcome value.',
  'The material pool is real: flomo notes have already been filtered into chapter-worthy judgment sentences, especially for chapters one and two.',
  'The current gap is also obvious: this is still closer to a serious book prep package than a readable manuscript. The next high-value move is turning the outline into chapter prose.',
];

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border px-6 pt-28 pb-10">
        <div className="mx-auto max-w-3xl space-y-4">
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
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            A book-in-progress on AI, context, judgment, organizations, and how value gets repriced when model capability becomes abundant.
          </p>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-3xl gap-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-light">Current status</h2>
            <div className="rounded-2xl border border-border bg-card/40 p-6">
              <p className="leading-7 text-foreground/90">
                This project has moved beyond the idea stage. The thesis, chapter structure, and conceptual backbone are already in place.
                What exists today is not yet a manuscript, but it is much stronger than a loose note pile: it is a serious book prep system.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-light">Core thesis</h2>
            <p className="leading-7 text-muted-foreground">
              AI will keep compressing the premium on general-purpose capability, while increasing the value of context, judgment,
              organizational ability, and responsibility-bearing.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-light">Chapter map</h2>
            <div className="space-y-3">
              {chapterMap.map((chapter, index) => (
                <div key={chapter} className="rounded-xl border border-border px-4 py-4">
                  <p className="text-sm text-muted-foreground">Chapter {index + 1}</p>
                  <p className="mt-1 text-base leading-7">{chapter}</p>
                </div>
              ))}
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

          <div className="space-y-4">
            <h2 className="text-2xl font-light">Next</h2>
            <p className="leading-7 text-muted-foreground">
              The next high-leverage step is simple: turn the strongest argument into readable prose, starting with chapter one.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
