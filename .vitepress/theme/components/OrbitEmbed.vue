<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { homeContent, type HomeContent, type HomeLocale } from '../home-content'

const props = withDefaults(defineProps<{ locale?: HomeLocale }>(), {
  locale: 'zh'
})

const content = computed<HomeContent>(() => homeContent[props.locale])
const projects = computed(() => content.value.projects)
type Project = HomeContent['projects'][number]

const orbitRef = ref<HTMLElement | null>(null)
const activeProjectId = ref<string | null>(null)
const needleRotation = ref(0)
const touchPreviewProjectId = ref<string | null>(null)
const blockedTouchClickId = ref<string | null>(null)
const orbitProgress = ref(0)
const orbitWidth = ref(680)

const ORBIT_DURATION_MS = 120_000
const ORBIT_RADIUS_X = 42
const ORBIT_RADIUS_Y = 33

const initialProjectPositions: Record<string, { x: number; y: number }> = {
  timeline: { x: 22, y: 19 },
  aicando: { x: 70, y: 13 },
  'agent-controller': { x: 91, y: 45 },
  paopao: { x: 75, y: 82 },
  markdowncando: { x: 40, y: 87 },
  aiy: { x: 10, y: 61 }
}

const embedCopy = computed(() => props.locale === 'en'
  ? {
      caption: 'Public projects, mostly open source.',
      idleAnnouncement: 'Move to a project icon to see its preview',
      previewAlt: (name: string) => `${name} project preview`
    }
  : {
      caption: '公开项目，大部分开源',
      idleAnnouncement: '移动到作品图标可查看项目预览',
      previewAlt: (name: string) => `${name} 项目预览`
    })

let animationFrame = 0
let lastAnimationTime = 0
let prefersReducedMotion = false
let orbitResizeObserver: ResizeObserver | null = null

const activeProject = computed(() =>
  projects.value.find((project) => project.id === activeProjectId.value) ?? null
)

function projectCoordinates(project: Project) {
  const initialPosition = initialProjectPositions[project.id] ?? { x: 50, y: 50 }
  const normalizedX = (initialPosition.x - 50) / ORBIT_RADIUS_X
  const normalizedY = (initialPosition.y - 50) / ORBIT_RADIUS_Y
  const radius = Math.hypot(normalizedX, normalizedY)
  const initialAngle = Math.atan2(normalizedY, normalizedX)
  const angle = initialAngle + orbitProgress.value * Math.PI * 2
  const responsiveRadiusScale = Math.min(1, Math.max(0.82, orbitWidth.value / 520))

  return {
    x: 50 + Math.cos(angle) * ORBIT_RADIUS_X * radius * responsiveRadiusScale,
    y: 50 + Math.sin(angle) * ORBIT_RADIUS_Y * radius * responsiveRadiusScale
  }
}

function projectPosition(project: Project) {
  const { x, y } = projectCoordinates(project)

  return {
    left: `${x}%`,
    top: `${y}%`
  }
}

function projectLabelPlacement(project: Project) {
  const { x, y } = projectCoordinates(project)

  if (y < 25) return 'bottom'
  if (y > 75) return 'top'
  if (x < 24) return 'right'
  if (x > 76) return 'left'
  return y < 50 ? 'bottom' : 'top'
}

function animateOrbit(timestamp: number) {
  if (lastAnimationTime) {
    const elapsed = Math.min(timestamp - lastAnimationTime, 100)
    if (!prefersReducedMotion && !activeProjectId.value) {
      orbitProgress.value = (orbitProgress.value + elapsed / ORBIT_DURATION_MS) % 1
    }
  }

  lastAnimationTime = timestamp
  animationFrame = window.requestAnimationFrame(animateOrbit)
}

onMounted(() => {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const updateOrbitWidth = () => {
    orbitWidth.value = orbitRef.value?.clientWidth ?? 680
  }

  updateOrbitWidth()
  if (orbitRef.value) {
    orbitResizeObserver = new ResizeObserver(updateOrbitWidth)
    orbitResizeObserver.observe(orbitRef.value)
  }

  if (!prefersReducedMotion) {
    animationFrame = window.requestAnimationFrame(animateOrbit)
  }
})

onBeforeUnmount(() => {
  window.cancelAnimationFrame(animationFrame)
  orbitResizeObserver?.disconnect()
})

function pointNeedleAt(clientX: number, clientY: number) {
  const orbit = orbitRef.value
  if (!orbit) return

  const rect = orbit.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const pointerAngle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)

  // The source needle points roughly 52.5 degrees above the positive x axis.
  needleRotation.value = pointerAngle + 52.5
}

