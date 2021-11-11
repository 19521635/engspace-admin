<template>
	<div class="sidebar ml-auto container mt-5 mt-md-0">
		<div class="row">
			<div class="d-flex flex-column w-100">
				<div class="d-flex flex-row justify-content-center align-items-center d-flex mr-2">
					<div class="w-100 d-flex flex-row align-items-end">
						<font-awesome-icon icon="search" class="my-auto" />
						<input type="text" placeholder="Tìm kiếm một vài thứ gì đó...?" class="w-100" />
					</div>
					<button id="noti-btn" class="btn btn-light rounded-circle noti-icon shadow ml-auto mr-2 position-relative">
						<font-awesome-icon :icon="['far', 'bell']" />
						<span class="position-absolute badge-icon rounded-circle d-flex align-items-center justify-content-center">2</span>
					</button>
				</div>
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
				TopicDataService.getAll()
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
	input {
		outline: none;
		border: 0;
		background-color: transparent;
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
	.topic-card {
		border-radius: 1.25rem;
	}
</style>
