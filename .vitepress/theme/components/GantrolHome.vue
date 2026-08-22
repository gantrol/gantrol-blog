<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { homeContent, type HomeContent, type HomeLocale } from '../home-content'

const props = withDefaults(defineProps<{ locale?: HomeLocale }>(), {
  locale: 'zh'
})

const content = computed<HomeContent>(() => homeContent[props.locale])
const projects = computed(() => content.value.projects)
const tools = computed(() => content.value.tools.items)
type Project = HomeContent['projects'][number]

const trayStageRef = ref<HTMLElement | null>(null)
const projectTicketRef = ref<HTMLElement | null>(null)
const activeProjectId = ref<string | null>(null)
const pinnedProjectId = ref<string | null>(null)
const stampRotation = ref(0)

const projectOrder = ['timeline', 'aicando', 'agent-controller', 'aiy', 'markdowncando', 'paopao']
const cookieLayouts = [
  { x: -13, y: -9, tilt: -2 },
  { x: 1, y: 9, tilt: 1.8 },
  { x: 14, y: -7, tilt: -1.4 },
  { x: -14, y: 9, tilt: 2.4 },
  { x: 0, y: -8, tilt: -2.5 },
  { x: 13, y: 9, tilt: 1.2 }
]
const stampAngles: Record<string, number> = {
  timeline: -122,
  aicando: -82,
  'agent-controller': -42,
  aiy: -154,
  markdowncando: -116,
  paopao: -72
}

let clearTimer = 0
let pendingProjectTicketRevealId: string | null = null
let isProjectTicketEntering = false

const activeProject = computed(() =>
  projects.value.find((project) => project.id === activeProjectId.value) ?? null
)

const trayProjects = computed<Project[]>(() =>
  projectOrder
    .map((id) => projects.value.find((project) => project.id === id))
    .filter((project): project is Project => project != null)
)

function projectCookieStyle(index: number) {
  const layout = cookieLayouts[index % cookieLayouts.length]
  return {
    '--cookie-x': `${layout.x}px`,
    '--cookie-y': `${layout.y}px`,
    '--cookie-tilt': `${layout.tilt}deg`
  }
}

function cancelScheduledClear() {
  window.clearTimeout(clearTimer)
}

function activateProject(project: Project) {
  cancelScheduledClear()
  activeProjectId.value = project.id
}

function clearProject() {
  cancelScheduledClear()
  pendingProjectTicketRevealId = null
  pinnedProjectId.value = null
  activeProjectId.value = null
  stampRotation.value = 0
}

function scheduleProjectClear(event: PointerEvent) {
  if (event.pointerType === 'touch' || pinnedProjectId.value) return
  pendingProjectTicketRevealId = null
  cancelScheduledClear()
  clearTimer = window.setTimeout(() => {
    if (!pinnedProjectId.value) clearProject()
  }, 220)
}

function handleTraySurfaceClick(event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest('.project-cookie')) return
  clearProject()
}

function revealProjectTicketIfNeeded(selectedProjectId: string) {
  if (activeProjectId.value !== selectedProjectId) return

  const ticket = projectTicketRef.value
  if (!ticket) return

  const rect = ticket.getBoundingClientRect()
  const viewport = window.visualViewport
  const viewportTop = viewport?.offsetTop ?? 0
  const viewportBottom = viewportTop + (viewport?.height ?? window.innerHeight)
  const isVisible = rect.top >= viewportTop && rect.bottom <= viewportBottom

  if (isVisible) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ticket.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'nearest',
    inline: 'nearest'
  })
}

function pinProject(project: Project) {
  const isTicketStable = activeProjectId.value !== null &&
    projectTicketRef.value !== null &&
    !isProjectTicketEntering

  pinnedProjectId.value = project.id
  pendingProjectTicketRevealId = project.id
  activateProject(project)
  stampRotation.value = stampAngles[project.id] ?? 0

  if (!isTicketStable) return

  pendingProjectTicketRevealId = null
  window.requestAnimationFrame(() => revealProjectTicketIfNeeded(project.id))
}

function openProject(project: Project) {
  if (isExternalLink(project.href)) {
    window.open(project.href, '_blank', 'noopener,noreferrer')
    return
  }

  window.location.assign(project.href)
}

