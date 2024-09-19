<template>
  <a-list item-layout="horizontal" :data-source="props.userList">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-card hoverable style="width: 240px" @click="showUser(item)">
          <template #cover>
            <img alt="example" :src="hua" />
          </template>
          <a-card-meta :title="item.userName">
            <template #description>{{ item.userProfile }}</template>
          </a-card-meta>
        </a-card>
      </a-list-item>
    </template>
  </a-list>
  <user-modal
    :visible="isShowUser"
    :userData="currentUser"
    @close="
      () => {
        isShowUser = false;
      }
    "
  ></user-modal>
</template>

<script setup lang="ts">
import hua from "@/assets/hua.jpg";
import { defineProps, ref, withDefaults } from "vue";
import UserModal from "@/components/personal-component/modals/userModal.vue";

interface Props {
  userList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  userList: () => [],
});

const isShowUser = ref(false);
const currentUser = ref({
  userName: "",
  userAvatar: "",
  userProfile: "",
  userRole: "",
});

const showUser = (user: any) => {
  isShowUser.value = true;
  currentUser.value = user;
  console.log(user);
};
</script>

<style scoped></style>
