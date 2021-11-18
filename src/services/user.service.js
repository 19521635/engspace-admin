import api from "./api";

class UserDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/users/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}
}

export default new UserDataService();
