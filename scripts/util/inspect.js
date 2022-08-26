/**
 *
 * This code is taken from "util" module
 * Socure: https://github.com/browserify/node-util/
 *
 */

const { isBoolean, isUndefined } = require("./is");
const { formatValue } = require("./format");
const extend = require("./extend");
function inspect(obj, opts) {
	// default options
	var ctx = {
		seen: [],
		stylize: stylizeNoColor,
	};
	// legacy...
	if (arguments.length >= 3) ctx.depth = arguments[2];
	if (arguments.length >= 4) ctx.colors = arguments[3];
	if (isBoolean(opts)) {
		// legacy...
		ctx.showHidden = opts;
	} else if (opts) {
		// got an "options" object
		extend(ctx, opts);
	}
	// set default options
	if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	if (isUndefined(ctx.depth)) ctx.depth = 2;
	if (isUndefined(ctx.colors)) ctx.colors = false;
	if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	if (ctx.colors) ctx.stylize = stylizeWithColor;
	return formatValue(ctx, obj, ctx.depth);
}
module.exports = inspect;
// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
	bold: [1, 22],
	italic: [3, 23],
	underline: [4, 24],
	inverse: [7, 27],
	white: [37, 39],
	grey: [90, 39],
	black: [30, 39],
	blue: [34, 39],
	cyan: [36, 39],
	green: [32, 39],
	magenta: [35, 39],
	red: [31, 39],
	yellow: [33, 39],
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
	special: "cyan",
	number: "yellow",
	boolean: "yellow",
	undefined: "grey",
	null: "bold",
	string: "green",
	date: "magenta",
	// "name": intentionally not styling
	regexp: "red",
};

function stylizeWithColor(str, styleType) {
	var style = inspect.styles[styleType];

	if (style) {
		return (
			"\u001b[" +
			inspect.colors[style][0] +
			"m" +
			str +
			"\u001b[" +
			inspect.colors[style][1] +
			"m"
		);
	} else {
		return str;
	}
}

function stylizeNoColor(str, styleType) {
	return str;
}
