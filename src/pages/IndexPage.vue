<template>
  <div class="welcome-page">
    <div class="welcome-page-text" data-text="MetaSearch"></div>
    <span class="welcome-page-description">网页聚合搜索平台</span>
  </div>
  <svg width="0" height="0">
    <filter id="outline">
      <feMorphology
        in="SourceAlpha"
        result="ERODE"
        operator="erode"
        radius="2"
      ></feMorphology>
      <feFlood flood-color="#fff" flood-opacity="1" result="flood"></feFlood>
      <feComposite
        in="flood"
        in2="ERODE"
        operator="in"
        result="OUTLINE"
      ></feComposite>
      <feMerge>
        <feMergeNode in="OUTLINE" />
      </feMerge>
    </filter>
  </svg>
  <div class="index-page">
    <a-input-search
      v-model:value="searchParams.text"
      placeholder="input search text"
      enter-button="Search"
      size="large"
      @search="onSearch"
    />
    <MyDivider />
    <a-spin :spinning="loadingInstance" tip="正在加载中...">
      <a-tabs v-model:activeKey="activeKey" @change="onTabChange">
        <a-tab-pane key="index" tab="主页">
          <MetaIndex />
        </a-tab-pane>
        <a-tab-pane key="post" tab="文章">
          <PostList :post-list="postList" />
        </a-tab-pane>
        <a-tab-pane key="picture" tab="图片">
          <PictureList :picture-list="pictureList" />
        </a-tab-pane>
        <a-tab-pane key="user" tab="用户">
          <UserList :user-list="userList" />
        </a-tab-pane>
        <a-tab-pane key="CropDiseaseDetective" tab="作物病虫害识别(beta)">
          <CropDiseaseDetection />
        </a-tab-pane>
        <a-tab-pane key="map" tab="地图">
          <MapPage />
        </a-tab-pane>
        <a-tab-pane key="about" tab="关于">
          <AboutView />
        </a-tab-pane>
      </a-tabs>
    </a-spin>
  </div>
  <!--  <see-battery />-->
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import PostList from "@/components/PostList.vue";
import PictureList from "@/components/PictureList.vue";
import UserList from "@/components/UserList.vue";
import MyDivider from "@/components/personal-component/MyDivider.vue";
import { useRoute, useRouter } from "vue-router";
import myAxios, { loadingInstance } from "@/plugins/myAxios";
import AboutView from "@/pages/AboutView.vue";
import { message } from "ant-design-vue";
import CropDiseaseDetection from "@/components/personal-component/CropDiseaseDetection.vue";
import MapPage from "@/components/personal-pages/MapPage.vue";
import _ from "lodash";
import MetaIndex from "@/pages/MetaIndex.vue";
import { useUser } from "@/Store/user";

const postList = ref([]);
const userList = ref([]);
const pictureList = ref([]);

const userStore = useUser();
const showModal = ref(false);

const route = useRoute();
const router = useRouter();
const activeKey = ref(route.params.category || "post");
const validateParams = (params: any) => {
  const pSet = new Set(["post", "user", "picture"]);
  return pSet.has(params);
};

const initSearchParams = {
  text: "",
  pageSize: 10,
  pageNum: 1,
};
const searchParams = ref({ ...initSearchParams });

/**
 * 加载数据
 * @param params
 */
const loadDataOld = (params: any) => {
  const postQuery = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("/post/list/page/vo", postQuery).then((res: any) => {
    postList.value = res.records;
    //console.log(res);
  });
  const userQuery = {
    ...params,
    userName: params.text,
  };
  myAxios.post("user/list/page/vo", userQuery).then((res: any) => {
    userList.value = res.records;
    //console.log(res);
  });
  const pictureQuery = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("picture/list/page/vo", pictureQuery).then((res: any) => {
    pictureList.value = res.records;
    //console.log(res);
  });
};
/**
 * 加载聚合数据
 * @param params
 */
const loadAllData = (params: any) => {
  const query = {
    ...params,
    searchText: params.text,
  };
  myAxios.post("search/all", query).then((res: any) => {
    postList.value = res.postList;
    userList.value = res.userList;
    pictureList.value = res.pictureList;
    //console.log(res);
  });
};
// 防抖函数
const debouncedRequest = _.debounce((query: any, type: string) => {
  myAxios
    .post("search/all", query)
    .then((res: any) => {
      if (type === "post") {
        postList.value = res.dataList;
      } else if (type === "user") {
        userList.value = res.dataList;
      } else if (type === "picture") {
        pictureList.value = res.dataList;
      }
    })
    .catch((err) => {
      message.error(err);
    });
}, 1000);
/**
 * 加载单类型数据
 * @param params
 */
const loadData = (params: any) => {
  const type = route.params.category;
  if (!type) {
    message.error("请求类型为空");
    return;
  }
  const query = {
    ...params,
    type,
    searchText: params.text,
  };
  debouncedRequest(query, type);
};
//首次请求
loadAllData(initSearchParams);

const onSearch = (value: string) => {
  console.log(value);
  router.push({
    query: { ...searchParams.value },
  });
  //console.log(userStore.searchHistory.push(value));
  loadData(searchParams.value);
};
const onTabChange = (key: string) => {
  if (validateParams(key)) {
    router.push({
      path: `/${key}`,
      query: { ...searchParams.value },
    });
  }
};
// watchEffect负责监听，如果route.query.text改变了就执行
watchEffect(() => {
  const newParams = {
    ...initSearchParams,
    text: (route.query.text as string) || "",
    pageSize:
      parseInt(route.query.pageSize as string) || initSearchParams.pageSize,
    pageNum:
      parseInt(route.query.pageNum as string) || initSearchParams.pageNum,
  };

  searchParams.value = newParams;

  if (route.params.category) {
    loadData(newParams);
  }
});
</script>
<style>
.welcome-page {
  background-color: aliceblue;
}

.welcome-page-description {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
}

.welcome-page-text {
  position: relative;
  width: auto;
  height: 120px;
  font-size: 100px;
  text-align: center;
  font-weight: bold;

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    color: #000;
  }

  &::before {
    transform: scale(1.1);
    background: linear-gradient(cyan, #fc0);
    background-clip: text;
    color: transparent;
  }

  &::after {
    filter: url(#outline);
  }

  welcome-page-text:nth-child(2) {
    font-family: "Cherry Bomb One", cursive;
    font-size: 90px;
  }

  welcome-page-text:nth-child(3) {
    font-family: "Darumadrop One", cursive;
    font-size: 150px;
  }
}
</style>
