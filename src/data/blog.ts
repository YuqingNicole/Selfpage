import type { BlogPost } from '@/types/blog';
import { photographerInfo } from './photographer';

const nicoleAvatar = 'https://substackcdn.com/image/fetch/w_80,h_80,c_fill,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F481e7d79-a645-405a-84c3-a4897160d3f3_474x474.jpeg';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Is OpenClaw really worth this wave of hype? Why it might be ending the Chatbot era',
    slug: 'is-openclaw-really-worth-this-wave',
    excerpt: 'If you still think AI is just a browser tab you open when you need it, you\'re already behind. After 10 days of deep use, here\'s the underlying logic — and why it\'s unlike any AI you\'ve seen.',
    content: `## TL;DR

If you still think AI is just a browser tab you open when you need it, you're already behind. Over the past two weeks, the tech world has been buzzing about a project called OpenClaw — 165k GitHub stars, 60k Discord users, 230k followers on X, and a library of 700+ skills being built in real time. Andrej Karpathy called it a "Sci-fi Takeoff." After 10 days of deep use, let's talk about the underlying logic and why it's unlike any AI you've ever seen.

**1. Operating Mode: Not "Q&A" anymore — it's "always online"**

Traditional ChatGPT is reactive: if you stop talking, it goes silent. OpenClaw is proactive — it introduces a core Agent Loop.

- **Heartbeat:** This is its soul. Every 30 minutes it "wakes up" and checks your world against the HEARTBEAT.md checklist you've defined.
- **Cron Jobs:** It's your executive chief of staff. Every morning at 8am it consolidates your Notion tasks and syncs them to Todoist.

**2. Memory: having "personality" and "common sense" like a human**

OpenClaw's memory isn't a jumbled mess — it has a structured brain with distinct regions:

- **SOUL.md:** Defines its values and tone.
- **USER.md:** It knows who you are and what you're working on.
- **MEMORY.md:** The "shared understanding" it builds up over time.
- **Compaction:** Automatically prunes noise, keeping only the signal.

**3. Real-world use cases: what can it actually do?**

- **Autonomous Chief of Staff:** Has its own Google account and 1Password access.
- **Financial watchtower:** Directly calls yfinance, analyzes SEC filings.
- **Automated cold-start:** Give it a product domain, it auto-submits to Product Hunt and monitors competitors.

## Architecture Design

For the memory management system, the model sees on each request: system prompt, project context, conversation history, current message.

**Context = system prompt + conversation history + tool results + attachments**

Context is ephemeral, bounded, and expensive.

**Memory = MEMORY.md + memory/*.md + session transcripts**

Memory is persistent, unbounded, cheap, and searchable.

## How Memory Is Retrieved

When you search memory, OpenClaw runs two search strategies in parallel. Vector search (semantic) finds conceptually similar content; BM25 search (keyword) finds exact token matches.

finalScore = (0.7 × vectorScore) + (0.3 × textScore)

## Future Vision

- **Moltbook and the AI social contract:** A social network for AI agents.
- **Agent collaboration paradigm:** You may own a team of agents.
- **The security vs. power tradeoff:** The "full permissions, brute-force local + web" model.
- **Future OS structure** = Coding Agent (kernel) + Skills (capability modules) + Chat / Voice (interaction layer)`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5cd0ca26-b62e-4ecd-97fb-4167ec1d7917_2040x1360.jpeg',
    category: 'ai',
    tags: ['AI Agent', 'OpenClaw', 'LLM', 'Memory Systems'],
    publishedAt: '2026-02-08',
    readingTime: '10 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/is-openclaw-really-worth-this-wave',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '2',
    title: "Google Pomelli, I'm in — what it means for social media marketing",
    slug: 'google-pomelli-im-in-pomelli',
    excerpt: 'Pomelli is an experimental product from Google Labs and DeepMind that analyzes your website to build a "business DNA" profile and generate on-brand social media content. Think Canva meets ChatGPT, trained on your specific brand.',
    content: `Pomelli is an experimental product from Google Labs and DeepMind. Its core premise: your website should be able to tell social media tools exactly how to speak like your brand. It analyzes your site, builds a "business DNA" profile, and generates brand-consistent social posts, captions, and images.

Think **Canva meets ChatGPT, but trained specifically on your brand**.

## Why this caught my attention

When building products, I've always approached things from a PM's perspective — and that often means hitting walls around the orchestration of marketing assets. Today's AI products don't just need to think about *how* to tell a story. They need to think about how to tell it *well*, at the *right time*, to the *right people*, and make it the *right story*.

## How Pomelli does it

1. Detects the website's DNA and establishes a unified visual language
2. Generates content for Instagram, Facebook, X/Twitter, LinkedIn
3. Publishes images with brand-safe color palettes and layouts
4. Creates content variants from different campaign angles
5. Adapts to platform-specific formats (character counts, hashtag suggestions)

## A closed-loop trifecta workflow

Most tools only do "image" or only do "copy." Pomelli's design flow is seamless:

1. **Analyze (DNA Build):** Establish brand anchors.
2. **Plan (Campaign Ideas):** Provide strategic guidance, not just assets.
3. **Generate (Creative Gen):** Auto-adapt to specs across platforms.

BrandIntegrity = Grounding(DNA) × GenerativeQuality

## What PMs should learn from this

#### 1. The highest form of solving cold-start: automated context

We're in a no-prompt era. The best input is information that already exists. Reducing users' "thinking and input cost" is the same as increasing retention.

#### 2. Strategy first, features second

Real marketers aren't lacking filters — they're lacking ideas. Give direction before you give tools.

#### 3. The discipline and focus of an experimental product

In the AI era, better to build one thing at 90 points than a hundred things at 60.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd881a2d2-6322-4776-a35f-2f87affeda6f_2406x1622.png',
    category: 'product',
    tags: ['Google', 'Pomelli', 'Social Marketing', 'AI Tools'],
    publishedAt: '2026-01-30',
    readingTime: '8 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/google-pomelli-im-in-pomelli',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '3',
    title: 'The a16z Report: Paradigm Shift in AI-Native Business Models',
    slug: 'a16z-ai-native-paradigm-shift',
    excerpt: 'The a16z report is essential reading. Software as labor is the biggest new value driver. Proprietary data is the only real moat. Business models are shifting from selling raw materials to selling finished products.',
    content: `The recent a16z report is essential reading. Here are the core ideas I distilled.

