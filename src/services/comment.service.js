import api from "./api";

class CommentDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/forum/comments/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}

	getId(id) {
		return api.get("/admin/forum/comments/" + id + "/");
	}

	post(form) {
		return api.post("/admin/forum/comments/", form);
	}

	put(id, form) {
		return api.put("/admin/forum/comments/" + id + "/", form);
	}

	patch(id, form) {
		return api.patch("/admin/forum/comments/" + id + "/", form);
	}

	delete(id) {
		return api.delete("/admin/forum/comments/" + id + "/");
	}
}

export default new CommentDataService();
