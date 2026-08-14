<script setup lang="ts">
import { computed, ref } from 'vue'
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

const activeProject = computed(() =>
  projects.value.find((project) => project.id === activeProjectId.value) ?? null
)

function projectPosition(project: Project) {
  return {
    left: `${project.x}%`,
    top: `${project.y}%`
  }
}

function pointNeedleAt(clientX: number, clientY: number) {
  const orbit = orbitRef.value
  if (!orbit) return

  const rect = orbit.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const pointerAngle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)

  // The source needle points roughly 52.5° above the positive x axis.
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
  <main class="gantrol-home" :lang="content.locale === 'zh' ? 'zh-Hans' : 'en'">
    <section class="home-hero home-shell" aria-labelledby="home-title">
      <div class="hero-copy">
        <p class="eyebrow">{{ content.author }}</p>
        <h1 id="home-title">{{ content.title }}</h1>
        <p class="hero-summary">{{ content.summary }}</p>
        <div class="hero-actions">
          <a class="primary-action" :href="content.primaryAction.href">{{ content.primaryAction.label }}</a>
          <a class="text-action" :href="content.secondaryAction.href" target="_blank" rel="noopener">
            {{ content.secondaryAction.label }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <figure class="project-orbit-figure" aria-labelledby="projects-title">
        <h2 id="projects-title" class="sr-only">{{ content.projectsTitle }}</h2>
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
                :aria-label="`打开 ${activeProject.name}`"
              >
                <span class="project-preview-media">
                  <img
                    class="project-preview-image"
                    :class="{ 'is-contained': activeProject.imageFit === 'contain' }"
                    :src="activeProject.image"
                    :alt="`${activeProject.name} 项目预览`"
                    width="720"
                    height="378"
                  />
                  <img
                    v-if="activeProject.overlayImage"
                    class="project-preview-overlay"
                    :src="activeProject.overlayImage"
                    :alt="`${activeProject.name} Codex Micro 控制器`"
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
                  <span class="project-preview-link">{{ content.previewAction }} <span aria-hidden="true">↗</span></span>
                </span>
              </a>

              <div v-else key="compass" class="hero-compass" aria-hidden="true">
                <svg viewBox="0 0 512 512" role="presentation">
                  <defs>
                    <mask id="home-ring-mask">
                      <rect width="512" height="512" fill="black" />
                      <circle cx="256" cy="256" r="256" fill="white" />
                      <circle cx="256" cy="256" r="219" fill="black" />
                    </mask>
                    <mask id="home-needle-mask">
                      <rect width="512" height="512" fill="black" />
                      <path d="M212.369 226.171C212.918 224.593 213.948 223.226 215.314 222.263L335.811 137.289C342.167 132.807 350.533 139.112 347.977 146.457L299.509 285.708C298.959 287.287 297.93 288.653 296.564 289.617L176.066 374.59C169.711 379.072 161.344 372.767 163.9 365.422L212.369 226.171Z" fill="white" />
                      <circle cx="256" cy="256" r="20" fill="white" />
                    </mask>
                  </defs>
                  <circle cx="256" cy="256" r="219" fill="var(--home-surface)" />
                  <image href="/avatar.png" width="512" height="512" mask="url(#home-ring-mask)" />
                  <g
                    class="hero-compass-needle"
                    :style="{ transform: `rotate(${needleRotation}deg)` }"
                  >
                    <image href="/avatar.png" width="512" height="512" mask="url(#home-needle-mask)" />
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
              :class="[`satellite-${project.id}`, `label-${project.placement}`, { active: activeProjectId === project.id }]"
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
            {{ activeProject ? `${content.projectsTitle}: ${activeProject.name}` : content.orbitIdleAnnouncement }}
          </p>
        </div>
        <figcaption>{{ content.orbitCaption }}</figcaption>
      </figure>
    </section>

    <section class="home-section home-shell directions" aria-labelledby="directions-title">
      <div class="section-heading">
        <h2 id="directions-title">{{ content.directions.title }}</h2>
        <p>{{ content.directions.kicker }}</p>
      </div>

      <div class="direction-grid">
        <component
          :is="direction.href ? 'a' : 'article'"
          v-for="direction in content.directions.items"
          :key="direction.id"
          class="direction-item"
          :class="{ 'direction-item-muted': !direction.href }"
          :href="direction.href"
        >
          <span class="direction-icon" aria-hidden="true">
            <svg v-if="direction.id === 'software'" viewBox="0 0 32 32">
              <rect x="3.5" y="5" width="22" height="17" rx="4" />
              <path d="M4 10h21M9.5 14.5l-3 2.5 3 2.5M14 14.5l3 2.5-3 2.5" />
              <circle cx="25" cy="24" r="4" />
              <path d="M25 18.5v2M25 27.5v2M19.5 24h2M28.5 24h2" />
            </svg>
            <svg v-else-if="direction.id === 'ai'" viewBox="0 0 32 32">
              <path d="M16 3.5c.7 6.1 3.9 9.3 10 10-6.1.7-9.3 3.9-10 10-.7-6.1-3.9-9.3-10-10 6.1-.7 9.3-3.9 10-10Z" />
              <circle cx="7" cy="25" r="2.5" />
              <circle cx="25" cy="25" r="2.5" />
              <path d="M9.5 25h13" />
            </svg>
            <svg v-else viewBox="0 0 32 32">
              <path d="M5 6.5h16a5 5 0 0 1 5 5v5a5 5 0 0 1-5 5h-7l-5.5 4v-4H5a5 5 0 0 1-5-5v-5a5 5 0 0 1 5-5Z" transform="translate(3)" />
              <path d="M12 13.5c1.2-2.1 4.3-1.2 4.3 1.1 0-2.3 3.1-3.2 4.3-1.1 1.5 2.6-1.3 5-4.3 7-3-2-5.8-4.4-4.3-7Z" />
            </svg>
          </span>
          <span class="direction-copy">
            <span class="direction-title-row">
              <strong>{{ direction.title }}</strong>
              <small v-if="direction.status" class="direction-status">{{ direction.status }}</small>
            </span>
            <span>{{ direction.description }}</span>
          </span>
        </component>
      </div>
    </section>

    <section id="popular" class="home-section home-shell popular" aria-labelledby="popular-title">
      <div class="section-heading">
        <h2 id="popular-title">{{ content.popular.title }}</h2>
        <p>{{ content.popular.kicker }}</p>
      </div>

      <div class="popular-list">
        <a v-for="article in content.popular.items" :key="article.number" :href="article.href">
          <span>{{ article.number }}</span>
          <strong>{{ article.title }}</strong>
        </a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.gantrol-home {
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
  position: relative;
  min-height: 100vh;
  color: var(--home-ink);
  background:
    radial-gradient(circle at 82% 12%, rgb(251 115 112 / 7%), transparent 25rem),
    linear-gradient(180deg, rgb(255 254 251 / 72%), transparent 18rem),
    var(--home-bg);
  font-family: Inter, "Segoe UI Variable", "Microsoft YaHei UI", "PingFang SC", system-ui, sans-serif;
}

:global(.dark) .gantrol-home {
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

:global(.gantrol-home-page .VPContent),
:global(.gantrol-home-page .VPFooter) {
  background: #f8f7f3;
}

:global(.gantrol-home-page) {
  --vp-nav-bg-color: rgb(248 247 243 / 88%);
  --vp-c-bg: #f8f7f3;
  --vp-c-bg-alt: #f1efea;
  --vp-c-divider: #dedad2;
  --vp-c-brand-1: #d95d5a;
  --vp-c-brand-2: #fb7370;
}

:global(.gantrol-home-page .VPNav) {
  background:
    linear-gradient(105deg, transparent 55%, rgb(251 115 112 / 4%)),
    rgb(248 247 243 / 88%);
  backdrop-filter: saturate(140%) blur(14px);
}

:global(.gantrol-home-page .VPNavBar) {
  background: transparent;
}

:global(.gantrol-home-page .VPNavBar .container) {
  max-width: 1180px;
}

:global(.gantrol-home-page .VPNavBar .divider-line) {
  margin: 0 auto;
  max-width: 1180px;
  background: transparent;
}

:global(.gantrol-home-page .VPNavBarTitle .title) {
  font-size: 15px;
  font-weight: 600;
}

:global(.gantrol-home-page .VPNavBarTitle .logo) {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

:global(.gantrol-home-page .VPNavBarSearch) {
  flex-grow: 0;
  padding-left: 28px;
}

:global(.gantrol-home-page .DocSearch-Button) {
  border: 0;
  width: 40px;
  background: transparent;
}

:global(.gantrol-home-page .DocSearch-Button:hover) {
  background: #f1efea;
}

:global(.gantrol-home-page .DocSearch-Button-Placeholder),
:global(.gantrol-home-page .DocSearch-Button-Keys) {
  display: none;
}

:global(.gantrol-home-page .VPNavBarMenuLink) {
  padding: 0 10px;
  color: #4a453e;
  font-size: 13px;
}

:global(.dark .gantrol-home-page .VPContent),
:global(.dark .gantrol-home-page .VPFooter) {
  background: #181715;
}

:global(.dark .gantrol-home-page) {
  --vp-nav-bg-color: rgb(24 23 21 / 88%);
  --vp-c-bg: #181715;
  --vp-c-bg-alt: #292621;
  --vp-c-divider: #3d3933;
}

:global(.dark .gantrol-home-page .VPNav) {
  background: rgb(24 23 21 / 88%);
}

:global(.dark .gantrol-home-page .VPNavBar .divider-line) {
  background: transparent;
}

:global(.gantrol-home-page .VPFooter) {
  border-top: 0;
}

:global(.dark .gantrol-home-page .VPFooter) {
  border-top: 0;
}

.home-shell {
  margin: 0 auto;
  width: min(1180px, calc(100% - 48px));
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(340px, 0.78fr) minmax(560px, 1.22fr);
  align-items: center;
  gap: clamp(28px, 4vw, 64px);
  min-height: min(760px, calc(100vh - var(--vp-nav-height)));
  padding-top: clamp(48px, 6vw, 88px);
  padding-bottom: clamp(64px, 7vw, 92px);
}

.hero-copy {
  position: relative;
  z-index: 2;
}

.eyebrow {
  margin: 0 0 22px;
  color: var(--home-muted);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
}

.hero-copy h1 {
  margin: 0;
  max-width: none;
  color: var(--home-ink);
  font-size: clamp(50px, 5vw, 70px);
  font-weight: 650;
  line-height: 1.08;
  letter-spacing: -0.035em;
  white-space: nowrap;
}

.hero-summary {
  margin: 28px 0 0;
  color: var(--home-secondary);
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-top: 34px;
}

.primary-action,
.text-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: color 180ms, background-color 180ms, border-color 180ms, transform 180ms;
}

.primary-action {
  padding: 0 22px;
  color: #fff;
  background: #bd4845;
}

.primary-action:hover {
  color: #fff;
  background: #a93e3b;
  transform: translateY(-1px);
}

.text-action {
  color: var(--home-secondary);
}

.text-action:hover {
  color: var(--home-coral-hover);
}

.project-orbit-figure {
  position: relative;
  margin: 0;
  min-width: 0;
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
  aspect-ratio: 680 / 480;
  min-height: 430px;
  scroll-margin-top: 90px;
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
  opacity: 0.86;
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
  margin-top: -8px;
  color: var(--home-muted);
  font-size: 11px;
  text-align: center;
}

.home-section {
  padding-top: 72px;
  padding-bottom: 72px;
  scroll-margin-top: 84px;
}

.section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 32px;
}

.section-heading h2 {
  margin: 0;
  color: var(--home-ink);
  font-size: clamp(25px, 2.4vw, 32px);
  font-weight: 600;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.section-heading p {
  margin: 0;
  color: var(--home-muted);
  font-size: 12px;
}

.direction-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(20px, 3vw, 40px);
}

.direction-item {
  position: relative;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  align-items: start;
  gap: 16px;
  min-height: 108px;
  border-radius: 14px;
  padding: 12px;
  color: var(--home-ink);
  background: transparent;
  text-decoration: none;
  transition: color 180ms, background-color 180ms;
}

.direction-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: var(--home-coral);
  background: color-mix(in srgb, var(--home-coral) 11%, var(--home-surface));
}

