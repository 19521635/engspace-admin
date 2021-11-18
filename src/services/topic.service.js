import api from "./api";

class TopicDataService {
	get(keyword = "", page = "", page_size = "") {
		return api.get("/admin/topics/?search=" + keyword + (page != "" ? "&page=" + page : "") + (page_size != "" ? "&page_size=" + page_size : ""));
	}
}

export default new TopicDataService();
