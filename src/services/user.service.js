import api from "./api";

class UserDataService {
	get() {
		return api.get("/admin/users/");
	}
}

export default new UserDataService();
