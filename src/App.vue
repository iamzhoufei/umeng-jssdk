<template>
  <router-view></router-view>

  <!-- 引导使用浏览器打开当前页面 -->
  <guide-open-browser-view />

  <!-- 引导下载 -->
  <guide-download-view />

  <!-- 全屏 loading -->
  <loading-view />

  <!-- 登录弹窗 -->
  <login-modal-view />
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import GuideDownloadView from '@/components/guideDownload.vue';
  import GuideOpenBrowserView from '@/components/guideOpenBrowser.vue';
  import LoadingView from '@/components/loading.vue';
  import LoginModalView from '@/components/loginModal.vue';

  export default defineComponent({
    name: 'App',
    components: {
      GuideDownloadView,
      GuideOpenBrowserView,
      LoadingView,
      LoginModalView
    }
  });
</script>