function activateProject(project: Project, event: Event) {
  activeProjectId.value = project.id

  const target = event.currentTarget as HTMLElement | null
  if (!target) return

  const rect = target.getBoundingClientRect()
  pointNeedleAt(rect.left + rect.width / 2, rect.top + rect.height / 2)
}

function handleOrbitPointerMove(event: PointerEvent) {
  if (activeProjectId.value || event.pointerType === 'touch') return
  pointNeedleAt(event.clientX, event.clientY)
}

function clearProject() {
  activeProjectId.value = null
  touchPreviewProjectId.value = null
  blockedTouchClickId.value = null
  needleRotation.value = 0
}

function handleOrbitPointerLeave(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  clearProject()
}

function handleProjectPointerDown(project: Project, event: PointerEvent) {
  if (event.pointerType !== 'touch') return

  if (touchPreviewProjectId.value !== project.id) {
    touchPreviewProjectId.value = project.id
    blockedTouchClickId.value = project.id
    activateProject(project, event)
    return
  }

  blockedTouchClickId.value = null
}

function handleProjectClick(project: Project, event: MouseEvent) {
  if (blockedTouchClickId.value !== project.id) return
  event.preventDefault()
  blockedTouchClickId.value = null
}

function handleOrbitFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (next && orbitRef.value?.contains(next)) return
  clearProject()
}
</script>

<template>
  <main class="orbit-embed" :lang="content.locale === 'zh' ? 'zh-Hans' : 'en'">
    <figure class="project-orbit-figure" aria-labelledby="projects-title">
      <h1 id="projects-title" class="sr-only">{{ content.projectsTitle }}</h1>
      <div
        id="projects"
        ref="orbitRef"
        class="project-orbit"
        :class="{ 'is-previewing': activeProject }"
        tabindex="-1"
        @pointermove="handleOrbitPointerMove"
        @pointerleave="handleOrbitPointerLeave"
        @focusout="handleOrbitFocusOut"
        @keydown.esc="clearProject"
      >
        <svg class="orbit-line orbit-line-back" viewBox="0 0 680 480" aria-hidden="true">
          <ellipse cx="340" cy="240" rx="285" ry="158" />
        </svg>

        <div class="orbit-core" :class="{ 'is-previewing': activeProject }">
          <Transition name="orbit-content" mode="out-in">
            <a
              v-if="activeProject"
              :key="activeProject.id"
              class="project-preview"
              :href="activeProject.href"
              target="_blank"
              rel="noopener"
              :aria-label="`${content.previewAction} ${activeProject.name}`"
            >
              <span class="project-preview-media">
                <img
                  class="project-preview-image"
                  :class="{ 'is-contained': activeProject.imageFit === 'contain' }"
                  :src="activeProject.image"
                  :alt="embedCopy.previewAlt(activeProject.name)"
                  width="720"
                  height="378"
                />
                <img
                  v-if="activeProject.overlayImage"
                  class="project-preview-overlay"
                  :src="activeProject.overlayImage"
                  alt=""
                  width="564"
                  height="564"
                />
              </span>
              <span class="project-preview-body">
                <span class="project-preview-heading">
                  <img :src="activeProject.logo" alt="" width="28" height="28" />
                  <span>
                    <small>{{ activeProject.eyebrow }}</small>
                    <strong>{{ activeProject.name }}</strong>
                  </span>
                </span>
                <span class="project-preview-description">{{ activeProject.description }}</span>
                <span class="project-preview-link">
                  {{ content.previewAction }} <span aria-hidden="true">↗</span>
                </span>
              </span>
            </a>

            <div v-else key="compass" class="hero-compass" aria-hidden="true">
              <svg viewBox="0 0 512 512" role="presentation">
                <defs>
                  <mask id="embed-ring-mask">
                    <rect width="512" height="512" fill="black" />
                    <circle cx="256" cy="256" r="256" fill="white" />
                    <circle cx="256" cy="256" r="219" fill="black" />
                  </mask>
                  <mask id="embed-needle-mask">
                    <rect width="512" height="512" fill="black" />
                    <path d="M212.369 226.171C212.918 224.593 213.948 223.226 215.314 222.263L335.811 137.289C342.167 132.807 350.533 139.112 347.977 146.457L299.509 285.708C298.959 287.287 297.93 288.653 296.564 289.617L176.066 374.59C169.711 379.072 161.344 372.767 163.9 365.422L212.369 226.171Z" fill="white" />
                    <circle cx="256" cy="256" r="20" fill="white" />
                  </mask>
                </defs>
                <circle cx="256" cy="256" r="219" fill="var(--home-surface)" />
                <image href="/avatar.png" width="512" height="512" mask="url(#embed-ring-mask)" />
                <g
                  class="hero-compass-needle"
                  :style="{ transform: `rotate(${needleRotation}deg)` }"
                >
                  <image href="/avatar.png" width="512" height="512" mask="url(#embed-needle-mask)" />
                </g>
              </svg>
            </div>
          </Transition>
        </div>

        <svg class="orbit-line orbit-line-front" viewBox="0 0 680 480" aria-hidden="true">
          <path d="M55 240a285 158 0 0 0 570 0" />
        </svg>

        <div class="satellite-layer">
          <div
            v-for="project in projects"
            :key="project.id"
            class="satellite"
            :class="[
              `satellite-${project.id}`,
              `label-${projectLabelPlacement(project)}`,
              { active: activeProjectId === project.id }
            ]"
            :style="projectPosition(project)"
          >
            <a
              class="satellite-link"
              :href="project.href"
              target="_blank"
              rel="noopener"
              :aria-label="`${project.name}：${project.description}`"
              @mouseenter="activateProject(project, $event)"
              @focus="activateProject(project, $event)"
              @pointerdown="handleProjectPointerDown(project, $event)"
              @click="handleProjectClick(project, $event)"
            >
              <img :src="project.logo" alt="" width="38" height="38" />
            </a>
            <span class="satellite-label">{{ project.name }}</span>
          </div>
        </div>

        <p class="sr-only" aria-live="polite">
          {{ activeProject ? `${content.projectsTitle}: ${activeProject.name}` : embedCopy.idleAnnouncement }}
        </p>
      </div>
      <figcaption>{{ embedCopy.caption }}</figcaption>
    </figure>
  </main>
