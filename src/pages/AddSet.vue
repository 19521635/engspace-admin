<template>
	<layout-default>
		<div class="row">
			<div class="col-12 col-xl-8 mb-3 mb-xl-0">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-row align-items-center mb-4">
						<button aria-label="Back" class="btn" @click="$router.go(-1)"><font-awesome-icon icon="long-arrow-alt-left" size="lg" /></button>
						<h4 class="ml-2 mb-0 font-weight-bold">Thêm học phần</h4>
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
								<input type="text" placeholder="Nhập id người tạo" class="form-control" id="userInput" v-model="form.user" />
							</div>
							<div class="mb-3">
								<label for="topicInput" class="form-label">Chủ đề:</label>
								<input type="text" placeholder="Nhập id chủ đề" class="form-control" id="topicInput" v-model="form.topic" />
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
						<h4 class="ml-2 mb-0 font-weight-bold">Thuật ngữ (0)</h4>
					</div>
					<div class="text-center text-warning mb-2" v-if="addSetDetailWarning !== ''">
						{{ addSetDetailWarning }}
					</div>
					<div class="text-center mb-2" v-else>Không có thuật ngữ nào</div>

					<div>
						<div class="btn btn-light w-100 text-left mb-2 p-2" v-for="set_detail in form.set_details" v-bind:key="set_detail">
							{{ set_detail.term }}
							<button @click="deleteSetDetail(set_detail.id)" class="btn text-danger rounded-circle btn-sm float-right"><font-awesome-icon icon="trash-alt" /></button>
						</div>
						<button @click="showAddSetDetail" class="btn btn-light w-100 p-2"><font-awesome-icon icon="plus" /></button>
					</div>
				</div>
			</div>
		</div>
	</layout-default>
</template>

<script>
	import LayoutDefault from "../layouts/LayoutDefault";
	import SetDataService from "../services/set.service";
	export default {
		name: "addset",
		components: {
			LayoutDefault,
		},
		data() {
			return {
				form: {
					is_public: true,
					name: "",
					description: "",
					image: null,
					user: "",
					topic: "",
					set_details: [],
				},
				image: null,
				addSetDetailWarning: "",
			};
		},
		methods: {
			submitForm() {
				if (this.form.image === null) {
					delete this.form.image;
				}
				SetDataService.post(this.form)
					.then((response) => {
						this.form = response.data;
						this.$router.push({ name: "set_detail", params: { id: this.form.id } });
					})
					.catch((err) => {
						console.log(err);
					});
			},
			showAddSetDetail() {
				this.addSetDetailWarning = "Thêm học phần trước.";
			},
		},
		mounted() {},
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
