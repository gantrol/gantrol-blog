<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import SiteBackToTop from './components/SiteBackToTop.vue'

const DefaultLayout = DefaultTheme.Layout
</script>

<template>
  <DefaultLayout>
    <template #layout-bottom>
      <SiteBackToTop />
    </template>
  </DefaultLayout>
</template>
