let quiz = "questions";
let quizes = JSON.parse(localStorage.getItem('quizes') || '[]');
let questions = JSON.parse(localStorage.getItem(`quiz_${ quiz }`) || '{}');

export function setQuiz(newQuiz: string)
{
	if (quiz == newQuiz)
		return;

	quiz = newQuiz;
	questions = JSON.parse(localStorage.getItem(`quiz_${ quiz }`) || '{}');
}

export function getQuizes()
{
	return quizes;
}

function makeId(length: number)
{
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
	result += characters.charAt(Math.floor(Math.random() * charactersLength));
	counter += 1;
	}
	return result;
}

export function addQuestion(question: string, answer: string)
{
	const id = makeId(16);
	questions[id] = { question, answer, history: [], correctRate: 2 };
	localStorage.setItem(`quiz_${ quiz }`, JSON.stringify(questions));

	if (!quizes.includes(quiz))
	{
		quizes.push(quiz);
		localStorage.setItem('quizes', JSON.stringify(quizes));
	}
}

function getRandomAnswer()
{
	const ids = Object.keys(questions);
	const id = ids[Math.floor(Math.random() * ids.length)];
	return questions[id].answer;
}

export function getQuestion()
{
	let questionList = Object.keys(questions);
	const now = Date.now();
	let questionsToAsk = questionList.filter((key) => (questions[key].nextTimeAsk || 0) < now);
	let additionalTime = 1000 * 60;

	while (questionsToAsk.length < 3 && questionsToAsk.length < questionList.length)
	{
		questionsToAsk = questionList.filter((key) => (questions[key].nextTimeAsk || 0) < now + additionalTime);
		additionalTime += 1000 * 60;
	}

	questionsToAsk = questionsToAsk.sort((a, b) => questions[a].correctRate - questions[b].correctRate);

	console.log('Questions to ask:');
	for (const key of questionsToAsk)
	{
		console.log(questions[key].question, questions[key].correctRate);
	}

	let id = null;

	id = questionsToAsk[Math.floor(Math.random() * (questionsToAsk.length / 10))];
	if (Math.random() < 0.5)
	{
		id = questionsToAsk[Math.floor(Math.random() * (questionsToAsk.length / 10))];
	}
	else
	{
		id = questionsToAsk[Math.floor(Math.random() * (questionsToAsk.length))];
	}

	const answers = [ questions[id].answer, getRandomAnswer(), getRandomAnswer(), getRandomAnswer() ];
	return { question: questions[id].question, answer: questions[id].answer, answers: answers.sort(() => Math.random() - 0.5), id };
}

export function getQuestions()
{
	return questions;
}

export function updateQuestion(id: string, question: string, answer: string)
{
	questions[id].question = question;
	questions[id].answer = answer;
	localStorage.setItem(`quiz_${ quiz }`, JSON.stringify(questions));
}

export function addToHistory(key: string, correct: boolean)
{
	questions[key].history.push(correct);

	if (correct)
	{
		if (questions[key].history.length > 10 && questions[key].correctRate > 0.8)
			questions[key].nextTimeAsk = Date.now() + 1000 * 60 * 60 * 4;
		else
			questions[key].nextTimeAsk = Date.now() + 1000 * 60 * 5;
	}
	else
		questions[key].nextTimeAsk = Date.now() + 1000 * 30;


	if (questions[key].history.length > 25)
	{
		questions[key].history.shift();
	}

	questions[key].correctRate = questions[key].history.reduce((acc: number, val: boolean) => acc + (val ? 1 : 0), 0) / questions[key].history.length;

	localStorage.setItem(`quiz_${ quiz }`, JSON.stringify(questions));
}