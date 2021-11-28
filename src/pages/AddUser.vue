<template>
	<layout-default>
		<div class="row">
			<div class="col-12 col-xl-8 mb-3 mb-xl-0">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-row align-items-center mb-4">
						<button aria-label="Back" class="btn" @click="$router.go(-1)"><font-awesome-icon icon="long-arrow-alt-left" size="lg" /></button>
						<h4 class="ml-2 mb-0 font-weight-bold">Thêm chủ đề</h4>
					</div>
					<div>
						<form v-on:submit.prevent="submitForm" spellcheck="false">
							<div class="mb-3">
								<label for="usernameInput" class="form-label">Tên người dùng:</label>
								<input type="text" placeholder="Nhập tên người dùng" class="form-control" id="usernameInput" v-model="form.username" />
							</div>
							<div class="mb-3">
								<label for="lastnameInput" class="form-label">Tên họ:</label>
								<input type="text" class="form-control" id="lastnameInput" v-model="form.last_name" />
							</div>
							<div class="mb-3">
								<label for="firstnameInput" class="form-label">Tên:</label>
								<input type="text" class="form-control" id="firstnameInput" v-model="form.first_name" />
							</div>
							<div class="mb-3">
								<label for="emailInput" class="form-label">Địa chỉ email:</label>
								<input type="email" class="form-control" id="emailInput" v-model="form.email" />
							</div>

							<div class="mb-3">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="isActiveInput" v-model="form.is_active" />
									<label for="isActiveInput" class="form-check-label">Được kích hoạt</label>
								</div>
							</div>
							<div class="mb-3">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="isStaffInput" v-model="form.is_staff" />
									<label for="isStaffInput" class="form-check-label">Là staff</label>
								</div>
							</div>
							<div class="mb-3">
								<div class="form-check">
									<input type="checkbox" class="form-check-input" id="isSuperUserInput" v-model="form.is_superuser" />
									<label for="isSuperUserInput" class="form-check-label">Là superuser</label>
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
						<h4 class="ml-2 mb-0 font-weight-bold">Người dùng đăng ký gần đây</h4>
					</div>
					<div>
						<div @click="$router.push({ name: 'user_detail', params: { id: item.id } })" class="btn btn-light w-100 text-left mb-2 p-2" v-for="item in rows.slice().reverse()" v-bind:key="item">
							{{ item.username }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</layout-default>
</template>

<script>
	import LayoutDefault from "../layouts/LayoutDefault";
	import UserDataService from "../services/user.service";
	export default {
		name: "adduser",
		components: {
			LayoutDefault,
		},
		data() {
			return {
				form: {
					username: "",
					last_name: "",
					first_name: "",
					email: "",
					is_active: true,
					is_staff: false,
					is_superuser: false,
				},
				rows: [],
			};
		},
		methods: {
			submitForm() {
				UserDataService.post(this.form)
					.then((response) => {
						this.form = response.data;
						this.$router.push({ name: "user_detail", params: { id: this.form.id } });
					})
					.catch((err) => {
						console.log(err);
					});
			},
			retrieveUsers() {
				UserDataService.get()
					.then((response) => {
						this.rows = response.data.results;
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

<style lang="css" scoped>
	.card-content {
		background-color: white;
		border-radius: 20px;
	}
	label {
		font-weight: bold;
	}
</style>
