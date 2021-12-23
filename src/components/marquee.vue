<template>
  <swiper
    class="swiper-wrapper marquee"
    :slides-per-view="2"
    :space-between="20"
    :free-mode="true"
    :autoplay="{ delay: 0 }"
    :speed="3000"
    :loop="true"
    :allow-touch-move="false"
  >
    <slot name="record"></slot>
  </swiper>
</template>

<script lang="ts">
  import SwiperCore, { Autoplay } from 'swiper';

  import { Swiper } from 'swiper/vue';

  // import AvatarView from '@/components/avatar.vue';

  SwiperCore.use([Autoplay]);

  export default {
    name: 'MarqueeView',
    components: {
      Swiper
    },
    // props: ['slides'],
    setup(props: Props) {
      return { slides: props?.slides };
    }
  };
</script>

<style lang="less" scoped>
  .swiper-wrapper {
    width: 100vw;
    height: 40px;
  }
</style>
