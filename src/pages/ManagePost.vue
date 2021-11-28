<template>
	<layout-default>
		<div class="card-content overflow-hidden p-4 shadow-sm">
			<div class="d-flex flex-row align-items-center mb-4">
				<h4 class="mb-0">Post</h4>
				<div class="d-flex flex-row w-100 justify-content-end">
					<div class="search d-flex flex-row justify-content-center align-items-center border py-1 px-2 mr-2 rounded">
						<font-awesome-icon icon="search" />
						<input type="text" placeholder="Tìm kiếm một vài thứ gì đó..." class="w-100" v-model.lazy="search" v-on:change="doSearch" />
					</div>
					<button class="btn btn-info" @click="$router.push({ name: 'add_post' })">Thêm mới</button>
				</div>
			</div>
			<Table :list="rows" @deleteById="deleteById" @editById="editById" :listDisplay="['id', 'name', 'date_created', 'date_updated']" v-if="rows.length"></Table>
			<nav aria-label="Page navigation" class="d-flex justify-content-end">
				<ul class="pagination">
					<li class="page-item" :class="{ disabled: currentPage == 1 }" v-on:click="currentPage == 1 ? setCurrentPage(1) : setCurrentPage(currentPage - 1)"><a class="page-link" href="#">Previous</a></li>
					<li class="page-item active" v-on:click="setCurrentPage(currentPage)">
						<a class="page-link" href="#">{{ currentPage }}</a>
					</li>
					<li class="page-item" v-if="currentPage + 1 <= totalPage" v-on:click="setCurrentPage(currentPage + 1)">
						<a class="page-link" href="#">{{ currentPage + 1 }}</a>
					</li>
					<li class="page-item" v-if="currentPage + 2 <= totalPage" v-on:click="setCurrentPage(currentPage + 2)">
						<a class="page-link" href="#">{{ currentPage + 2 }}</a>
					</li>
					<li class="page-item" :class="{ disabled: currentPage + 1 > totalPage }" v-on:click="currentPage + 1 > totalPage ? setCurrentPage(currentPage) : setCurrentPage(currentPage + 1)"><a class="page-link" href="#">Next</a></li>
				</ul>
			</nav>
		</div>
	</layout-default>
</template>

<script>
	import LayoutDefault from "../layouts/LayoutDefault";
	import Table from "../components/Table";
	import PostDataService from "../services/post.service";
	export default {
		name: "managepost",
		components: {
			LayoutDefault,
			Table,
		},
		data() {
			return {
				totalPage: 1,
				pageSize: 20,
				currentPage: 1,
				search: "",
				rows: [],
			};
		},
		methods: {
			retrievePosts() {
				PostDataService.get(this.search, this.currentPage, this.pageSize)
					.then((response) => {
						this.totalPage = response.data.count / this.pageSize;
						this.rows = response.data.results;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			setCurrentPage(page) {
				if (page <= this.totalPage) {
					this.currentPage = page;
				}
				this.retrievePosts();
			},
			doSearch() {
				this.currentPage = 1;
				this.retrievePosts();
			},
			deleteById(id) {
				let i = this.rows.map((item) => item.id).indexOf(id);
				this.rows.splice(i, 1);
				// PostDataService.delete(id)
				// 	.then(() => {
				// 		let i = this.rows.map((item) => item.id).indexOf(id);
				// 		this.rows.splice(i, 1);
				// 	})
				// 	.catch((err) => {
				// 		console.log(err);
				// 	});
			},
			editById(id) {
				this.$router.push("/posts/" + id + "/");
			},
		},
		mounted() {
			this.retrievePosts();
		},
	};
</script>

<style lang="css" scoped>
	.card-content {
		background-color: white;
		border-radius: 20px;
	}
	.search {
		border-radius: 1.25rem;
		width: 50%;
	}
	.search svg {
		margin-right: 0.875rem;
		cursor: pointer;
	}
	input {
		outline: none;
		border: 0;
	}
	li.page-item.active a {
		background-color: #17a2b8;
	}
</style>
