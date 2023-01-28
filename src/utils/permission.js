// 路由拦截文件，权限校验等操作
import router from "@/router";
router.beforeEach((to, from, next) => {
  // console.log("before:::", to, from);
  next();
});
router.afterEach((to, from) => {
  // console.log("after:::", to, from);
});
