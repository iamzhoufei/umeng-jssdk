<template>
  <teleport to="#loading-target">
    <van-overlay
      :show="visible"
      :style="{ zIndex: 11, backgroundColor: 'rgba(255, 255, 255, 0.5)' }"
      @click="handleHide()"
    >
      <div class="loading-wrapper">
        <van-loading color="grey" />
      </div>
    </van-overlay>
  </teleport>
</template>

<script lang="ts">
  import { ref, computed } from 'vue';

  import { useStore } from 'vuex';

  export default {
    name: 'LoadingView',

    setup() {
      const store = useStore();
      const visible = ref(computed(() => store.state.loading.visible));

      // 关闭 loading 弹窗
      const handleHide = () => store.commit('loading/hide');

      return {
        visible,
        handleHide
      };
    }
  };
</script>

<style lang="less" scoped>
  .loading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
