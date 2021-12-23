<template>
  <div v-if="isInApp" class="head-wrapper" :style="{ background: props?.bgColor }">
    <div class="back" @click="native?.back()">
      <slot name="left"></slot>
    </div>
    <div class="title" :style="{ color: props?.fontColor }">
      <slot name="title"></slot>
    </div>
    <div class="icon">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { isInApp } from '@/utils';
  import native from '@/common/native';

  export default defineComponent({
    name: 'HeaderView',
    props: {
      bgColor: {
        type: String,
        default: ''
      },
      fontColor: {
        type: String,
        default: ''
      }
    },
    setup: (props: any) => {
      return {
        isInApp,
        native,
        props
      };
    }
  });
</script>

<style lang="less" scoped>
  .head-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 10px;
    width: 100vw;
    height: 44px;

    .title {
      flex: 3;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
    }

    .back {
      flex: 1;
      text-align: left;
    }

    .icon {
      flex: 1;
      text-align: right;
    }
  }
</style>
