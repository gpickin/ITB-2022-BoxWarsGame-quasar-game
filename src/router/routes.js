const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/game",
    component: () => import("layouts/GameLayout.vue"),
    children: [{ path: "", component: () => import("pages/Game.vue") }],
  },
  {
    path: "/leaderboard",
    component: () => import("layouts/GameLayout.vue"),
    children: [{ path: "", component: () => import("pages/Leaderboard.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
