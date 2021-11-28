<template>
	<layout-default>
		<div class="row">
			<div class="col-12 mb-3 mb-xl-0">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-row align-items-center mb-4">
						<button aria-label="Back" class="btn" @click="$router.go(-1)"><font-awesome-icon icon="long-arrow-alt-left" size="lg" /></button>
						<h4 class="ml-2 mb-0 font-weight-bold">Thêm bình luận</h4>
					</div>
					<div>
						<form v-on:submit.prevent="submitForm" spellcheck="false">
							<div class="mb-3">
								<label for="descriptionInput" class="form-label">Nội dung bình luận:</label>
								<ckeditor :editor="editor" v-model="form.body" :config="editorConfig"></ckeditor>
							</div>
							<div class="mb-3">
								<label for="userInput" class="form-label">Bài viết:</label>
								<input type="text" placeholder="Nhập id bài viết" class="form-control" id="userInput" v-model="form.post" />
							</div>
							<div class="mb-3">
								<label for="userInput" class="form-label">Bình luận:</label>
								<input type="text" placeholder="Nhập id bình luận" class="form-control" id="userInput" v-model="form.comment" />
							</div>
							<div class="mb-3">
								<label for="userInput" class="form-label">Người tạo:</label>
								<input type="text" placeholder="Nhập id người tạo" class="form-control" id="userInput" v-model="form.user" />
							</div>
							<button type="submit" class="btn btn-info ml-auto mr-0 d-block">Thêm</button>
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
	import CommentDataService from "../services/comment.service";
	export default {
		name: "addcomment",
		components: {
			LayoutDefault,
			ckeditor: CKEditor.component,
		},
		data() {
			return {
				editor: ClassicEditor,
				editorData: "<p>Content of the editor.</p>",
				editorConfig: {},
				form: {
					body: "",
					post: "",
					comment: "",
					user: "",
				},
			};
		},
		methods: {
			submitForm() {
				CommentDataService.post(this.form)
					.then((response) => {
						this.form = response.data;
						this.$router.push({ name: "comment_detail", params: { id: this.form.id } });
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		mounted() {},
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
