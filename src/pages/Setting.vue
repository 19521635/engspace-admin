<template>
	<layout-default>
		<div class="card-content overflow-hidden p-4 shadow-sm">
			<div class="d-flex flex-row align-items-center mb-4">
				<h4 class="mb-0">Quản lý</h4>
			</div>
		</div>
	</layout-default>
</template>

<script>
	import LayoutDefault from "../layouts/LayoutDefault";
	export default {
		name: "manageset",
		components: {
			LayoutDefault,
		},
		data() {
			return {};
		},
		methods: {},
		mounted() {},
	};
</script>

<style lang="css" scoped>
	.card-content {
		background-color: white;
		border-radius: 20px;
	}
</style>
