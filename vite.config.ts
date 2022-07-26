/*
 * @Description: 文件描述
 * @Author: ljf
 * @Date: 2022-07-13 17:07:45
 * @LastEditors: ljf
 * @LastEditTime: 2022-07-26 11:14:44
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuejsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';


const serveConfig = {
  plugins: [
    vue(),
    vuejsx({}),
    createSvgIconsPlugin({ iconDirs: [resolve(process.cwd(), 'public/icons')], symbolId: 'icon-[dir]-[name]' }),
    Components({
      resolvers: [
        AntDesignVueResolver({ importStyle: true, resolveIcons: true })
      ]
    }),
  ],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  },
  // server: {
  //   prot: 3000,
  //   proxy: {
  //     '/api': {
  //       target: 'http://wj800.com:8080'
  //     }
  //   }
  // }

}
debugger
export default defineConfig(({ command, mode }) => {
  console.log(command)
  if (command === 'serve') {
    return {
      ...serveConfig
    }
  } else {
    return {
      ...serveConfig,
      base: './',
      build: {
        rollupOptions: {
          output: {
            manualChunks: (id) => {

              if (id.includes('node_modules')) {
                return id.toString().split('node_modules/')[1].split('/')[0].toString();
              }
            },
            entryFileNames: 'js/[name].[hash].js',
            chunkFileNames: 'js/[name].[hash].js',
            assetFileNames: '[ext]/[name].[hash].[ext]',
          }
        }
      }
    }
  }
})

