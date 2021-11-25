<template>
	<layout-default>
		<div class="row">
			<div class="col-12 col-xl-8 mb-3 mb-xl-0">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-row align-items-center mb-4">
						<button class="btn" @click="$router.go(-1)"><font-awesome-icon icon="long-arrow-alt-left" size="lg" /></button>
						<h4 class="ml-2 mb-0 font-weight-bold">Chỉnh sửa chủ đề</h4>
					</div>
					<div>
						<form v-on:submit.prevent="submitForm" spellcheck="false">
							<div class="mb-3">
								<label for="nameInput" class="form-label">Tên thư mục:</label>
								<input type="text" placeholder="Nhập tên học phần" class="form-control" id="nameInput" v-model="form.name" />
							</div>
							<div class="mb-3">
								<label for="descriptionInput" class="form-label">Mô tả:</label>
								<textarea placeholder="Nhập mô tả" class="form-control" id="descriptionInput" rows="3" v-model="form.description" />
							</div>
							<div class="mb-3">
								<label for="userInput" class="form-label">Người tạo:</label>
								<input type="text" class="form-control" id="userInput" v-model="form.user" disabled readonly />
							</div>
							<div class="mb-3">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="isPublicInput" v-model="form.is_public" />
									<label for="isPublicInput" class="form-check-label">Công khai</label>
								</div>
							</div>
							<button type="submit" class="btn btn-info">Cập nhật</button>
						</form>
					</div>
				</div>
			</div>
			<div class="col-12 col-xl-4">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-column mb-4">
						<h4 class="ml-2 mb-0 font-weight-bold">Học phần</h4>
					</div>
					<div>
						<button class="btn btn-light w-100 p-2"><font-awesome-icon icon="plus" /></button>
					</div>
				</div>
			</div>
		</div>
	</layout-default>
</template>

<script>
	import LayoutDefault from "../layouts/LayoutDefault";
	import TopicDataService from "../services/topic.service";
	export default {
		name: "edittopic",
		components: {
			LayoutDefault,
		},
		data() {
			return {
				topic_id: this.$route.params.id,
				form: {
					id: 0,
					is_public: true,
					name: "",
					description: "",
					date_created: "",
					date_updated: "",
					user: 0,
				},
				row: {},
			};
		},
		methods: {
			submitForm() {
				TopicDataService.put(this.topic_id, this.form)
					.then((response) => {
						this.row = response.data;
						this.form = this.row;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			retrieveTopicById(id) {
				TopicDataService.getId(id)
					.then((response) => {
						this.row = response.data;
						if (this.form.id === 0) {
							this.form = this.row;
						}
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		mounted() {
			this.retrieveTopicById(this.topic_id);
		},
	};
</script>

<style lang="css" scoped>
	.card-content {
		background-color: white;
		border-radius: 20px;
	}
	label {
		font-weight: bold;
	}
</style>
