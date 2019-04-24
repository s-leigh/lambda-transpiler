"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_1 = require("tslint/lib/error");
var model_1 = require("./model/model");
exports.default = (function (lexemes) {
    var handleLexeme = function (lexeme, index, lexemeArray) {
        var nextIndex = index + 1;
        var nextLexeme = lexemeArray[nextIndex];
        // lx[. ]
        var parseLambda = function (token) {
            return new model_1.Lambda(token[1], handleLexeme(nextLexeme, nextIndex, lexemeArray));
        };
        var parseBoundVariable = function (token) {
            return new model_1.BoundVariable(token[0], handleLexeme(nextLexeme, nextIndex, lexemeArray));
        };
        // (y)
        var parseUnboundVariable = function (token) {
            return new model_1.UnboundVariable(token[1], nextLexeme ? handleLexeme(nextLexeme, nextIndex, lexemeArray) : null);
        };
        var returnable = [];
        if (lexeme.match(model_1.REGEXES.lambda))
            returnable.push(parseLambda);
        if (lexeme.match(model_1.REGEXES.boundVariable))
            returnable.push(parseBoundVariable);
        if (lexeme.match(model_1.REGEXES.unboundVariable))
            returnable.push(parseUnboundVariable);
        if (returnable.length > 1)
            throw new error_1.Error("Parser returned more than one possible interpretation for lexeme:\n      '" + lexeme + "'\n      " + returnable);
        if (returnable.length === 0)
            throw new error_1.Error("Parser cold not interpret lexeme:\n'" + lexeme + "'");
        return returnable[0](lexeme);
    };
    return handleLexeme(lexemes[0], 0, lexemes);
});
