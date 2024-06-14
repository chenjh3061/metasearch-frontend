import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import Antd from "ant-design-vue";
import router from "./router";
import "ant-design-vue/dist/reset.css";

const pinia = createPinia();

createApp(App).use(router).use(Antd).use(pinia).mount("#app");
