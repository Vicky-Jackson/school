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
         "/baidu": {
           target: "http://api.map.baidu.com", // 请求的第三方接口
           changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，解决跨域问题
            rewrite: (path) => path.replace(/^\/baidu/, ""),
         },
         "/server":{
            target: 'http://localhost:3000',
             changeOrigin: true, // 解决跨域
             rewrite: (path) => path.replace(/^\/server/, ""),
         }
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