import { spawn } from 'node:child_process'
import { statSync } from 'node:fs'
import { access, mkdir, mkdtemp, rm, stat } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { delimiter, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright-core'

const scriptDir = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(scriptDir, '..')

const defaults = {
  output: 'src/public/images/profile/projects-orbit-en.gif',
  width: 720,
  height: 536,
  fps: 10,
  hold: 800,
  maxColors: 128,
  theme: 'light',
  url: null
}

function printHelp() {
  console.log(`Record the English project orbit as a looping GIF.

Usage:
  npm run record:projects-gif
  npm run record:projects-gif -- --output path/to/orbit.gif
  npm run record:projects-gif -- --url https://www.gantrol.com/en/embed/projects

Options:
  --output <path>       GIF output path (default: ${defaults.output})
  --url <url>           Record an existing URL instead of starting VitePress
  --width <pixels>      Viewport width (default: ${defaults.width})
  --height <pixels>     Viewport height (default: ${defaults.height})
  --fps <number>        GIF frames per second (default: ${defaults.fps})
  --hold <milliseconds> Time to show each project (default: ${defaults.hold})
  --max-colors <number> GIF palette size, 32-256 (default: ${defaults.maxColors})
  --theme <light|dark>  Browser color scheme (default: ${defaults.theme})
  --help                Show this message

Environment overrides:
  CHROME_PATH           Chrome/Chromium executable
  FFMPEG_PATH           ffmpeg executable
`)
}

function parseArguments(argv) {
  const options = { ...defaults }
  const names = {
    '--output': 'output',
    '--url': 'url',
    '--width': 'width',
    '--height': 'height',
    '--fps': 'fps',
    '--hold': 'hold',
    '--max-colors': 'maxColors',
    '--theme': 'theme'
  }

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index]
    if (argument === '--help' || argument === '-h') {
      printHelp()
      process.exit(0)
    }

    const [name, inlineValue] = argument.split('=', 2)
    const key = names[name]
    if (!key) throw new Error(`Unknown option: ${argument}`)

    const value = inlineValue ?? argv[++index]
    if (value == null || value.startsWith('--')) {
      throw new Error(`Missing value for ${name}`)
    }

    options[key] = ['width', 'height', 'fps', 'hold', 'maxColors'].includes(key)
      ? Number(value)
      : value
  }

  for (const key of ['width', 'height', 'fps', 'hold', 'maxColors']) {
    if (!Number.isFinite(options[key]) || options[key] <= 0) {
      throw new Error(`${key} must be a positive number`)
    }
  }
  if (options.maxColors < 32 || options.maxColors > 256) {
    throw new Error('maxColors must be between 32 and 256')
  }
  if (!['light', 'dark'].includes(options.theme)) {
    throw new Error('theme must be either light or dark')
  }

  options.width = Math.round(options.width)
  options.height = Math.round(options.height)
  options.fps = Math.round(options.fps)
  options.hold = Math.round(options.hold)
  options.maxColors = Math.round(options.maxColors)
  options.output = resolve(projectRoot, options.output)

  return options
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile()
  } catch {
    return false
  }
}

function executableFromPath(names) {
  const pathEntries = (process.env.PATH ?? '').split(delimiter).filter(Boolean)
  const extensions = process.platform === 'win32'
    ? (process.env.PATHEXT ?? '.EXE;.CMD;.BAT').split(';')
    : ['']

  for (const directory of pathEntries) {
    for (const name of names) {
      for (const extension of extensions) {
        const candidate = join(directory, `${name}${extension}`)
        try {
          if (requireFile(candidate)) return candidate
        } catch {
          // Continue to the next candidate.
        }
      }
    }
  }
  return null
}

function requireFile(path) {
  try {
    return Boolean(path && statSync(path).isFile())
  } catch {
    return false
  }
}

async function findBrowserExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    ...(process.platform === 'win32'
      ? [
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
          'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
          'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
        ]
      : process.platform === 'darwin'
        ? [
            '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
          ]
        : [
            '/usr/bin/google-chrome',
            '/usr/bin/google-chrome-stable',
            '/usr/bin/chromium',
            '/usr/bin/chromium-browser'
          ])
  ].filter(Boolean)

  for (const candidate of candidates) {
    if (await isFile(candidate)) return candidate
  }

  throw new Error('Chrome or Edge was not found. Set CHROME_PATH to the browser executable.')
}

async function findFreePort() {
  const { createServer } = await import('node:net')
  return new Promise((resolvePort, reject) => {
    const server = createServer()
    server.unref()
    server.on('error', reject)
    server.listen(0, '127.0.0.1', () => {
      const address = server.address()
      const port = typeof address === 'object' && address ? address.port : null
      server.close((error) => {
        if (error) reject(error)
        else if (port == null) reject(new Error('Unable to allocate a local port'))
        else resolvePort(port)
      })
    })
  })
}

async function waitForPage(url, server, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    if (server.exitCode != null) {
      throw new Error(`VitePress exited before ${url} became available (code ${server.exitCode})`)
    }
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // The development server is still starting.
    }
    await new Promise((resolveWait) => setTimeout(resolveWait, 250))
  }
  throw new Error(`Timed out waiting for ${url}`)
}

