<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { MiuixTextType } from 'miuix-vue'
import type { ExtendedIcon, MiuixIconWeight } from 'miuix-vue/icons'
import {
  MiuixBasicComponent,
  MiuixButton,
  MiuixCard,
  MiuixDivider,
  MiuixIcon,
  MiuixIconButton,
  MiuixProgressIndicator,
  MiuixSearchBar,
  MiuixSmallTitle,
  MiuixSurface,
  MiuixText,
  showSnackbar,
  version,
} from 'miuix-vue'
import {
  Add,
  Alarm,
  Album,
  ChevronForward,
  Copy,
  Delete,
  Download,
  Favorites,
  Folder,
  Image,
  Layers,
  Lock,
  Music,
  Photos,
  Settings,
  Share,
  Theme,
} from 'miuix-vue/icons'

// ---- Search --------------------------------------------------------------

const query = ref('')
const expanded = ref(false)
const searchItems = [
  { title: 'Button 按钮', page: '控件' },
  { title: 'Slider 滑块', page: '控件' },
  { title: 'Card 卡片', page: '概览' },
  { title: 'Dialog 对话框', page: '设置' },
  { title: 'Snackbar 消息条', page: '设置' },
  { title: 'TabRow 选项卡', page: '控件' },
]
const filteredItems = computed(() => {
  const keyword = query.value.trim().toLowerCase()
  if (!keyword) return searchItems
  return searchItems.filter((item) => item.title.toLowerCase().includes(keyword))
})

function pickSearchItem(item: { title: string; page: string }): void {
  query.value = item.title
  expanded.value = false
  showSnackbar({ message: `「${item.title}」位于${item.page}页` })
}

// ---- Hero ----------------------------------------------------------------

