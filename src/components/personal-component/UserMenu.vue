<template>
  <div class="user-menu">
    <a-dropdown v-if="user" trigger="click">
      <template #default>
        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
          <img :src="user.avatar" class="user-avatar" />
          {{ user.username }}
          <a-icon type="down" />
        </a>
      </template>
      <template #overlay>
        <a-menu>
          <a-menu-item key="0">
            <a @click="goToProfile">个人中心</a>
          </a-menu-item>
          <a-menu-item key="1">
            <a @click="logout">退出登录</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-button v-else type="primary" @click="login">登录</a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import type { PropType } from "vue"; // 确保导入PropType
import { defineProps } from "vue"; // 确保导入defineProps

const props = defineProps({
  user: {
    type: Object as PropType<{ username: string; avatar: string } | null>,
    default: null,
  },
});

const router = useRouter();

const goToProfile = () => {
  router.push("/profile");
};

const logout = () => {
  // 退出登录逻辑
  console.log("logout");
};

const login = () => {
  router.push("/login");
};
</script>

<style scoped>
.user-menu {
  position: relative;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>
