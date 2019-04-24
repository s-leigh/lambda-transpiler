"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = require("./model/model");
exports.default = (function (ast) {
    var handleNode = function (node, expression) {
        if (node === null)
            return expression;
        var recurse = function (newExpression) { return handleNode(node.apply, expression.concat(newExpression)); };
        if (node.symbolType === model_1.LAMBDA) {
            return recurse("(" + node.variable + " => ");
        }
        if (node.symbolType === model_1.BOUND_VARIABLE) {
            return recurse(node.variable + ")");
        }
        if (node.symbolType === model_1.UNBOUND_VARIABLE) {
            return recurse("(" + node.variable + ")");
        }
    };
    return handleNode(ast, '');
});
