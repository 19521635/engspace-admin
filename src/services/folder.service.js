import api from "./api";

class FolderDataService {
	get() {
		return api.get("/admin/folders/");
	}
}

export default new FolderDataService();
