/**
 *
 * This code is taken from "util" module
 * Socure: https://github.com/browserify/node-util/
 *
 */

const arrayToHash = require("./arrayToHash");
const hasOwnProperty = require("./hasOwnProperty");
const {
	isArray,
	isBoolean,
	isDate,
	isError,
	isFunction,
	isNull,
	isNumber,
	isRegExp,
	isString,
	isUndefined,
} = require("./is");

function formatValue(ctx, value, recurseTimes) {
	// Provide a hook for user-specified inspect functions.
	// Check that value is an object with an inspect function on it
	if (
		ctx.customInspect &&
		value &&
		isFunction(value.inspect) &&
		// Filter out the util module, it's inspect function is special
		value.inspect !== exports.inspect &&
		// Also filter out any prototype objects using the circular check.
		!(value.constructor && value.constructor.prototype === value)
	) {
		var ret = value.inspect(recurseTimes, ctx);
		if (!isString(ret)) {
			ret = formatValue(ctx, ret, recurseTimes);
		}
		return ret;
	}

	// Primitive types cannot have properties
	var primitive = formatPrimitive(ctx, value);
	if (primitive) {
		return primitive;
	}

	// Look up the keys of the object.
	var keys = Object.keys(value);
	var visibleKeys = arrayToHash(keys);

	if (ctx.showHidden) {
		keys = Object.getOwnPropertyNames(value);
	}

	// IE doesn't make error fields non-enumerable
	// http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	if (
		isError(value) &&
		(keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)
	) {
		return formatError(value);
	}

	// Some type of object without properties can be shortcutted.
	if (keys.length === 0) {
		if (isFunction(value)) {
			var name = value.name ? ": " + value.name : "";
			return ctx.stylize("[Function" + name + "]", "special");
		}
		if (isRegExp(value)) {
			return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
		}
		if (isDate(value)) {
			return ctx.stylize(Date.prototype.toString.call(value), "date");
		}
		if (isError(value)) {
			return formatError(value);
		}
	}

	var base = "",
		array = false,
		braces = ["{", "}"];

	// Make Array say that they are Array
	if (isArray(value)) {
		array = true;
		braces = ["[", "]"];
	}

	// Make functions say that they are functions
	if (isFunction(value)) {
		var n = value.name ? ": " + value.name : "";
		base = " [Function" + n + "]";
	}

	// Make RegExps say that they are RegExps
	if (isRegExp(value)) {
		base = " " + RegExp.prototype.toString.call(value);
	}

	// Make dates with properties first say the date
	if (isDate(value)) {
		base = " " + Date.prototype.toUTCString.call(value);
	}

	// Make error with message first say the error
	if (isError(value)) {
		base = " " + formatError(value);
	}

	if (keys.length === 0 && (!array || value.length == 0)) {
		return braces[0] + base + braces[1];
	}

	if (recurseTimes < 0) {
		if (isRegExp(value)) {
			return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
		} else {
			return ctx.stylize("[Object]", "special");
		}
	}

	ctx.seen.push(value);

	var output;
	if (array) {
		output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	} else {
		output = keys.map(function (key) {
			return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
		});
	}

	ctx.seen.pop();

	return reduceToSingleString(output, base, braces);
}
function formatPrimitive(ctx, value) {
	if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
	if (isString(value)) {
		var simple =
			"'" +
			JSON.stringify(value)
				.replace(/^"|"$/g, "")
				.replace(/'/g, "\\'")
				.replace(/\\"/g, '"') +
			"'";
		return ctx.stylize(simple, "string");
	}
	if (isNumber(value)) return ctx.stylize("" + value, "number");
	if (isBoolean(value)) return ctx.stylize("" + value, "boolean");
	// For some reason typeof null is "object", so special case here.
	if (isNull(value)) return ctx.stylize("null", "null");
}

function formatError(value) {
	return "[" + Error.prototype.toString.call(value) + "]";
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	var output = [];
	for (var i = 0, l = value.length; i < l; ++i) {
		if (hasOwnProperty(value, String(i))) {
			output.push(
				formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true)
			);
		} else {
			output.push("");
		}
	}
	keys.forEach(function (key) {
		if (!key.match(/^\d+$/)) {
			output.push(
				formatProperty(ctx, value, recurseTimes, visibleKeys, key, true)
			);
		}
	});
	return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	var name, str, desc;
	desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	if (desc.get) {
		if (desc.set) {
			str = ctx.stylize("[Getter/Setter]", "special");
		} else {
			str = ctx.stylize("[Getter]", "special");
		}
	} else {
		if (desc.set) {
			str = ctx.stylize("[Setter]", "special");
		}
	}
	if (!hasOwnProperty(visibleKeys, key)) {
		name = "[" + key + "]";
	}
	if (!str) {
		if (ctx.seen.indexOf(desc.value) < 0) {
			if (isNull(recurseTimes)) {
				str = formatValue(ctx, desc.value, null);
			} else {
				str = formatValue(ctx, desc.value, recurseTimes - 1);
			}
			if (str.indexOf("\n") > -1) {
				if (array) {
					str = str
						.split("\n")
						.map(function (line) {
							return "  " + line;
						})
						.join("\n")
						.slice(2);
				} else {
					str =
						"\n" +
						str
							.split("\n")
							.map(function (line) {
								return "   " + line;
							})
							.join("\n");
				}
			}
		} else {
			str = ctx.stylize("[Circular]", "special");
		}
	}
	if (isUndefined(name)) {
		if (array && key.match(/^\d+$/)) {
			return str;
		}
		name = JSON.stringify("" + key);
		if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
			name = name.slice(1, -1);
			name = ctx.stylize(name, "name");
		} else {
			name = name
				.replace(/'/g, "\\'")
				.replace(/\\"/g, '"')
				.replace(/(^"|"$)/g, "'");
			name = ctx.stylize(name, "string");
		}
	}

	return name + ": " + str;
}
module.exports = { formatValue, formatProperty, formatError, formatArray };
