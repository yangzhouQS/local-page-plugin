import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";

import {crx} from '@crxjs/vite-plugin'
import manifest from './manifest.json' // assert {type: 'json'} // Node >=17
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), crx({manifest})],
})
