<template>
  <a-modal title="Article" :visible="visible" @cancel="close">
    <div class="article-container">
      <a-typography>
        <a-typography-title>{{ data.title }}</a-typography-title>
        <a-typography-paragraph>
          {{ data.content }}
        </a-typography-paragraph>
      </a-typography>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  visible: Boolean, // 控制弹出框显示
  data: {
    // 接收传递的文章信息
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};
</script>

<style scoped>
a-modal {
  width: 90vw;
}

.article-container {
  height: 30vh; /* 固定高度 */
  width: 100%;
  overflow: auto; /* 如果内容超出，允许滚动 */
}
</style>
