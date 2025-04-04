

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],


  // 포트지정
  server: {
    port: 6075,
  },


  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
})
