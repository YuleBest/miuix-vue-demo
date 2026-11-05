<script setup lang="ts">
import { ref } from 'vue'
import type { MiuixDropdownItem, ThemeMode } from 'miuix-vue'
import {
  MiuixArrowPreference,
  MiuixBasicComponent,
  MiuixButton,
  MiuixCard,
  MiuixCheckboxPreference,
  MiuixDialog,
  MiuixDivider,
  MiuixDropdownPreference,
  MiuixIcon,
  MiuixInput,
  MiuixRadioButtonPreference,
  MiuixSmallTitle,
  MiuixSpinnerPreference,
  MiuixSwitchPreference,
  MiuixText,
  dismissNewestSnackbar,
  dismissOldestSnackbar,
  showSnackbar,
  useTheme,
  version,
} from 'miuix-vue'
import { ChevronForward, Image, Info, Theme } from 'miuix-vue/icons'

// ---- Theme ---------------------------------------------------------------

const { mode, setThemeMode } = useTheme()
const themeOptions: Array<{ value: ThemeMode; title: string; summary: string }> = [
  { value: 'system', title: '跟随系统', summary: '随系统的浅色 / 深色设置自动切换' },
  { value: 'light', title: '浅色', summary: '始终使用明亮的界面' },
  { value: 'dark', title: '深色', summary: '始终使用深色的界面' },
]

// ---- Preferences ---------------------------------------------------------

const wifi = ref(true)
const bluetooth = ref(false)
const autoUpdate = ref(true)

const refreshIndex = ref(2)
const refreshOptions = ['60 Hz', '90 Hz', '120 Hz', '智能切换']

const accentIndex = ref(0)
const accentItems: MiuixDropdownItem[] = [
  { text: '远山蓝', summary: '#3482FF', color: '#3482FF' },
  { text: '薄荷绿', summary: '#36D167', color: '#36D167' },
  { text: '落日橙', summary: '#FF5B29', color: '#FF5B29' },
  { text: '暖沙金', summary: '#FFB21D', color: '#FFB21D' },
]

// ---- Dialog --------------------------------------------------------------

const dialogOpen = ref(false)
const deviceName = ref('Miuix 桌面')
const deviceDraft = ref('')

function openDialog(): void {
  deviceDraft.value = deviceName.value
  dialogOpen.value = true
}

function saveDevice(close: () => void): void {
  const next = deviceDraft.value.trim()
  deviceName.value = next || '未命名设备'
  close()
  showSnackbar({ message: `设备名称已更新为「${deviceName.value}」` })
}

// ---- Snackbar ------------------------------------------------------------

function shortSnackbar(): void {
  showSnackbar({ message: '设置已保存' })
}

function longSnackbar(): void {
  showSnackbar({
    message: '这是一条 10 秒的长消息，适合放需要阅读一会儿的说明。',
    duration: 'long',
  })
}

async function actionSnackbar(): Promise<void> {
  const result = await showSnackbar({
    message: '已删除 3 个项目',
    actionLabel: '撤销',
    duration: 'long',
  })
  showSnackbar({ message: result === 'action' ? '已撤销删除' : '撤销已超时' })
}

function dismissibleSnackbar(): void {
  showSnackbar({
    message: '点击右侧的关闭按钮可以立即收起',
    withDismissAction: true,
    duration: 'long',
  })
}

function indefiniteSnackbar(): void {
  showSnackbar({
    message: '这条消息会一直停留，直到手动关闭',
    withDismissAction: true,
    duration: 'indefinite',
  })
}
</script>

