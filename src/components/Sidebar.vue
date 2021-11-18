<template>
	<div class="sidebar container-fluid mt-xs-5 mt-md-0">
		<div class="d-flex flex-column">
			<div class="d-flex flex-column mt-5 mr-2">
				<p class="font-weight-bold">Các chủ đề đã tạo gần đây</p>
				<router-link to="/" class="topic-card d-flex flex-row align-items-center w-100 p-3 shadow-sm mt-3" v-for="topic in topics.slice().reverse()" :key="topic.id">
					<div>
						<p class="mb-0 font-weight-bold">{{ topic.name }}</p>
						<p class="mb-0">{{ topic.description }}</p>
					</div>
					<font-awesome-icon icon="angle-right" class="ml-auto" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import TopicDataService from "../services/topic.service";
	export default {
		name: "sidebar",
		data() {
			return {
				topics: [],
			};
		},
		methods: {
			retrieveTopics() {
				TopicDataService.get()
					.then((response) => {
						this.topics = response.data.results;
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		mounted() {
			this.retrieveTopics();
		},
	};
</script>

<style lang="css" scoped>
	a {
		text-decoration: none;
		color: inherit;
	}
	.sidebar {
		width: 23rem;
	}
	@media (max-width: 1199.98px) {
		.sidebar {
			width: 100%;
		}
	}
	.topic-card {
		border-radius: 1.25rem;
		background-color: white;
	}
</style>
