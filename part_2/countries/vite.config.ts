import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      'tlaloch.tailfaea6a.ts.net',
      '.tailfaea6a.ts.net'
        ]
    },
})
