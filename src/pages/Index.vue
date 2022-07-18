<template>
	<div class="q-pa-sm">
		<div class="text-center">
			<div class="text-center q-px-md">
				<label class="text-h4">Enter Your Name</label>
				<q-input
					v-model="name"
					v-on:keyup.enter="startGame()"
					class="text-h5"
				/>
			</div>

			<div class="text-center q-pa-md">
				<q-btn
					color="primary"
					class="bg-blue-10"
					size="md"
					label="Start Game"
					icon="people"
					@click.native="startGame()"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "PageIndex",
		data() {
			return {
				name: "",
			};
		},
		methods: {
			startGame: function () {
				this.$router.push({
					path: "/game",
					query: { name: this.name },
				});
			},
		},
	};
</script>