function handleProjectClick(project: Project) {
  if (pinnedProjectId.value === project.id) {
    openProject(project)
    return
  }

  pinProject(project)
}

function handleProjectTicketBeforeEnter() {
  isProjectTicketEntering = true
}

function handleProjectTicketEnterCancelled() {
  isProjectTicketEntering = false
}

function handleProjectTicketAfterEnter() {
  isProjectTicketEntering = false

  const projectId = pendingProjectTicketRevealId
  if (!projectId || pinnedProjectId.value !== projectId) return

  pendingProjectTicketRevealId = null
  revealProjectTicketIfNeeded(projectId)
}

function handleProjectMouseEnter(project: Project) {
  if (pinnedProjectId.value) return
  activateProject(project)
}

function handleProjectFocus(project: Project) {
  if (pinnedProjectId.value) return
  activateProject(project)
}

function handleTrayFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (next && trayStageRef.value?.contains(next)) return
  if (pinnedProjectId.value) return
  clearProject()
}

onBeforeUnmount(cancelScheduledClear)

function isExternalLink(href: string) {
  return /^https?:\/\//.test(href)
}
</script>

<template>
  <main class="gantrol-home" :lang="content.locale === 'zh' ? 'zh-Hans' : 'en'">
    <section class="home-hero home-shell" aria-labelledby="home-title">
      <div class="hero-copy">
        <p class="eyebrow">{{ content.author }}</p>
        <h1 id="home-title">{{ content.title }}</h1>
        <div class="hero-actions">
          <a class="primary-action" :href="content.primaryAction.href">{{ content.primaryAction.label }}</a>
          <a class="text-action" :href="content.secondaryAction.href" target="_blank" rel="noopener">
            {{ content.secondaryAction.label }} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <figure class="project-tray-figure" aria-labelledby="projects-title">
        <h2 id="projects-title" class="sr-only">{{ content.projectsTitle }}</h2>
        <div
          id="projects"
          ref="trayStageRef"
          class="project-tray-stage"
          :class="{
            'has-selection': activeProject,
            'has-pinned-selection': pinnedProjectId
          }"
          tabindex="-1"
          @pointerenter="cancelScheduledClear"
          @pointerleave="scheduleProjectClear"
          @focusout="handleTrayFocusOut"
          @keydown.esc.prevent="clearProject"
        >
          <div class="project-plate-stack">
            <div class="project-tray" @click="handleTraySurfaceClick">
              <div class="project-tray-paper">
                <div class="project-cookie-grid">
                  <button
                    v-for="(project, index) in trayProjects"
                    :key="project.id"
                    type="button"
                    class="project-cookie"
                    :class="[
                      `project-cookie-${project.id}`,
                      {
                        'is-active': activeProjectId === project.id,
                        'is-pinned': pinnedProjectId === project.id
                      }
                    ]"
                    :style="projectCookieStyle(index)"
                    :aria-label="pinnedProjectId === project.id
                      ? `${content.previewAction} ${project.name}`
                      : `${project.name}：${project.description}`"
                    :aria-expanded="activeProjectId === project.id"
                    :aria-pressed="pinnedProjectId === project.id"
                    aria-controls="project-preview"
                    @click="handleProjectClick(project)"
                    @mouseenter="handleProjectMouseEnter(project)"
                    @focus="handleProjectFocus(project)"
                  >
                    <span class="project-cookie-visual" aria-hidden="true">
                      <img
                        v-if="project.id === 'timeline'"
                        class="timeline-cookie"
                        :src="project.logo"
                        alt=""
                        width="100"
                        height="100"
                      />
                      <template v-else>
                        <img
                          class="project-cookie-shell"
                          src="/images/home/projects/project-cookie-shell.svg"
                          alt=""
                          width="100"
                          height="100"
                        />
                        <img class="project-cookie-logo" :src="project.logo" alt="" width="38" height="38" />
                      </template>
                    </span>
                    <span class="project-cookie-label">{{ project.name }}</span>
                  </button>
                </div>

                <span
                  class="tray-maker-stamp"
                  :style="{ transform: `rotate(${stampRotation}deg)` }"
                  aria-hidden="true"
                >
                  <img src="/avatar.png" alt="" width="30" height="30" />
                </span>
              </div>
            </div>

            <Transition
              name="tray-ticket"
              @before-enter="handleProjectTicketBeforeEnter"
              @enter-cancelled="handleProjectTicketEnterCancelled"
              @after-enter="handleProjectTicketAfterEnter"
            >
              <aside
                v-if="activeProject"
                id="project-preview"
                ref="projectTicketRef"
                class="project-ticket"
                :data-project-id="activeProject.id"
                aria-live="polite"
                aria-atomic="true"
              >
                <span class="project-ticket-media">
                  <img
                    class="project-ticket-image"
                    :class="{ 'is-contained': activeProject.imageFit === 'contain' }"
                    :src="activeProject.image"
                    :alt="`${activeProject.name} 项目预览`"
                    width="720"
                    height="378"
                  />
                  <img
                    v-if="activeProject.overlayImage"
                    class="project-ticket-overlay"
                    :src="activeProject.overlayImage"
                    alt=""
                    width="564"
                    height="564"
                  />
                </span>
                <a
                  class="project-ticket-link"
                  :href="activeProject.href"
                  :target="isExternalLink(activeProject.href) ? '_blank' : undefined"
                  :rel="isExternalLink(activeProject.href) ? 'noopener' : undefined"
                  :aria-label="`${content.previewAction} ${activeProject.name}`"
                >
                  <span class="project-ticket-link-arrow" aria-hidden="true">↗</span>
                </a>
              </aside>
            </Transition>
          </div>

          <p class="sr-only" aria-live="polite">
            {{ activeProject ? `${content.projectsTitle}: ${activeProject.name}` : content.projectsIdleAnnouncement }}
          </p>
        </div>
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
          <span
            class="direction-icon"
            :class="{ 'direction-icon-aicando': direction.id === 'ai' }"
            aria-hidden="true"
          >
            <svg v-if="direction.id === 'software'" viewBox="0 0 32 32">
              <rect x="3.5" y="5" width="22" height="17" rx="4" />
              <path d="M4 10h21M9.5 14.5l-3 2.5 3 2.5M14 14.5l3 2.5-3 2.5" />
              <circle cx="25" cy="24" r="4" />
              <path d="M25 18.5v2M25 27.5v2M19.5 24h2M28.5 24h2" />
            </svg>
            <template v-else-if="direction.id === 'ai'">
              <img
                class="direction-aicando-cookie"
                src="/images/home/projects/project-cookie-shell.svg"
                alt=""
                width="44"
                height="44"
              />
              <img
                class="direction-aicando-logo"
                src="/images/home/projects/aicando-logo.webp"
                alt=""
                width="22"
                height="22"
              />
            </template>
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

    <section class="home-section home-shell home-tools" aria-labelledby="tools-title">
      <div class="section-heading home-tools-heading">
        <div>
          <h2 id="tools-title">{{ content.tools.title }}</h2>
          <p>{{ content.tools.kicker }}</p>
        </div>
        <a :href="content.tools.action.href">{{ content.tools.action.label }} <span aria-hidden="true">→</span></a>
      </div>

      <div class="home-tool-grid">
        <a
          v-for="tool in tools"
          :key="tool.id"
          :class="`home-tool-${tool.id}`"
          :href="tool.href"
          :target="isExternalLink(tool.href) ? '_blank' : undefined"
          :rel="isExternalLink(tool.href) ? 'noopener' : undefined"
        >
          <span class="home-tool-mark" aria-hidden="true">
            <img :src="tool.logo" :alt="`${tool.name} logo`" width="48" height="48" />
          </span>
          <span class="home-tool-copy">
            <small>{{ tool.status }}</small>
            <strong>{{ tool.name }}</strong>
            <span>{{ tool.description }}</span>
          </span>
          <span class="home-tool-arrow" aria-hidden="true">→</span>
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
  --tray-rim-light: #ead9bb;
  --tray-rim-mid: #c9ac78;
  --tray-rim-dark: #9b7949;
  --tray-paper: #fff9ef;
  --tray-paper-dot: rgb(145 104 48 / 3%);
  --tray-shadow: rgb(80 55 25 / 14%);
  position: relative;
  min-height: 100vh;
  color: var(--home-ink);
  background:
    radial-gradient(circle at 82% 12%, rgb(251 115 112 / 7%), transparent 25rem),
    linear-gradient(180deg, rgb(255 254 251 / 72%), transparent 18rem),
    var(--home-bg);
  font-family: Inter, "Segoe UI Variable", "Microsoft YaHei UI", "PingFang SC", system-ui, sans-serif;
}

