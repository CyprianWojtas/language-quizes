<script setup lang="ts">
import { defineProps, ref, onBeforeMount } from 'vue';
import { updateQuestion } from '../modules/quiz';

const props = defineProps<
{
	id: string,
	questionObj: { question: string, answer: string, correctRate: number, history: boolean[]},
	question: string,
	answer: string
}
>();

const emit = defineEmits(["update"]);

const questionValue = ref("");
const answerValue = ref("");

onBeforeMount(() =>
{
	questionValue.value = props.question;
	answerValue.value = props.answer;
});

function save()
{
	updateQuestion(props.id, questionValue.value, answerValue.value);
	emit("update");
}

</script>

<template>
	<tr>
		<td></td>
		<td>
			<input type="text" v-model="questionValue">
		</td>
		<td>
			<input type="text" v-model="answerValue">
		</td>
		<td>
			<button v-if="question != questionValue || answer != answerValue" @click="save()">Save</button>
		</td>
		<td>
			{{ (questionObj.correctRate * 100).toFixed(2) }}%
			{{ questionObj.history.filter(x => x).length }}/{{ questionObj.history.length }}
		</td>
	</tr>
</template>