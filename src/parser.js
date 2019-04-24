// TODO: break out into model dir with grammar
const Lambda = Symbol('lambda');
const Variable = Symbol('variable');
const Apply = Symbol('apply');
const UnboundVariable = Symbol('unboundVariable');
const Space = Symbol('space');

const REGEXES = {
  lambda: /l([a-km-z])/,
  apply: /\./,
  lambdaApplyOrSpace: /[l. ]/,
  space: / /,
  letterNotL: /\([a-km-z]\)/
};

export class Expression{
  constructor(symbolType, val, expr) {
    this.symbolType = symbolType;
    this.val = val;
    this.expr = expr;
  }
}

export default (lexemes) => lexemes.map(l => _parse(l));

const _parse = (lexeme) => {

  const isLambda = (str) => str.match(REGEXES.lambda);
  const isApply = (str) => str.match(REGEXES.apply);
  const isVariable = (str) => str.length === 1 && !str.match(REGEXES.lambdaApplyOrSpace);
  const isSpace = (str) => str.match(REGEXES.space);
  const isUnboundVariable = (str) => str.length === 3 && str.match(REGEXES.letterNotL);

  // lx
  const parseLambda = (lexeme) => new Expression(Lambda, lexeme[1]);
  const parseApply = () => Apply;
  const parseVariable = (lexeme) => new Expression(Variable, lexeme);  // lexeme just a char
  const parseSpace = () => Space;
  // (y)
  const parseUnboundVariable = (lexeme) => new Expression(UnboundVariable, lexeme[1]);

  const returnable = [];
  if (isLambda(lexeme)) returnable.push(parseLambda);
  if (isApply(lexeme)) returnable.push(parseApply);
  if (isVariable(lexeme)) returnable.push(parseVariable);
  if (isSpace(lexeme)) returnable.push(parseSpace);
  if (isUnboundVariable(lexeme)) returnable.push(parseUnboundVariable);

  if (returnable.length > 1) throw new Error(
    `Parser returned more than one possible interpretation for lexeme:
    ${lexeme}
    ${returnable}`
  );
  if (returnable.length === 0) throw new Error(
    `Parser cold not interpret lexeme:\n${lexeme}`
  );

  return returnable[0](lexeme);
};
