/**
 *
 * This code is taken from "util" module
 * Socure: https://github.com/browserify/node-util/
 *
 */
const { isObject } = require("./is");

module.exports = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};