</template>

<style scoped>
.orbit-embed {
  --home-bg: #f8f7f3;
  --home-surface: #fffefb;
  --home-surface-muted: #f1efea;
  --home-ink: #262320;
  --home-secondary: #4a453e;
  --home-muted: #6c665e;
  --home-line: #dedad2;
  --home-line-strong: #c8c2b8;
  --home-coral: #fb7370;
  --home-coral-hover: #d95d5a;
  box-sizing: border-box;
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 100svh;
  overflow: hidden;
  padding: 8px;
  color: var(--home-ink);
  background: var(--home-bg);
  font-family: Inter, "Segoe UI Variable", "Microsoft YaHei UI", "PingFang SC", system-ui, sans-serif;
}

:global(.dark) .orbit-embed {
  --home-bg: #181715;
  --home-surface: #211f1c;
  --home-surface-muted: #292621;
  --home-ink: #f5f1ea;
  --home-secondary: #d5cec4;
  --home-muted: #aaa299;
  --home-line: #3d3933;
  --home-line-strong: #575047;
  --home-coral: #ff8783;
  --home-coral-hover: #ff9c98;
}

.project-orbit-figure {
  position: relative;
  width: min(760px, calc(100vw - 16px), calc((100svh - 32px) * 1.4167));
  min-width: 0;
  margin: 0 auto;
}

.project-orbit-figure::before {
  position: absolute;
  top: 12%;
  left: 14%;
  width: 72%;
  height: 72%;
  border-radius: 50%;
  background: rgb(255 254 251 / 58%);
  filter: blur(26px);
  content: "";
  pointer-events: none;
}

.project-orbit {
  position: relative;
  width: 100%;
  min-height: 0;
  aspect-ratio: 680 / 480;
  outline: none;
}

