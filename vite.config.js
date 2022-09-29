import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {
  ElementPlusResolver
} from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
   server: {
     host: "0.0.0.0",
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888/api',
          changeOrigin: true, // 解决跨域
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
   },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
})