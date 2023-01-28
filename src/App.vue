<template>
  <div id="app">
    <top />
    <router-view></router-view>
    <bottom />
  </div>
</template>

<script>
import top from "@/components/top.vue";
import bottom from "@/components/bottom.vue";
export default {
  components: { bottom },
  name: "App",
  components: { top, bottom },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