.direction-icon svg {
  width: 27px;
  height: 27px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.65;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.direction-copy {
  display: grid;
  gap: 8px;
  min-width: 0;
}

.direction-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.direction-copy strong {
  color: var(--home-ink);
  font-size: 17px;
  font-weight: 600;
}

.direction-copy > span {
  color: var(--home-secondary);
  font-size: 13px;
  line-height: 1.7;
}

.direction-item[href]:hover .direction-copy strong {
  color: var(--home-coral-hover);
}

.direction-item[href]:hover {
  background: color-mix(in srgb, var(--home-coral) 5%, transparent);
}

.direction-status {
  flex: none;
  padding: 3px 9px;
  border-radius: 999px;
  color: var(--home-muted);
  background: var(--home-surface-muted);
  font-size: 11px;
  font-weight: 500;
  white-space: nowrap;
}

.popular-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.popular-list a {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  align-items: center;
  gap: 14px;
  min-height: 92px;
  border: 1px solid transparent;
  border-radius: 14px;
  padding: 18px 20px;
  color: var(--home-ink);
  background: color-mix(in srgb, var(--home-surface) 82%, transparent);
  text-decoration: none;
  transition: border-color 180ms, background-color 180ms;
}

.popular-list a > span {
  color: var(--home-coral);
  font-size: 19px;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.popular-list strong {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.55;
}

.popular-list a:hover {
  background: var(--home-surface);
  border-color: var(--home-line);
}

.primary-action:focus-visible,
.text-action:focus-visible,
.project-preview:focus-visible,
.direction-item:focus-visible,
.popular-list a:focus-visible {
  border-radius: 8px;
  outline: 2px solid var(--home-coral);
  outline-offset: 3px;
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

@media (max-width: 1050px) {
  .home-hero {
    grid-template-columns: minmax(300px, .8fr) minmax(480px, 1.2fr);
  }

  .satellite-label {
    font-size: 11px;
  }

  .direction-item {
    grid-template-columns: 40px minmax(0, 1fr);
  }
}

@media (max-width: 900px) {
  .home-hero {
    grid-template-columns: 1fr;
    min-height: 0;
    padding-top: 56px;
  }

  .hero-copy {
    max-width: 620px;
  }

  .hero-copy h1 {
    max-width: none;
  }

  .project-orbit-figure {
    width: min(680px, 100%);
    margin: 12px auto 0;
  }
}

@media (max-width: 700px) {
  .home-shell {
    width: min(100% - 40px, 1180px);
  }

  .home-hero {
    gap: 46px;
    padding-top: 48px;
    padding-bottom: 64px;
  }

  .eyebrow {
    margin-bottom: 16px;
  }

  .hero-copy h1 {
    font-size: clamp(42px, 12vw, 54px);
  }

  .hero-summary {
    margin-top: 20px;
    font-size: 17px;
  }

  .project-orbit {
    min-height: 0;
    aspect-ratio: 1;
  }

  .orbit-line {
    display: block;
  }

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

  .satellite-layer {
    position: absolute;
  }

  .satellite {
    position: absolute;
    transform: translate(-50%, -50%);
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

  .project-orbit-figure figcaption {
    margin-top: 4px;
  }

  .home-section {
    padding-top: 56px;
    padding-bottom: 56px;
  }

  .direction-grid,
  .popular-list {
    grid-template-columns: 1fr;
  }

  .direction-item,
  .direction-item:first-child,
  .direction-item:last-child {
    grid-template-columns: 44px minmax(0, 1fr);
    min-height: 0;
    padding: 14px 12px;
  }

  .popular-list a,
  .popular-list a:first-child {
    padding: 17px 16px;
  }

}

@media (max-width: 420px) {
  .home-shell {
    width: min(100% - 32px, 1180px);
  }

  .hero-actions {
    gap: 20px;
  }

  .direction-item,
  .direction-item:first-child,
  .direction-item:last-child {
    grid-template-columns: 42px minmax(0, 1fr);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-compass-needle,
  .satellite-link,
  .primary-action,
  .orbit-content-enter-active,
  .orbit-content-leave-active {
    transition: none;
  }
}
</style>
