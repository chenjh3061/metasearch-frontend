<template>
  <div>
    <a-list item-layout="horizontal" :data-source="props.postList">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-skeleton :loading="loadingInstance" active avatar>
            <a-list-item-meta
              :description="loadingInstance ? 'Loading...' : item.content"
            >
              <template #title>
                <a @click="openArticle(item)">{{
                  loadingInstance ? "Loading..." : item.title
                }}</a>
              </template>
              <template #avatar>
                <a-avatar :src="loadingInstance ? null : hua" />
              </template>
            </a-list-item-meta>
          </a-skeleton>
        </a-list-item>
      </template>
    </a-list>
    <article-modal
      :visible="isShowArticle"
      @close="isShowArticle = false"
      :data="currentArticle"
    ></article-modal>
  </div>
</template>

<script setup lang="ts">
import hua from "@/assets/hua.jpg";
import { defineProps, ref, withDefaults } from "vue";
import { loadingInstance } from "@/plugins/myAxios";
import ArticleModal from "@/components/personal-component/modals/articleModal.vue";

const isShowArticle = ref(false);
const currentArticle = ref({});

interface Props {
  postList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  postList: () => [],
});

const openArticle = (item: any) => {
  currentArticle.value = item;
  isShowArticle.value = true;
  console.log(item);
};
</script>

<style scoped></style>
