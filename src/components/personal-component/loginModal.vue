<template>
  <a-modal
    :visible="isVisible"
    title="登录"
    @cancel="handleCancel"
    @ok="handleLogin"
  >
    <a-card>
      <a-form :form="loginForm" layout="vertical">
        <a-form-item
          label="用户名"
          name="username"
          rules="[ { required: true, message:'请输入用户名' } ]"
        >
          <a-input v-model="loginForm.username" placeholder="用户名" />
        </a-form-item>
        <a-form-item
          label="密码"
          name="password"
          rules="[ { required: true, message: '请输入密码' } ]"
        >
          <a-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
          />
        </a-form-item>
      </a-form>
    </a-card>
  </a-modal>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";

// 接收父组件传递的 props
const props = defineProps({
  isVisible: Boolean,
});

// 触发父组件事件
const emit = defineEmits(["update:isVisible", "login"]);

const loginForm = ref({
  username: ref(""),
  password: ref(""),
});

// 处理取消操作
const handleCancel = () => {
  emit("update:isVisible", false);
};

// 处理登录操作
const handleLogin = () => {
  // 你可以在这里添加实际的登录逻辑，例如调用 API
  console.log("用户名:", loginForm.value.username);
  console.log("密码:", loginForm.value.password);
  // 假设登录成功，关闭模态框
  emit("update:isVisible", false);
  // 触发父组件的登录事件
  emit("login", {
    username: loginForm.value.username,
    password: loginForm.value.password,
  });
};
</script>

<style scoped></style>
