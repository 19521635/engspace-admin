<template>
	<layout-default>
		<div class="row">
			<div class="col-12 col-xl-8 mb-3 mb-xl-0">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-row align-items-center mb-4">
						<button class="btn" @click="$router.go(-1)"><font-awesome-icon icon="long-arrow-alt-left" size="lg" /></button>
						<h4 class="ml-2 mb-0 font-weight-bold">Chỉnh sửa thư mục</h4>
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
						<h4 class="ml-2 mb-0 font-weight-bold">Học phần ({{ form.sets.length }})</h4>
					</div>
					<div class="text-center" v-if="form.sets.length === 0">Không có học phần nào</div>
					<div v-else>
						<button class="btn btn-light w-100 text-left mb-2 p-2" v-for="set in form.sets" v-bind:key="set" @click="$router.push({ name: 'set_detail', params: { id: set.id } })">{{ set.name }}</button>
						<button class="btn btn-light w-100 p-2"><font-awesome-icon icon="plus" /></button>
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
		name: "editfolder",
		components: {
			LayoutDefault,
		},
		data() {
			return {
				folder_id: this.$route.params.id,
				form: {
					id: 0,
					is_public: true,
					name: "",
					description: "",
					date_created: "",
					date_updated: "",
					user: 0,
					sets: [],
				},
				row: {},
			};
		},
		methods: {
			submitForm() {
				FolderDataService.put(this.folder_id, this.form)
					.then((response) => {
						this.row = response.data;
						this.form = this.row;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			retrieveFolderById(id) {
				FolderDataService.getId(id)
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
			this.retrieveFolderById(this.folder_id);
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
