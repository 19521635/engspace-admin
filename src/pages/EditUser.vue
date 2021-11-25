<template>
	<layout-default>
		<div class="row">
			<div class="col-12 col-xl-8 mb-3 mb-xl-0">
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-row align-items-center mb-4">
						<button class="btn" @click="$router.go(-1)"><font-awesome-icon icon="long-arrow-alt-left" size="lg" /></button>
						<h4 class="ml-2 mb-0 font-weight-bold">Chỉnh sửa người dùng</h4>
					</div>
					<div>
						<form v-on:submit.prevent="submitForm" spellcheck="false">
							<div class="mb-3">
								<label for="usernameInput" class="form-label">Tên người dùng:</label>
								<input type="text" placeholder="Nhập tên người dùng" class="form-control" id="usernameInput" v-model="form.username" />
							</div>
							<div class="mb-3">
								<label for="lastnameInput" class="form-label">Tên họ:</label>
								<textarea placeholder="Nhập tên họ" class="form-control" id="lastnameInput" rows="3" v-model="form.last_name" />
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
								<label for="dateJoinedInput" class="form-label">Ngày tham gia:</label>
								<input type="datetime" class="form-control" id="dateJoinedInput" v-model="form.date_joined" disabled readonly />
							</div>
							<div class="mb-3">
								<label for="dateJoinedInput" class="form-label">Lần cuối đăng nhập:</label>
								<input type="datetime" class="form-control" id="dateJoinedInput" v-model="form.last_login" disabled readonly />
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
							<button type="submit" class="btn btn-info">Cập nhật</button>
						</form>
					</div>
				</div>
			</div>
			<div class="col-12 col-xl-4">
				<div class="card-content overflow-hidden p-4 mb-3 shadow-sm">
					<div class="d-flex flex-column mb-4">
						<h4 class="ml-2 mb-0 font-weight-bold">Học phần</h4>
					</div>
					<div>
						<button class="btn btn-light w-100 p-2"><font-awesome-icon icon="plus" /></button>
					</div>
				</div>
				<div class="card-content overflow-hidden p-4 shadow-sm">
					<div class="d-flex flex-column mb-4">
						<h4 class="ml-2 mb-0 font-weight-bold">Thư mục</h4>
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
	import UserDataService from "../services/user.service";
	export default {
		name: "edituser",
		components: {
			LayoutDefault,
		},
		data() {
			return {
				user_id: this.$route.params.id,
				form: {
					id: 0,
				},
				row: {},
			};
		},
		methods: {
			submitForm() {
				UserDataService.put(this.user_id, this.form)
					.then((response) => {
						this.row = response.data;
						this.form = this.row;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			retrieveUserById(id) {
				UserDataService.getId(id)
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
			this.retrieveUserById(this.user_id);
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
