import api from "./api";

class UserDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/users/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}

	getId(id) {
		return api.get("/admin/users/" + id + "/");
	}

	post(form) {
		return api.post("/admin/users/", form);
	}

	put(id, form) {
		return api.put("/admin/users/" + id + "/", form);
	}

	patch(id, form) {
		return api.patch("/admin/users/" + id + "/", form);
	}

	delete(id) {
		return api.delete("/admin/users/" + id + "/");
	}
}

export default new UserDataService();