## 1. Software as Labor is the Biggest Incremental Value

The logic of the SaaS industry is fundamentally shifting — from selling tools to delivering outcomes directly. When software stops being just a tool and starts delivering results, customers no longer pay a few dollars per seat per month. They pay a share of the outcome.

## 2. Proprietary Data is the Only Moat

As OpenAI, Google, and others push large model capabilities ever higher, the scarcity of the models themselves is declining. In a world of commoditized models, proprietary data is the only remaining moat.

## 3. Business Model Transformation: From Raw Materials to Finished Products

Rather than selling data for customers to analyze themselves, deliver complete investment memos, industry reports, or due diligence documents generated by AI from exclusive data sources. It's like upgrading from "selling fresh vegetables at the market" to "selling a Michelin-starred tasting menu."

## 4. The Incumbent Defense: Own the People, Not the Customers

Traditional software giants control enterprises' "systems of record" — all customer data, sales history, employee information lives in their systems. Switching costs are enormous. That creates a hostage economy.

## 5. Vertical Integration: The New Barbarians at the Gate

Rather than selling tools to professional service firms, buy a small practice and rebuild its service model with AI.

## 6. AI Restructures the Labor Value Equation: Augment, Don't Just Replace

AI's value shows up in three dimensions: cost advantage, capability enhancement, and market expansion. The future of work looks more like human-machine collaboration.

## 7. Consumer AI Opportunity Lies in Aggregation and New Categories

