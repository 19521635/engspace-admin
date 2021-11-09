<template>Đã Logout</template>

<script>
	export default {
		name: "lougout",
		methods: {
			logOut() {
				this.$store.dispatch("auth/logout");
				this.$router.push("/login");
			},
		},
		mounted() {
			this.logOut();
		},
	};
</script>

<style></style>
