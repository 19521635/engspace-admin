import http from "../http-common";
import authHeader from "./auth-header";

class UserDataService {
	getAll() {
		return http.get("/admin/users/", { headers: authHeader() });
	}
}

export default new UserDataService();