Native new categories create entirely new experiences that didn't exist before. Model aggregation platforms leave enormous room for third-party aggregators.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fd881a2d2-6322-4776-a35f-2f87affeda6f_2406x1622.png',
    category: 'startup',
    tags: ['a16z', 'AI Business Models', 'SaaS', 'Venture'],
    publishedAt: '2026-01-24',
    readingTime: '12 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/a16zai-native-a16z-report-the-paradigm',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '4',
    title: 'Value Isn\'t About Doing Things Better — It\'s About Making Systems Flow',
    slug: 'upstream-downstream-thinking',
    excerpt: 'Stripe did something that looked "dumb" — they spent enormous energy not on improving their payment system, but on simplifying the developer integration experience. Behind this is a mental model I call Upstream-Downstream Thinking.',
    content: `## Upstream-Downstream Thinking: Reimagining Your Place in the Value Chain

Most companies optimize their own piece of the chain — faster production, lower costs, better product. But Stripe did something that looked "dumb": they spent enormous energy not on improving their payment system, but on simplifying developer integration. Seven lines of code to add payments — revolutionary at the time.

Behind this is a mental model I call Upstream-Downstream Thinking.

## What is Upstream-Downstream Thinking?

It has three core dimensions:

**First: the directionality of value flow.** In any value chain, at least three flows move simultaneously: physical flow, financial flow, information flow. Real power isn't in what you produce — it's in which flow you control.

**Second: the intensity of dependency.** Who is harder to replace? Who has higher switching costs? Intel and Microsoft once controlled the PC supply chain — not because they were best, but because they were hardest to replace.

**Third: where you apply leverage.** Sometimes the biggest lever isn't in your own hands. Reducing friction with upstream and downstream partners — even helping them optimize their processes — can create more value than optimizing your own.

## Content Production: A History of Shifting Power

Traditional publishing went through several major shifts: in the fifties, publishers were absolute kings; in the nineties, large chain bookstores rose; then Amazon restructured the entire value chain; in 2017, Substack let writers charge readers directly.

Each power shift happened because some player found a way to pass more value downstream.

## Where does leverage sit?

Leverage has three sources: scarcity, connectivity, and data ownership.

One trend is becoming increasingly clear: leverage is migrating toward both ends. Companies at the very top that own core technology are getting stronger; companies at the very bottom that touch users directly are getting stronger. The middle is being compressed.

## The Agents Era: Restructuring the Value Chain

The real disruption is that agents are beginning to complete tasks independently, not just assist humans. This fundamentally changes value chain structure.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fe0f63c9a-2296-4c96-a2f9-52648999bb00_2000x1000.jpeg',
    category: 'thinking',
    tags: ['Value Chain', 'Systems Thinking', 'Stripe', 'Product Strategy'],
    publishedAt: '2026-01-16',
    readingTime: '15 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/5e8',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '5',
    title: 'Escaping the Linear Thinking Trap',
    slug: 'escape-the-involution-trap-of-linear-thinking',
    excerpt: 'Pursuing 10x growth isn\'t 100x harder than pursuing 10% growth — sometimes it\'s actually easier. The essence of 10x isn\'t doing more. It\'s doing less, but better.',
    content: `I've been thinking a lot about how to achieve 2x growth on the products I work on. After a conversation with someone much further along, I realized I was stuck in a fairly conventional mental rut.

When a team sets a 2x growth target, the first instinct is to add things on top of what already exists. This is essentially "linear thinking" — trying to double results through double effort within the same familiar ruleset.

As Dan Sullivan says: if you're pursuing 2x growth, you can keep most of what you're already doing. But if you want 10x growth, you have to start over and redesign your model from scratch.

The head of Google's Moonshot project once noted: if the goal is 10x growth, the process is usually not 100x harder than pursuing 10% growth — but the returns could be 100x.

## The Five Core Levers of 10x Growth

#### Lever 1: From "How to do it" to "Who does it"

When leaders obsess over "how," they trap themselves in execution mode. When they focus on "who," they move up to organization and strategy.

#### Lever 2: Apply "Gain Thinking" to fuel continuous momentum

Gap thinkers measure the present against an idealized future state — they constantly drain the team's psychological energy. Gain thinkers use their past as the reference point, always asking: "What progress have we made compared to where we were?"

#### Lever 3: Forge a "Unique Ability"

The essence of 10x growth isn't running faster on an existing track — it's building your own track.

#### Lever 4: Start a "Time Revolution"

- Free days: fully disconnected from operations, for recovery and strategic thinking.
- Focus days: fully dedicated to core tasks, entering a flow state.
- Buffer days: for administrative work and preparation.

#### Lever 5: Write a "Dream Check"

Turn seemingly impossible 10x targets into clear, actionable guides.

## The Four Freedoms

Each time you pursue 10x growth, you're consciously choosing to live at a specific level:

- Time freedom: your time goes toward what matters most.
- Financial freedom: money is no longer an obstacle.
- Relationship freedom: you can easily connect with anyone you want to meet.
- Purpose freedom: the goals you choose are more ambitious and meaningful.

