<template>
	<layout-default>
		<div class="row">
			<div class="col-12 col-xl-8 mb-3 mb-xl-0">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-row align-items-center mb-4">
						<button aria-label="Back" class="btn" @click="$router.go(-1)"><font-awesome-icon icon="long-arrow-alt-left" size="lg" /></button>
						<h4 class="ml-2 mb-0 font-weight-bold">Chỉnh sửa học phần</h4>
					</div>
					<div>
						<form v-on:submit.prevent="submitForm" spellcheck="false">
							<div class="mb-3">
								<label for="nameInput" class="form-label">Tên học phần:</label>
								<input type="text" placeholder="Nhập tên học phần" class="form-control" id="nameInput" v-model="form.name" />
							</div>
							<div class="mb-3">
								<label for="descriptionInput" class="form-label">Mô tả:</label>
								<textarea placeholder="Nhập mô tả" class="form-control" id="descriptionInput" rows="3" v-model="form.description" />
							</div>
							<div class="mb-3">
								<label for="imageInput" class="form-label">Hình ảnh:</label>
								<div></div>
								<input type="file" class="form-control-file" id="imageInput" aria-describedby="imageHelp" />
								<div id="imageHelp" class="form-text">{{ form.image }}</div>
							</div>
							<div class="mb-3">
								<label for="userInput" class="form-label">Người tạo:</label>
								<input type="text" placeholder="Nhập id người tạo" class="form-control" id="userInput" v-model="form.user" disabled readonly />
							</div>
							<div class="mb-3">
								<label for="topicInput" class="form-label">Chủ đề:</label>
								<input type="text" placeholder="Nhập chủ đề" class="form-control" id="topicInput" v-model="form.topic" />
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
			<div class="col-12 col-xl-4">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-column mb-4">
						<h4 class="ml-2 mb-0 font-weight-bold">Thuật ngữ ({{ form.set_details.length }})</h4>
					</div>
					<div>
						<div class="btn btn-light w-100 text-left mb-2 p-2" v-for="set_detail in form.set_details" v-bind:key="set_detail">
							{{ set_detail.term }}
							<button @click="deleteSetDetail(set_detail.id)" class="btn text-danger rounded-circle btn-sm float-right"><font-awesome-icon icon="trash-alt" /></button>
						</div>
						<form v-if="isAddSetDetail" class="bg-light p-2 mb-2 rounded" v-on:submit.prevent="addSetDetail" spellcheck="false">
							<div class="mb-3">
								<label for="termInput" class="form-label">Thuật ngữ:</label>
								<textarea placeholder="Nhập thuật ngữ" class="form-control" id="termInput" v-model="formSetDetail.term" />
							</div>
							<div class="mb-3">
								<label for="termLangInput" class="form-label">Ngôn ngữ:</label>
								<select class="form-control" id="termLangInput" aria-label="Default select example" v-model="formSetDetail.term_lang">
									<option value="en">English</option>
									<option value="vi">Việt Nam</option>
								</select>
							</div>
							<div class="mb-3">
								<label for="definitionInput" class="form-label">Định nghĩa:</label>
								<textarea placeholder="Nhập định nghĩa" class="form-control" id="definitionInput" v-model="formSetDetail.definition" />
							</div>
							<div class="mb-3">
								<label for="definitionLangInput" class="form-label">Ngôn ngữ:</label>
								<select class="form-control" id="definitionLangInput" aria-label="Default select example" v-model="formSetDetail.definition_lang">
									<option value="en">English</option>
									<option value="vi">Vietnamese</option>
								</select>
							</div>

							<div class="d-flex flex flex-row align-items-center justify-content-end">
								<button @click="closeAddSetDetail" class="btn btn-danger mr-2">Hủy</button>
								<button type="submit" class="btn btn-success">Thêm</button>
							</div>
						</form>
						<button v-if="!isAddSetDetail" @click="showAddSetDetail" class="btn btn-light w-100 p-2"><font-awesome-icon icon="plus" /></button>
					</div>
				</div>
			</div>
		</div>
	</layout-default>
</template>

<script>
	import LayoutDefault from "../layouts/LayoutDefault";
	import SetDataService from "../services/set.service";
	import SetDetailDataService from "../services/setdetail.service";
	export default {
		name: "editset",
		components: {
			LayoutDefault,
		},
		data() {
			return {
				isSuccess: false,
				isFailed: false,
				set_id: this.$route.params.id,
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
					set_details: [],
				},
				image: null,
				row: {},
				isAddSetDetail: false,
				formSetDetail: {
					term: "",
					term_lang: "en",
					definition: "",
					definition_lang: "vi",
				},
			};
		},
		methods: {
			submitForm() {
				if (this.form.image === null) {
					delete this.form.image;
				}
				SetDataService.put(this.set_id, this.form)
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
			retrieveSetById(id) {
				SetDataService.getId(id)
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
			showAddSetDetail() {
				this.isAddSetDetail = true;
			},
			closeAddSetDetail() {
				this.isAddSetDetail = false;
			},
			addSetDetail() {
				this.formSetDetail["set"] = this.set_id;
				SetDetailDataService.post(this.formSetDetail)
					.then((response) => {
						this.form.set_details.push(response.data);
					})
					.catch((err) => {
						console.log(err);
					});
				this.isAddSetDetail = false;
			},
			deleteSetDetail(id) {
				SetDetailDataService.delete(id)
					.then(() => {
						let i = this.form.set_details.map((item) => item.id).indexOf(id);
						this.form.set_details.splice(i, 1);
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
			this.retrieveSetById(this.set_id);
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
	.modal {
		z-index: 1100 !important;
	}
</style>
