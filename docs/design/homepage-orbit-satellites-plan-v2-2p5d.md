# Orbit Satellites 2.5D 视觉稿 V2

这是完整轨道版的视觉探索稿。相较 V1，重点从“散落的作品节点”升级为一个完整、闭合、有前后景深关系的轨道仪器。

## 设计稿

- [完整轨道 2.5D 桌面稿](./homepage-orbit-satellites-desktop-v2-2p5d.png)

## 视觉方向

页面整体仍是暖白编辑型个人主页，但 Hero 右侧加入一个偏 2.5D 的“轨道观测仪”：

- 中央是新版指南针头像，放在轻微抬高的圆形基座上。
- 三条完整闭合椭圆轨道围绕中心旋转，必须从头到尾可见。
- 轨道使用暖灰与香槟金属色，强调线条、交叠和透视，不使用霓虹色。
- 六个作品节点是有厚度的白色/暖银色圆牌，拥有轻微倒角、边缘高光和有限投影。
- 节点按前景、中景、后景分层：前景节点更大更清晰，后景节点更小更淡。
- `aicando.xyz` 是当前激活节点，用细珊瑚色光环和从指南针指向它的短射线标记。
- 轨道后方可有半透明校准圆盘、十字基准线和微小刻度，但不做 HUD 面板或科幻背景。

## 作品节点

| 展示名 | URL | 视觉处理 |
| --- | --- | --- |
| aicando.xyz | `https://aicando.xyz/` | 激活态珊瑚光环 |
| 模型纪年 | `https://timeline.aicando.xyz/` | 中性暖银圆牌 |
| Agent Controller | `https://github.com/gantrol/AgentController` | 中性暖银圆牌 |
| MarkdownCanDo | `https://github.com/gantrol/MarkdownCanDo` | 中性暖银圆牌 |
| AIY | `https://github.com/gantrol/aiy-desktop` | 中性暖银圆牌 |
| 泡泡 | `https://github.com/gantrol/paopao-desktop` | 中性暖银圆牌 |

正式实现时，优先使用真实项目 Logo 或简洁文字缩写，不让图像模型伪造品牌图形。

## 动态指针状态

- 默认状态：指南针保持一个安静的初始角度，轨道不自动旋转。
- 光标进入轨道区域：依据光标相对于轨道中心的角度，指针平滑转向最近卫星。
- 光标靠近某个卫星：该卫星变为珊瑚高亮，指针和细射线吸附到它。
- 光标离开：高亮与射线淡出，指针回到默认角度。
- 作品节点仍使用真实 `<a>`，动态效果只服务于指引，不替代链接本身。

```css
--orbit-line: #c8c2b8;
--orbit-metal: #b9a37b;
--orbit-highlight: #fffefb;
--orbit-depth-shadow: 0 14px 28px -18px rgb(38 35 32 / 35%);
--orbit-transition: 220ms cubic-bezier(.2, 0, 0, 1);
```

## 2.5D 实现边界

- 可以使用 CSS `transform: rotateX() rotateY() rotateZ()`、椭圆轨道 SVG 和 z-index 分层实现，不需要 WebGL。
- 轨道必须是闭合 SVG path/ellipse，前后段通过遮挡、线宽和 opacity 表现景深。
- 中心头像本身保持 SVG 原样；只旋转内部指针层，不旋转外圈和白色底盘。
- 仅基座与卫星圆牌允许有限阴影；页面其他静态内容无阴影。
- 移动端隐藏 2.5D 轨道，改为横向作品 Logo 列表；点击节点时短暂转向，避免依赖 hover。
- `prefers-reduced-motion: reduce` 时不旋转，只保留激活边框和焦点状态。

## 页面其余区域

下方继续使用原设计系统：

- `内容方向`：软件工程、AI探索、心理爱好三列，使用垂直分隔线。
- `历史热门`：AI TOP 1、热爱开源，引爆Deepseek、怎样成为一个“干大事”的人。
- 背景 `#F8F7F3`，表面 `#FFFEFB`，文字 `#262320`，边界 `#DEDAD2`，品牌珊瑚 `#FB7370`。

这张图是视觉方向稿；生产页面中的中文、Logo、URL 和无障碍标签必须由 HTML/SVG/CSS 真实渲染。
