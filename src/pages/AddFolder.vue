<template>
	<layout-default>
		<div class="row">
			<div class="col-12 col-xl-8 mb-3 mb-xl-0">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-row align-items-center mb-4">
						<button class="btn" @click="$router.go(-1)"><font-awesome-icon icon="long-arrow-alt-left" size="lg" /></button>
						<h4 class="ml-2 mb-0 font-weight-bold">Thêm chủ đề</h4>
					</div>
					<div>
						<form v-on:submit.prevent="submitForm" spellcheck="false">
							<div class="mb-3">
								<label for="nameInput" class="form-label">Tên chủ đề:</label>
								<input type="text" placeholder="Nhập tên chủ đề" class="form-control" id="nameInput" v-model="form.name" />
							</div>
							<div class="mb-3">
								<label for="descriptionInput" class="form-label">Mô tả:</label>
								<textarea placeholder="Nhập mô tả" class="form-control" id="descriptionInput" rows="3" v-model="form.description" />
							</div>
							<div class="mb-3">
								<label for="userInput" class="form-label">Người tạo:</label>
								<input type="text" placeholder="Nhập id người tạo" class="form-control" id="userInput" v-model="form.user" />
							</div>
							<div class="mb-3">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="isPublicInput" v-model="form.is_public" />
									<label for="isPublicInput" class="form-check-label">Công khai</label>
								</div>
							</div>
							<button type="submit" class="btn btn-info ml-auto mr-0 d-block">Thêm</button>
						</form>
					</div>
				</div>
			</div>
			<div class="col-12 col-xl-4">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-column mb-4">
						<h4 class="ml-2 mb-0 font-weight-bold">Chủ đề thêm gần đây</h4>
					</div>
					<div>
						<div @click="$router.push({ name: 'folder_detail', params: { id: item.id } })" class="btn btn-light w-100 text-left mb-2 p-2" v-for="item in rows.slice().reverse()" v-bind:key="item">
							{{ item.name }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</layout-default>
</template>

<script>
	import LayoutDefault from "../layouts/LayoutDefault";
	import FolderDataService from "../services/folder.service";
	export default {
		name: "addfolder",
		components: {
			LayoutDefault,
		},
		data() {
			return {
				form: {
					is_public: true,
					name: "",
					description: "",
					user: "",
				},
				rows: [],
			};
		},
		methods: {
			submitForm() {
				FolderDataService.post(this.form)
					.then((response) => {
						this.form = response.data;
						this.$router.push({ name: "folder_detail", params: { id: this.form.id } });
					})
					.catch((err) => {
						console.log(err);
					});
			},
			retrieveFolders() {
				FolderDataService.get()
					.then((response) => {
						this.rows = response.data.results;
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		mounted() {
			this.retrieveFolders();
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