:global(.dark .gantrol-home) {
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
  --tray-rim-light: #7b6950;
  --tray-rim-mid: #5f513f;
  --tray-rim-dark: #3d342a;
  --tray-paper: #342b22;
  --tray-paper-dot: rgb(236 204 154 / 4%);
  --tray-shadow: rgb(0 0 0 / 36%);
  background:
    radial-gradient(circle at 82% 12%, rgb(255 135 131 / 6%), transparent 25rem),
    linear-gradient(180deg, rgb(33 31 28 / 72%), transparent 18rem),
    var(--home-bg);
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

:global(.dark .gantrol-home-page .VPNavBarMenuLink) {
  color: #d5cec4;
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
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(340px, 0.78fr) minmax(560px, 1.22fr);
  align-items: center;
  gap: clamp(28px, 4vw, 64px);
  min-height: 0;
  padding-top: clamp(48px, 6vw, 88px);
  padding-bottom: clamp(12px, 1.5vw, 18px);
}

.hero-copy {
  position: relative;
  z-index: 2;
  transform: translateY(-72px);
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

.project-tray-figure {
  position: relative;
  z-index: 2;
  margin: 0;
  min-width: 0;
}

.project-tray-figure::before {
  position: absolute;
  top: 7%;
  left: 8%;
  width: 84%;
  height: 70%;
  border-radius: 28%;
  background: rgb(255 248 235 / 62%);
  filter: blur(32px);
  content: "";
  pointer-events: none;
}

:global(.dark .project-tray-figure::before) {
  background: rgb(159 111 54 / 8%);
}

.project-tray-stage {
  position: relative;
  display: flex;
  width: 100%;
  min-height: 0;
  flex-direction: column;
  align-items: center;
  scroll-margin-top: 90px;
  isolation: isolate;
  outline: none;
}

.project-plate-stack {
  position: relative;
  width: min(100%, 640px);
  isolation: isolate;
}

.project-tray {
  position: relative;
  z-index: 2;
  width: 100%;
  aspect-ratio: 1.58;
  flex: none;
  padding: 16px;
  border: 1px solid color-mix(in srgb, var(--tray-rim-dark) 78%, var(--home-line));
  border-radius: 30px;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 70%), transparent 22%),
    linear-gradient(145deg, var(--tray-rim-light), var(--tray-rim-mid) 58%, var(--tray-rim-dark));
  box-shadow:
    0 28px 44px var(--tray-shadow),
    0 4px 8px rgb(80 55 25 / 10%),
    inset 0 1px 1px rgb(255 255 255 / 72%);
  transform: rotate(.35deg);
}

