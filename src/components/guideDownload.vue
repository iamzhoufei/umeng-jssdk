<template>
  <teleport to="#guide-download-target">
    <van-dialog
      v-model:show="visible"
      show-cancel-button
      :title="title"
      :confirm-button-text="'立即前往'"
      :cancel-button-text="'残忍拒绝'"
      :before-close="handleOnClose"
    >
      <div style="margin: 20px; text-align: center">{{ message }}</div>
    </van-dialog>
  </teleport>
</template>

<script lang="ts">
  import { ref, computed } from 'vue';

  import qs from 'qs';
  import { useStore } from 'vuex';
  // import router from '@/router'

  // import trackEvents from "@/common/trackEvents";

  export default {
    name: 'GuideDownloadView',

    setup() {
      const store = useStore();
      const {
        id
      }: {
        id?: string;
      } = qs.parse(window.location.href.split('?')[1]);

      const title = ref(computed(() => store.state.guideDownload.title));

      const message = ref(computed(() => store.state.guideDownload.message));

      const visible = ref(computed(() => store.state.guideDownload.visible));

      // 关闭 引导下载 弹窗
      const handleHide = () => store.commit('guideDownload/hide');

      // 关闭弹窗之前的事件
      const handleOnClose = (action: 'confirm' | 'cancel') => {
        // const {path} = router.currentRoute.value;
        if (action === 'confirm') {
          location.href = `https://pack.zwgamer.mobi?id=${id ?? ''}`;
          handleHide();
        } else {
          handleHide();
        }
      };

      return {
        visible,

        title,
        message,

        handleHide,
        handleOnClose
      };
    }
  };
</script>
