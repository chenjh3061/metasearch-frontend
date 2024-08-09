<template>
  <a-modal
    :visible="isVisible"
    title="登录"
    @cancel="handleCancel"
    footer="{null}"
  >
    <div class="background-container">
      <a-card class="Box">
        <a-form :form="loginForm" layout="vertical">
          <a-form-item
            label="用户名"
            name="username"
            rules="[ { required: true, message:'请输入用户名' } ]"
          >
            <a-input v-model:value="loginForm.username" placeholder="用户名" />
          </a-form-item>
          <a-form-item
            label="密码"
            name="password"
            rules="[ { required: true, message: '请输入密码' } ]"
          >
            <a-input
              v-model:value="loginForm.password"
              type="password"
              placeholder="密码"
            />
          </a-form-item>
          <a-button type="primary" class="loginBtn" @click="handleLogin">
            登录
          </a-button>
        </a-form>
      </a-card>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from "vue";
import { UserControllerService } from "../../../generated-client";
import { setCache } from "@/common/cache";

// 接收父组件传递的 props
const props = defineProps({
  isVisible: Boolean,
});

// 触发父组件事件
const emit = defineEmits(["update:isVisible", "login"]);

const loginForm = ref({
  username: "",
  password: "",
});
setCache("userInfo", loginForm.value);
// 处理取消操作
const handleCancel = () => {
  emit("update:isVisible", false);
};

// 处理登录操作
const handleLogin = async () => {
  // 表单数据
  console.log("表单数据", loginForm.value);

  if (!loginForm.value.username || !loginForm.value.password) {
    console.warn("用户名或密码为空");
    return;
  }

  try {
    const res = await UserControllerService.userLoginUsingPost({
      userAccount: loginForm.value.username,
      userPassword: loginForm.value.password,
    });

    if (res.code === 0) {
      setCache("userInfo", loginForm.value);
      // 假设登录成功，关闭模态框
      emit("update:isVisible", false);
      // 触发父组件的登录事件
      emit("login", {
        username: loginForm.value.username,
        password: loginForm.value.password,
      });
    } else {
      console.log("error", res.message);
    }
  } catch (error) {
    console.error("登录请求失败", error);
  }
};
</script>

<style scoped>
.background-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, cadetblue, aliceblue);
}

.Box {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9); /* 半透明背景 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微的阴影 */
}

a-form {
  width: 100%;
}

a-form-item-label > label {
  color: #333; /* 修改引导词颜色 */
}

a-input {
  width: 100%;
  height: 38px;
  border: 1px solid #ccc; /* 修改边框颜色 */
  background-color: #f9f9f9; /* 修改背景颜色 */
  font-size: 14px;
  color: #333;
  margin-bottom: 15px;
  outline: none;
  border-radius: 5px; /* 圆角 */
  padding: 5px 10px; /* 内边距 */
  transition: border-color 0.3s;
}

a-input:focus {
  border-color: cadetblue; /* 聚焦时的边框颜色 */
}

input::placeholder {
  color: #999; /* 修改 placeholder 颜色 */
}

.loginBtn {
  cursor: pointer;
  width: 100%;
  line-height: 28px;
  text-align: center;
  font-size: 16px;
  color: cadetblue;
  background: white;
  outline: none;
  border: 1px solid cadetblue;
  margin-top: 10px;
  transition: all 0.3s;
  border-radius: 5px; /* 圆角 */
}

.loginBtn:hover {
  background-color: aliceblue; /* 悬停时的背景颜色 */
}
</style>
