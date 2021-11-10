import { createWebHistory, createRouter } from "vue-router";

const routes = [
	{
		path: "/",
		name: "home",
		component: () => import("./pages/Home"),
	},
	{
		path: "/users",
		name: "users",
		component: () => import("./pages/ManageUser"),
	},
	{
		path: "/sets",
		name: "sets",
		component: () => import("./pages/ManageSet"),
	},
	{
		path: "/folders",
		name: "folders",
		component: () => import("./pages/ManageFolder"),
	},
	{
		path: "/topics",
		name: "topics",
		component: () => import("./pages/ManageTopic"),
	},
	{
		path: "/login",
		name: "login",
		component: () => import("./pages/Login"),
	},
	{
		path: "/logout",
		name: "logout",
		component: () => import("./pages/Logout"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
