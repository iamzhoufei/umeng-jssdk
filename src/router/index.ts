import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout.vue';

import ChannelDownload from '@/views/channelDownload/index.vue';
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/channelDownload'
  },
  {
    path: '/channelDownload',
    name: '',
    component: Layout,
    children: [
      {
        path: '',
        name: '渠道下载页面',
        meta: {
          title: '游派 | 下载'
        },
        component: ChannelDownload
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: asyncRoutes
});

export default router;
