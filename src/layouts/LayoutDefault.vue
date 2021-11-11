<template>
	<div class="wrapper d-flex w-100">
		<Sidenav :currentUser="currentUser" />
		<div class="container content">
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
		computed: {
			currentUser() {
				return this.$store.state.auth.user;
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
		min-height: 100vh;
	}
	.content {
		background-color: #fdfdfd;
		padding: 20px 30px;
	}
	@media (min-width: 768px) {
		.content {
			margin-left: 250px;
		}
	}
</style>
