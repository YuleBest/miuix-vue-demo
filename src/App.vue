<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { ExtendedIcon } from 'miuix-vue/icons'
import {
  MiuixBottomSheet,
  MiuixButton,
  MiuixCard,
  MiuixFloatingActionButton,
  MiuixIcon,
  MiuixIconButton,
  MiuixNavigationBar,
  MiuixScrollArea,
  MiuixSlider,
  MiuixSnackbarHost,
  MiuixSwitchPreference,
  MiuixText,
  MiuixTopAppBar,
  showSnackbar,
  useTheme,
  version,
} from 'miuix-vue'
import { Add, Close, GridView, Ok, Settings, Theme, Tune } from 'miuix-vue/icons'
import OverviewPage from './pages/OverviewPage.vue'
import ControlsPage from './pages/ControlsPage.vue'
import SettingsPage from './pages/SettingsPage.vue'

const pages = [OverviewPage, ControlsPage, SettingsPage]
const titles = ['概览', '控件', '设置']
const subtitles = ['组件与视觉总览', '表单与交互控件', '偏好设置与反馈']
const navItems = titles.map((label) => ({ label }))
const navIcons: ExtendedIcon[] = [GridView, Tune, Settings]

const navIndex = ref(0)
const activePage = computed(() => pages[navIndex.value])
const activeTitle = computed(() => titles[navIndex.value])
const activeSubtitle = computed(() => subtitles[navIndex.value])

// The shell switches from bottom navigation to a side rail at 900px.
const wideQuery = window.matchMedia('(min-width: 900px)')
const isWide = ref(wideQuery.matches)

function onWideChange(event: MediaQueryListEvent): void {
  isWide.value = event.matches
}

onMounted(() => wideQuery.addEventListener('change', onWideChange))
onBeforeUnmount(() => wideQuery.removeEventListener('change', onWideChange))

const scroller = ref<{
  getScrollTop: () => number
  setScrollTop: (top: number) => void
} | null>(null)

// Each tab keeps its own scroll position (same as the miuix example). Capture
// the outgoing tab before the DOM updates, restore it while the incoming page
// is still at opacity 0 so the view never visibly jumps to the top.
const scrollPositions = new Map<number, number>()

watch(
  navIndex,
  (_next, prev) => {
    scrollPositions.set(prev, scroller.value?.getScrollTop() ?? 0)
  },
  { flush: 'pre' },
)

function restoreScroll(): void {
  scroller.value?.setScrollTop(scrollPositions.get(navIndex.value) ?? 0)
}

// ---- Theme ---------------------------------------------------------------

const { theme, setTheme } = useTheme()

function toggleTheme(): void {
  setTheme(theme.value === 'light' ? 'dark' : 'light')
}

// ---- Bottom sheet (opened from the FAB) ----------------------------------

const sheetOpen = ref(false)
const focusMode = ref(true)
const brightness = ref(68)

function notifyFromSheet(close: () => void): void {
  close()
  showSnackbar({ message: '来自 BottomSheet 的 Snackbar 👋', actionLabel: '收到' })
}

// ---- Snackbar inset (clear the bottom navigation bar) --------------------

const navRef = ref<HTMLElement | null>(null)
let navObserver: ResizeObserver | null = null

function syncSnackbarInset(): void {
  const height = navRef.value?.offsetHeight ?? 0
  document.documentElement.style.setProperty('--m-snackbar-inset-bottom', `${height}px`)
}

onMounted(() => {
  syncSnackbarInset()
  if (navRef.value) {
    navObserver = new ResizeObserver(syncSnackbarInset)
    navObserver.observe(navRef.value)
  }
})

onBeforeUnmount(() => {
  navObserver?.disconnect()
  document.documentElement.style.removeProperty('--m-snackbar-inset-bottom')
})
</script>

<template>
  <div class="app">
    <aside class="app__rail" aria-label="侧边导航">
      <div class="rail__brand">
        <span class="rail__logo">
          <MiuixIcon :icon="Theme" :size="20" />
        </span>
        <div class="rail__brand-text">
          <span class="rail__name">Miuix Vue</span>
          <span class="rail__version">v{{ version }}</span>
        </div>
      </div>

      <nav class="rail__items">
        <button
          v-for="(item, index) in navItems"
          :key="item.label"
          type="button"
          class="rail__item"
          :class="{ 'rail__item--active': navIndex === index }"
          :aria-current="navIndex === index ? 'page' : undefined"
          @click="navIndex = index"
        >
          <MiuixIcon :icon="navIcons[index]" :size="22" />
          <span>{{ item.label }}</span>
        </button>
      </nav>

      <div class="rail__footer">31 个组件 · 156 个图标</div>
    </aside>

    <div class="app__main">
      <MiuixScrollArea ref="scroller" class="app__body">
        <MiuixTopAppBar :title="activeTitle" :subtitle="activeSubtitle" :large="!isWide">
          <template #actions>
            <MiuixIconButton aria-label="切换明暗主题" @click="toggleTheme">
              <MiuixIcon :icon="Theme" :size="24" />
            </MiuixIconButton>
          </template>
        </MiuixTopAppBar>

        <Transition name="page" mode="out-in" @enter="restoreScroll">
          <KeepAlive>
            <component :is="activePage" :key="navIndex" />
          </KeepAlive>
        </Transition>
      </MiuixScrollArea>

      <div ref="navRef" class="app__nav">
        <MiuixNavigationBar v-model="navIndex" :items="navItems">
          <template #icon="{ index }">
            <MiuixIcon :icon="navIcons[index]" :size="26" />
          </template>
        </MiuixNavigationBar>
      </div>
    </div>

    <MiuixFloatingActionButton
      v-if="navIndex === 0"
      class="app__fab"
      aria-label="打开快捷操作"
      @click="sheetOpen = true"
    >
      <MiuixIcon :icon="Add" :size="26" />
    </MiuixFloatingActionButton>
  </div>

  <MiuixBottomSheet v-model="sheetOpen" title="快捷操作">
    <template #start-action>
      <MiuixIconButton aria-label="关闭" @click="sheetOpen = false">
        <MiuixIcon :icon="Close" :size="24" />
      </MiuixIconButton>
    </template>
    <template #end-action>
      <MiuixIconButton aria-label="完成" @click="sheetOpen = false">
        <MiuixIcon :icon="Ok" :size="24" />
      </MiuixIconButton>
    </template>
    <template #default="{ close }">
      <div class="sheet-body">
        <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
          这是由右下角 FAB 打开的 BottomSheet，里面放了偏好行、滑块和按钮。
        </MiuixText>

        <MiuixCard class="sheet-card">
          <MiuixSwitchPreference
            v-model="focusMode"
            title="专注模式"
            summary="暂时屏蔽非重要通知"
          />
        </MiuixCard>

        <div class="sheet-slider">
          <div class="demo-row--between">
            <MiuixText type="body2">屏幕亮度</MiuixText>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">
              {{ Math.round(brightness) }}%
            </MiuixText>
          </div>
          <MiuixSlider v-model="brightness" />
        </div>

        <MiuixButton class="sheet-btn" type="primary" @click="notifyFromSheet(close)">
          发送通知
        </MiuixButton>
      </div>
    </template>
  </MiuixBottomSheet>

  <MiuixSnackbarHost />
</template>

<style scoped>
.sheet-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 2px 8px;
}

.sheet-card {
  margin: 0;
}

.sheet-slider {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0 4px;
}

.sheet-btn {
  width: 100%;
}
</style>
