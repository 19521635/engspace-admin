import api from "./api";

class FolderDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/folders/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}

	getId(id) {
		return api.get("/admin/folders/" + id + "/");
	}

	post(form) {
		return api.post("/admin/folders/", form);
	}

	put(id, form) {
		return api.put("/admin/folders/" + id + "/", form);
	}

	patch(id, form) {
		return api.patch("/admin/folders/" + id + "/", form);
	}

	delete(id) {
		return api.delete("/admin/folders/" + id + "/");
	}
}

export default new FolderDataService();
