import api from "./api";

class UserDataService {
	getAll() {
		return api.get("/admin/users/");
	}
}

export default new UserDataService();
