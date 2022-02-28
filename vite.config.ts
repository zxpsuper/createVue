import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  publicDir: './static',
  define: {
    'process.env': {
      VUE_BASE_URL: '/',
      BUILD_TIME: new Date().toLocaleString(),
    },
  },
  resolve: {
    extensions: ['.vue', '.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
})
