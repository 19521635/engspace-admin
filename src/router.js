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
		path: "/users/add/",
		name: "add_user",
		component: () => import("./pages/AddUser"),
	},
	{
		path: "/users/:id/",
		name: "user_detail",
		component: () => import("./pages/EditUser"),
	},
	{
		path: "/sets",
		name: "sets",
		component: () => import("./pages/ManageSet"),
	},
	{
		path: "/sets/add/",
		name: "add_set",
		component: () => import("./pages/AddSet"),
	},
	{
		path: "/sets/:id/",
		name: "set_detail",
		component: () => import("./pages/EditSet"),
	},
	{
		path: "/folders",
		name: "folders",
		component: () => import("./pages/ManageFolder"),
	},
	{
		path: "/folders/add/",
		name: "add_folder",
		component: () => import("./pages/AddFolder"),
	},
	{
		path: "/folders/:id/",
		name: "folder_detail",
		component: () => import("./pages/EditFolder"),
	},
	{
		path: "/topics",
		name: "topics",
		component: () => import("./pages/ManageTopic"),
	},
	{
		path: "/topics/add/",
		name: "add_topic",
		component: () => import("./pages/AddTopic"),
	},
	{
		path: "/topics/:id/",
		name: "topic_detail",
		component: () => import("./pages/EditTopic"),
	},
	{
		path: "/settings",
		name: "settings",
		component: () => import("./pages/Setting"),
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
	linkActiveClass: "router-link-active",
	linkExactActiveClass: "exact-active",
});

export default router;
