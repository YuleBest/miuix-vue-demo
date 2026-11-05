import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Relative asset paths keep the build portable under /<repo>/ on GitHub Pages.
  base: './',
  plugins: [vue()],
})
