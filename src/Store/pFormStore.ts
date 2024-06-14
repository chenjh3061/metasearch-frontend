// stores/counter.js
import { defineStore } from "pinia";

interface Field {
  label: string;
  type: string;
  value: string;
}

interface State {
  fields: Field[];
}

export const useCounterStore = defineStore({
  id: "pFormStore", // 添加 id 字段
  // 定义 state 为一个返回对象的函数
  state: () => ({
    fields: [
      { label: "姓名", type: "text", value: "" },
      { label: "邮箱", type: "email", value: "" },
    ],
  }),
  actions: {
    addField(field: Field) {
      this.fields.push(field);
    },
    removeField(index: number) {
      this.fields.splice(index, 1);
    },
    updateFieldValue({ index, value }: { index: number; value: string }) {
      this.fields[index].value = value;
    },
  },
});
