# Book 阅读体验与 SEO 修订

本次以 draft PR 交付，不合并或手动部署。

## 阅读行为

- Book 首页采用封面、序言、纸页目录；五章均保留普通链接。章节页服务端输出完整正文，客户端仅改变排版位置，不按当前页删去文本。
- 960px 以上双页，较窄屏幕单页。页数由实际排版测量，字号、字体加载和窗口变化后重新计算；页码随窗口变化，不作为固定印刷页码。
- 提供前后页、页码选择、小节目录、前后章和连续阅读。阅读器获焦点时支持左右键及 Home / End；输入框、选择器、正文链接和选中文字时不抢占这些键。
- 动效仅为装饰副本，移除重复 ID，设为 inert 和 aria-hidden。系统减少动画偏好优先，也能手动关闭。打印强制完整连续正文。没有 JavaScript 时仍能阅读全部正文和章节链接。
- 文字可选择、复制；浏览器全文查找建议先切连续阅读。纸页没有加入拖拽手势，避免妨碍手机滚动及选字。
- Book 路由收起悬浮推广和回顶按钮，保留网站页尾；全站导航改为较宽屏幕才展开，避免平板菜单挤压。

## SEO 修复

- [Next.js redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects) 的 host 条件仅匹配裸域，308 到 `https://www.nicoles.garden`，保留路径、查询及方法。预览域名和 localhost 不重定向；未更改域名账户配置。
- 各页面的 title、description、canonical 与分享信息进入服务端初始 HTML，删除客户端反复改写 head 的副作用。缺失的博客、项目和技能页返回真实404。带冒号的现有 GSD 技能名按路由编码解析，已逐一检查。
- 新默认分享图为本站文字品牌卡，替换打赏二维码；文章/项目封面和书签页专用分享图保留。没有编造新肖像、经历或翻译。
- 动态 sitemap 从现有章节、博客、项目、技能、产业链和已知行情标识生成，共216个唯一 canonical URL。补入 Book 和 Learn；移除过期 slug 和重复 URL，不编造修改日期。`/thinking/arti-benchmark` 保持可访问，canonical 指向相同正文的 `/work/arti-benchmark`。
- 私人 reading-room 的 noindex/nofollow/noarchive 与 no-referrer 头保持原样；不加入 sitemap。API 和 iframe 实现文档不加入 sitemap，三个固定 iframe 文档声明对应阅读页面为 canonical。
- 默认界面语言仍为英文；语言切换同步 html lang。中文书稿、文章与中文内容区域明确标记；课程按实际语言和现有内容标记。没有给同一网址的语言切换虚构独立 hreflang 页面。
- 参考 [Google canonical 指南](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) 和 [sitemap 指南](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)。站点地图和 canonical 是发现及规范化信号，不保证收录或排名。

## 实际验证

- `node --experimental-strip-types --test src/lib/book-reading.test.mjs`：5项通过，覆盖短章、奇数页、浮点排版、尺寸变化边界、代码围栏内标题和减少动画条件。
- `npm run build`：通过。`npm run lint`：通过，4处既有警告（SurvivalGame、Lightbox、useSubstackContent 两处）。
- `tsc --noEmit --pretty false`：29个既有错误；与最新 main 的独立快照完整诊断输出相同，无新增诊断。构建沿用仓库原有忽略类型错误设置，不把构建成功称为类型检查通过。
- `node scripts/check-book.mjs http://127.0.0.1:3134`：五章 frontmatter、链接结构、材料相对链接及服务端全文比对通过。
- `node scripts/check-public-pages.mjs http://127.0.0.1:3134`：216条 sitemap 唯一性与排除项通过；204个本地 HTML 页面返回200且只有正确 canonical，标题分享信息存在。12个需取实时行情的产业链路由未做批量 HTTP 抓取，避免测试访问行情源；它们的路径来自实际链条定义，构建已生成链条路径。
- 同一 HTTP 检查覆盖不存在资源的404、www/apex/预览 host、308路径查询保留、robots、私有路径头、默认分享图200与 PNG 类型。
- 实际浏览器检查桌面1280px、768px中屏、390px与320px窄屏、双页/单页、前后页及首末页、页码和小节跳转、字号调整、连续阅读、相邻章节与夜间模式。未见横向溢出。修正了键盘聚焦后文来源链接时浏览器额外横向滚动的问题，最终生产构建中确认 scrollLeft 为0且链接可见。
- 系统减少动画的逻辑和样式已检查并有单元覆盖，手动关闭动效实际操作通过；没有为测试改变操作系统偏好。浏览器检查不等同于完整辅助技术认证。

## 后续边界

PR 预览和检查结果以精确 head 为准。本稿未合并，不能据此声称生产站已更新。上线后还应核对托管平台域名绑定及生产跳转，并在有权限的 Search Console 提交 www sitemap、观察索引与 Google 选择的 canonical；本次未进入或修改账户配置。

现有若干工具依赖 iframe 与实时数据，完整内容翻译和无 JavaScript 的工具交互需要独立产品工作。本次未擅自改写其功能，也未提高独立 `public/careers.html` 的导航或索引可发现性。保留现有公开路径及索引策略。
