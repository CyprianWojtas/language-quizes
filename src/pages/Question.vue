<script setup lang="ts">
import { ref, onBeforeMount, Ref } from 'vue';
import { addToHistory, getQuestion, setQuiz } from '../modules/quiz';
import { useRoute } from "vue-router";

const route = useRoute();

onBeforeMount(() =>
{
	setQuiz(<string>route.params.quizName);
});

const question = ref("");
const questionId = ref("");
const answers: Ref<string[]> = ref([]);
const correctAnswer = ref("");
const answered: Ref<string | null> = ref(null);

function loadQuestion()
{
	const q = getQuestion();
	questionId.value = q.id;
	question.value = q.question;
	answers.value = q.answers;
	correctAnswer.value = q.answer;
	answered.value = null;
}

function answerQuestion(answer: string)
{
	answered.value = answer;
	addToHistory(questionId.value, answer == correctAnswer.value);
}

onBeforeMount(() =>
{
	loadQuestion();
});

</script>
<template>
	<div class="question" :class="{ correctAnswer: answered == correctAnswer }">
		<div class="contents">
			<h2>{{ question }}</h2>

			<div class="answers">
				<button
					v-for="answer of answers"
					@click="answerQuestion(answer)"
					:class="
						{
							correct: answered && correctAnswer == answer,
							wrong: answered && answered == answer && correctAnswer != answer
						}
					"
					:disabled="answered != null"
				>
					{{ answer }}
				</button>
			</div>

			<button @click="loadQuestion()" v-if="answered">Next Question</button>
		</div>

		<nav>
			<router-link to="/">Home</router-link> |
			<router-link :to="`/list/${ route.params.quizName }`">List</router-link>
		</nav>
	</div>
</template>

<style scoped>
.question
{
	display: flex;
	flex-flow: column;
	padding: 1rem;
	align-items: center;
	flex-grow: 1;
}

.contents
{
	flex-grow: 1;
	text-align: center;
}

.answers
{
	margin-bottom: 1rem;
	text-align: center;
}

button
{
	margin: 0.5rem;
}

button.correct
{
	background-color: #115b3a;
}
button.wrong
{
	background-color: #750a0b;
}

</style>