<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div v-for="(field, index) in fields" :key="index" class="form-group">
        <label :for="`field-${index}`">{{ field.label }}</label>
        <component
          v-model="field.value"
          :is="getComponent(field.type)"
          :id="`field-${index}`"
          class="form-control"
        ></component>
        <button type="button" @click="removeField(index)">删除</button>
      </div>
      <button type="button" @click="addField">添加字段</button>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useCounterStore } from "@/Store/pFormStore";

export default {
  name: "pFrom",
  computed: {
    ...mapState(useCounterStore, ["fields"]),
  },
  data() {
    return {
      fields: [
        { label: "姓名", type: "text", value: "" },
        { label: "邮箱", type: "email", value: "" },
        { label: "描述", type: "textarea", value: "" },
      ],
    };
  },
  created() {
    const savedFiles = localStorage.getItem("fields");
    if (savedFiles) {
      this.fields = JSON.parse(savedFiles);
    }
  },
  methods: {
    ...mapActions(useCounterStore, [
      "addField",
      "removeField",
      "updateFieldValue",
    ]),
    addField() {
      const newField = { label: "新字段", type: "text", value: "" };
      this.addField(newField);
    },
    removeField(index) {
      this.fields.splice(index, 1);
    },
    handleSubmit() {
      const isValid = this.fields.every((field) => field.value.trim() !== "");
      if (!isValid) {
        alert("所有字段均为必填项");
        return;
      }
      console.log("表单数据:", this.fields);
    },
    getComponent(type) {
      const components = {
        text: "input",
        email: "input",
        textarea: "textarea",
      };
      return components[type] || "input";
    },
  },
};
</script>

<style>
.form-group {
  margin-bottom: 1rem;
}
</style>
