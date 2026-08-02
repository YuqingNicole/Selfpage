import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Chapter 1',
  description: 'AI 越强，什么越便宜',
};

export default function ChapterOnePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border px-6 pt-28 pb-10">
        <div className="mx-auto max-w-3xl space-y-4">
          <Link
            href="/book"
            className="inline-block text-sm text-muted-foreground transition-colors hover:text-foreground"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ← Back to book
          </Link>
          <p
            className="text-xs uppercase tracking-[0.22em] text-muted-foreground"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Chapter 01 · Draft
          </p>
          <h1
            className="text-4xl md:text-5xl"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 300, fontStyle: 'italic' }}
          >
            AI 越强，什么越便宜
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            当模型能力越来越强，真正被压缩的不是某一个职业，而是一整类可以被标准化、语言化、模板化的能力溢价。
          </p>
        </div>
      </section>

      <article className="px-6 py-12">
        <div className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
          <p>
            很多人讨论 AI 时，最爱问的是：它会不会替代某个岗位，或者某种技能还值不值钱。
            但我越来越觉得，这个问题如果只停留在职业名称层面，几乎注定会问偏。
            真正发生变化的，不是“文案会不会被替代”“咨询会不会被替代”“程序员会不会被替代”，而是能力定价的底层逻辑变了。
          </p>

          <p>
            当模型变强，最先被压缩的是那些可以被稳定表达、批量复用、快速生成的通用能力。
            信息整理、常规总结、标准文案、基础分析、格式化表达、初级方案拼装——这些能力过去之所以值钱，
            很大程度上不是因为它们本身有多深，而是因为它们曾经稀缺、曾经耗时、曾经需要训练。
            一旦模型把这些事情做到足够快、足够便宜、足够可得，它们的市场价格就会开始系统性下滑。
          </p>

          <p>
            这也是为什么我一直觉得，很多人对 “Deep Research” 这个名字有一种误解。
            它解决的首先不是深度，而是信息不对称：你以前不知道的，现在你知道了；你以前要花一天查的资料，现在十分钟就能拿到。
            这当然很有用，但它不等于真正的深度。真正的深度来自另一个维度：认知不对称。
            面对同一份行业报告，一个从业二十年的老兵和一个刚入行的新手，看到的根本不是同一个世界。
            老兵知道哪些数据只是噪音，哪些异常值其实在预示趋势；新手即便拿到更厚的报告，也很难做出同样质量的判断。
          </p>

          <p>
            所以 AI 能大规模压缩的，首先是“平均水平附近”的能力溢价。
            它可以把一个原本没有那么熟练的人，快速拉到合格线、平均线，甚至体面线。
            但它很难直接生产真正稀缺的判断。因为大模型的训练，本质上是对海量共识语料的压缩；
            而深刻判断恰恰经常来自非共识、来自经验沉淀、来自长期在具体情境里反复撞墙后的取舍。
          </p>

          <p>
            这也是我想说的第一层结论：AI 不是简单地让人更强，而是在重新给能力定价。
            过去一个人如果擅长写总结、做汇报、搭框架、整资料，就已经足够显得专业；
            但在模型时代，这些会越来越像电力和宽带——重要，但不再稀缺。
            真正开始稀缺的，是你能不能定义问题、排序目标、识别真假需求、理解具体场景里的约束，并为最终结果承担责任。
          </p>

          <p>
            说得更直接一点：持续投入在一个不断贬值的维度上，收益只会越来越低。
            如果你把主要精力都放在追逐“模型又会了什么”“哪个工具又快了多少”，你获得的往往只是短期效率红利。
            这些红利会很快扩散，很快被抹平，很快从个人优势变成市场标配。
            但如果你持续投入在另一个维度——也就是你的个人 context、你的判断系统、你的经验组织方式——那种收益反而会累积。
          </p>

          <p>
            因为 context 不只是背景信息，它是你在真实环境里形成的解释系统。
            它包括你理解业务的方式，识别风险的习惯，和不同人协作时对微妙信号的感知，也包括你知道哪些地方可以冒险，哪些地方绝不能错。
            这些东西不是模型天然拥有的，也不是靠多看几篇文章就能补齐的。
            它们往往来自长期浸泡、反复试错、承担后果。
          </p>

          <p>
            从这个角度看，AI 带来的最重要变化，也许不是让所有人都变成超级个体，
            而是把“会生成”这件事迅速打回到基础设施层，把“会判断”重新抬到更高的位置。
            模型越强，生成本身越不值钱；模型越强，方向感、边界感、验证能力、责任承担就越值钱。
            未来真正稀缺的，不是谁能写出一段更像样的话，而是谁能在高速生成的洪流里，仍然知道什么值得做，什么不值得做，什么是看起来对、但实际上错得很深的东西。
          </p>

          <p>
            所以这一章真正想回答的，不是“AI 会让哪些岗位消失”。
            那个问题太表层，而且很容易被短期情绪带偏。
            我更想回答的是：当模型不断吞掉通用能力溢价之后，人类的价值会重新沉到哪里去？
            以及，如果你已经看见这个趋势，现在应该把自己的时间、训练和野心，押注到什么地方。
          </p>
        </div>
      </article>
    </div>
  );
}
