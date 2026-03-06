export const t = {
  en: {
    // Nav
    nav: {
      home: 'Home',
      journal: 'Journal',
      skills: 'Skills',
      partnerLinks: 'Partner Links',
      contact: 'Contact',
      buyCoffee: 'Buy Me a Coffee',
      scanToTip: 'Scan with WeChat to tip',
    },

    // Home
    home: {
      tagline: 'Product Manager · Builder · AI Explorer',
      heroIntro: 'A digital garden where product thinking, hands-on building, and AI-driven creativity converge to shape what comes next.',
      aboutLabel: 'About',
      aboutTitle: 'About My Work',
      biography: 'Nicole is a product manager and builder who thrives at the intersection of strategy, design, and technology. With experience shipping products from zero to one and a deep curiosity for AI-powered tools, she combines analytical rigor with creative intuition to craft experiences that truly resonate with users.',
      workLabel: 'Work',
      featuredProjects: 'Featured Projects',
      featuredSub: 'A selection of recent work',
      viewAll: 'View All Projects',
      gardenTitle: 'From the Garden',
      gardenSub: 'Thoughts on AI & the world',
      readAll: 'Read All Articles',
    },

    // Skills / Portfolio
    skills: {
      pageTitle: 'Skills',
      pageSub: 'Projects, repositories, and use cases',
      githubTitle: 'GitHub Repositories',
      useCasesTitle: 'Use Cases',
      claudeSkillsTitle: 'Claude Skills',
      guideTitle: 'What are Skills?',
      guideBody: 'Skills are reusable AI workflows for Claude Code. Trigger any skill by typing',
      guideBodyMid: 'in your conversation — Claude will activate the specialized workflow automatically. Click any skill card below to see full details and usage instructions.',
    },

    // Skill Detail
    skillDetail: {
      back: 'Back to Skills',
      howToUse: 'How to use',
      howToUseBody: 'Type this command in',
      howToUseBodyMid: 'to activate the skill. You can also describe what you want to do and Claude will suggest the right skill automatically.',
      whenToTrigger: 'When to trigger',
    },
  },

  zh: {
    // Nav
    nav: {
      home: '首页',
      journal: '日志',
      skills: '技能',
      partnerLinks: '合作伙伴',
      contact: '联系我',
      buyCoffee: '请我喝杯咖啡',
      scanToTip: '微信扫码打赏',
    },

    // Home
    home: {
      tagline: '产品经理 · 构建者 · AI 探索者',
      heroIntro: '一个数字花园，产品思维、动手实践与 AI 创意在这里交汇，共同塑造未来。',
      aboutLabel: '关于',
      aboutTitle: '关于我的工作',
      biography: 'Nicole 是一位产品经理和构建者，活跃于战略、设计与技术的交汇处。她拥有从零到一的产品交付经验，对 AI 工具保持深度好奇，将分析严谨与创意直觉结合，打造真正触动用户的体验。',
      workLabel: '作品',
      featuredProjects: '精选项目',
      featuredSub: '近期代表作品',
      viewAll: '查看全部项目',
      gardenTitle: '来自花园',
      gardenSub: '关于 AI 与世界的思考',
      readAll: '阅读全部文章',
    },

    // Skills / Portfolio
    skills: {
      pageTitle: '技能',
      pageSub: '项目、代码库与使用案例',
      githubTitle: 'GitHub 仓库',
      useCasesTitle: '使用案例',
      claudeSkillsTitle: 'Claude Skills',
      guideTitle: '什么是 Skills？',
      guideBody: 'Skills 是 Claude Code 的可复用 AI 工作流。输入',
      guideBodyMid: '即可触发对应工作流，Claude 会自动激活专项技能。点击下方任意卡片查看详情和使用说明。',
    },

    // Skill Detail
    skillDetail: {
      back: '返回技能列表',
      howToUse: '如何使用',
      howToUseBody: '在',
      howToUseBodyMid: '中输入该命令即可激活此技能。你也可以直接描述需求，Claude 会自动推荐合适的技能。',
      whenToTrigger: '适用场景',
    },
  },
} as const;

export type Translations = typeof t.en;
