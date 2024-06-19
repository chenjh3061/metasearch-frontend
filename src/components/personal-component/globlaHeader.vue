<template>
  <div class="globalHeader">
    <div class="title">在线聚合搜索平台</div>
    <a-button v-if="!user" class="loginButton" @click="toggleLoginModal"
      >登录
    </a-button>
    <UserMenu v-else :user="user" />
  </div>
  <login-modal
    :isVisible="showLoginModal"
    @update:isVisible="showLoginModal = $event"
    @login="handleLogin"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import LoginModal from "@/components/personal-component/loginModal.vue";
import UserMenu from "@/components/personal-component/UserMenu.vue";

// 用户数据
const user = ref();
const showLoginModal = ref(false);

const toggleLoginModal = () => {
  showLoginModal.value = !showLoginModal.value;
};

const handleLogin = (credentials: { username: string; password: string }) => {
  console.log("登录成功:", credentials);
  // 你可以在这里添加实际的登录逻辑，例如调用 API
  user.value = {
    username: credentials.username,
    avatar: "https://via.placeholder.com/32",
  };
  showLoginModal.value = false;
};
</script>

<style scoped>
.globalHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  min-height: 60px;
  background: linear-gradient(to bottom, cadetblue, aliceblue);
  padding: 10px 20px; /* 添加一些内边距，使内容更好看 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微的阴影 */
}

.title {
  font-size: 20px; /* 增加字体大小 */
  font-weight: normal; /* 加粗字体 */
  color: white; /* 设置字体颜色为白色 */
}

.loginButton {
  background-color: white; /* 按钮背景颜色为白色 */
  color: cadetblue; /* 按钮文字颜色为 cadetblue */
  border: none; /* 去掉按钮边框 */
  padding: 0px 20px; /* 增加按钮的内边距 */
  border-radius: 5px; /* 按钮圆角 */
  font-size: 16px; /* 调整按钮字体大小 */
  transition: background-color 0.3s; /* 添加过渡效果 */
}

.loginButton:hover {
  background-color: aliceblue; /* 鼠标悬停时的背景颜色 */
}
</style>
