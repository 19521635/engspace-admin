<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-10 col-xl-9 mx-auto">
				<div class="card flex-row my-5 border-0 shadow rounded-3 overflow-hidden">
					<div class="card-img-left d-none d-md-flex"></div>
					<div class="card-body p-4 p-sm-5">
						<h5 class="card-title text-center mb-3 fw-light fs-5">Đăng nhập</h5>
						<Form @submit="handleLogin" :validation-schema="schema">
							<div class="form-floating mb-3">
								<label for="username">Username</label>
								<Field name="username" type="text" class="form-control" aria-placeholder="Nhập username" />
								<ErrorMessage name="username" class="error-feedback" />
							</div>

							<div class="form-floating mb-4">
								<label for="password">Password</label>
								<Field name="password" type="password" class="form-control" aria-placeholder="Nhập password" />
								<ErrorMessage name="password" class="error-feedback" />
							</div>

							<div class="d-grid mb-2 text-center">
								<button class="btn btn-lg btn-dark btn-login fw-bold" type="submit" :disabled="loading">
									<span v-show="loading" class="spinner-border spinner-border-sm"></span>
									<span>Đăng nhập</span>
								</button>
							</div>
							<div class="form-floating mb-3">
								<div v-if="message" class="alert alert-danger" role="alert">
									{{ message }}
								</div>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Form, Field, ErrorMessage } from "vee-validate";
	import * as yup from "yup";

	export default {
		name: "Login",
		components: {
			Form,
			Field,
			ErrorMessage,
		},
		data() {
			const schema = yup.object().shape({
				username: yup.string().required("Username không được bỏ trống!"),
				password: yup.string().required("Password không được bỏ trống!"),
			});

			return {
				loading: false,
				message: "",
				schema,
			};
		},
		computed: {
			loggedIn() {
				return this.$store.state.auth.status.loggedIn;
			},
		},
		created() {
			if (this.loggedIn) {
				this.$router.push("/");
			}
		},
		methods: {
			handleLogin(user) {
				this.loading = true;

				this.$store.dispatch("auth/login", user).then(
					() => {
						this.$router.push("/");
					},
					(error) => {
						this.loading = false;
						this.message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
					}
				);
			},
		},
	};
</script>

<style scoped>
	.card {
		border-radius: 16px;
	}
	.card-img-left {
		width: 45%;
		background: scroll center url("/img/engspace.png");
		background-size: cover;
	}
	.card-body {
		background-color: #fdfdfd;
	}
</style>
