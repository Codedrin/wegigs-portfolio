import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Forward API calls to the Express server (see server/index.js) during
      // `npm run dev`, so the frontend can call same-origin `/api/...` paths
      // without needing CORS configuration. Streamed responses pass through.
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
})
