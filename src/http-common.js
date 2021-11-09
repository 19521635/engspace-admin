import axios from "axios";
export default axios.create({
	baseURL: "https://engspace-be-ff5wy.ondigitalocean.app/api",
	headers: {
		"Content-type": "application/json",
	},
});
