<script setup lang="ts">
import GantrolHome from './GantrolHome.vue'
import type { HomeLocale } from '../home-content'

withDefaults(defineProps<{ locale?: HomeLocale }>(), {
  locale: 'zh'
})
</script>

<template>
  <div class="orbit-embed">
    <GantrolHome :locale="locale" />
  </div>
</template>

<style scoped>
.orbit-embed {
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100svh;
  overflow: hidden;
  padding: 8px;
  background: #f8f7f3;
}

:global(.dark) .orbit-embed {
  background: #181715;
}

.orbit-embed :deep(.gantrol-home) {
  width: 100%;
  min-height: 0;
  background: transparent;
}

.orbit-embed :deep(.hero-copy),
.orbit-embed :deep(.home-section) {
  display: none;
}

.orbit-embed :deep(.home-hero) {
  display: block;
  width: 100%;
  min-height: 0;
  padding: 0;
}

.orbit-embed :deep(.project-orbit-figure) {
  width: min(760px, calc(100vw - 16px), calc((100svh - 16px) * 1.35));
  margin: 0 auto;
}

.orbit-embed :deep(.project-orbit) {
  min-height: 0;
  aspect-ratio: 680 / 480 !important;
}

.orbit-embed :deep(.project-orbit-figure figcaption) {
  margin-top: -4px;
}
</style>
