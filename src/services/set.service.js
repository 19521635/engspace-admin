import api from "./api";

class SetDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/sets/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}

	getId(id) {
		return api.get("/admin/sets/" + id + "/");
	}

	post(form) {
		return api.post("/admin/sets/", form);
	}

	put(id, form) {
		return api.put("/admin/sets/" + id + "/", form);
	}

	patch(id, form) {
		return api.patch("/admin/sets/" + id + "/", form);
	}

	delete(id) {
		return api.delete("/admin/sets/" + id + "/");
	}
}

export default new SetDataService();