.project-tray::before {
  position: absolute;
  inset: 7px;
  border: 1px solid color-mix(in srgb, var(--tray-rim-dark) 60%, transparent);
  border-radius: 24px;
  content: "";
  pointer-events: none;
}

.project-tray-paper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--tray-rim-dark) 28%, transparent);
  border-radius: 18px;
  background:
    radial-gradient(circle at 15% 12%, var(--tray-paper-dot) 0 1px, transparent 1.4px) 0 0 / 13px 13px,
    radial-gradient(circle at 84% 65%, var(--tray-paper-dot) 0 1px, transparent 1.4px) 0 0 / 17px 17px,
    var(--tray-paper);
  box-shadow: inset 0 4px 12px rgb(93 65 29 / 7%);
}

.project-cookie-grid {
  position: absolute;
  inset: 24px 34px 36px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-rows: repeat(2, minmax(0, 1fr));
  align-items: center;
  justify-items: center;
  gap: 8px 18px;
}

.project-cookie {
  position: relative;
  display: block;
  width: 112px;
  min-height: 112px;
  padding: 0;
  border: 0;
  color: var(--home-ink);
  background: transparent;
  appearance: none;
  cursor: pointer;
  font: inherit;
  text-decoration: none;
  touch-action: manipulation;
  transform: translate(var(--cookie-x, 0), var(--cookie-y, 0));
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
}

