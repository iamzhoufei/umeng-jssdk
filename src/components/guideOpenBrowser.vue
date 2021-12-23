<template>
  <teleport to="#guide-open-browser-target">
    <div v-show="visible" class="guide-open-browser-wrapper" @click="handleHide()">
      <img :src="arrow" class="arrow" />
      <div class="content">
        <div class="text">请选择在浏览器</div>
        <img class="icon" :src="browserIcon" />
        <div class="text">中打开</div>
      </div>
    </div>
  </teleport>
</template>
<script lang="ts">
  import { ref, computed } from 'vue';

  import { useStore } from 'vuex';
  import { isInAndroidMobile } from '@/utils';

  export default {
    name: 'GuideOpenBrowserView',

    setup() {
      const store = useStore();

      const arrow =
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5/common/wechat/wechat_download.png';

      const iOSIcon =
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5/common/wechat/ios_icon.png';
      const AndroidIcon =
        'https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5/common/wechat/android_icon.png';

      const visible = ref(computed(() => store.state.guideOpenBrowser.visible));
      const browserIcon = computed(() => (isInAndroidMobile ? AndroidIcon : iOSIcon));

      // 展示 用浏览器打开当前页面 弹窗
      const handleHide = () => store.commit('guideOpenBrowser/hide');

      return {
        arrow,
        browserIcon,
        visible,
        handleHide
      };
    }
  };
</script>

<style lang="less" scoped>
  .guide-open-browser-wrapper {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    text-align: right;

    .arrow {
      margin-top: 20px;
      margin-right: 20px;
      // position: absolute;
      // right: 20px;
    }

    .content {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 10px;

      // position: absolute;
      // top: 200px;
      // left: 10%;
      .icon {
        margin: 0 10px;
        width: 20px;
        height: 20px;
      }

      .text {
        color: #fff;
        font-size: 12px;
      }
    }
  }
</style>
