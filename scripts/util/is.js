/**
 *
 * This code is taken from "util" module
 * Socure: https://github.com/browserify/node-util/
 *
 */

function isArray(ar) {
	return Array.isArray(ar);
}
function isBoolean(arg) {
	return typeof arg === "boolean";
}
function isNull(arg) {
	return arg === null;
}
function isNullOrUndefined(arg) {
	return arg == null;
}
function isNumber(arg) {
	return typeof arg === "number";
}
function isString(arg) {
	return typeof arg === "string";
}
function isSymbol(arg) {
	return typeof arg === "symbol";
}
function isUndefined(arg) {
	return arg === void 0;
}
function isRegExp(re) {
	return isObject(re) && objectToString(re) === "[object RegExp]";
}
function isObject(arg) {
	return typeof arg === "object" && arg !== null;
}
function isDate(d) {
	return isObject(d) && objectToString(d) === "[object Date]";
}
function isError(e) {
	return (
		isObject(e) &&
		(objectToString(e) === "[object Error]" || e instanceof Error)
	);
}
function isFunction(arg) {
	return typeof arg === "function";
}
function isPrimitive(arg) {
	return (
		arg === null ||
		typeof arg === "boolean" ||
		typeof arg === "number" ||
		typeof arg === "string" ||
		typeof arg === "symbol" || // ES6 symbol
		typeof arg === "undefined"
	);
}
module.exports = {
	isArray,
	isBoolean,
	isDate,
	isError,
	isFunction,
	isNull,
	isNullOrUndefined,
	isNumber,
	isObject,
	isPrimitive,
	isRegExp,
	isString,
	isSymbol,
	isUndefined,
};
