import { createWebHistory, createRouter } from "vue-router";

const routes = [
	{
		path: "/",
		alias: "/",
		name: "users",
		component: () => import("./components/Users/UsersList"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
