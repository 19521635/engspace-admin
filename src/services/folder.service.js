import api from "./api";

class FolderDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/folders/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}
}

export default new FolderDataService();
