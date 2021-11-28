<template>
	<layout-default>
		<div class="row">
			<div class="col-12 mb-3 mb-xl-0">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-row align-items-center mb-4">
						<button aria-label="Back" class="btn" @click="$router.go(-1)"><font-awesome-icon icon="long-arrow-alt-left" size="lg" /></button>
						<h4 class="ml-2 mb-0 font-weight-bold">Chỉnh sửa bài viết</h4>
					</div>
					<div>
						<form v-on:submit.prevent="submitForm" spellcheck="false">
							<div class="mb-3">
								<label for="nameInput" class="form-label">Tên bài viết:</label>
								<input type="text" placeholder="Nhập tên bài viết" class="form-control" id="nameInput" v-model="form.name" />
							</div>
							<div class="mb-3">
								<label for="descriptionInput" class="form-label">Mô tả:</label>
								<ckeditor :editor="editor" v-model="form.body" :config="editorConfig"></ckeditor>
							</div>
							<div class="mb-3">
								<label for="userInput" class="form-label">Người tạo:</label>
								<input type="text" placeholder="Nhập id người tạo" class="form-control" id="userInput" v-model="form.user" disabled readonly />
							</div>

							<div class="mb-3">
								<label for="viewInput" class="form-label">Số lượt xem:</label>
								<input type="number" placeholder="Nhập số lượt xem" class="form-control" id="viewInput" v-model="form.view_count" disabled readonly />
							</div>
							<div class="mb-3">
								<label for="commentInput" class="form-label">Số lượt bình luận:</label>
								<input type="number" placeholder="Nhập số lượt bình luận" class="form-control" id="commentInput" v-model="form.comments" disabled readonly />
							</div>
							<div class="mb-3">
								<label for="likeInput" class="form-label">Số lượt thích:</label>
								<input type="number" placeholder="Nhập số lượt thích" class="form-control" id="likeInput" v-model="form.likes" disabled readonly />
							</div>
							<div class="mb-3">
								<label for="dislikeInput" class="form-label">Số lượt không thích:</label>
								<input type="number" placeholder="Nhập số lượt không thích" class="form-control" id="dislikeInput" v-model="form.dislikes" disabled readonly />
							</div>

							<div class="mb-3">
								<label for="dateCreatedInput" class="form-label">Ngày tạo:</label>
								<input type="datetime" placeholder="Nhập ngày tạo" class="form-control" id="dateCreatedInput" v-model="form.date_created" disabled readonly />
							</div>
							<div class="mb-3">
								<label for="dateUpdatedInput" class="form-label">Ngày cập nhật:</label>
								<input type="datetime" placeholder="Nhập ngày cập nhật" class="form-control" id="dateUpdatedInput" v-model="form.date_updated" disabled readonly />
							</div>

							<div class="mb-3">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="isPublicInput" v-model="form.is_public" />
									<label for="isPublicInput" class="form-check-label">Công khai</label>
								</div>
							</div>
							<button type="submit" class="btn btn-info ml-auto mr-0 d-block">Cập nhật</button>
							<div class="alert alert-success mt-2 alert-dismissible fade show" role="alert" v-if="isSuccess">
								Cập nhật thành công
								<button type="button" class="close" @click="closeSuccess" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="alert alert-danger mt-2 alert-dismissible" role="alert" v-if="isFailed">
								Cập nhật thất bại
								<button type="button" class="close" @click="closeFailed" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</layout-default>
</template>

<script>
	import CKEditor from "@ckeditor/ckeditor5-vue";
	import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
	import LayoutDefault from "../layouts/LayoutDefault";
	import PostDataService from "../services/post.service";
	export default {
		name: "editpost",
		components: {
			LayoutDefault,
			ckeditor: CKEditor.component,
		},
		data() {
			return {
				isSuccess: false,
				isFailed: false,
				editor: ClassicEditor,
				editorData: "<p>Content of the editor.</p>",
				editorConfig: {},
				post_id: this.$route.params.id,
				form: {
					id: 0,
					is_public: true,
					name: "",
					description: "",
					image: "",
					date_created: "",
					date_updated: "",
					user: 0,
					topic: 0,
				},
				image: null,
				row: {},
			};
		},
		methods: {
			submitForm() {
				PostDataService.put(this.post_id, this.form)
					.then((response) => {
						this.row = response.data;
						this.form = this.row;
						this.isSuccess = true;
					})
					.catch((err) => {
						this.isFailed = true;
						console.log(err);
					});
			},
			retrievePostById(id) {
				PostDataService.getId(id)
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
			closeSuccess() {
				this.isSuccess = false;
			},
			closeFailed() {
				this.isFailed = false;
			},
		},
		mounted() {
			this.retrievePostById(this.post_id);
		},
	};
</script>

<style lang="css">
	.card-content {
		background-color: white;
		border-radius: 20px;
	}
	label {
		font-weight: bold;
	}
	.ck-editor__editable {
		min-height: 300px;
	}
</style>
