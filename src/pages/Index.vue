<template>
	<div class="q-pa-sm">
		<div class="text-center">
			<div class="text-center q-px-md">
				<label class="text-h4">Ready to play?</label>
				<q-input
					v-model="name"
					label="Name"
					stack-label
					placeholder="Enter your Name"
					v-on:keyup.enter="startGame()"
					class="text-h5"
					:error="$v.name.$invalid"
					error-message="Please enter a Valid Name"
					:bottom-slots="true"
				/>
				<q-input
					label="Email Address"
					stack-label
					placeholder="Enter your Email Address"
					v-model="email"
					v-on:keyup.enter="startGame()"
					class="text-h5"
					:error="$v.email.$invalid"
					error-message="Please enter a Valid Email"
					:bottom-slots="true"
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
	import {
		required,
		minLength,
		email,
		maxLength,
	} from "vuelidate/lib/validators";

	export default {
		name: "PageIndex",
		data() {
			return {
				name: "",
				email: "",
			};
		},
		validations: {
			name: {
				required,
				minLength: minLength(3),
				maxLength: maxLength(255),
			},
			email: {
				required,
				email,
				minLength: minLength(1),
				maxLength: maxLength(255),
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.name = this.$route.query.name;
				this.email = this.$route.query.email;
			});
		},
		methods: {
			startGame: function () {
				this.$router.push({
					path: "/game",
					query: { name: this.name, email: this.email },
				});
			},
		},
	};
</script>
