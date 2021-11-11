import api from "./api";
import TokenService from "./token.service";

class AuthService {
	login(user) {
		return api
			.post("/users/login/", {
				username: user.username,
				password: user.password,
			})
			.then((response) => {
				if (response.data.access && response.data.is_staff) {
					TokenService.setUser(response.data);
				}
				return response.data;
			});
	}

	logout() {
		TokenService.removeUser();
	}
}

export default new AuthService();
