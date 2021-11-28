import axios from "axios";

const instance = axios.create({
	baseURL: "https://engspace-be-ff5wy.ondigitalocean.app/api",
	// baseURL: "http://localhost:8000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export default instance;