<template>
  <div class="demo-page">
    <section class="demo-section">
      <!-- Theme -->
      <MiuixSmallTitle text="外观" />
      <MiuixCard class="demo-card">
        <div v-for="(option, index) in themeOptions" :key="option.value">
          <MiuixDivider v-if="index > 0" />
          <MiuixRadioButtonPreference
            :title="option.title"
            :summary="option.summary"
            :model-value="mode === option.value"
            @select="setThemeMode(option.value)"
          />
        </div>
      </MiuixCard>
    </section>

    <!-- Preferences -->
    <section class="demo-section">
      <MiuixSmallTitle text="连接与更新" />
      <MiuixCard class="demo-card">
        <MiuixSwitchPreference v-model="wifi" title="WLAN" summary="Miuix-5G · 已连接" />
        <MiuixDivider />
        <MiuixSwitchPreference v-model="bluetooth" title="蓝牙" summary="未连接设备" />
        <MiuixDivider />
        <MiuixCheckboxPreference
          v-model="autoUpdate"
          title="自动更新"
          summary="仅在 Wi-Fi 下下载更新包"
        />
      </MiuixCard>
    </section>

    <!-- Display -->
    <section class="demo-section">
      <MiuixSmallTitle text="显示与个性化" />
      <MiuixCard class="demo-card">
        <MiuixArrowPreference
          title="设备名称"
          summary="显示在同一网络的其他设备上"
          :hold-down="dialogOpen"
          @click="openDialog"
        >
          <template #end>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">
              {{ deviceName }}
            </MiuixText>
          </template>
        </MiuixArrowPreference>
        <MiuixDivider />
        <MiuixDropdownPreference
          v-model="refreshIndex"
          title="屏幕刷新率"
          summary="选择屏幕的刷新频率"
          :items="refreshOptions"
        />
        <MiuixDivider />
        <MiuixSpinnerPreference
          v-model="accentIndex"
          title="强调色"
          :summary="accentItems[accentIndex]?.summary"
          :items="accentItems"
        />
        <MiuixDivider />
        <MiuixArrowPreference title="恢复默认设置" summary="当前为演示模式，暂不可用" disabled />
      </MiuixCard>
    </section>

    <!-- Dialog triggers -->
    <section class="demo-section">
      <MiuixSmallTitle text="对话框" />
      <MiuixCard class="demo-card">
        <MiuixArrowPreference
          title="编辑设备名称"
          summary="带输入框的 MiuixDialog"
          :hold-down="dialogOpen"
          @click="openDialog"
        />
        <MiuixDivider />
        <MiuixArrowPreference
          title="检查更新"
          summary="通过 Snackbar 反馈结果"
          @click="showSnackbar({ message: `当前已是最新版本 v${version}` })"
        />
      </MiuixCard>

      <MiuixDialog
        v-model="dialogOpen"
        title="编辑设备名称"
        summary="这个名称会显示在同一网络的其他设备上。"
      >
        <template #default="{ close }">
          <MiuixInput v-model="deviceDraft" label="设备名称" class="dialog-input" />
          <div class="dialog-actions">
            <MiuixButton class="demo-grow" @click="close">取消</MiuixButton>
            <MiuixButton class="demo-grow" type="primary" @click="saveDevice(close)"
              >保存</MiuixButton
            >
          </div>
        </template>
      </MiuixDialog>
    </section>

    <!-- Snackbar -->
    <section class="demo-section">
      <MiuixSmallTitle text="消息条" />
      <MiuixCard class="demo-card demo-card--pad">
        <div class="demo-btn-row">
          <MiuixButton @click="shortSnackbar">短消息 4s</MiuixButton>
          <MiuixButton @click="longSnackbar">长消息 10s</MiuixButton>
        </div>
        <div class="demo-btn-row">
          <MiuixButton @click="actionSnackbar">带操作</MiuixButton>
          <MiuixButton @click="dismissibleSnackbar">可关闭</MiuixButton>
        </div>
        <div class="demo-btn-row">
          <MiuixButton @click="indefiniteSnackbar">常驻</MiuixButton>
          <MiuixButton @click="dismissNewestSnackbar()">关闭最新</MiuixButton>
        </div>
        <div class="demo-btn-row">
          <MiuixButton @click="dismissOldestSnackbar()">关闭最旧</MiuixButton>
        </div>
      </MiuixCard>
    </section>

    <!-- About -->
    <section class="demo-section">
      <MiuixSmallTitle text="关于" />
      <MiuixCard class="demo-card">
        <MiuixBasicComponent title="Miuix Vue" summary="Vue 3 组件库 · Apache-2.0">
          <template #start>
            <MiuixIcon :icon="Info" :size="24" />
          </template>
          <template #end>
            <MiuixText type="body2" color="var(--m-color-on-surface-variant-actions)">
              v{{ version }}
            </MiuixText>
          </template>
        </MiuixBasicComponent>
        <MiuixDivider />
        <MiuixBasicComponent title="设计语言" summary="miuix · Xiaomi HyperOS">
          <template #start>
            <MiuixIcon :icon="Theme" :size="24" />
          </template>
        </MiuixBasicComponent>
        <MiuixDivider />
        <MiuixBasicComponent
          title="图标"
          summary="156 个图标 × 5 种字重"
          clickable
          @click="showSnackbar({ message: '在「概览」页可以浏览图标网格' })"
        >
          <template #start>
            <MiuixIcon :icon="Image" :size="24" />
          </template>
          <template #end>
            <MiuixIcon
              :icon="ChevronForward"
              :size="18"
              color="var(--m-color-on-surface-variant-actions)"
            />
          </template>
        </MiuixBasicComponent>
      </MiuixCard>
    </section>
  </div>
</template>

<style scoped>
.dialog-input {
  margin-bottom: 20px;
}

.dialog-actions {
  display: flex;
  gap: 12px;
}
</style>
