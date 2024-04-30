import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src", "renderer", "src"),
    }
  },
  base: './src',
  root: path.join(__dirname, 'src', 'renderer'),
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 8220,
  },
})
