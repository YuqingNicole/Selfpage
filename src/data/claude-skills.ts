export interface ClaudeSkill {
  name: string;
  description: string;
  category: string;
  tags: string[];
  url?: string;
}

export const skillCategories = [
  'All',
  'SEO & GEO',
  'Content & Writing',
  'Development',
  'Media & Files',
  'Feishu / Lark',
  'GSD Workflow',
  'Planning',
] as const;

export const claudeSkills: ClaudeSkill[] = [
  // SEO & GEO
  {
    name: 'keyword-research',
    description: 'Discovers high-value keywords with search intent analysis, difficulty assessment, and content opportunity mapping.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Keywords', 'Research'],
  },
  {
    name: 'performance-reporter',
    description: 'Generates comprehensive SEO and GEO performance reports combining rankings, traffic, backlinks, and AI visibility metrics.',
    category: 'SEO & GEO',
    tags: ['SEO', 'GEO', 'Reporting'],
  },
  {
    name: 'serp-analysis',
    description: 'Analyzes search engine results pages to understand ranking factors, SERP features, user intent patterns, and AI overviews.',
    category: 'SEO & GEO',
    tags: ['SEO', 'SERP', 'Analysis'],
  },
  {
    name: 'content-gap-analysis',
    description: 'Identifies content opportunities by finding topics and keywords your competitors cover that you don\'t.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Competitive', 'Content'],
  },
  {
    name: 'meta-tags-optimizer',
    description: 'Creates and optimizes meta tags including title tags, meta descriptions, Open Graph tags, and Twitter cards for maximum click-through.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Meta', 'On-page'],
  },
  {
    name: 'schema-markup-generator',
    description: 'Generates structured data markup (Schema.org JSON-LD) to enable rich results in search engines including FAQ snippets and How-To cards.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Schema', 'Structured Data'],
  },
  {
    name: 'rank-tracker',
    description: 'Tracks and analyzes keyword ranking positions over time for both traditional search results and AI-generated responses.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Rankings', 'Tracking'],
  },
  {
    name: 'geo-content-optimizer',
    description: 'Optimizes content for Generative Engine Optimization (GEO) to increase chances of being cited by AI systems like ChatGPT and Claude.',
    category: 'SEO & GEO',
    tags: ['GEO', 'AI Visibility', 'Content'],
  },
  {
    name: 'backlink-analyzer',
    description: 'Analyzes backlink profiles to understand link authority, identify toxic links, discover link building opportunities, and monitor competitors.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Backlinks', 'Link Building'],
  },
  {
    name: 'seo-content-writer',
    description: 'Creates high-quality, SEO-optimized content that ranks in search engines. Applies on-page SEO best practices and keyword optimization.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Content', 'Writing'],
  },
  {
    name: 'content-refresher',
    description: 'Identifies and updates outdated content to restore and improve search rankings. Analyzes content freshness and adds new information.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Content', 'Refresh'],
  },
  {
    name: 'technical-seo-checker',
    description: 'Performs technical SEO audits covering site speed, crawlability, indexability, mobile-friendliness, security, and structured data.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Technical', 'Audit'],
  },
  {
    name: 'on-page-seo-auditor',
    description: 'Performs comprehensive on-page SEO audits to identify optimization opportunities including title tags, meta descriptions, and header structure.',
    category: 'SEO & GEO',
    tags: ['SEO', 'On-page', 'Audit'],
  },
  {
    name: 'internal-linking-optimizer',
    description: 'Analyzes and optimizes internal link structure to improve site architecture, distribute page authority, and help search engines crawl.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Internal Links', 'Architecture'],
  },
  {
    name: 'competitor-analysis',
    description: 'Analyzes competitor SEO and GEO strategies including their ranking keywords, content approaches, backlink profiles, and AI citations.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Competitive', 'Strategy'],
  },
  {
    name: 'alert-manager',
    description: 'Sets up and manages alerts for critical SEO and GEO metrics including ranking drops, traffic changes, technical issues, and competitor moves.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Alerts', 'Monitoring'],
  },
  {
    name: 'memory-management',
    description: 'Manages a two-layer memory system (hot cache + cold storage) for SEO/GEO project context, tracking keywords, competitors, and metrics.',
    category: 'SEO & GEO',
    tags: ['SEO', 'Memory', 'Context'],
  },

  // Content & Writing
  {
    name: 'writing-assistant',
    description: '写作助手 — 帮助用户从零散想法到成稿，自动选择最优路线：清晰观点走框架→内容，模糊观点走挖掘→选题→框架→内容。',
    category: 'Content & Writing',
    tags: ['Writing', 'Chinese', 'Workflow'],
  },
  {
    name: 'content-quality-auditor',
    description: 'Runs a full CORE-EEAT 80-item content quality audit, scoring content across 8 dimensions with weighted scoring by content type.',
    category: 'Content & Writing',
    tags: ['Content', 'Audit', 'Quality'],
  },
  {
    name: 'doc-coauthoring',
    description: 'Guides users through a structured workflow for co-authoring documentation, proposals, and long-form written deliverables.',
    category: 'Content & Writing',
    tags: ['Writing', 'Docs', 'Collaboration'],
  },
  {
    name: 'prd-doc-writer',
    description: 'Write and iteratively refine PRD/需求文档 with a story-driven structure and strict staged confirmations.',
    category: 'Content & Writing',
    tags: ['PRD', 'Product', 'Docs'],
  },
  {
    name: 'humanizer',
    description: 'Removes signs of AI-generated writing from text, making it sound more natural and human-written.',
    category: 'Content & Writing',
    tags: ['Writing', 'AI', 'Editing'],
  },
  {
    name: 'thought-mining',
    description: '思维挖掘助手 — 通过对话帮助用户把脑子里的零散想法倒出来、记录下来、整理成文章。',
    category: 'Content & Writing',
    tags: ['Writing', 'Chinese', 'Ideation'],
  },
  {
    name: 'substack-optimizer',
    description: 'Optimizes Substack Notes for maximum engagement and subscriber growth. Use when writing Substack Notes or optimizing posts.',
    category: 'Content & Writing',
    tags: ['Substack', 'Newsletter', 'Growth'],
  },
  {
    name: 'weekly-report',
    description: '帮助用户梳理周报，按照完整逻辑展示工作价值和边界。',
    category: 'Content & Writing',
    tags: ['Report', 'Chinese', 'Workflow'],
  },
  {
    name: 'internal-comms',
    description: 'A set of resources to help write all kinds of internal communications using company-preferred formats.',
    category: 'Content & Writing',
    tags: ['Communication', 'Internal', 'Writing'],
  },
  {
    name: 'email-systems',
    description: 'Build high-ROI email marketing systems. $36 for every $1 spent — email done right with automation, segmentation, and lifecycle flows.',
    category: 'Content & Writing',
    tags: ['Email', 'Marketing', 'Automation'],
  },
  {
    name: 'email-sequence',
    description: 'Creates and optimizes email sequences, drip campaigns, automated email flows, and lifecycle email programs.',
    category: 'Content & Writing',
    tags: ['Email', 'Drip', 'Sequence'],
  },
  {
    name: 'image-assistant',
    description: '配图助手 — 把文章/模块内容转成统一风格、少字高可读的 16:9 信息图提示词，输出可直接复制的生图提示词。',
    category: 'Content & Writing',
    tags: ['Image', 'Chinese', 'Prompts'],
  },
  {
    name: 'deep-review',
    description: '深度工作分析与项目洞察 — 从更长时间维度分析工作模式、项目进展和技术方向。',
    category: 'Content & Writing',
    tags: ['Review', 'Chinese', 'Analysis'],
  },
  {
    name: 'daily-review',
    description: '每日工作回顾与洞察分析，对用户前一天的对话历史和使用数据进行总结与建议。',
    category: 'Content & Writing',
    tags: ['Review', 'Chinese', 'Daily'],
  },

  // Development
  {
    name: 'claude-developer-platform',
    description: 'Build apps with the Claude API or Anthropic SDK. Triggered when code imports anthropic or @anthropic-ai/sdk.',
    category: 'Development',
    tags: ['Claude API', 'Anthropic', 'SDK'],
  },
  {
    name: 'mcp-builder',
    description: 'Guide for creating high-quality MCP (Model Context Protocol) servers that enable LLMs to interact with external services.',
    category: 'Development',
    tags: ['MCP', 'Protocol', 'Integration'],
  },
  {
    name: 'tdd-workflow',
    description: '在编写新功能、修复Bug或重构代码时使用。强制执行测试驱动开发，要求80%+测试覆盖率。',
    category: 'Development',
    tags: ['TDD', 'Testing', 'Engineering'],
  },
  {
    name: 'webapp-testing',
    description: 'Toolkit for interacting with and testing local web applications using Playwright. Supports verifying frontend functionality.',
    category: 'Development',
    tags: ['Testing', 'Playwright', 'Frontend'],
  },
  {
    name: 'frontend-design',
    description: 'Create distinctive, production-grade frontend interfaces with high design quality.',
    category: 'Development',
    tags: ['Frontend', 'UI/UX', 'React'],
  },
  {
    name: 'frontend-slides',
    description: 'Create stunning, animation-rich HTML presentations from scratch or by converting PowerPoint files.',
    category: 'Development',
    tags: ['Slides', 'HTML', 'Animation'],
  },
  {
    name: 'design-taste-frontend',
    description: 'Senior UI/UX Engineer skill. Architect digital interfaces overriding default LLM biases with metric-based rules and strict component standards.',
    category: 'Development',
    tags: ['UI/UX', 'Design', 'Frontend'],
  },
  {
    name: 'web-artifacts-builder',
    description: 'Suite of tools for creating elaborate, multi-component HTML artifacts using modern frontend web technologies (React, Tailwind, etc.).',
    category: 'Development',
    tags: ['HTML', 'React', 'Artifacts'],
  },
  {
    name: 'algorithmic-art',
    description: 'Creating algorithmic art using p5.js with seeded randomness and interactive parameter exploration.',
    category: 'Development',
    tags: ['p5.js', 'Creative Code', 'Art'],
  },
  {
    name: 'canvas-design',
    description: 'Create beautiful visual art in .png and .pdf documents using design philosophy.',
    category: 'Development',
    tags: ['Design', 'Canvas', 'Visual'],
  },
  {
    name: 'simplify',
    description: 'Reviews changed code for reuse, quality, and efficiency, then fixes any issues found.',
    category: 'Development',
    tags: ['Refactor', 'Code Quality', 'Review'],
  },
  {
    name: 'req-change-workflow',
    description: 'Standardizes requirement/feature changes in an existing codebase, especially Chrome extensions — turning vague change requests into structured workflows.',
    category: 'Development',
    tags: ['Requirements', 'Workflow', 'Extensions'],
  },
  {
    name: 'keybindings-help',
    description: 'Customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json.',
    category: 'Development',
    tags: ['Keyboard', 'Shortcuts', 'Claude Code'],
  },
  {
    name: 'brand-guidelines',
    description: 'Applies Anthropic\'s official brand colors and typography to any artifact — slides, docs, reportings, HTML landing pages.',
    category: 'Development',
    tags: ['Brand', 'Design', 'Anthropic'],
  },
  {
    name: 'theme-factory',
    description: 'Toolkit for styling artifacts with a theme — slides, docs, reportings, HTML landing pages, etc.',
    category: 'Development',
    tags: ['Theme', 'Styling', 'Design'],
  },
  {
    name: 'agent-reach',
    description: 'Give your AI agent eyes to see the entire internet. Install and configure upstream tools for Twitter/X, Reddit, YouTube, GitHub.',
    category: 'Development',
    tags: ['AI Agent', 'Automation', 'Internet'],
  },
  {
    name: 'skill-creator',
    description: 'Guide for creating effective Claude Code skills.',
    category: 'Development',
    tags: ['Skills', 'Claude Code', 'Guide'],
  },
  {
    name: 'data-analysis',
    description: '全链路数据分析技能，支持表格(CSV/Excel)、文档(PDF/DOCX/MD)及图像数据的处理。强制遵循安全探查、质量体检、代码执行流程。',
    category: 'Development',
    tags: ['Data', 'Analysis', 'Chinese'],
  },

  // Media & Files
  {
    name: 'video-creator',
    description: '视频创作技能 — 图片+音频合成视频，支持淡入淡出转场、自动拼接片尾、添加BGM。适用于图文转视频、视频号制作。',
    category: 'Media & Files',
    tags: ['Video', 'Chinese', 'Media'],
  },
  {
    name: 'ffmpeg',
    description: 'Expert guide for FFmpeg video/audio processing, conversion, streaming, and filtering.',
    category: 'Media & Files',
    tags: ['FFmpeg', 'Video', 'Audio'],
  },
  {
    name: 'ffmpeg-usage',
    description: '基于FFmpeg和第三方API的音视频处理，包括格式转换、拼接、合并、压缩、GIF制作、音频提取、字幕处理等。',
    category: 'Media & Files',
    tags: ['FFmpeg', 'Chinese', 'Audio/Video'],
  },
  {
    name: 'remotion-video',
    description: '使用 Remotion 框架以编程方式创建视频。用 React 组件定义视频内容，支持动画、字幕、音乐可视化、3D 视频等。',
    category: 'Media & Files',
    tags: ['Remotion', 'React', 'Video'],
  },
  {
    name: 'seedance',
    description: 'Generate video prompts, create Seedance prompts, and write video descriptions for AI video generation.',
    category: 'Media & Files',
    tags: ['Video', 'AI', 'Prompts'],
  },
  {
    name: 'pdf',
    description: 'Use when the user wants to read, extract, convert, merge, split, or manipulate PDF files.',
    category: 'Media & Files',
    tags: ['PDF', 'Files', 'Processing'],
  },
  {
    name: 'pptx',
    description: 'Use any time a .pptx file is involved — creating slide decks, converting, editing, or extracting content from PowerPoint files.',
    category: 'Media & Files',
    tags: ['PowerPoint', 'Slides', 'Files'],
  },
  {
    name: 'xlsx',
    description: 'Use any time a spreadsheet file is the primary input or output — open, read, edit, create, or convert Excel/CSV files.',
    category: 'Media & Files',
    tags: ['Excel', 'Spreadsheet', 'CSV'],
  },
  {
    name: 'docx',
    description: 'Use whenever the user wants to create, read, edit, or manipulate Word documents (.docx files).',
    category: 'Media & Files',
    tags: ['Word', 'DOCX', 'Files'],
  },
  {
    name: 'imagemagick-conversion',
    description: 'Convert and manipulate images with ImageMagick — format conversion, resizing, batch processing, quality adjustment.',
    category: 'Media & Files',
    tags: ['ImageMagick', 'Images', 'Conversion'],
  },
  {
    name: 'ppocrv5',
    description: 'Extract text from images, PDFs, or documents using OCR. Supports URLs and local files with adaptive quality.',
    category: 'Media & Files',
    tags: ['OCR', 'Text Extraction', 'Vision'],
  },
  {
    name: 'slack-gif-creator',
    description: 'Knowledge and utilities for creating animated GIFs optimized for Slack — with constraints, validation tools, and animation controls.',
    category: 'Media & Files',
    tags: ['GIF', 'Slack', 'Animation'],
  },
  {
    name: 'deepl',
    description: 'Translate texts, documents, and XLIFF files via DeepL API. Supports /deepl translate, /deepl file commands.',
    category: 'Media & Files',
    tags: ['Translation', 'DeepL', 'Language'],
  },
  {
    name: 'gemini-image',
    description: '当用户想要生成图片、画图、绘画、创建图像、AI作画时使用。支持文生图和图生图。',
    category: 'Media & Files',
    tags: ['Image Gen', 'Gemini', 'AI Art'],
  },

  // Feishu / Lark
  {
    name: 'feishu-attendance',
    description: 'Monitor Feishu (Lark) attendance records. Check for late, early leave, or absent employees and report to admin.',
    category: 'Feishu / Lark',
    tags: ['Feishu', 'Attendance', 'HR'],
  },
  {
    name: 'feishu-card',
    description: 'Send rich interactive cards to Feishu (Lark) users or groups. Supports Markdown, code blocks, tables, color headers, and action buttons.',
    category: 'Feishu / Lark',
    tags: ['Feishu', 'Cards', 'Messaging'],
  },
  {
    name: 'feishu-leave-request',
    description: 'Submit a leave request through Feishu (Lark). Use when the user wants to request time off or submit a leave application.',
    category: 'Feishu / Lark',
    tags: ['Feishu', 'Leave', 'HR'],
  },
  {
    name: 'feishu-bridge',
    description: 'Connect a Feishu (Lark) bot to Clawdbot via WebSocket long-connection. No public server, domain, or ngrok required.',
    category: 'Feishu / Lark',
    tags: ['Feishu', 'Bot', 'WebSocket'],
  },
  {
    name: 'feishu-api-docs',
    description: 'Fetches Feishu (Lark) API documentation from the official Apifox mirror. Supports searching and extracting API schemas.',
    category: 'Feishu / Lark',
    tags: ['Feishu', 'API', 'Docs'],
  },
  {
    name: 'feishu-doc-reader',
    description: 'Read and extract content from Feishu (Lark) documents using the official Feishu Open API.',
    category: 'Feishu / Lark',
    tags: ['Feishu', 'Docs', 'Reader'],
  },

  // GSD Workflow
  {
    name: 'gsd:new-project',
    description: 'Initialize a new project with deep context gathering, domain research, and PROJECT.md creation.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Project Setup', 'Planning'],
  },
  {
    name: 'gsd:plan-phase',
    description: 'Create detailed phase plan (PLAN.md) with task breakdown, dependency analysis, and goal-backward verification.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Planning', 'Phase'],
  },
  {
    name: 'gsd:execute-phase',
    description: 'Execute all plans in a phase with wave-based parallelization and atomic commits.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Execution', 'Phase'],
  },
  {
    name: 'gsd:debug',
    description: 'Systematic debugging with persistent state across context resets, using the scientific method.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Debug', 'Engineering'],
  },
  {
    name: 'gsd:verify-work',
    description: 'Validate built features through conversational UAT — goal-backward analysis of what was built.',
    category: 'GSD Workflow',
    tags: ['GSD', 'UAT', 'Verification'],
  },
  {
    name: 'gsd:progress',
    description: 'Check project progress, show context, and route to next action — execute or plan.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Progress', 'Status'],
  },
  {
    name: 'gsd:map-codebase',
    description: 'Analyze codebase with parallel mapper agents to produce structured .planning/codebase/ documents.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Codebase', 'Analysis'],
  },
  {
    name: 'gsd:quick',
    description: 'Execute a quick task with GSD guarantees (atomic commits, state tracking) but skip optional agents.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Quick', 'Execution'],
  },
  {
    name: 'gsd:new-milestone',
    description: 'Start a new milestone cycle — update PROJECT.md and route to requirements.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Milestone', 'Planning'],
  },
  {
    name: 'gsd:complete-milestone',
    description: 'Archive completed milestone and prepare for next version.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Milestone', 'Archive'],
  },
  {
    name: 'gsd:help',
    description: 'Show available GSD commands and usage guide.',
    category: 'GSD Workflow',
    tags: ['GSD', 'Help', 'Guide'],
  },

  // Planning
  {
    name: 'long-term-plan',
    description: '帮助用户创建和管理长期项目计划 — 通过结构化多轮对话明确目标、拆解里程碑、分解可执行任务并安排日程。',
    category: 'Planning',
    tags: ['Planning', 'Chinese', 'Long-term'],
  },
  {
    name: 'version-planner',
    description: '帮助用户把产品需求拆解成渐进式版本规划 — MVP怎么做、分阶段实现。',
    category: 'Planning',
    tags: ['Planning', 'Chinese', 'MVP'],
  },
  {
    name: 'project-map-builder',
    description: '生成或更新用户指定文件夹的 PROJECT_MAP.md — 适用于目录地图/项目地图/代码仓概览场景。',
    category: 'Planning',
    tags: ['Planning', 'Chinese', 'Codebase'],
  },
  {
    name: 'niuma-help',
    description: '牛马AI 产品使用引导与帮助，解答用户关于功能操作、设置配置等使用问题。',
    category: 'Planning',
    tags: ['NiuMa AI', 'Chinese', 'Help'],
  },
  {
    name: 'claude-skills-zh-cn',
    description: '中文版本的 Anthropic Skills 技能集合，包含多个常用技能的中文翻译版本。',
    category: 'Planning',
    tags: ['Chinese', 'Skills', 'Reference'],
  },
];

export const getSkillsByCategory = (category: string): ClaudeSkill[] => {
  if (category === 'All') return claudeSkills;
  return claudeSkills.filter(s => s.category === category);
};