.project-cookie-visual {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 90px;
  height: 90px;
  margin: 0 auto 3px;
  opacity: 1;
  filter: drop-shadow(0 7px 5px rgb(89 57 23 / 15%));
  transform: rotate(var(--cookie-tilt, 0deg));
  transform-origin: 50% 56%;
  transition:
    transform 220ms cubic-bezier(.2, .8, .2, 1),
    filter 220ms ease,
    opacity 160ms ease;
}

.timeline-cookie,
.project-cookie-shell {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.project-cookie-logo {
  position: relative;
  z-index: 1;
  display: block;
  width: 38px;
  height: 38px;
  object-fit: contain;
}

.project-cookie-aicando .project-cookie-logo {
  width: 46px;
  height: 46px;
}

.project-cookie-aiy .project-cookie-logo {
  width: 45px;
  height: 45px;
}

.project-cookie-markdowncando .project-cookie-logo {
  width: 36px;
  height: 36px;
}

.project-cookie::after {
  position: absolute;
  top: 78px;
  left: 50%;
  z-index: 0;
  width: 66px;
  height: 14px;
  border-radius: 50%;
  background: rgb(111 69 25 / 14%);
  filter: blur(6px);
  opacity: 0;
  content: "";
  transform: translateX(-50%) scale(.55);
  transition: opacity 180ms ease, transform 220ms ease;
}

.project-cookie-label {
  display: block;
  width: 100%;
  overflow: hidden;
  color: var(--home-secondary);
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 160ms ease, transform 220ms ease;
}

.project-cookie.is-active .project-cookie-visual {
  filter: drop-shadow(0 13px 8px rgb(89 57 23 / 21%));
}

.project-cookie.is-pinned .project-cookie-visual {
  transform:
    translateY(-8px)
    rotate(0deg)
    scale(1.045);
  animation: cookie-jolt 480ms cubic-bezier(.2, .8, .2, 1);
}

.project-cookie.is-pinned::after {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}

.project-cookie.is-active .project-cookie-label {
  color: var(--home-coral-hover);
}

.project-cookie.is-pinned .project-cookie-label {
  transform: translateY(1px);
}

.project-cookie:focus-visible {
  border-radius: 16px;
  outline: 2px solid var(--home-coral);
  outline-offset: 2px;
}

.project-tray-stage.has-selection .project-cookie:not(.is-active) .project-cookie-visual {
  opacity: .7;
}

.tray-maker-stamp {
  position: absolute;
  right: 15px;
  bottom: 12px;
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 1px solid color-mix(in srgb, var(--home-coral) 72%, var(--tray-rim-mid));
  border-radius: 50%;
  background: color-mix(in srgb, var(--tray-paper) 88%, transparent);
  opacity: .86;
  transition: transform 260ms cubic-bezier(.2, .8, .2, 1);
}

.tray-maker-stamp img {
  display: block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
}

.project-ticket {
  position: absolute;
  top: calc(100% + 3px);
  left: 50%;
  z-index: 1;
  display: block;
  width: min(92%, 590px);
  aspect-ratio: 16 / 9;
  min-height: 0;
  padding: 9px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--tray-rim-dark) 76%, var(--home-line));
  border-radius: 23px;
  color: #fff;
  background:
    linear-gradient(145deg, rgb(255 255 255 / 66%), transparent 22%),
    linear-gradient(145deg, var(--tray-rim-light), var(--tray-rim-mid) 58%, var(--tray-rim-dark));
  box-shadow:
    0 28px 44px var(--tray-shadow),
    0 4px 8px rgb(80 55 25 / 10%),
    inset 0 1px 1px rgb(255 255 255 / 72%);
  transform: translateX(-50%) rotate(-.18deg);
  transform-origin: 50% 0;
  scroll-margin-block: 88px 20px;
  isolation: isolate;
}

.project-ticket-media {
  position: absolute;
  z-index: 0;
  inset: 9px;
  display: block;
  width: auto;
  height: auto;
  overflow: hidden;
  border-radius: 14px;
  background: #181715;
}

.project-ticket-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 280ms cubic-bezier(.2, .8, .2, 1);
}

.project-ticket:hover .project-ticket-image {
  transform: scale(1.018);
}

