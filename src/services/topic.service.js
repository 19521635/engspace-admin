import api from "./api";

class TopicDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/topics/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}

	getId(id) {
		return api.get("/admin/topics/" + id + "/");
	}

	post(form) {
		return api.post("/admin/topics/", form);
	}

	put(id, form) {
		return api.put("/admin/topics/" + id + "/", form);
	}

	patch(id, form) {
		return api.patch("/admin/topics/" + id + "/", form);
	}

	delete(id) {
		return api.delete("/admin/topics/" + id + "/");
	}
}

export default new TopicDataService();
