import * as path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config
export default defineConfig({
  base: './',
  root: path.join(__dirname, 'src', 'preload'),
})
