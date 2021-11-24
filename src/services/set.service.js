import api from "./api";

class SetDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/sets/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}
	delete(id) {
		return api.delete("/admin/sets/" + id + "/");
	}
}

export default new SetDataService();
