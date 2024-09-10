<template>
  <div id="app">
    <GlobalHeader />
    <router-view />
    <float-buttons />
    <button @click="showModal = !showModal">Open Modal</button>
    <teleport to="body">
      <teleportModal v-if="showModal" @close="showModal = false">
        <h1>Hello Teleport!</h1>
        <p>This content is teleported to the body element.</p>
      </teleportModal>
    </teleport>
  </div>
</template>

<style>
#app {
  margin: 0 auto;
  padding: 0px 20px 20px 20px;
  max-width: 1024px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script setup lang="ts">
import { ref } from "vue";
import GlobalHeader from "@/components/personal-component/globlaHeader.vue";
import TeleportModal from "@/components/Model.vue";
import FloatButtons from "@/components/personal-component/plugins/FloatButtons.vue";

const showModal = ref(false);
</script>
