/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5000
  },
  plugins: [react()],
  // only applies when running npm test from this packages/web folder
  test: {
    environment: 'happy-dom'
  }
})
