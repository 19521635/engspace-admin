<template>
	<div id="app_main">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: "App",
		components: {},
	};
</script>

<style>
	@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
	#app_main {
		font-family: Quicksand, Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* color: #2c3e50; */
	}
</style>
