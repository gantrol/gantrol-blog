<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import OrbitEmbed from './components/OrbitEmbed.vue'
import SiteBackToTop from './components/SiteBackToTop.vue'

const DefaultLayout = DefaultTheme.Layout
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
