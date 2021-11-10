<template>
	<layout-default>
		<overview :currentUser="currentUser" />
		<template v-slot:sidebar>
			<sidebar />
		</template>
	</layout-default>
</template>

<script>
	import Overview from "../components/Overview";
	import LayoutDefault from "../layouts/LayoutDefault";
	import Sidebar from "../components/Sidebar";
	export default {
		name: "home",
		components: {
			LayoutDefault,
			Overview,
			Sidebar,
		},
		computed: {
			currentUser() {
				return this.$store.state.auth.user;
			},
		},
	};
</script>

<style></style>
