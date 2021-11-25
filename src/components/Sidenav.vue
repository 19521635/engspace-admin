<template>
	<nav id="sidebar" class="bg-white d-flex flex-column">
		<div class="sidebar-header d-flex align-items-end justify-content-center">
			<h2 class="font-weight-bold">EngSpace</h2>
			<span class="red-icon"></span>
		</div>
		<ul class="list-unstyled mt-5 mr-3">
			<li>
				<router-link :to="{ name: 'home' }" active-link="active"><font-awesome-icon icon="home" size="lg" />Trang chủ</router-link>
			</li>
			<li>
				<router-link :to="{ name: 'sets' }" :class="{ 'router-link-active': $route.name === 'set_detail' || $route.name === 'add_set' }" active-link="active"><font-awesome-icon icon="layer-group" size="lg" />Quản lý học phần</router-link>
			</li>
			<li>
				<router-link :to="{ name: 'folders' }" :class="{ 'router-link-active': $route.name === 'folder_detail' || $route.name === 'add_folder' }" active-link="active"><font-awesome-icon icon="folder-open" size="lg" />Quản lý thư mục</router-link>
			</li>
			<li>
				<router-link :to="{ name: 'topics' }" :class="{ 'router-link-active': $route.name === 'topic_detail' || $route.name === 'add_topic' }" active-link="active"><font-awesome-icon icon="tags" size="lg" />Quản lý chủ đề</router-link>
			</li>
			<li>
				<router-link :to="{ name: 'users' }" :class="{ 'router-link-active': $route.name === 'user_detail' || $route.name === 'add_user' }" active-link="active"><font-awesome-icon icon="users" size="lg" />Quản lý người dùng</router-link>
			</li>
			<li>
				<router-link to="/settings" active-link="active"><font-awesome-icon icon="cog" size="lg" />Cài đặt mở rộng</router-link>
			</li>
		</ul>
		<div class="admin-card w-100 d-flex flex-row align-self-end mt-auto">
			<div class="admin-ava overflow-hidden rounded-circle">
				<img src="/img/avatar.jpg" alt="avatar" class="w-100 h-100" />
			</div>
			<div class="d-flex flex-column ml-3">
				<p class="mb-0 font-weight-bold">{{ user && user.username }}</p>
				<p class="mb-0 admin-description">Tài khoản Admin</p>
			</div>
		</div>
	</nav>
</template>

<script>
	export default {
		name: "sidenav",
		props: ["currentUser"],
		data() {
			return {
				user: this.currentUser,
			};
		},
	};
</script>

<style lang="css" scoped>
	a {
		text-decoration: none;
	}
	li > a {
		color: #808191;
		white-space: nowrap;
		display: block;
		padding: 20px;
		background-color: transparent;
		transition: all 0.3s;
	}
	li > a.router-link-active {
		color: white;
		background-color: #17a2b8;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	svg {
		margin-right: 10px;
	}
	#sidebar {
		width: 15.625rem;
		height: 100vh;
		border-right: 1px solid #e4e4e4;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		transition: all 0.3s;
		overflow-y: auto;
	}
	#sidebar.active {
		margin-left: -15.625rem;
	}
	@media (max-width: 768px) {
		#sidebar {
			margin-left: -15.625rem;
		}
		#sidebar.active {
			margin-left: 0;
		}
	}

	.sidebar-header {
		margin-top: 20px;
	}
	.red-icon {
		border-radius: 50%;
		width: 8px;
		height: 8px;
		background-color: rgb(253, 92, 92);
		right: 0;
		bottom: 0;
		margin-bottom: 14px;
	}
	.admin-card {
		padding: 20px;
	}
	.admin-ava {
		width: 40px;
		height: 40px;
	}
	.admin-description {
		font-size: 0.875rem;
	}
</style>
