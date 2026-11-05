<script setup lang="ts">
import { ref } from 'vue'
import {
  MiuixBasicComponent,
  MiuixCard,
  MiuixCheckbox,
  MiuixColorPicker,
  MiuixDivider,
  MiuixInput,
  MiuixNumberPicker,
  MiuixRadioButton,
  MiuixRangeSlider,
  MiuixSlider,
  MiuixSmallTitle,
  MiuixSwitch,
  MiuixTabRow,
  MiuixText,
} from 'miuix-vue'

// ---- TabRow --------------------------------------------------------------

const tab = ref(0)
const tabs = ['设计', '动效', '开发']
const tabTexts = [
  '圆角、留白与层级都来自 miuix 的设计令牌。',
  '弹簧动画由 motion-v 驱动，按压、切换都有回弹。',
  'Vue 3 + TypeScript，按需引入，样式以 CSS 变量暴露。',
]

const contourTab = ref(0)
const contourTabs = ['标准', '紧凑', '宽松']

// ---- Input ---------------------------------------------------------------

const deviceName = ref('Miuix 桌面')
const nickname = ref('')
const note = ref('')

// ---- Switch / Checkbox ---------------------------------------------------

const wifi = ref(true)
const sync = ref(true)
const autoBrightness = ref(false)

// ---- RadioButton ---------------------------------------------------------

const plans = [
  { title: '基础版', summary: '单设备 · 2 GB 云空间' },
  { title: '标准版', summary: '三设备 · 50 GB 云空间' },
  { title: '专业版', summary: '不限设备 · 200 GB 云空间' },
]
const planIndex = ref(1)

// ---- Slider --------------------------------------------------------------

const volume = ref(42)
const level = ref(6)
const range = ref<[number, number]>([25, 75])

// ---- NumberPicker / ColorPicker -----------------------------------------

const hour = ref(9)
const minute = ref(41)
const pad2 = (value: number): string => String(value).padStart(2, '0')

const accent = ref('#3482ff')
</script>

