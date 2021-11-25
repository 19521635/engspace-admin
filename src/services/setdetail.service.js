import api from "./api";

class SetDetailDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/set-details/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}

	getId(id) {
		return api.get("/admin/set-details/" + id + "/");
	}

	post(form) {
		return api.post("/admin/set-details/", form);
	}

	put(id, form) {
		return api.put("/admin/set-details/" + id + "/", form);
	}

	patch(id, form) {
		return api.patch("/admin/set-details/" + id + "/", form);
	}

	delete(id) {
		return api.delete("/admin/set-details/" + id + "/");
	}
}

export default new SetDetailDataService();
