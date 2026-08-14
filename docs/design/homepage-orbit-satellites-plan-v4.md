# 首页轨道方案 V4：本地真实 Logo

## 视觉稿

- [桌面视觉稿](./homepage-orbit-satellites-desktop-v4-local-logos.png)

## 本轮确定项

- 轨道保持一条完整闭合椭圆，以前后遮挡表达轻微 2.5D。
- 中央继续使用 Gantrol 指南针头像，指针可在实现时跟随光标并吸附最近作品。
- 六个作品节点必须使用各项目的本地真实 Logo，不使用字母占位或生成的假 Logo。
- Logo 保留各自原色，首页珊瑚色只用于激活节点边框、按钮与交互反馈。
- “内容方向”不用编号，改用三枚统一风格的圆润线性图标。
- `01 / 02 / 03` 只属于“历史热门”。

## 作品节点

本地绝对路径、源项目和公开链接记录在被 Git 忽略的 `docs/.local/homepage-project-assets.md`，不进入版本控制。

生产实现应将已确认的 Logo 复制到本站独立的公开资源目录，以明确文件名引用；不得在运行时直接读取其他本地项目路径。

## 内容方向图标

三枚图标统一使用 24×24 或 28×28 viewBox、约 1.75px 圆角线条，放入 40–44px 的浅珊瑚圆底：

- 软件工程：代码窗口 + 小齿轮。
- AI探索：四角星芒 + 两个小节点。
- 心理爱好：圆润脑形 + 小爱心；右侧显示 `施工中`。

图标用于视觉识别，不替代标题；正式实现优先使用内联 SVG，以保证线宽、颜色和缩放一致。

## 历史热门

仅此区域使用数字编号：

1. `01` — `AI TOP 1`
2. `02` — `热爱开源，引爆Deepseek`
3. `03` — `怎样成为一个“干大事”的人`

编号使用珊瑚色，标题使用正文墨色；不显示日期，不标记为最近更新。

## 设计令牌补充

```css
--direction-icon-size: 42px;
--direction-icon-bg: #fff0ec;
--direction-icon-fg: #fb7370;
--direction-icon-stroke: 1.75px;

--project-node-size: 56px;
--project-node-bg: #fffefb;
--project-node-border: #dedad2;
--project-node-active: #fb7370;
--project-logo-size: 34px;

--popular-index: #fb7370;
```

视觉稿用于确认构图；真实 Logo、文字和链接必须由 HTML/SVG/CSS 直接渲染。
