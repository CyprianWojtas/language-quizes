import { createRouter, createWebHistory } from "vue-router";
import List from "./pages/List.vue";
import PageNotFound from "./pages/PageNotFound.vue";
import Question from "./pages/Question.vue";
import HomePage from "./pages/HomePage.vue";

export const router = createRouter({
	history: createWebHistory("/language-quizes/"),
	routes:
	[
		{ path: "/",                   component: HomePage },
		{ path: "/list/:quizName",     component: List },
		{ path: "/question/:quizName", component: Question },
		{ path: "/:pathMatch(.*)*",    component: PageNotFound }
	]
});