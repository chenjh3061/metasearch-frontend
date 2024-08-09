import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import IndexPage from "@/pages/IndexPage.vue";
import UserPage from "@/components/personal-pages/UserPage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: IndexPage,
  },
  {
    path: "/:category",
    component: IndexPage,
    children: [
      {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "@/pages/AboutView.vue"),
      },
    ],
  },
  {
    path: "/userPage",
    component: UserPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
