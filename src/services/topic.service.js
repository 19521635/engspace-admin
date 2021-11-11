import api from "./api";

class TopicDataService {
	getAll() {
		return api.get("/admin/topics/");
	}
}

export default new TopicDataService();
