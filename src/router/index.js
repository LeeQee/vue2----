import Vue from "vue";
import VueRouter from "vue-router";
import constantRoutes from "./modules/constantRoutes";
Vue.use(VueRouter);
console.log(process.env.NODE_ENV);
const routes = [...constantRoutes];
const router = new VueRouter({
  // history模式下，如果部署路径Url不是以/开头的，则需要配置
  //   base: process.env.NODE_ENV === "production" ? "/admin" : "/",
  mode: "hash", //Hash模式（history）
  routes, // `routes: routes` 的缩写
  scrollBehavior: () => ({ y: 0 }), //页面跳转后位置在顶端
});
export default router;