function scrollToIcons(): void {
  document.getElementById('icon-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const basicClicks = ref(0)

// ---- Icon gallery --------------------------------------------------------

const actionIcons: Array<{ icon: ExtendedIcon; label: string }> = [
  { icon: Share, label: '分享' },
  { icon: Favorites, label: '收藏' },
  { icon: Copy, label: '复制' },
  { icon: Download, label: '下载' },
  { icon: Delete, label: '删除' },
]

const galleryIcons: Array<{ icon: ExtendedIcon; label: string }> = [
  { icon: Add, label: 'Add' },
  { icon: Alarm, label: 'Alarm' },
  { icon: Album, label: 'Album' },
  { icon: Folder, label: 'Folder' },
  { icon: Image, label: 'Image' },
  { icon: Lock, label: 'Lock' },
  { icon: Music, label: 'Music' },
  { icon: Photos, label: 'Photos' },
  { icon: Settings, label: 'Settings' },
  { icon: Theme, label: 'Theme' },
  { icon: Favorites, label: 'Favorites' },
  { icon: Share, label: 'Share' },
]

const weights: MiuixIconWeight[] = ['light', 'normal', 'regular', 'medium', 'demibold']
const weightIndex = ref(2)
const activeWeight = computed(() => weights[weightIndex.value])

function cycleWeight(): void {
  weightIndex.value = (weightIndex.value + 1) % weights.length
}

function pickIcon(item: { icon: ExtendedIcon; label: string }): void {
  showSnackbar({ message: `${item.label} · ${activeWeight.value}` })
}

// ---- Typography ----------------------------------------------------------

const textStyles: Array<{ type: MiuixTextType; sample: string; label: string }> = [
  { type: 'title1', sample: '标题一 Title 1', label: 'title1 / 32' },
  { type: 'title3', sample: '标题三 Title 3', label: 'title3 / 20' },
  { type: 'subtitle', sample: '小标题 Subtitle', label: 'subtitle / 14' },
  { type: 'body1', sample: '正文 Body 1', label: 'body1 / 16' },
  { type: 'body2', sample: '辅助正文 Body 2', label: 'body2 / 14' },
  { type: 'footnote2', sample: '脚注 Footnote 2', label: 'footnote2 / 11' },
]
const headingStyles = textStyles.slice(0, 3)
const bodyStyles = textStyles.slice(3)

// ---- Progress ------------------------------------------------------------

const progress = ref(0)
let rafId = 0
let startTime = 0

function tick(time: number): void {
  if (!startTime) startTime = time
  const phase = ((time - startTime) % 2400) / 1200
  progress.value = phase <= 1 ? phase : 2 - phase
  rafId = requestAnimationFrame(tick)
}

const progressPercent = computed(() => Math.round(progress.value * 100))

onMounted(() => {
  rafId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
})
</script>

<template>
  <div class="demo-page demo-page--fab">
    <section class="demo-section">
      <MiuixSearchBar
        v-model="query"
        v-model:expanded="expanded"
        label="搜索组件"
        cancel-text="取消"
        class="demo-card"
      >
        <MiuixBasicComponent
          v-for="item in filteredItems"
          :key="item.title"
          :title="item.title"
          :summary="`位于「${item.page}」页`"
          clickable
          @click="pickSearchItem(item)"
        />
        <MiuixBasicComponent
          v-if="filteredItems.length === 0"
          title="没有匹配的组件"
          summary="换个关键词试试"
          disabled
        />
      </MiuixSearchBar>

      <!-- Hero -->
      <MiuixCard
        class="hero demo-card"
        show-indication
        style="
          --m-card-color: var(--m-color-primary);
          --m-card-content-color: var(--m-color-on-primary);
        "
      >
        <div class="hero__body">
          <MiuixIcon class="hero__glyph" :icon="Theme" :size="132" color="currentColor" />
          <MiuixText
            type="footnote2"
            weight="semibold"
            color="var(--m-color-on-primary)"
            class="hero__eyebrow"
          >
            MIUIX DESIGN · VUE 3
          </MiuixText>
          <MiuixText type="title1" weight="bold" color="var(--m-color-on-primary)">
            Miuix Vue
          </MiuixText>
          <MiuixText type="body2" color="var(--m-color-on-primary)" class="hero__desc">
            把 HyperOS 的细腻动效带进 Web。<span class="nowrap">31 个组件</span>、<span
              class="nowrap"
              >156 个图标</span
            >，明暗主题随时切换。
          </MiuixText>
          <div class="hero__actions">
            <MiuixButton
              type="primary"
              @click="showSnackbar({ message: '欢迎使用 Miuix Vue 演示 👋', actionLabel: '好的' })"
            >
              试试 Snackbar
            </MiuixButton>
            <MiuixButton @click="scrollToIcons">浏览图标</MiuixButton>
          </div>
        </div>
      </MiuixCard>

      <!-- Surface stats -->
      <div class="stats">
        <MiuixSurface class="stat" :radius="16" color="var(--m-color-surface-container)">
          <MiuixText type="title3" weight="semibold">31</MiuixText>
          <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-summary)">
            组件
          </MiuixText>
        </MiuixSurface>
        <MiuixSurface class="stat" :radius="16" color="var(--m-color-surface-container)">
          <MiuixText type="title3" weight="semibold">156</MiuixText>
          <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-summary)">
            图标
          </MiuixText>
        </MiuixSurface>
        <MiuixSurface class="stat" :radius="16" color="var(--m-color-surface-container)">
          <MiuixText type="title3" weight="semibold">14</MiuixText>
          <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-summary)">
            字号
          </MiuixText>
        </MiuixSurface>
      </div>
    </section>

    <!-- Typography -->
    <section class="demo-section">
      <MiuixSmallTitle text="标题排版" />
      <MiuixCard class="demo-card demo-card--pad">
        <div v-for="(item, index) in headingStyles" :key="item.type">
          <MiuixDivider v-if="index > 0" class="demo-divider" />
          <div class="type-row">
            <MiuixText :type="item.type">{{ item.sample }}</MiuixText>
            <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-actions)">
              {{ item.label }}
            </MiuixText>
          </div>
        </div>
      </MiuixCard>
    </section>

    <section class="demo-section">
      <MiuixSmallTitle text="正文排版" />
      <MiuixCard class="demo-card demo-card--pad">
        <div v-for="(item, index) in bodyStyles" :key="item.type">
          <MiuixDivider v-if="index > 0" class="demo-divider" />
          <div class="type-row">
            <MiuixText :type="item.type">{{ item.sample }}</MiuixText>
            <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-actions)">
              {{ item.label }}
            </MiuixText>
          </div>
        </div>
      </MiuixCard>
    </section>

    <!-- Basic components -->
    <section class="demo-section">
      <MiuixSmallTitle text="基础行" />
      <MiuixCard class="demo-card">
        <MiuixBasicComponent
          title="基础组件"
          summary="标题、摘要与 start / end / bottom 插槽"
          clickable
          @click="basicClicks += 1"
        >
          <template #start>
            <MiuixIcon :icon="Layers" :size="24" />
          </template>
          <template #end>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">
              {{ basicClicks }} 次
            </MiuixText>
            <MiuixIcon
              :icon="ChevronForward"
              :size="18"
              color="var(--m-color-on-surface-variant-actions)"
            />
          </template>
          <template #bottom>
            <div class="basic-bottom">
              <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
                底部插槽 · 进度 {{ progressPercent }}%
              </MiuixText>
              <MiuixProgressIndicator type="linear" :progress="progress" :size="4" />
            </div>
          </template>
        </MiuixBasicComponent>
        <MiuixDivider />
        <MiuixBasicComponent title="仅展示的行" summary="未开启 clickable，不会响应点击">
          <template #start>
            <MiuixIcon :icon="Lock" :size="24" color="var(--m-color-on-surface-variant-actions)" />
          </template>
        </MiuixBasicComponent>
      </MiuixCard>
    </section>

    <!-- Buttons & icons -->
    <section class="demo-section">
      <MiuixSmallTitle text="按钮与图标" />
      <MiuixCard class="demo-card demo-card--pad">
        <div class="demo-btn-row">
          <MiuixButton @click="showSnackbar({ message: '默认按钮' })">默认</MiuixButton>
          <MiuixButton type="primary" @click="showSnackbar({ message: '主要按钮' })">
            主要
          </MiuixButton>
        </div>
        <div class="demo-btn-row">
          <MiuixButton disabled>禁用</MiuixButton>
          <MiuixButton type="primary" disabled>禁用</MiuixButton>
        </div>

        <MiuixDivider class="demo-divider" />

        <div class="icon-button-row">
          <MiuixIconButton
            v-for="item in actionIcons"
            :key="item.label"
            :aria-label="item.label"
            @click="showSnackbar({ message: `点击了「${item.label}」` })"
          >
            <MiuixIcon :icon="item.icon" :size="24" />
          </MiuixIconButton>
        </div>
      </MiuixCard>
    </section>

    <!-- Icon gallery -->
    <section class="demo-section">
      <MiuixCard id="icon-gallery" class="demo-card demo-card--pad">
        <div class="gallery-head">
          <div class="gallery-copy">
            <MiuixText type="title4" weight="medium">图标库</MiuixText>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
              156 个图标 × 5 种字重
            </MiuixText>
          </div>
          <button type="button" class="weight-chip" @click="cycleWeight">
            {{ activeWeight }}
          </button>
        </div>
        <div class="icon-grid">
          <button
            v-for="item in galleryIcons"
            :key="item.label"
            type="button"
            class="icon-cell"
            @click="pickIcon(item)"
          >
            <MiuixIcon :icon="item.icon" :weight="activeWeight" :size="26" />
            <span>{{ item.label }}</span>
          </button>
        </div>
      </MiuixCard>
    </section>

    <!-- Card interactions -->
    <section class="demo-section">
      <MiuixSmallTitle text="卡片交互" />
      <div class="press-row">
        <MiuixCard class="press-card" press-feedback="sink" show-indication>
          <MiuixText type="title4" weight="medium">Sink</MiuixText>
          <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
            按下时轻微下沉
          </MiuixText>
        </MiuixCard>
        <MiuixCard class="press-card" press-feedback="tilt" show-indication>
          <MiuixText type="title4" weight="medium">Tilt</MiuixText>
          <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
            跟着指针倾斜
          </MiuixText>
        </MiuixCard>
      </div>
      <MiuixCard
        class="demo-card demo-card--pad"
        press-feedback="sink"
        show-indication
        @long-press="showSnackbar({ message: '长按触发了 Card 的 long-press 事件' })"
      >
        <MiuixText type="title4" weight="medium">长按这张卡片</MiuixText>
        <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
          持续按住 500ms 查看反馈
        </MiuixText>
      </MiuixCard>
    </section>

    <!-- Progress -->
    <section class="demo-section">
      <MiuixSmallTitle text="进度" />
      <MiuixCard class="demo-card demo-card--pad">
        <div class="progress-block">
          <div class="demo-row--between">
            <MiuixText type="body2">线性进度</MiuixText>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">
              {{ progressPercent }}%
            </MiuixText>
          </div>
          <MiuixProgressIndicator type="linear" :progress="progress" />
        </div>
        <div class="progress-row">
          <div class="progress-cell">
            <MiuixProgressIndicator type="circular" :progress="progress" />
            <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-summary)">
              环形
            </MiuixText>
          </div>
          <div class="progress-cell">
            <MiuixProgressIndicator
              type="infinite"
              color="var(--m-color-on-background-variant)"
              :size="28"
            />
            <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-summary)">
              无限
            </MiuixText>
          </div>
          <div class="progress-cell">
            <MiuixProgressIndicator type="circular" :progress="0.72" :size="36" :stroke-width="4" />
            <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-summary)">
              固定 72%
            </MiuixText>
          </div>
        </div>
      </MiuixCard>
    </section>

    <MiuixText
      type="footnote2"
      align="center"
      color="var(--m-color-on-surface-variant-actions)"
      class="footer-note"
    >
      Miuix Vue v{{ version }} · 设计语言来自 Xiaomi HyperOS
    </MiuixText>
  </div>
