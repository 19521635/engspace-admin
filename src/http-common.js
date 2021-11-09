import axios from "axios";
import authHeader from "./services/auth-header";

export default axios.create({
	baseURL: "https://engspace-be-ff5wy.ondigitalocean.app/api",
	headers: {
		authHeader()
	},
});
