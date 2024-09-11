<script setup lang="ts">
import { onBeforeMount, Ref, ref } from 'vue';
import { addQuestion, getQuestions, setQuiz } from '../modules/quiz';
import ListQuestion from '../components/ListQuestion.vue';
import { onBeforeRouteUpdate, useRoute } from "vue-router";

const route = useRoute();

const questions: Ref<any> = ref({});

const question = ref("");
const answer = ref("");

onBeforeMount(() =>
{
	setQuiz(<string>route.params.quizName);
	questions.value = getQuestions();
});

onBeforeRouteUpdate((to, from) =>
{
	if (to.params.quizName != from.params.quizName)
	{
		setQuiz(<string>to.params.quizName);
		questions.value = getQuestions();
	}
});

function questionAdd()
{
	addQuestion(question.value, answer.value);
	reload();
	question.value = "";
	answer.value = "";
}

function reload()
{
	questions.value = { ...getQuestions() };
}

</script>

<template>
	<div class="contents">
		<div class="table">
			<table>
				<thead>
					<tr>
						<th></th>
						<th>Question</th>
						<th>Answer</th>
						<th></th>
						<th>Rate</th>
					</tr>
				</thead>
				<tbody>
					<ListQuestion v-for="question, key of questions" :id="(<string><unknown>key)" :question-obj="question" :question="question.question" :answer="question.answer" @update="reload()"></ListQuestion>

					<tr>
						<td></td>
						<td>
							<input type="text" v-model="question">
						</td>
						<td>
							<input type="text" v-model="answer">
						</td>
						<td>
							<button @click="questionAdd()">+</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<nav>
			<router-link to="/">Home</router-link> |
			<router-link :to="`/question/${ route.params.quizName }`">Quiz</router-link>
		</nav>
	</div>
</template>

<style scoped>

.contents
{
	display: flex;
	flex-flow: 1;
}

.table
{
	flex-grow: 1;
}

table
{
	counter-reset: words-list 0;
	margin: auto;
}

table:deep() input
{
	border: none;
	border-bottom: 1px solid #0004;
}
table:deep() button
{
	padding: 0.25em 0.8em;
}

table:deep() td:first-child
{
	counter-increment: words-list 1;
	text-align: right;
}
table:deep() td:first-child::before
{
	content: counter(words-list) ".";
}

nav
{
	text-align: center;
}

</style>