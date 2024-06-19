<template>
  <a-float-button-group
    trigger="hover"
    type="primary"
    :style="{ right: '94px' }"
  >
    <template #icon>
      <CustomerServiceOutlined />
    </template>
    <a-float-button />
    <a-float-button>
      <template #icon>
        <CommentOutlined />
      </template>
    </a-float-button>
  </a-float-button-group>
</template>

<script setup lang="ts">
import {
  CommentOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons-vue";
</script>

<style scoped></style>