.orbit-line {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.orbit-line ellipse,
.orbit-line path {
  fill: none;
  stroke: var(--home-line-strong);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.orbit-line-back {
  z-index: 1;
  opacity: .86;
}

.orbit-line-front {
  z-index: 3;
}

.orbit-core {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 370px;
  height: 292px;
  transform: translate(-50%, -50%);
}

.orbit-core.is-previewing {
  z-index: 4;
}

.hero-compass {
  width: 190px;
  height: 190px;
}

.hero-compass svg {
  display: block;
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 18px 26px rgb(38 35 32 / 12%));
}

.hero-compass-needle {
  transform-box: view-box;
  transform-origin: 256px 256px;
  transition: transform 180ms cubic-bezier(.2, 0, 0, 1);
}

.satellite-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.satellite {
  position: absolute;
  z-index: 5;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  will-change: left, top;
}

.satellite-link {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  overflow: hidden;
  border: 1px solid var(--home-line);
  border-radius: 50%;
  background: var(--home-surface);
  box-shadow: 0 12px 26px -20px rgb(38 35 32 / 45%);
  transition: border-color 180ms, transform 180ms, box-shadow 180ms;
}

.satellite-link img {
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: contain;
}

.satellite-aiy .satellite-link img {
  width: 44px;
  height: 44px;
}

.satellite-aicando .satellite-link img {
  width: 42px;
  height: 42px;
}

.satellite-markdowncando .satellite-link img {
  width: 34px;
  height: 34px;
}

.satellite.active {
  z-index: 6;
}

.project-orbit.is-previewing .satellite:not(.active) .satellite-label {
  opacity: 0;
}

.satellite.active .satellite-link,
.satellite-link:hover,
.satellite-link:focus-visible {
  border-color: var(--home-coral);
  box-shadow: 0 0 0 2px var(--home-coral), 0 12px 24px -18px rgb(38 35 32 / 45%);
  transform: scale(1.06);
  outline: none;
}

.satellite-label {
  position: absolute;
  display: block;
  width: max-content;
  max-width: 150px;
  color: var(--home-secondary);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.3;
  white-space: nowrap;
  pointer-events: none;
  transition: opacity 120ms;
}

.label-bottom .satellite-label {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.label-top .satellite-label {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}

.label-right .satellite-label {
  top: 50%;
  left: calc(100% + 10px);
  transform: translateY(-50%);
}

.label-left .satellite-label {
  top: 50%;
  right: calc(100% + 10px);
  transform: translateY(-50%);
}

.project-preview {
  display: block;
  width: min(356px, 100%);
  overflow: hidden;
  border: 1px solid var(--home-line);
  border-radius: 14px;
  color: var(--home-ink);
  background: var(--home-surface);
  box-shadow: 0 22px 54px -28px rgb(38 35 32 / 38%);
  text-decoration: none;
}

.project-preview:hover {
  border-color: var(--home-coral);
  color: var(--home-ink);
}

.project-preview:focus-visible {
  border-radius: 8px;
  outline: 2px solid var(--home-coral);
  outline-offset: 3px;
}

.project-preview-media {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 720 / 378;
  overflow: hidden;
  border-bottom: 1px solid var(--home-line);
  background: var(--home-surface-muted);
}

.project-preview-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-preview-image.is-contained {
  box-sizing: border-box;
  padding: 32px;
  background: var(--home-surface);
  object-fit: contain;
}

.project-preview-overlay {
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 34%;
  height: auto;
  aspect-ratio: 1;
  border: 2px solid rgb(255 254 251 / 92%);
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 10px 24px -10px rgb(38 35 32 / 34%);
}

.project-preview-body {
  display: block;
  padding: 14px 16px 16px;
}

.project-preview-heading {
  display: flex;
  align-items: center;
  gap: 10px;
}

.project-preview-heading > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: contain;
}

.project-preview-heading span {
  display: grid;
  gap: 2px;
}

.project-preview-heading small {
  color: var(--home-muted);
  font-size: 10px;
  font-weight: 500;
}

.project-preview-heading strong {
  color: var(--home-ink);
  font-size: 16px;
  font-weight: 600;
}

.project-preview-description {
  display: block;
  margin-top: 10px;
  color: var(--home-secondary);
  font-size: 12px;
  line-height: 1.65;
}

.project-preview-link {
  display: block;
  margin-top: 10px;
  color: var(--home-coral-hover);
  font-size: 11px;
  font-weight: 600;
}

.orbit-content-enter-active,
.orbit-content-leave-active {
  transition: opacity 180ms cubic-bezier(.2, 0, 0, 1), transform 180ms cubic-bezier(.2, 0, 0, 1);
}

.orbit-content-enter-from,
.orbit-content-leave-to {
  opacity: 0;
  transform: scale(.97);
}

.project-orbit-figure figcaption {
  margin-top: -4px;
  color: var(--home-muted);
  font-size: 11px;
  line-height: 16px;
  text-align: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 700px) {
  .orbit-core {
    width: min(292px, 85%);
    height: min(292px, 85%);
  }

  .hero-compass {
    width: 138px;
    height: 138px;
  }

  .project-preview {
    width: min(286px, 100%);
  }

  .satellite-link {
    width: 48px;
    height: 48px;
  }

  .satellite-link img {
    width: 30px;
    height: 30px;
  }

  .satellite-aiy .satellite-link img,
  .satellite-aicando .satellite-link img {
    width: 36px;
    height: 36px;
  }

  .satellite-label {
    max-width: 96px;
    font-size: 9px;
    text-align: center;
  }

}

@media (prefers-reduced-motion: reduce) {
  .hero-compass-needle,
  .satellite-link,
  .orbit-content-enter-active,
  .orbit-content-leave-active {
    transition: none;
  }
}
</style>
