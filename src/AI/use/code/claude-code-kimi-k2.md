# 国内用Claude Code的Kimi K2方案

> 当看到Kimi K2兼容Claude接口的时候，我是不太明白的。可后来看到个别宣传材料中有Claude Code用Kimi K2，我就完全悟了

## 申请API Key

免费用户应该有15元试用额度，在[Moonshot AI - 开放平台](https://platform.moonshot.cn/playground)登录后去[API Key 管理](https://platform.moonshot.cn/console/api-keys)，得到自己的API Key

## Claude Code

安装前置需求node，版本18或更高版本。新手直接去[node官网](https://nodejs.org/en)下载带LTS版本就行了，先上手了再说。安装后在命令行粘贴并回车：

```shell
npm install -g  @anthropic-ai/claude-code
```

### Claude Code配置

先在终端进一次`claude`，确保在用户目录下存在`.claude.json`，即`~/.claude.json`：

```
claude
```

> `~/`是什么。怎么打开`~/.claude.json`
>
> `~`就是你当前用户目录，比方说我的用户名叫`gan`，在mac跟Linux的用户目录是`/home/gan/`，在Windows的用户目录是`C:\Users\gan`（系统盘是C盘的话）
>
> 在mac上可以用`open ~/.claude.json`打开，在Windows上用`notepad $env:USERPROFILE\.claude.json`。Linux高手自求多福（也许是nano，也许是自学vim）

用你喜欢的方式打开`~/.claude.json`，将第三行（`autoUpdates`开始那行）删掉，复制粘贴下面

```json
{
  "installMethod": "unknown",
  "autoUpdates": false,
  "hasCompletedOnboarding": true,
  "env": {
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": 8192,
    "ANTHROPIC_BASE_URL": "https://api.moonshot.cn/anthropic/",
    "ANTHROPIC_API_KEY": "YOUR_API_KEY_HERE"
  }
  //...
}
```

保存配置，退出Claude Code（两次ctrl+C）后，重进：

```
claude
```

会检测到自定义API，默认是No（不接受），这里当然按上键再enter，选择Yes。

后续再选几个选项就能使用了

### 429错误

不影响使用，一般是限额问题，免费用户并发不够相关

## 其他选用方案

### 在`~/.claude/setting.json`中修改环境变量

虽然在“Claude Code配置”一节配置成功了环境变量，但是运行后该配置不见了。它跑到`~/.claude/setting.json`中去，大概是这样：

```json
{
  "env": {
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": 8192,
    "ANTHROPIC_BASE_URL": "https://api.moonshot.cn/anthropic/",
    "ANTHROPIC_API_KEY": "sk-..."
  }
}
```

后续想改，就更改这个文件即可，可以参考[Claude Code文档中的环境变量](https://docs.anthropic.com/en/docs/claude-code/settings#environment-variables)，[中文版](https://docs.anthropic.com/zh-CN/docs/claude-code/settings#环境变量)

### 系统环境变量临时配置API_KEY

需要配置环境变量，自行替换`YOUR_API_KEY_HERE`

Linux跟Mac：

```sh
export ANTHROPIC_BASE_URL=https://api.moonshot.cn/anthropic/
export ANTHROPIC_API_KEY=YOUR_API_KEY_HERE
```

Windows powershell:

```powershell
$env:ANTHROPIC_BASE_URL = "https://api.moonshot.cn/anthropic/"
$env:ANTHROPIC_API_KEY = "YOUR_API_KEY_HERE"
```

> 注意目前每次进入新命令行都要输一次环境变量。如想避免这点，后续可以加入到命令行启动加载的配置文件，