import { createWebHistory, createRouter } from "vue-router";

const routes = [
	{
		path: "/",
		name: "users",
		component: () => import("./components/Users/UsersList"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import("./components/Login"),
	},
	{
		path: "/logout",
		name: "logout",
		component: () => import("./components/Logout"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