</template>

<style scoped>
.hero :deep(.m-card) {
  position: relative;
  padding: 20px;
}

.hero__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-start;
}

.hero__glyph {
  position: absolute;
  right: -44px;
  bottom: -48px;
  z-index: 0;
  opacity: 0.14;
  pointer-events: none;
}

/* White CTA on the blue hero — the stock primary button would vanish here. */
.hero :deep(.m-button--primary) {
  background: var(--m-color-on-primary);
  color: var(--m-color-primary);
}

.hero :deep(.m-button--primary::after) {
  background: var(--m-color-primary);
}

.hero__eyebrow {
  letter-spacing: 0.08em;
  margin-bottom: 2px;
}

.hero__desc {
  max-width: 34ch;
  margin: 6px 0 16px;
  opacity: 0.86;
}

.hero__desc .nowrap {
  white-space: nowrap;
}

.hero__actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stats {
  display: flex;
  gap: 12px;
  margin: 0 12px 12px;
}

.stat {
  flex: 1;
  min-width: 0;
  padding: 14px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.type-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  padding: 9px 0;
}

.type-row > :last-child {
  flex: none;
}

.type-row:first-child {
  padding-top: 0;
}

.type-row:last-child {
  padding-bottom: 0;
}

.basic-bottom {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 12px 12px;
}

