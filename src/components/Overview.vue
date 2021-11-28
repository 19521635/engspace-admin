<template>
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
	<div class="mt-5 summary">
		<p class="font-weight-bold h5">Một số thông tin chung</p>
		<div class="container">
			<div class="row">
				<div class="col-12 col-md-4">
					<div class="bg-white h-100 shadow p-3">
						<p class="font-weight-bold mb-0">Tổng số người dùng</p>
						<p class="">{{ totalUsers }}</p>
						<div>
							<img src="/img/graph.png" alt="graph" class="w-100" />
						</div>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="bg-white h-100 shadow p-3">
						<p class="font-weight-bold mb-0">Tổng số học phần</p>
						<p class="">{{ totalSets }}</p>
						<div>
							<img src="/img/graph.png" alt="graph" class="w-100" />
						</div>
					</div>
				</div>
				<div class="col-12 col-md-4">
					<div class="bg-white h-100 shadow p-3">
						<p class="font-weight-bold mb-0">Tổng số thư mục</p>
						<p class="">{{ totalFolders }}</p>
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
	import SetDataService from "../services/set.service";
	import FolderDataService from "../services/folder.service";
	export default {
		name: "overview",
		props: ["currentUser"],
		data() {
			return {
				user: this.currentUser,
				totalUsers: 0,
				totalFolders: 0,
				totalSets: 0,
			};
		},
		methods: {
			retrieveTotalUsers() {
				UserDataService.get()
					.then((response) => {
						this.totalUsers = response.data.count;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			retrieveTotalSets() {
				SetDataService.get()
					.then((response) => {
						this.totalSets = response.data.count;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			retrieveTotalFolders() {
				FolderDataService.get()
					.then((response) => {
						this.totalFolders = response.data.count;
					})
					.catch((err) => {
						console.log(err);
					});
			},
		},
		mounted() {
			this.retrieveTotalUsers();
			this.retrieveTotalFolders();
			this.retrieveTotalSets();
		},
	};
</script>

<style lang="css" scoped>
	.ads {
		width: 100%;
		height: 315px;
		border-radius: 20px;
		background-color: #17a2b8;
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
		background-color: #17a3b87a;
		z-index: -1;
		margin-top: 10px;
		margin-left: 10px;
	}
	.ads:nth-child(3) {
		width: calc(100% - 2.5rem);
		top: 0;
		background-color: #17a3b82d;
		z-index: -2;
		margin-top: 20px;
		margin-left: 20px;
	}
	.summary .row div {
		border-radius: 20px;
	}
</style>
