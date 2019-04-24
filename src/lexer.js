"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// split on . and space but keep in matching group: positive lookbehind
exports.default = (function (str) { return str.split(/(?<=[ .])/); });
