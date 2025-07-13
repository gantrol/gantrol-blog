# Using Kimi K2 with Claude Code in China

> When I first saw that Kimi K2 was compatible with the Claude API, I didn't quite get it. But then I saw some promotional materials showing Claude Code being used with Kimi K2, and it all clicked.

## Applying for an API Key

Log in to the [Moonshot AI - Open Platform](https://platform.moonshot.ai/playground), go to [API Key Management](https://platform.moonshot.cn/console/api-keys), and get your API Key.

## Claude Code

The prerequisite is to install Node.js, version 18 or higher(Windows Need to install [Git](https://git-scm.com/downloads/win)). Beginners can just go to the [official Node.js website](https://nodejs.org/en) and download the LTS version to get started. After installation, paste the following into your command line and press Enter:

```shell
npm install -g  @anthropic-ai/claude-code
```

### Claude Code Configuration

First, run `claude` once in your terminal to ensure that the `.claude.json` file is created in your user directory, i.e., `~/.claude.json`:

```
claude
```

> **What is `~/`? How do I open `~/.claude.json`?**
>
> `~` refers to your current user directory. For example, if my username is `gan`, the user directory on macOS and Linux is `/home/gan/`, and on Windows, it's `C:\Users\gan` (if your system is on the C: drive).
>
> On macOS, you can open it with `open ~/.claude.json`. On Windows, use `notepad $env:USERPROFILE\.claude.json`. Advanced Linux users, you're on your own (perhaps use nano, or teach yourself vim).

Open `~/.claude.json` with your preferred editor, delete the third line (the one starting with `autoUpdates`), and paste the following:

```json
{
  "installMethod": "unknown",
  "autoUpdates": false,
  "hasCompletedOnboarding": true,
  "env": {
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": 8192,
    "ANTHROPIC_BASE_URL": "https://api.moonshot.ai/anthropic/",
    "ANTHROPIC_API_KEY": "YOUR_API_KEY_HERE"
  }
  //...
}
```

Save the configuration, exit Claude Code (press Ctrl+C twice), and then run it again:

```
claude
```

It will detect a custom API and default to "No" (do not accept). Press the up arrow key and then Enter to select "Yes".

After that, you can select a few more options and start using it.

### 429 Error

This does not affect usage and is typically a rate limit issue, often related to insufficient concurrency for tier-1 users.

## Other Optional Methods

### Modifying Environment Variables in `~/.claude/setting.json`

Although we successfully configured the environment variables in the "Claude Code Configuration" section, this configuration disappears after the program runs. It gets moved to `~/.claude/setting.json`, looking something like this:

```json
{
  "env": {
    "CLAUDE_CODE_MAX_OUTPUT_TOKENS": 8192,
    "ANTHROPIC_BASE_URL": "https://api.moonshot.ai/anthropic/",
    "ANTHROPIC_API_KEY": "sk-..."
  }
}
```

If you need to make changes later, you can edit this file. You can refer to the [Environment Variables section in the Claude Code documentation](https://docs.anthropic.com/en/docs/claude-code/settings#environment-variables) ([Chinese version](https://docs.anthropic.com/zh-CN/docs/claude-code/settings#环境变量)).

### Temporarily Configuring the API_KEY with System Environment Variables

You need to configure environment variables. Replace `YOUR_API_KEY_HERE` with your actual key.

For Linux and macOS:

```sh
export ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic/
export ANTHROPIC_API_KEY=YOUR_API_KEY_HERE
```

For Windows PowerShell:

```powershell
$env:ANTHROPIC_BASE_URL = "https://api.moonshot.ai/anthropic/"
$env:ANTHROPIC_API_KEY = "YOUR_API_KEY_HERE"
```

> Note: With this method, you currently need to set these environment variables every time you open a new terminal session. To avoid this, you can add them to your shell's startup configuration file.