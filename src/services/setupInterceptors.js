import router from "../router";
import axiosInstance from "./api";
import TokenService from "./token.service";

const setup = (store) => {
	axiosInstance.interceptors.request.use(
		(config) => {
			const token = TokenService.getLocalAccessToken();
			if (token) {
				config.headers["Authorization"] = "Bearer " + token;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		}
	);

	axiosInstance.interceptors.response.use(
		(res) => {
			return res;
		},
		async (err) => {
			const originalConfig = err.config;

			if (originalConfig.url !== "/users/login/" && err.response && err.response.data.messages) {
				// Access Token was expired
				if (err.response.status === 401 && !originalConfig._retry) {
					originalConfig._retry = true;

					try {
						const rs = await axiosInstance.post("/users/login/refresh/", {
							refresh: TokenService.getLocalRefreshToken(),
						});
						const { access } = rs.data;

						store.dispatch("auth/refreshToken", access);
						TokenService.updateLocalAccessToken(access);

						return axiosInstance(originalConfig);
					} catch (_error) {
						return Promise.reject(_error);
					}
				}
			}

			if (originalConfig.url === "/users/login/refresh/" && err.response && err.response.data.code) {
				store.dispatch("auth/logout");
				router.push("/login");
			}

			return Promise.reject(err);
		}
	);
};

export default setup;
