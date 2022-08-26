module.exports = function (text) {
	let token = process.env.token.replace(/\./g, ".");
	let re = new RegExp(token, "g");
	if (typeof text === "string")
		return text
			.replace(/`/g, "`" + String.fromCharCode(8203))
			.replace(/@/g, "@" + String.fromCharCode(8203))
			.replace(re, "*R-eD-Ac-Te-D-*");
	else return text;
};
