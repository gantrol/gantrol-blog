import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './site.css'

type DeferredScriptWindow = Window & {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number
}

function appendScript(id: string, src: string, crossOrigin?: string) {
    if (document.getElementById(id)) return

    const script = document.createElement('script')
    script.id = id
    script.async = true
    script.src = src
    if (crossOrigin) script.crossOrigin = crossOrigin
    document.head.append(script)
}

function loadThirdPartyScripts() {
    const browserWindow = window as DeferredScriptWindow
    browserWindow.dataLayer ??= []
    browserWindow.gtag ??= (...args: unknown[]) => browserWindow.dataLayer?.push(args)
    browserWindow.gtag('js', new Date())
    browserWindow.gtag('config', 'G-0P7S4MY6FW')

    appendScript(
        'gantrol-google-analytics',
        'https://www.googletagmanager.com/gtag/js?id=G-0P7S4MY6FW'
    )
    appendScript(
        'gantrol-google-adsense',
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4459589195034801',
        'anonymous'
    )
}

function scheduleThirdPartyScripts() {
    const scheduleIdleLoad = () => {
        window.setTimeout(() => {
            const browserWindow = window as DeferredScriptWindow
            if (browserWindow.requestIdleCallback) {
                browserWindow.requestIdleCallback(loadThirdPartyScripts, { timeout: 3000 })
            } else {
                loadThirdPartyScripts()
            }
        }, 1500)
    }

    if (document.readyState === 'complete') {
        scheduleIdleLoad()
    } else {
        window.addEventListener('load', scheduleIdleLoad, { once: true })
    }
}

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp() {
        if (typeof window !== 'undefined') scheduleThirdPartyScripts()
    }
}
