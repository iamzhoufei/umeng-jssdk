import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import legacyPlugin from '@vitejs/plugin-legacy';

import path from 'path';

export default defineConfig({
  base: '/upi-static/', // 开发或生产环境服务的 公共基础路径
  server: {
    port: 8081,
    open: true,
    proxy: {
      '/api/': {
        // target: 'https://hub.zhuawangame.work:18082',
        target: 'https://test-api-mixed.zhuawangame.work',
        changeOrigin: true
      },
      '/v2/': {
        target: 'https://test-api-mixed.zhuawangame.work',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/common': path.resolve(__dirname, 'src/common'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/store': path.resolve(__dirname, 'src/store')
    }
  },
  build: {
    target: 'es2015',
    outDir: 'upi-static'
  },
  preview: {
    host: true
  },
  plugins: [
    vue(),
    legacyPlugin({
      targets: [
        'Android > 39',
        'Chrome >= 60',
        'Safari >= 10.0',
        'iOS >= 10.0',
        'Firefox >= 54',
        'Edge >= 15'
      ]
    })
  ]
});
