import { isAuth, isLoggedIn } from "@/middlewares";

export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: {
      layout: "AppLayoutOrdersProfile",
      middlewares: [isAuth],
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      layout: "AppLayoutOrdersProfile",
      middlewares: [isAuth],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      layout: "AppLayoutDefault",
      middlewares: [isLoggedIn],
    },
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: () => import("../views/OrderPopup.vue"),
    meta: { layout: 'AppLayoutDefault' },
  },
];
