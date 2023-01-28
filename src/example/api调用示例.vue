<template>
  <div class="app-container">
    <h1>api调用实例</h1>
  </div>
</template>

<script>
import { supplierList, listResource } from "@/api/index.js";
export default {
  name: "api-example",
  data() {
    return {};
  },
  methods: {
    getSupplierList() {
      const obj = { name: "xxx" };
      supplierList(obj)
        .then((res) => {})
        .catch((error) => {});
    },
    listResource() {
      const obj = { name: "xxx" };
      listResource(obj)
        .then((res) => {})
        .catch((error) => {});
    },
  },
};
</script>

<style>
</style>