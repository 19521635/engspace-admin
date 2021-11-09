<template>
	<ul>
		<li v-for="(user, index) in users" :key="index">
			{{ user.username }}
		</li>
	</ul>
</template>

<script>
	import UserDataService from "../../services/user.service";

	export default {
		name: "users-list",
		data() {
			return {
				users: [],
			};
		},
		methods: {
			retrieveUsers() {
				UserDataService.getAll()
					.then((response) => {
						this.users = response.data.results;
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		mounted() {
			this.retrieveUsers();
		},
	};
</script>

<style></style>
