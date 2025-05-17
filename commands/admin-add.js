const fs = require("fs");
const path = require("path");
const { addAdmin, removeAdmin } = require("../utils/admins");

const filePath = path.join(__dirname, "admins.cfg");

function updateAdmins({ action, steamID, group, comment }) {
	const content = fs.readFileSync(filePath, "utf-8");

	let updatedContent;
	if (action === "add") {
		updatedContent = addAdmin(content, steamID, group, comment);
	} else if (action === "remove") {
		updatedContent = removeAdmin(content, steamID);
	} else {
		throw new Error("Неизвестное действие");
	}

	fs.writeFileSync(filePath, updatedContent, "utf-8");
	console.log("admins.cfg обновлён");
}

module.exports = { updateAdmins };
