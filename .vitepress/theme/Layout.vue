<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const DefaultLayout = DefaultTheme.Layout
const OrbitEmbed = defineAsyncComponent(() => import('./components/OrbitEmbed.vue'))
const SiteBackToTop = defineAsyncComponent(() => import('./components/SiteBackToTop.vue'))
const { frontmatter } = useData()
const isOrbitEmbed = computed(() => frontmatter.value.layout === 'orbit-embed')
const orbitLocale = computed(() => frontmatter.value.orbitLocale === 'en' ? 'en' : 'zh')
</script>

<template>
  <OrbitEmbed v-if="isOrbitEmbed" :locale="orbitLocale" />
  <DefaultLayout v-else>
    <template #layout-bottom>
      <SiteBackToTop />
    </template>
  </DefaultLayout>
</template>
