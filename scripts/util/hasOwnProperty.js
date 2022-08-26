/**
 *
 * This code is taken from "util" module
 * Socure: https://github.com/browserify/node-util/
 *
 */
module.exports = function (obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};
