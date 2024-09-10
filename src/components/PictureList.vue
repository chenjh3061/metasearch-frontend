<template>
  <div class="masonry">
    <div class="masonry-item" v-for="item in props.pictureList" :key="item.id">
      <a-card hoverable @click="showPic(item)">
        <template #cover>
          <img alt="image" :src="item.url" />
        </template>
        <a-card-meta :title="item.title" />
      </a-card>
    </div>
    <image-modal
      :visible="isShowPic"
      :imgData="currentPic"
      @close="
        () => {
          isShowPic = false;
        }
      "
    ></image-modal>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, withDefaults } from "vue";
import ImageModal from "@/components/personal-component/modals/imageModal.vue";

const isShowPic = ref(false);
const currentPic = ref({ url: "", title: "" });

interface Props {
  pictureList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  pictureList: () => [],
});

const showPic = (item: { url: string; title: string }) => {
  currentPic.value = { url: item.url, title: item.title };
  isShowPic.value = !isShowPic.value;
  console.log("showPic:" + item.url);
};
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
