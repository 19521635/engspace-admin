<template>
	<div class="wrapper d-flex w-100">
		<Sidenav :currentUser="currentUser" :class="{ active: showSidenav }" />
		<div class="container-fluid content" :class="{ active: showSidenav }">
			<nav class="navbar navbar-top navbar-expand-lg navbar-light bg-light shadow-sm mb-3">
				<div class="container-fluid">
					<button v-on:click="toggleSidenav" type="button" id="sidebarCollapse" class="btn btn-info">
						<font-awesome-icon icon="align-left" class="mr-1" />
					</button>
					<button id="noti-btn" class="btn bg-white rounded-circle noti-icon shadow-sm ml-auto position-relative">
						<font-awesome-icon :icon="['far', 'bell']" />
						<span class="position-absolute badge-icon rounded-circle d-flex align-items-center justify-content-center">2</span>
					</button>
					<a href="/logout" class="btn text-danger ml-2" aria-label="logout"><font-awesome-icon icon="sign-out-alt" /></a>
				</div>
			</nav>
			<div class="row">
				<div class="col">
					<slot />
				</div>
				<slot name="sidebar" class="col-auto" />
			</div>
		</div>
	</div>
</template>

<script>
	import Sidenav from "../components/Sidenav";

	export default {
		components: { Sidenav },
		data() {
			return {
				showSidenav: false,
			};
		},
		computed: {
			currentUser() {
				return this.$store.state.auth.user;
			},
		},
		methods: {
			toggleSidenav: function () {
				this.showSidenav = !this.showSidenav;
			},
		},
		mounted() {
			if (!this.currentUser) {
				this.$router.push("/login");
			}
		},
	};
</script>

<style lang="css" scoped>
	.wrapper {
		width: 100%;
		min-height: 100vh;
	}
	.content {
		background-color: #f8f8f8;
		min-height: 100vh;
		padding: 20px 30px;
		z-index: 0;
		width: calc(100% - 15.625rem);
		top: 0;
		right: 0;
		position: absolute;
		transition: all 0.3s;
	}
	.content.active {
		width: 100%;
	}
	@media (max-width: 768px) {
		.content {
			width: 100%;
		}
		.content.active {
			width: calc(100% - 15.625rem);
		}
		.content.active .row {
			display: none;
		}
	}
	.navbar-top {
		border-radius: 20px;
	}
	.noti-icon {
		width: 2.5rem;
		height: 2.5rem;
	}
	.noti-icon svg {
		width: 1rem;
		height: 1rem;
	}
	.badge-icon {
		background-color: #ff754c;
		width: 1rem;
		height: 1rem;
		font-size: 0.75rem;
		color: white;
		margin-right: -0.375rem;
		top: 0;
		right: 0;
	}
</style>