.project-ticket-image.is-contained {
  padding: clamp(38px, 9%, 62px);
  background: color-mix(in srgb, var(--home-surface) 90%, #e7e0d5);
  object-fit: contain;
}

.project-ticket-overlay {
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: 25%;
  height: auto;
  aspect-ratio: 1;
  border: 1px solid rgb(255 254 251 / 74%);
  border-radius: 13px;
  box-shadow: 0 9px 24px rgb(0 0 0 / 22%);
  object-fit: cover;
}

.project-ticket-link {
  position: absolute;
  z-index: 3;
  top: 22px;
  right: 22px;
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 13px 0 15px;
  border: 1px solid color-mix(in srgb, var(--tray-rim-dark) 82%, #6f4d20);
  border-radius: 999px;
  color: #4e3518;
  background:
    linear-gradient(180deg, rgb(255 251 235 / 96%), rgb(238 213 165 / 96%));
  box-shadow:
    0 5px 13px rgb(45 27 8 / 18%),
    inset 0 1px 0 rgb(255 255 255 / 88%),
    inset 0 -1px 0 rgb(126 88 38 / 15%);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .015em;
  text-decoration: none;
  white-space: nowrap;
  backdrop-filter: blur(6px);
  transition: color 180ms ease, background 180ms ease, box-shadow 180ms ease, transform 180ms ease;
}

@keyframes cookie-jolt {
  0%, 100% { transform: translateY(-8px) rotate(0deg) scale(1.045); }
  22% { transform: translateY(-10px) rotate(-2.2deg) scale(1.045); }
  44% { transform: translateY(-7px) rotate(1.6deg) scale(1.045); }
  66% { transform: translateY(-8px) rotate(-.6deg) scale(1.045); }
}

.project-ticket-link:hover {
  color: #38230f;
  background: linear-gradient(180deg, #fffdf2, #f4dca9);
  box-shadow:
    0 7px 17px rgb(45 27 8 / 24%),
    inset 0 1px 0 #fff;
  transform: translateY(-1px) scale(1.015);
}

.project-ticket-link-arrow {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  transition: transform 180ms ease;
}

.project-ticket-link:hover .project-ticket-link-arrow {
  transform: translate(1px, -1px);
}

.project-ticket-link:focus-visible {
  outline: 2px solid var(--home-coral);
  outline-offset: 3px;
}

.tray-ticket-enter-active {
  transition:
    opacity 140ms ease,
    transform 420ms cubic-bezier(.16, .84, .24, 1);
}

.tray-ticket-leave-active {
  transition:
    opacity 120ms ease,
    transform 260ms cubic-bezier(.55, .06, .82, .24);
}

.tray-ticket-enter-from,
.tray-ticket-leave-to {
  opacity: .96;
  transform: translate(-50%, calc(-100% + 10px)) rotate(.15deg) scale(.985);
}

:global(.dark .timeline-cookie),
:global(.dark .project-cookie-shell) {
  filter: brightness(.76) saturate(.82);
}

.project-tray-figure figcaption {
  margin-top: -4px;
  color: var(--home-muted);
  font-size: 11px;
  text-align: center;
}

.home-section {
  padding-top: 72px;
  padding-bottom: 72px;
  scroll-margin-top: 84px;
}

.home-section.directions {
  position: relative;
  z-index: 0;
  padding-top: clamp(24px, 2.5vw, 30px);
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

.direction-icon-aicando {
  position: relative;
  background: transparent;
}

.direction-aicando-cookie,
.direction-aicando-logo {
  position: absolute;
  display: block;
  object-fit: contain;
}

.direction-aicando-cookie {
  inset: 0;
  width: 44px;
  height: 44px;
}

.direction-aicando-logo {
  inset: 50% auto auto 50%;
  width: 22px;
  height: 22px;
  transform: translate(-50%, -50%);
}

:global(.dark .direction-aicando-cookie) {
  filter: brightness(.76) saturate(.82);
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

.home-tools-heading {
  align-items: center;
}

.home-tools-heading > div {
  display: flex;
  align-items: baseline;
  gap: 24px;
}

.home-tools-heading > a {
  color: var(--home-coral-hover);
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

.home-tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.home-tool-grid > a {
  position: relative;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  min-height: 122px;
  border: 1px solid var(--home-line);
  border-radius: 16px;
  padding: 18px;
  color: var(--home-ink);
  background: color-mix(in srgb, var(--home-surface) 82%, transparent);
  text-decoration: none;
  transition: border-color 180ms, background-color 180ms, transform 180ms;
}

.home-tool-grid > a:hover {
  border-color: color-mix(in srgb, var(--home-coral) 58%, var(--home-line));
  background: var(--home-surface);
  transform: translateY(-2px);
}

.home-tool-mark {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  color: var(--home-coral-hover);
  background: color-mix(in srgb, var(--home-coral) 11%, var(--home-surface));
  font-size: 18px;
  font-weight: 650;
}

.home-tool-mark img {
  display: block;
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 14px;
  transform: rotate(0deg);
  transition: transform 520ms cubic-bezier(0.22, 0.61, 0.36, 1);
}

.home-tool-punctuation:hover .home-tool-mark img {
  transform: rotate(360deg);
}

.home-tool-copy {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.home-tool-copy small {
  color: var(--home-muted);
  font-size: 10px;
}

.home-tool-copy strong {
  margin-top: 4px;
  font-size: 15px;
  font-weight: 600;
}

.home-tool-copy > span {
  margin-top: 5px;
  color: var(--home-secondary);
  font-size: 12px;
  line-height: 1.55;
}

.home-tool-arrow {
  color: var(--home-coral-hover);
  font-size: 15px;
}

.primary-action:focus-visible,
.text-action:focus-visible,
.direction-item:focus-visible,
.popular-list a:focus-visible,
.home-tools-heading > a:focus-visible,
.home-tool-grid > a:focus-visible {
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
    transform: none;
  }

  .hero-copy h1 {
    max-width: none;
  }

  .project-tray-figure {
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
    padding-bottom: 16px;
  }

  .eyebrow {
    margin-bottom: 16px;
  }

  .hero-copy h1 {
    font-size: clamp(42px, 12vw, 54px);
  }

  .project-tray-figure {
    width: min(350px, 100%);
  }

  .project-tray-stage {
    min-height: 0;
  }

  .project-plate-stack {
    width: min(100%, 340px);
  }

  .project-tray {
    width: 100%;
    aspect-ratio: .71;
    padding: 12px;
    border-radius: 26px;
  }

  .project-tray::before {
    inset: 5px;
    border-radius: 21px;
  }

  .project-tray-paper {
    border-radius: 17px;
  }

  .project-cookie-grid {
    inset: 25px 14px 40px;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(3, minmax(0, 1fr));
    gap: 0 4px;
  }

  .project-cookie {
    width: 104px;
    min-height: 104px;
  }

  .project-cookie-visual {
    width: 76px;
    height: 76px;
    margin-bottom: 2px;
  }

  .project-cookie-logo {
    width: 31px;
    height: 31px;
  }

  .project-cookie-aicando .project-cookie-logo {
    width: 38px;
    height: 38px;
  }

  .project-cookie-aiy .project-cookie-logo {
    width: 37px;
    height: 37px;
  }

  .project-cookie-markdowncando .project-cookie-logo {
    width: 30px;
    height: 30px;
  }

  .project-cookie::after {
    top: 66px;
    width: 58px;
  }

  .project-cookie-label {
    font-size: 11px;
  }

  .tray-maker-stamp {
    right: 12px;
    bottom: 10px;
    width: 34px;
    height: 34px;
  }

  .tray-maker-stamp img {
    width: 24px;
    height: 24px;
  }

  .project-ticket {
    width: 96%;
    aspect-ratio: 16 / 9;
    min-height: 0;
  }

  .project-ticket-link {
    top: 17px;
    right: 17px;
    min-height: 34px;
    padding: 0 11px 0 13px;
    font-size: 11px;
  }

  .project-ticket-overlay {
    right: 12px;
    bottom: 12px;
    border-radius: 10px;
  }

  .project-tray-figure figcaption {
    margin-top: 0;
  }

  .home-section {
    padding-top: 56px;
    padding-bottom: 56px;
  }

  .direction-grid,
  .popular-list,
  .home-tool-grid {
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

  .home-tools-heading {
    align-items: flex-end;
  }

  .home-tools-heading > div {
    display: block;
  }

  .home-tools-heading > div p {
    margin-top: 6px;
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
  .project-cookie-visual,
  .project-tray,
  .project-cookie.is-pinned .project-cookie-visual,
  .project-cookie::after,
  .tray-maker-stamp,
  .primary-action,
  .tray-ticket-enter-active,
  .tray-ticket-leave-active {
    animation: none !important;
    transition: none;
  }
}
</style>