.icon-button-row {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}

.gallery-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.gallery-copy {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.weight-chip {
  border: 0;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: var(--m-text-footnote1-size);
  font-weight: 600;
  color: var(--m-color-on-secondary-variant);
  background: var(--m-color-secondary-variant);
  cursor: pointer;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 6px;
}

.icon-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 4px 8px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  color: var(--m-color-on-surface-container);
  cursor: pointer;
  transition: background 120ms linear;
}

.icon-cell span {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: var(--m-text-footnote2-size);
  color: var(--m-color-on-surface-variant-summary);
}

.icon-cell:hover {
  background: var(--m-color-secondary-variant);
}

.press-row {
  display: flex;
  gap: 12px;
  margin: 0 12px 12px;
}

.progress-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.progress-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.progress-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-height: 60px;
  justify-content: center;
}

.footer-note {
  display: block;
  padding: 4px 16px 0;
}

.demo-page--fab {
  padding-bottom: 96px;
}

#icon-gallery {
  scroll-margin-top: 64px;
}

@media (min-width: 900px) {
  .stats,
  .press-row {
    margin: 0 0 16px;
  }

  .demo-page--fab {
    padding-bottom: 48px;
  }

  .footer-note {
    padding: 8px 0 0;
  }
}

@media (min-width: 1024px) {
  .footer-note {
    column-span: all;
    padding-top: 24px;
  }
}
</style>
