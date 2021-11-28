import api from "./api";

class PostDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/forum/posts/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}

	getId(id) {
		return api.get("/admin/forum/posts/" + id + "/");
	}

	post(form) {
		return api.post("/admin/forum/posts/", form);
	}

	put(id, form) {
		return api.put("/admin/forum/posts/" + id + "/", form);
	}

	patch(id, form) {
		return api.patch("/admin/forum/posts/" + id + "/", form);
	}

	delete(id) {
		return api.delete("/admin/forum/posts/" + id + "/");
	}
}

export default new PostDataService();
