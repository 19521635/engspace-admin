<template>
	<div class="wrapper d-flex w-100 align-items-stretch">
		<Sidenav :currentUser="currentUser" />
		<div class="content">
			<slot />
		</div>
		<slot name="sidebar" />
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
		padding: 20px 30px;
		margin-left: 250px;
	}
</style>
