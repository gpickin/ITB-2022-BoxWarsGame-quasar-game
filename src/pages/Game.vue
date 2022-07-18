<template>
	<div class="q-pa-sm" style="min-height: 300px">
		<div v-if="!display" class="text-center text-h5 q-pa-lg">
			LOADING QUESTIONS
		</div>
		<div v-if="display">
			<div class="bg-black q-pa-xs q-mb-sm">
				<div class="text-h4 bg-blue text-white text-center q-pa-sm">
					{{ $route.query.name }}
				</div>
			</div>

			<div class="bg-orange q-pa-sm">
				<div class="text-h4 bg-black text-orange text-center q-pa-sm">
					{{ currentScore }}
				</div>
			</div>

			<div v-if="this.isGameOver" class="q-pa-md text-center">
				<q-btn
					size="large"
					flat
					color="white"
					label="Start a New Game"
					class="bg-green"
					@click.native="$router.push('/')"
				/>
			</div>
			<div class="text-h6 text-black q-py-sm">
				Question {{ currentQuestion + 1 }}:
			</div>

			<div class="text-h5">{{ getCurrentQuestion.question }}</div>

			<div v-if="showVotes && !isGameOver" class="text-center q-py-md">
				<q-btn
					size="large"
					icon-right="send"
					flat
					color="white"
					label="Next"
					class="bg-green"
					@click="nextQuestion()"
				/>
			</div>

			<q-banner
				inline-actions
				v-for="answer in getCurrentQuestion.answers"
				v-bind:key="answer.answerID"
				class="q-ma-sm text-white bg-blue"
				:class="{ 'bg-orange': answer.selected }"
				@click="selectAnswer(answer)"
			>
				<span class="text-h6">{{ answer.answer }}</span>

				<template v-slot:action>
					<span v-if="showVotes">{{ answer.votePercentage }}</span>
				</template>
			</q-banner>

			<div v-if="showVotes && !isGameOver" class="text-center q-py-md">
				<q-btn
					size="large"
					icon-right="send"
					flat
					color="white"
					label="Next"
					class="bg-green"
					@click="nextQuestion()"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import { axiosInstance } from "boot/axios";

	export default {
		name: "PageGame",
		data() {
			return {
				name: "",
				questions: [],
				currentQuestion: 0,
				display: false,
				showVotes: false,
				currentScore: 0,
			};
		},
		computed: {
			getCurrentQuestion() {
				if (this.display) {
					return this.questions[this.currentQuestion];
				} else {
					return {};
				}
			},
			isGameOver() {
				return this.currentQuestion == 4 && this.showVotes;
			},
		},
		mounted() {
			this.getQuestions();
		},
		methods: {
			selectAnswer(answer) {
				if (!this.showVotes) {
					this.getCurrentQuestion.answers.sort(function (a, b) {
						return b.votePercentage - a.votePercentage;
					});
					this.showVotes = true;
					answer.selected = true;
					var index = this.getCurrentQuestion.answers.findIndex(
						(currentAnswer) => currentAnswer.answerID == answer.answerID
					);
					var newScore = 0;
					if (index == 0) {
						newScore = 100;
					} else if (index == 1) {
						newScore = 50;
					} else if (index == 2) {
						newScore = 25;
					}
					this.currentScore = this.currentScore + newScore;
					if (newScore > 0) {
						this.$q.notify({
							color: "positive",
							textColor: "white",
							icon: "people",
							position: "center",
							message: "You scored " + newScore + " points!",
							timeout: 1500,
						});
					} else {
						this.$q.notify({
							color: "negative",
							textColor: "white",
							icon: "people",
							position: "center",
							message: "0 Points for that one, sorry!",
							timeout: 1500,
						});
					}

					if (this.isGameOver) {
						this.$q.notify({
							color: "positive",
							textColor: "white",
							icon: "people",
							position: "center",
							message:
								"Game Over - You Scored " +
								this.currentScore +
								" points!",
							timeout: 0,
							actions: [{ label: "Dismiss", color: "white" }],
						});
					}
				}
			},
			nextQuestion() {
				if (!this.isGameOver) {
					this.showVotes = false;
					if (this.currentQuestion < this.questions.length) {
						this.currentQuestion = this.currentQuestion + 1;
					}
				}
			},
			getQuestions() {
				axiosInstance
					.post(`games`)
					.then(({ data }) => {
						// updating pagination to reflect in the UI
						this.questions = data.data;
						this.questions.map(function (question) {
							var totalVotes = question.answers.reduce(
								(previousValue, answer) =>
									previousValue + answer.votesCount,
								0
							);

							question.answers.map(function (answer) {
								if (totalVotes == 0) {
									answer.votePercentage = 0;
								} else {
									answer.votePercentage = Math.round(
										(answer.votesCount / totalVotes) * 100
									);
								}
								return answer;
							});
							return question;
						});
						this.display = true;
					})
					.catch((error) => {
						// there's an error... do SOMETHING
						console.log(error);
						alert("Error loading Questions");
						this.$router.push({
							path: "/",
						});
					});
			},
		},
	};
</script>
