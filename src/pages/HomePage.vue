<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { getQuizes } from "../modules/quiz";

const quizes = ref({});

onBeforeMount(() =>
{
	quizes.value = getQuizes();
});

const newQuizName = ref("");

</script>

<template>
	<div>
		<h2>Quizes</h2>
		<ul>
			<li v-for="quiz, key of quizes" :key="key">
				<router-link :to="'/question/' + quiz">{{ quiz }}</router-link>
			</li>
		</ul>

		<input type="text" v-model="newQuizName">
		<router-link :to="`/list/${newQuizName}`" class="button">Create</router-link>
	</div>
</template>