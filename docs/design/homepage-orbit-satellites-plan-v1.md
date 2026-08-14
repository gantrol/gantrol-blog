# 首页 Orbit Satellites 方案 V1

这是基于 V2 暖中性设计系统的交互方向稿：中心指南针头像作为“计算机心理学”的视觉锚点，作品 Logo 以卫星节点环绕其周围。

## 视觉稿

- [桌面概念稿](./homepage-orbit-satellites-desktop-v1.png)
- 画面展示的是光标位于 `aicando.xyz` 卫星附近时的状态：中心指针朝向该节点，节点使用珊瑚色高亮。

## 页面组成

### Hero 左侧

- `黄健楸 · GANTROL`
- `计算机心理学`
- `写 AI 与软件，也用计算机理解人。`
- 主按钮：`阅读文章`
- 次链接：`GitHub ↗`

### Hero 右侧：卫星作品图

中心为新版指南针头像，外侧 2–3 条细暖灰椭圆轨道，六个作品节点分布在轨道上：

| 节点 | 展示名 | 跳转 |
| --- | --- | --- |
| 01 | aicando.xyz | `https://aicando.xyz/` |
| 02 | 模型纪年 | `https://timeline.aicando.xyz/` |
| 03 | Agent Controller | `https://github.com/gantrol/AgentController` |
| 04 | MarkdownCanDo | `https://github.com/gantrol/MarkdownCanDo` |
| 05 | AIY | `https://github.com/gantrol/aiy-desktop` |
| 06 | 泡泡 | `https://github.com/gantrol/paopao-desktop` |

节点只使用单色、几何化的项目缩写或已有 Logo；不放星标、下载量、价格或伪造产品截图。每个节点是一个完整的链接点击目标，触摸设备点击后直接打开项目。

### 内容方向

沿用 V2 的三列编辑式入口，不再用三行表格：

- 软件工程：`从理论到实践，从基础知识到创新思维，探索软件开发的无限可能`，链接 `/software/`。
- AI探索：`Prompt 辞典、AI·第一名、Deep Research，以及大模型理论与实践`，链接 `/AI/TOP1`。
- 心理爱好：`认知心理学，高效学习方法，决策理论，让思维更清晰`，显示 `施工中`。

## 指针跟随交互

### 桌面端

1. 读取轨道组件容器的 `getBoundingClientRect()`，得到中心点。
2. 在 `pointermove` 中计算光标相对于中心点的向量：`atan2(clientY - centerY, clientX - centerX)`。
3. 将指南针内部指针旋转到该角度；使用 CSS 变量传递角度，过渡 180–220ms，缓动 `cubic-bezier(.2, 0, 0, 1)`。
4. 找到距离光标最近的卫星节点；该节点增加珊瑚色边框，中心指针朝它吸附，而不是无限追逐光标。
5. 光标离开轨道区域后，指针回到默认朝向，所有卫星恢复中性边界。

推荐状态变量：

```ts
type OrbitState = {
  pointerAngle: number
  activeProject: string | null
  isPointerInside: boolean
}
```

### 移动端与无障碍

- 没有 hover 的设备不模拟自动旋转；节点保持静态分布。
- 点击卫星时可短暂旋转指针指向被点击节点，再打开链接。
- `prefers-reduced-motion: reduce` 时移除旋转过渡，只保留珊瑚色焦点边框。
- 每个节点使用真实 `<a>` 元素，拥有可见的键盘焦点和至少 44px 的点击区域。
- 旁边保留一份可访问的“作品列表”或 `aria-label`，确保轨道不是唯一入口。

## 令牌与限制

- 背景 `#F8F7F3`，表面 `#FFFEFB`，墨色 `#262320`，次要文字 `#6C665E`，边界 `#DEDAD2`，珊瑚 `#FB7370`。
- 轨道使用 `#DEDAD2` 的 1px 线；不使用霓虹、粒子、发光或科技网格。
- 中心头像沿用 `docs/design/assets/gantrol-avatar-v2.svg`，不从 PNG 裁切，也不重新绘制。
- 作品 Logo 不由 GPT Image 2 伪造；正式实现应优先使用项目自己的 favicon、Logo 或字母标记。
- 图像稿用于确认构图，真实中文和链接必须由网页文本与 HTML 渲染。
