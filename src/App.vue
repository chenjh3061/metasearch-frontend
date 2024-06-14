<template>
  <div id="app">
    <router-view />
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
  padding: 20px;
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
import teleportModal from "@/components/Model.vue";

const showModal = ref(false);
</script>
