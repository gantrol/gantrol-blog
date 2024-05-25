# 复制攻防第一轮：当用户可以“编辑”网页

第一轮不采用传统教程的风格，不会马上提供代码，而是给出问题与相关建议，期望读者先自行解决。理由在[之前的文章](./template#ReadVsWrite)中提到过：写代码比读代码难得多，读者不自己开始写，是学不会的。

现在，你需要通过浏览器插件，突破[防复制网页第一版](https://www.gantrol.com/software/WE/test/copy/version1)的限制，成功复制出网页内容。

核心思路是让用户可以编辑网页，然后用剪切绕过该网页对复制的限制。比方说，点击一下工具栏的图标，网站就变成可编辑的了。新手建议使用之前提到过的代码模板。

:::details 搜索关键词提示1
JavaScript 网页可编辑
:::

:::details 搜索关键词提示2
chrome scripting api
注意可以在官方文档网站搜索。
:::

:::details 相关文档
- [contenteditable | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/contenteditable)
- [chrome.scripting](https://developer.chrome.google.cn/docs/extensions/reference/api/scripting?hl=zh-cn)
:::

:::details 核心代码的参考实现
实现方式可以有很多种，不一定要完全一致。比方说，这里使用了`executeScript`调用函数的方式，你也可以用执行代码文件的方式；你觉得`contentEditable`不够，加个`designMode`也行。

```js
const pageEditable = (isEditable) => {
    document.body.contentEditable = isEditable;
}

chrome.scripting.executeScript({
  target: {
    tabId: tab.id,
    allFrames: true,
  },
  function: pageEditable,
  args: [text === 'ON']
});
```
:::

:::details 完整的`service_worker.js` 参考

同样的，这并不是唯一解。如果你真的自己做过，那么可以体会到短短的代码背后可能要付出怎样的精力。

```js
const on = 'ON';
const pageEditable = (isEditable) => {
    document.body.contentEditable = isEditable;
}

chrome.action.onClicked.addListener(async (tab) => {
    let text = await chrome.action.getBadgeText({ tabId: tab.id });

    if (text === on) {
        text = ''
    } else {
        text = on;
    }

    chrome.action.setBadgeText({ tabId: tab.id, text: text });

    const isEditable = text === on;

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id,
            allFrames: true,

        },
        function: pageEditable,
        args: [isEditable]
    });
});

```

:::

也许你也发现了，这样通过剪切绕过的方式，无法绕过[防复制网页第二版](https://www.gantrol.com/software/WE/test/copy/version1)的限制。

复制攻防第二轮就将解决这个问题。考虑到制作难度，第二轮将采用偏传统教程的方式，在第二轮的基础上，将第三轮作为练习。

顺带一提，由于实现思路有较大差异，第二轮会重新从模板开始，也不假设读者对`chrome.scripting`有所了解。如果你实在讨厌第一轮这种教学方式，也可以直接从第二轮开始读。
