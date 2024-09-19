<template>
  <a-modal :visible="visible" @cancel="close" class="user-modal">
    <div class="modal-content" v-if="userData">
      <a-card class="user-card">
        <div class="avatar-container">
          <img alt="用户头像" :src="userData.userAvatar" class="user-avatar" />
        </div>
        <div class="user-details">
          <h3 class="user-name">{{ userData.userName }}</h3>
          <p class="user-role">{{ userData.userRole }}</p>
          <p class="user-profile">{{ userData.userProfile }}</p>
        </div>
      </a-card>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  visible: Boolean, // 控制弹出框显示
  userData: {
    type: Object,
    default: () => ({
      userName: "",
      userAvatar: "",
      userProfile: "",
      userRole: "",
    }),
  },
});
const emit = defineEmits(["close"]);
const close = () => {
  emit("close");
};

const downloadImage = () => {
  const link = document.createElement("a");
  link.href = props.userData.userAvatar;
  link.download = props.userData.userName || "avatar";
  link.click();
};
</script>
<style scoped>
.user-modal .modal-content {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 300px;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}

.user-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #1890ff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.user-details {
  text-align: center;
  margin-bottom: 20px;
}

.user-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.user-role {
  font-size: 16px;
  color: #888;
  margin-bottom: 12px;
}

.user-profile {
  font-size: 14px;
  color: #555;
  margin-bottom: 16px;
}
</style>
