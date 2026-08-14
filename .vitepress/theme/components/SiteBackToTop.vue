<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const { page } = useData()
const visible = ref(false)

const label = computed(() => page.value.relativePath.startsWith('en/') ? 'Back to top' : '回到顶部')

function updateVisibility() {
  visible.value = window.scrollY > 520
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisibility)
})

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition name="back-to-top">
    <button
      v-show="visible"
      class="site-back-to-top"
      type="button"
      :aria-label="label"
      :title="label"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.5 10.5 12 5l5.5 5.5M12 5v14" />
      </svg>
      <span>{{ label }}</span>
    </button>
  </Transition>
</template>
