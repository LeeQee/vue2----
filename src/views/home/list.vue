<template>
  <div class="app-container">
    <h1>列表页</h1>
    <router-link to="/">返回首页</router-link><br />
    <button @click="$router.push({ path: '/list/detail' })">查看详情</button>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>