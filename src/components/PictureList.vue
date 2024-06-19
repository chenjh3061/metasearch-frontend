<template>
  <div class="masonry">
    <div class="masonry-item" v-for="item in props.pictureList" :key="item.id">
      <a-card hoverable>
        <template #cover>
          <img alt="image" :src="item.url" />
        </template>
        <a-card-meta :title="item.title" />
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface Props {
  pictureList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  pictureList: () => [],
});
</script>

<style scoped>
.masonry {
  column-count: 4;
  column-gap: 16px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 16px;
}

a-card {
  display: block;
  margin-bottom: 16px;
}

img {
  width: 100%;
  height: auto;
}
</style>
