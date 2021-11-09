export default function authHeader() {
	let user = JSON.parse(localStorage.getItem("user"));

	if (user && user.access) {
		return {
			"Content-type": "application/json",
			Authorization: "Bearer " + user.access,
		};
	} else {
		return {
			"Content-type": "application/json",
		};
	}
}
