import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user && user.is_staff ? { status: { loggedIn: true }, user } : { status: { loggedIn: false }, user: null };

export const auth = {
	namespaced: true,
	state: initialState,
	actions: {
		login({ commit }, user) {
			return AuthService.login(user).then(
				(user) => {
					if (user.is_staff) {
						commit("loginSuccess", user);
						return Promise.resolve(user);
					} else {
						commit("loginFailure");
						return Promise.reject("Không phải là quản trị viên.");
					}
				},
				() => {
					commit("loginFailure");
					return Promise.reject("Đăng nhập thất bại.");
				}
			);
		},
		logout({ commit }) {
			AuthService.logout();
			commit("logout");
		},
		refreshToken({ commit }, accessToken) {
			commit("refreshToken", accessToken);
		},
	},
	mutations: {
		loginSuccess(state, user) {
			state.status.loggedIn = true;
			state.user = user;
		},
		loginFailure(state) {
			state.status.loggedIn = false;
			state.user = null;
		},
		logout(state) {
			state.status.loggedIn = false;
			state.user = null;
		},
		refreshToken(state, accessToken) {
			state.status.loggedIn = true;
			state.user = { ...state.user, access: accessToken };
		},
	},
};
