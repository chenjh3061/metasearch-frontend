<template>
  <a-modal :visible="visible" @cancel="close">
    <div class="modal-content">
      <img alt="图片" :src="imgData.url" />
      <h3>{{ imgData.title }}</h3>
      <a href="javascript:void(0)" @click="downloadImage">下载图片</a>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  visible: Boolean, // 控制弹出框显示
  imgData: {
    // 接收传递的图片信息
    type: Object,
    default: () => ({ url: "", title: "" }),
  },
});
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};

// 图片下载功能
const downloadImage = () => {
  const link = document.createElement("a");
  link.href = props.imgData.url;
  link.download = props.imgData.title || "image";
  link.click();
};
</script>

<style scoped>
.modal-content {
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.modal-content h3 {
  margin: 10px 0;
}

.modal-content a {
  color: #1890ff;
  cursor: pointer;
  text-decoration: underline;
}
</style>
