export default [
  {
    path: "/",
    name: "/",
    redirect: "/home",
    meta: { title: "首页" },
  },
  {
    path: "/home",
    component: () => import("@/views/home/index.vue"),
    name: "Home",
    meta: { title: "首页" },
  },
  {
    path: "/list",
    component: () => import("@/views/home/list.vue"),
    name: "List",
    meta: { title: "列表页" },
    children: [
      {
        path: "detail",
        component: () => import("@/views/home/detail.vue"),
        name: "Detail",
        meta: { title: "详情页" },
      },
    ],
  },
];
