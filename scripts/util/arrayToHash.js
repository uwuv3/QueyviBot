/**
 *
 * This code is taken from "util" module
 * Socure: https://github.com/browserify/node-util/
 *
 */
module.exports = function (array) {
	var hash = {};

	array.forEach(function (val, idx) {
		hash[val] = true;
	});

	return hash;
};
