"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGEXES = {
    lambda: /l[a-km-z][.]/,
    boundVariable: /[a-km-z] /,
    unboundVariable: /\([a-km-z]\)/
};
exports.LAMBDA = 'lambda';
exports.BOUND_VARIABLE = 'boundVariable';
exports.UNBOUND_VARIABLE = 'unboundVariable';
var Lambda = /** @class */ (function () {
    function Lambda(val, apply) {
        this.symbolType = exports.LAMBDA;
        this.variable = val;
        this.apply = apply;
    }
    return Lambda;
}());
exports.Lambda = Lambda;
var BoundVariable = /** @class */ (function () {
    function BoundVariable(val, apply) {
        this.symbolType = exports.BOUND_VARIABLE;
        this.variable = val;
        this.apply = apply;
    }
    return BoundVariable;
}());
exports.BoundVariable = BoundVariable;
var UnboundVariable = /** @class */ (function () {
    function UnboundVariable(val, apply) {
        this.symbolType = exports.UNBOUND_VARIABLE;
        this.variable = val;
        this.apply = apply;
    }
    return UnboundVariable;
}());
exports.UnboundVariable = UnboundVariable;
