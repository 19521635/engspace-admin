<template>
	<div class="overview">
		<p class="font-weight-bold h5">Chào mừng {{ user && user.username }} trở lại,</p>
		<p class="font-weight-bold h2">Hôm nay của bạn như thế nào?</p>
	</div>
	<div class="position-relative mt-4">
		<div class="ads d-flex flex-row">
			<div class="d-flex">
				<img src="/img/overview.png" alt="overview" />
			</div>
			<div class="d-flex flex-column mt-4">
				<p class="font-weight-bold h5">Tổng quan sơ bộ</p>
				<p class="mt-4 h6">Cố gắng lên ứng dụng đã có {{ totalUsers }} lượt sử dụng rồi đấy!</p>
				<button class="btn btn-light font-weight-bold btn-next mt-auto mb-5">Next</button>
			</div>
		</div>
		<div class="ads position-absolute"></div>
		<div class="ads position-absolute"></div>
	</div>
	<div class="mt-4 summary">
		<p class="font-weight-bold h5">Một số thông tin chung</p>
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-4">
					<div class="bg-white shadow p-3">
						<p class="font-weight-bold mb-0">Tổng số người dùng</p>
						<p class="">{{ totalUsers }}</p>
						<div>
							<img src="/img/graph.png" alt="graph" class="w-100" />
						</div>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="bg-white shadow p-3">
						<p class="font-weight-bold mb-0">Tổng số học phần</p>
						<p class="">{{ totalUsers }}</p>
						<div>
							<img src="/img/graph.png" alt="graph" class="w-100" />
						</div>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="bg-white shadow p-3">
						<p class="font-weight-bold mb-0">Tổng số thư mục</p>
						<p class="">{{ totalUsers }}</p>
						<div>
							<img src="/img/graph.png" alt="graph" class="w-100" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import UserDataService from "../services/user.service";

	export default {
		name: "overview",
		props: ["currentUser"],
		data() {
			return {
				user: this.currentUser,
				totalUsers: 0,
			};
		},
		methods: {
			retrieveTotalUsers() {
				UserDataService.getAll()
					.then((response) => {
						this.totalUsers = response.data.count;
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		mounted() {
			this.retrieveTotalUsers();
		},
	};
</script>

<style lang="css" scoped>
	.ads {
		width: 100%;
		height: 315px;
		border-radius: 20px;
		background-color: #2673d1;
		color: white;
		padding: 20px;
	}
	.btn-next {
		width: 100px;
		height: 50px;
		border-radius: 15px;
	}
	.ads:nth-child(2) {
		width: calc(100% - 1.25rem);
		top: 0;
		background-color: #2673d17c;
		z-index: -1;
		margin-top: 10px;
		margin-left: 10px;
	}
	.ads:nth-child(3) {
		width: calc(100% - 2.5rem);
		top: 0;
		background-color: #2673d11c;
		z-index: -2;
		margin-top: 20px;
		margin-left: 20px;
	}
	.summary .row div {
		border-radius: 20px;
	}
</style>
