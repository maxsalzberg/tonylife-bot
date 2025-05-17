const fs = require("fs");

function parseAdminsCfg(content) {

	const lines = content.split("\n");
	const groups = [];
	const admins = [];
	let inAdminSection = false;

	for (const line of lines) {
		if (line.trim().startsWith("Admin=")) {
			inAdminSection = true;
			admins.push(line);
		} else if (inAdminSection && line.trim().startsWith("Group=")) {
			inAdminSection = false;
			groups.push(line);
		} else {
			inAdminSection ? admins.push(line) : groups.push(line);
		}
	}

	return { groups, admins };
}

function addAdmin(content, steamID, group, comment = "") {
	const { groups, admins } = parseAdminsCfg(content);
	const newLine = `Admin=${steamID}:${group}` + (comment ? ` // ${comment}` : "");
	if (admins.find(line => line.includes(steamID))) {
		throw new Error("Этот SteamID уже существует.");
	}
	admins.push(newLine);
	return [...groups, ...admins].join("\n");
}

function removeAdmin(content, steamID) {
	const { groups, admins } = parseAdminsCfg(content);
	const newAdmins = admins.filter(line => !line.includes(`Admin=${steamID}`));
	return [...groups, ...newAdmins].join("\n");
}

module.exports = {
	parseAdminsCfg,
	addAdmin,
	removeAdmin
};
