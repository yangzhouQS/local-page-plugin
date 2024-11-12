import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from 'path'
import {crx} from '@crxjs/vite-plugin'
import manifest from './manifest.json' // assert {type: 'json'} // Node >=17
// https://vite.dev/config/
export default defineConfig({
  root: 'src/',
  plugins: [vue(), vueJsx(), crx({manifest})],

  /*build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        contentPage: path.resolve(__dirname, 'src/contentPage/index.html'),
        popup: path.resolve(__dirname, 'src/popup/index.html')
      },
      output: {
        assetFileNames: 'assets/[name]-[hash].[ext]', // 静态资源
        chunkFileNames: 'js/[name]-[hash].js', // 代码分割中产生的 chunk
        entryFileNames: 'js/[name]-[hash].js'
      }
    }
  }*/
})