The answer is probably hidden in the 80% we've been ignoring. This is a game about less — fewer customers, fewer products, fewer tasks, fewer meetings. But simultaneously, it's a pursuit of more depth.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8f9a5616-8ccf-4ee0-9c31-1cef677fc9fb_1536x1024.png',
    category: 'thinking',
    tags: ['10x Growth', 'Mental Models', 'Product Growth', 'Dan Sullivan'],
    publishedAt: '2026-01-05',
    readingTime: '12 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/escape-the-involution-trap-of-linear',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '6',
    title: 'Ivan Zhao: Steve, Steel and Infinite Minds',
    slug: 'ivan-zhao-steve-steel-and-infinitive-minds',
    excerpt: 'Every era is shaped by its "miracle material." Steel forged the Gilded Age, semiconductors lit the digital age, and now AI has arrived as the "Infinite Mind." History tells us: whoever masters the material defines the era.',
    content: `Every era is shaped by its "miracle material." Steel forged the Gilded Age, semiconductors lit the digital age, and now AI has arrived as the "Infinite Mind." History says: whoever masters the material defines the era.

The future is hard to predict because it always disguises itself as the past. Early phone calls were as brief as telegrams; early films looked like filmed stage plays. As Marshall McLuhan said: "We always drive into the future using the rearview mirror."

Today's AI chatbots are essentially imitating the Google search box of the past. We're in that awkward transitional period that every major new technology goes through.

## Why is AI harder to apply to general knowledge work?

Compared to coding agents, knowledge work is more fragmented and harder to verify.

**1. Context Fragmentation:** A programmer's tools and context are typically concentrated in an IDE. General knowledge work is scattered across dozens of tools.

**2. Lack of Verifiability:** Code can be verified through tests. But how do you verify that a project is being managed well?

## Steel and Steam

Ivan analogizes organizations to steel and steam.

Steel is the first metaphor — AI is the steel of organizations, with the potential to maintain contextual consistency across an entire workflow.

The steam engine is the second metaphor — companies today are still in the "replace the waterwheel" phase, jamming AI chatbots into existing tools. When old constraints disappear, we should reimagine what organizations should look like.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc4a9d596-c6f2-4ce1-9bf6-80879c0b6b37_2380x1330.png',
    category: 'ai',
    tags: ['Ivan Zhao', 'Notion', 'AI', 'Organizational Change'],
    publishedAt: '2025-12-27',
    readingTime: '6 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/ivan-zhaosteve-steel-and-infinitive',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
  {
    id: '7',
    title: 'The Development Paradigm for LLM Application Layers',
    slug: 'llm-application-layer-paradigm',
    excerpt: 'The question isn\'t how to build features — it\'s how to front-load the risk. The definition of MVP should expand to Minimum Marketable Product: validate that the feature works and that you can actually sell it.',
    content: `A thread I read recently about development paradigms for new LLM application features sparked some thinking. Here's my take, informed by building my own projects.

## 1. The Core Problem

The question isn't how to build the feature — it's how to front-load the risk.

1. Not understanding user needs well enough to segment the audience or judge what "PMF" looks like.
2. Not knowing how to reach users, or knowing the path but not being able to market at an acceptable cost.
3. Lacking clarity on where the model's capability boundaries are in specific scenarios.
4. Iteration on product development and marketing is overall too slow.

## 2. The Paradigm

When we hit a problem, should we wait for the model's future capabilities to solve it, or do we have to solve it now through product and engineering? This isn't a binary 0/1 choice — it's a continuous spectrum with enormous gray area.

### 2.1 Front-load the Risk

The definition of MVP should expand to Minimum Marketable Product: validate that a feature is feasible while simultaneously validating that it can be marketed.

### 2.2 The Core Validation Pod (CVP)

The CVP should close the loop on R&D, user insight, and marketing capabilities, and deliver a minimal PMF product prototype at an acceptable marketing cost.

### 2.3 CVP-Driven Development Process

1. Product design, prototype scoping.
2. CVP pod builds and iterates on product v0.5.
3. Once validated, decide whether to continue polishing before full release.
4. Other engineering resources join, rebuild according to production requirements.

## 3. Real-World Organizational Challenges

### Staffing

The capabilities a CVP needs are different from the specialized roles most organizations have. It needs breadth — the ability to close the loop independently. A core 2–3 people over a tight time cycle.

### Disrupting Existing Development Processes

The CVP essentially consolidates and front-loads risks that were previously scattered across development and marketing. But a CVP team is hard to put on a shared roadmap or performance review cycle with other teams.

### Consistency Between Prototype and Production

You need a higher-abstraction platform or DSL that lets both the prototype and production system use exactly the same technical framework, enabling relatively easy migration between the CVP phase and production.`,
    coverImage: 'https://substackcdn.com/image/fetch/w_1456,c_limit,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8f9a5616-8ccf-4ee0-9c31-1cef677fc9fb_1536x1024.png',
    category: 'dev',
    tags: ['LLM', 'Development Paradigm', 'CVP', 'PMF'],
    publishedAt: '2025-12-20',
    readingTime: '10 min read',
    substackUrl: 'https://nicolewithlove.substack.com/p/llm',
    author: { name: photographerInfo.name, avatar: nicoleAvatar },
  },
];

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const getRecentPosts = (count: number = 3): BlogPost[] => {
  return blogPosts.slice(0, count);
};

export const getRelatedPosts = (currentSlug: string, count: number = 2): BlogPost[] => {
  const current = blogPosts.find(p => p.slug === currentSlug);
  if (!current) return blogPosts.slice(0, count);
  return blogPosts
    .filter(p => p.slug !== currentSlug && p.category === current.category)
    .slice(0, count);
};
