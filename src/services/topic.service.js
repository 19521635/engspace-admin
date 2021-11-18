import api from "./api";

class TopicDataService {
	get() {
		return api.get("/admin/topics/");
	}
}

export default new TopicDataService();
