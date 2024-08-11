import { defineStore } from "pinia";
interface UserState {
  history: string[]; // 假设 history 是一个字符串数组
}
// 第一个参数是pinia的id，必须唯一
export const useUser = defineStore("user", {
  state: () => ({
    history: [],
  }),
  getters: {
    searchHistory: (state): string[] => {
      return state.history;
    },
  },
  actions: {},
});
