/* eslint-disable quotes */
import { createApp } from 'vue';

import App from './App.vue';
import Vant from './plugins/vant';

import router from './router';
import store from './store';
import http from '@/common/http';

import './styles/index.css';

const app = createApp(App);

app.use(http).use(router).use(store).use(Vant);
app.mount('#app');

router.beforeEach((to, from, next) => {
  const keywords = (document as any).querySelector(`meta[name='keywords']`);
  const description = (document as any).querySelector(`meta[name='description']`);

  store.commit('loading/hide');
  store.commit('guideOpenBrowser/hide');
  store.commit('guideDownload/hide');

  keywords.setAttribute(
    'content',
    (to?.meta?.content as any)?.keywords ?? '游戏试玩、游戏下载、游派、有赚'
  );
  description.setAttribute(
    'content',
    (to?.meta?.content as any)?.description ??
      '游派是一款游戏精品推荐的APP，旨在给游戏玩家推荐有趣好玩的游戏。'
  );

  (window.document as any).title = to.meta.title ?? '游派 | 有的玩不止于玩';

  next();
});