async function startVitePress() {
  const port = await findFreePort()
  const vitepressBin = resolve(projectRoot, 'node_modules/vitepress/bin/vitepress.js')
  await access(vitepressBin)

  const server = spawn(
    process.execPath,
    [vitepressBin, '--host', '127.0.0.1', '--port', String(port)],
    {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true
    }
  )

  let serverOutput = ''
  for (const stream of [server.stdout, server.stderr]) {
    stream.setEncoding('utf8')
    stream.on('data', (chunk) => {
      serverOutput = `${serverOutput}${chunk}`.slice(-8_000)
    })
  }

  const url = `http://127.0.0.1:${port}/en/embed/projects`
  try {
    await waitForPage(url, server)
  } catch (error) {
    server.kill()
    throw new Error(`${error.message}\n${serverOutput.trim()}`)
  }

  return { server, url }
}

async function waitForAssets(page) {
  await page.evaluate(async () => {
    await document.fonts.ready
    const pendingImages = Array.from(document.images, (image) => {
      if (image.complete && image.naturalWidth > 0) return Promise.resolve()
      return new Promise((resolveImage, rejectImage) => {
        image.addEventListener('load', resolveImage, { once: true })
        image.addEventListener('error', () => rejectImage(new Error(`Failed to load ${image.src}`)), { once: true })
      })
    })
    await Promise.all(pendingImages)
  })
}

async function recordFrames(page, frameDir, options) {
  const frameDelay = 1_000 / options.fps
  let frameNumber = 0

  async function captureFor(durationMs) {
    const count = Math.max(1, Math.round(durationMs / frameDelay))
    for (let index = 0; index < count; index += 1) {
      const name = `frame-${String(frameNumber).padStart(4, '0')}.png`
      await page.screenshot({ path: join(frameDir, name), animations: 'allow' })
      frameNumber += 1
      if (index < count - 1) await page.waitForTimeout(frameDelay)
    }
  }

  await captureFor(600)

  const projects = page.locator('.satellite-link')
  const projectCount = await projects.count()
  if (projectCount === 0) throw new Error('No project links were found on the English embed page')

  for (let index = 0; index < projectCount; index += 1) {
    // Orbit nodes never become "stable" because their positions animate continuously.
    await projects.nth(index).hover({ force: true })
    await captureFor(options.hold)
  }

  await page.mouse.move(1, 1)
  await captureFor(500)

  return frameNumber
}

async function encodeGif(frameDir, output, options) {
  const ffmpeg = process.env.FFMPEG_PATH || executableFromPath(['ffmpeg']) || 'ffmpeg'
  await mkdir(dirname(output), { recursive: true })

  const filter = [
    '[0:v]split[palette-source][gif-source]',
    `[palette-source]palettegen=max_colors=${options.maxColors}:stats_mode=diff[palette]`,
    '[gif-source][palette]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle'
  ].join(';')

  const args = [
    '-hide_banner',
    '-loglevel', 'error',
    '-y',
    '-framerate', String(options.fps),
    '-i', join(frameDir, 'frame-%04d.png'),
    '-filter_complex', filter,
    '-loop', '0',
    output
  ]

  await new Promise((resolveEncode, reject) => {
    const encoder = spawn(ffmpeg, args, {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true
    })
    let outputText = ''
    for (const stream of [encoder.stdout, encoder.stderr]) {
      stream.setEncoding('utf8')
      stream.on('data', (chunk) => {
        outputText = `${outputText}${chunk}`.slice(-8_000)
      })
    }
    encoder.on('error', (error) => {
      reject(new Error(`Unable to run ffmpeg. Install it or set FFMPEG_PATH.\n${error.message}`))
    })
    encoder.on('exit', (code) => {
      if (code === 0) resolveEncode()
      else reject(new Error(`ffmpeg exited with code ${code}\n${outputText.trim()}`))
    })
  })
}

async function main() {
  const options = parseArguments(process.argv.slice(2))
  const frameDir = await mkdtemp(join(tmpdir(), 'gantrol-projects-gif-'))
  let browser
  let server

  try {
    let targetUrl = options.url
    if (!targetUrl) {
      const local = await startVitePress()
      server = local.server
      targetUrl = local.url
    }

    const browserExecutable = await findBrowserExecutable()
    browser = await chromium.launch({ executablePath: browserExecutable, headless: true })
    const context = await browser.newContext({
      viewport: { width: options.width, height: options.height },
      deviceScaleFactor: 1,
      colorScheme: options.theme,
      locale: 'en-US',
      reducedMotion: 'no-preference'
    })
    const page = await context.newPage()

    console.log(`Recording ${targetUrl}`)
    await page.goto(targetUrl, { waitUntil: 'networkidle' })
    await page.locator('main[lang="en"]').waitFor({ state: 'visible' })
    await waitForAssets(page)

    const caption = await page.locator('.project-orbit-figure figcaption').innerText()
    if (!caption.includes('Public projects')) {
      throw new Error(`Expected English project content, received: ${caption}`)
    }

    const frameCount = await recordFrames(page, frameDir, options)
    await encodeGif(frameDir, options.output, options)
    const { size } = await stat(options.output)

    console.log(`Wrote ${options.output}`)
    console.log(`${frameCount} frames, ${(size / 1024 / 1024).toFixed(2)} MiB`)
  } finally {
    await browser?.close()
    server?.kill()
    await rm(frameDir, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
