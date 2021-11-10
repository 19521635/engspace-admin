<template>
	<auth-layout>
		<Login />
	</auth-layout>
</template>

<script>
	import AuthLayout from "../layouts/AuthLayout";
	import Login from "../components/Login";
	export default {
		name: "login",
		components: {
			Login,
			AuthLayout,
		},
	};
</script>

<style></style>
