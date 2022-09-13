<template>
	<div class="q-pa-sm" style="min-height: 300px">
		<div v-if="!display" class="text-center text-h5 q-pa-lg">
			LOADING LEADERBOARD
		</div>
		<div v-if="display">
			<div class="bg-black q-pa-xs q-mb-sm">
				<div class="text-h4 bg-blue text-white text-center q-pa-sm">
					Leaderboard
				</div>
			</div>

			<div class="q-pa-md text-center">
				<q-btn
					size="large"
					flat
					color="white"
					label="Start a New Game"
					class="bg-green"
					@click="startNewGame()"
				/>
			</div>

			<q-item
				v-for="(topscore, index) in topscores"
				v-bind:key="topscore.topscoreID"
			>
				<q-item-section side>
					<q-avatar circle size="48px">
						<img :src="topscore.gravatar" />
						<q-badge floating color="green"
							><b>{{ index + 1 }}</b></q-badge
						>
					</q-avatar>
				</q-item-section>
				<q-item-section>
					<q-item-label
						><b>{{ topscore.userName }}</b></q-item-label
					>
					<q-item-label caption>{{ topscore.email }}</q-item-label>
				</q-item-section>
				<q-item-section side
					><b style="font-size: 18px">{{
						topscore.score
					}}</b></q-item-section
				>
			</q-item>

			<div class="q-pa-md text-center">
				<q-btn
					size="large"
					flat
					color="white"
					label="Start a New Game"
					class="bg-green"
					@click="startNewGame()"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	import { axiosInstance } from "boot/axios";

	export default {
		name: "PageLeaderboard",
		data() {
			return {
				name: "",
				email: "",
				topscores: [],
				display: false,
			};
		},
		computed: {},
		mounted() {
			this.getTopscores();
			this.$nextTick(() => {
				this.name = this.$route.query.name;
				this.email = this.$route.query.email;
			});
		},
		methods: {
			startNewGame: function () {
				this.$router.push({
					path: "/",
					query: { name: this.name, email: this.email },
				});
			},
			getTopscores() {
				axiosInstance
					.get(`topscores`)
					.then(({ data }) => {
						// updating pagination to reflect in the UI
						this.topscores = data.data;
						this.display = true;
					})
					.catch((error) => {
						// there's an error... do SOMETHING
						console.log(error);
						alert("Error loading top scores");
						this.$router.push({
							path: "/",
						});
					});
			},
		},
	};
</script>
