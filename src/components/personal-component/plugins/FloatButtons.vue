<template>
  <a-float-button-group
    trigger="hover"
    type="primary"
    :style="{ right: '94px' }"
  >
    <a-float-button tooltip="新手导引" @click="driver">
      <template #icon>
        <QuestionCircleOutlined />
      </template>
    </a-float-button>
    <a-back-top
      tooltip="返回顶部"
      :visibility-height="0"
      :target="app"
      @click="backToTop"
    />
  </a-float-button-group>
</template>

<script setup lang="ts">
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
import { onMounted, ref } from "vue";

const app = () => {
  return document.getElementById("app");
};
// 获取目标滚动元素
const scrollTarget = ref<HTMLElement | null>(null);

onMounted(() => {
  scrollTarget.value = document.documentElement; // 设置滚动目标为整个页面
});

// 返回顶部功能
const backToTop = () => {
  scrollTarget.value?.scrollTo({ top: 0, behavior: "smooth" });
};

const driver = () => {
  console.log("新手导引");
};
</script>

<style scoped></style>
