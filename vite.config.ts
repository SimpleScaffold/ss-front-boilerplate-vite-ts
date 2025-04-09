import react from '@vitejs/plugin-react-swc'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, Plugin } from 'vite'
import fs from 'fs'
import { copyFileSync } from 'fs'
import { resolve } from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss(), fontPreloadPlugin(), copyRobotsTxt()],


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


function fontPreloadPlugin(): Plugin {
  return {
    name: 'vite-font-preload',
    transformIndexHtml: {
      order: 'pre', // 기존 enforce: 'pre'
      handler(html) {
        const fontDir = path.resolve(__dirname, 'src/assets/fonts')
        const preloadLinks: string[] = []

        function walk(dir: string) {
          const files = fs.readdirSync(dir)
          for (const file of files) {
            const fullPath = path.join(dir, file)
            const stat = fs.statSync(fullPath)

            if (stat.isDirectory()) {
              walk(fullPath)
            } else if (file.endsWith('.woff') || file.endsWith('.woff2')) {
              const publicPath = fullPath.split('assets')[1].replace(/\\/g, '/')
              const type = file.endsWith('.woff2') ? 'font/woff2' : 'font/woff'

              preloadLinks.push(
                  `<link rel="preload" href="/assets${publicPath}" as="font" type="${type}" crossorigin>`
              )
            }
          }
        }

        walk(fontDir)

        return html.replace('</head>', preloadLinks.join('\n') + '\n</head>')
      },
    },
  }
}


// 커스텀 플러그인: 빌드 후 robots.txt 복사
function copyRobotsTxt() {
  return {
    name: 'copy-robots-txt',
    closeBundle() {
      copyFileSync(resolve(__dirname, 'robots.txt'), resolve(__dirname, 'dist/robots.txt'))
    }
  }
}