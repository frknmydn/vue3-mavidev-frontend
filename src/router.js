import { createWebHistory, createRouter} from "vue-router";

const routes = 
[
{
    path: "/",
    alias: "/Datas",
    name: "datas",
    component: () => import("./components/DataList.vue")
},
{
    path: "/datas/:id",
    name: "data-details",
    component: () => import("./components/Data.vue")
},
  {
    path: "/add",
    name: "add",
    component: () => import("./components/addData.vue")
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

