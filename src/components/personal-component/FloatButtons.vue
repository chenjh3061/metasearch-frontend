<template>
  <a-float-button-group
    trigger="hover"
    type="primary"
    :style="{ right: '94px' }"
  >
    <a-float-button tooltip="切换夜间模式">
      <SyncOutlined />
    </a-float-button>
    <a-back-top tooltip="返回顶部" :visibility-height="0" :target="app" />
  </a-float-button-group>
</template>

<script setup lang="ts">
import { SyncOutlined } from "@ant-design/icons-vue";

const app = () => {
  return document.getElementById("app");
};
</script>

<style scoped></style>
