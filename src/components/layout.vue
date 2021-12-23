<template>
  <div class="layout" :style="isInApp ? { paddingTop: '45px', height: `calc(100vh - 45px)` } : {}">
    <router-view />
  </div>
</template>

<script lang="ts">
  import { isInApp } from '@/utils';
  export default {
    name: 'LayoutView',
    setup() {
      return {
        isInApp
      };
    }
  };
</script>
