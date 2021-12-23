<template>
  <div class="avatar-wrapper">
    <van-image
      v-if="!!$props?.frame"
      width="38px"
      height="38px"
      class="frame"
      fit="cover"
      :src="$props?.frame"
    >
    </van-image>
    <van-image
      v-if="!!$props?.avatar"
      round
      width="28px"
      height="28px"
      class="avatar"
      fit="cover"
      :src="$props?.avatar"
    >
      <van-image
        width="28px"
        height="28px"
        src="https://xiexie-frontend.oss-cn-hangzhou.aliyuncs.com/h5-common/default_avatar.png"
      />
    </van-image>
  </div>
</template>

<script lang="ts">
  import { onMounted } from 'vue';

  interface Props {
    avatar?: string;
    frame?: string;
    size?: number;
  }

  export default {
    name: 'AvatarView',
    props: ['avatar', 'frame', 'size'],
    setup(props: Props) {
      onMounted(() => {
        console.log(props);
      });
    }
  };
</script>

<style lang="less" scoped>
  .avatar-wrapper {
    position: relative;
    margin-left: -5px;
    width: 38px;
    height: 38px;
    font-size: 0;
    // margin-right: 5px;

    .frame {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
    }

    .avatar {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
