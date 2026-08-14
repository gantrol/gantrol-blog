import DefaultTheme from 'vitepress/theme'
import GantrolHome from './components/GantrolHome.vue'
import Layout from './Layout.vue'
import './site.css'

export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        app.component('GantrolHome', GantrolHome)
    }
}
