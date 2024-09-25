<script setup lang="ts">

</script>

<template>
	<div class="app">
		<nav>
			<router-link to="/">Home</router-link>
		</nav>
		<div class="contents">
			<router-view></router-view>
		</div>
	</div>
</template>

<style scoped>
.app
{
	display: flex;
	flex-direction: column;
	height: 100%;
	flex-grow: 1;
}
nav
{
	background-color: #111;
	padding: 1rem;
	text-align: center;
}

nav a
{
	color: #000;
	color: #fff;
}
.contents
{
	padding: 1rem;
	flex-grow: 1;
	display: flex;
	flex-flow: column;
}
</style>