<template>
  <div class="demo-page">
    <section class="demo-section">
      <!-- TabRow -->
      <MiuixSmallTitle text="选项卡" />
      <MiuixCard class="demo-card demo-card--pad">
        <MiuixTabRow v-model="tab" :tabs="tabs" />
        <div class="tab-caption">
          <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
            {{ tabTexts[tab] }}
          </MiuixText>
        </div>
        <MiuixDivider class="demo-divider" />
        <MiuixTabRow v-model="contourTab" :tabs="contourTabs" contour />
        <div class="tab-caption">
          <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-actions)">
            轮廓样式 · {{ contourTabs[contourTab] }}
          </MiuixText>
        </div>
      </MiuixCard>
    </section>

    <!-- Input -->
    <section class="demo-section">
      <MiuixSmallTitle text="输入框" />
      <MiuixCard class="demo-card demo-card--pad">
        <div class="demo-stack">
          <MiuixInput v-model="deviceName" label="设备名称" />
          <MiuixInput
            v-model="nickname"
            label="昵称（标签作占位符）"
            use-label-as-placeholder
            single-line
          />
          <MiuixInput v-model="note" label="备注" :single-line="false" />
          <MiuixText type="footnote2" color="var(--m-color-on-surface-variant-summary)">
            备注 {{ note.length }} 字 · 昵称：{{ nickname || '未填写' }}
          </MiuixText>
        </div>
      </MiuixCard>
    </section>

    <!-- Switch / Checkbox -->
    <section class="demo-section">
      <MiuixSmallTitle text="开关与复选" />
      <MiuixCard class="demo-card">
        <div class="control-row">
          <div class="control-row__text">
            <MiuixText type="headline1" weight="medium">WLAN</MiuixText>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
              Miuix-5G · 已连接
            </MiuixText>
          </div>
          <MiuixSwitch v-model="wifi" />
        </div>
        <MiuixDivider />
        <div class="control-row">
          <div class="control-row__text">
            <MiuixText type="headline1" weight="medium">自动同步</MiuixText>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
              在后台同步笔记与相册
            </MiuixText>
          </div>
          <MiuixCheckbox v-model="sync" />
        </div>
        <MiuixDivider />
        <div class="control-row">
          <div class="control-row__text">
            <MiuixText type="headline1" weight="medium">自动亮度</MiuixText>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
              根据环境光调节屏幕
            </MiuixText>
          </div>
          <MiuixSwitch v-model="autoBrightness" disabled />
        </div>
        <MiuixDivider />
        <div class="control-row">
          <div class="control-row__text">
            <MiuixText
              type="headline1"
              weight="medium"
              color="var(--m-color-disabled-on-secondary-variant)"
            >
              已勾选（禁用）
            </MiuixText>
            <MiuixText type="body2" color="var(--m-color-disabled-on-secondary-variant)">
              disabled 状态下的勾选框
            </MiuixText>
          </div>
          <MiuixCheckbox :model-value="true" disabled />
        </div>
      </MiuixCard>
    </section>

    <!-- RadioButton -->
    <section class="demo-section">
      <MiuixSmallTitle text="单选" />
      <MiuixCard class="demo-card">
        <div v-for="(plan, index) in plans" :key="plan.title">
          <MiuixDivider v-if="index > 0" />
          <MiuixBasicComponent
            :title="plan.title"
            :summary="plan.summary"
            clickable
            @click="planIndex = index"
          >
            <template #end>
              <MiuixRadioButton :model-value="planIndex === index" @click="planIndex = index" />
            </template>
          </MiuixBasicComponent>
        </div>
      </MiuixCard>
    </section>

    <!-- Slider -->
    <section class="demo-section">
      <MiuixSmallTitle text="滑块" />
      <MiuixCard class="demo-card demo-card--pad">
        <div class="demo-stack slider-stack">
          <div class="slider-item">
            <div class="demo-row--between">
              <MiuixText type="body2">音量</MiuixText>
              <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">
                {{ Math.round(volume) }}%
              </MiuixText>
            </div>
            <MiuixSlider v-model="volume" />
          </div>

          <div class="slider-item">
            <div class="demo-row--between">
              <MiuixText type="body2">档位（带关键点）</MiuixText>
              <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">
                {{ Math.round(level) }} / 10
              </MiuixText>
            </div>
            <MiuixSlider v-model="level" :min="0" :max="10" :step="1" show-key-points />
          </div>

          <div class="slider-item">
            <div class="demo-row--between">
              <MiuixText type="body2">区间</MiuixText>
              <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">
                {{ Math.round(range[0]) }} - {{ Math.round(range[1]) }}
              </MiuixText>
            </div>
            <MiuixRangeSlider v-model="range" :key-points="[0, 25, 50, 75, 100]" show-key-points />
          </div>

          <div class="slider-item">
            <MiuixText type="body2">禁用</MiuixText>
            <MiuixSlider :model-value="60" disabled />
          </div>
        </div>
      </MiuixCard>
    </section>

    <!-- NumberPicker -->
    <section class="demo-section">
      <MiuixSmallTitle text="数字滚轮" />
      <MiuixCard class="demo-card demo-card--pad">
        <div class="time-head">
          <MiuixText type="title4" weight="medium">闹钟时间</MiuixText>
          <MiuixText type="body2" color="var(--m-color-on-surface-variant-summary)">
            上下滚动或拖拽
          </MiuixText>
        </div>
        <div class="time-row">
          <MiuixNumberPicker
            v-model="hour"
            :min="0"
            :max="23"
            :label="pad2"
            wrap-around
            class="time-col"
          />
          <MiuixText type="title2" weight="semibold" class="time-colon">:</MiuixText>
          <MiuixNumberPicker
            v-model="minute"
            :min="0"
            :max="59"
            :label="pad2"
            wrap-around
            class="time-col"
          />
        </div>
      </MiuixCard>
    </section>

    <!-- ColorPicker -->
    <section class="demo-section">
      <MiuixSmallTitle text="取色器" />
      <MiuixCard class="demo-card demo-card--pad">
        <div class="color-head">
          <div class="color-meta">
            <span class="color-swatch" :style="{ background: accent }" />
            <MiuixText type="body2">强调色</MiuixText>
          </div>
          <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">
            {{ accent }}
          </MiuixText>
        </div>
        <MiuixColorPicker v-model="accent" />
      </MiuixCard>
    </section>
  </div>
</template>

<style scoped>
.tab-caption {
  padding: 12px 2px 0;
}

.control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
}

.control-row__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.slider-stack {
  gap: 18px;
}

.slider-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.slider-item > .m-text:first-child {
  color: var(--m-color-on-surface-variant-summary);
}

.time-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 4px;
}

.time-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  --m-number-picker-hit-padding: 20px;
}

.time-col {
  flex: 1;
  min-width: 0;
}

.time-colon {
  margin-top: -2px;
}

.color-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.color-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-swatch {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--m-color-outline);
}
</style>
