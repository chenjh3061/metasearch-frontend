<template>
  <a-switch
    v-model:checked="changeMap"
    checked-children="阿里地图"
    un-checked-children="高德地图"
  />
  <div id="displayArea">
    <div class="aliMap" v-if="changeMap">
      <AliMap />
    </div>
    <div class="gaodeMap" v-else>
      <GaodeMap />
    </div>
  </div>
</template>

<script setup lang="ts">
import GaodeMap from "@/components/personal-component/GaodeMap.vue";
import AliMap from "@/components/personal-component/AliMap.vue";
import { ref } from "vue";

const changeMap = ref(false);

const onChange = () => {
  changeMap.value = !changeMap.value;
  console.log("切换地图为：", changeMap.value);
};
</script>

<style scoped>
#displayArea {
  max-width: 100%;
  max-height: 1000px;
}
.aliMap {
  border: 1px solid #ccc;
}
</style>
