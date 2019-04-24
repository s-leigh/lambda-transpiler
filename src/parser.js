// TODO: break out into model dir with grammar
const Apply = Symbol('apply');
const Space = Symbol('space');

const REGEXES = {
  lambda: /l[a-km-z][.]/,
  boundVariable: /[a-km-z] /,
  unboundVariable: /\([a-km-z]\)/
};

class LambdaExpression {
  constructor(val, succeedingToken) {
    this.variable = new BoundVariable(val);
    this.succeedingToken = succeedingToken;  // apply or space
  }
}

class BoundVariable {
  constructor(val) {
    this.val = val;
  }
}

class UnboundVariable {
  constructor(val) {
    this.val = val;
  }
}

export default (lexemes) => lexemes.map(l => _parse(l));

const _parse = (lexeme) => {
  // lx[. ]
  const parseLambda = (lexeme) => {
    let succeedingToken;
    if (lexeme[2].match(REGEXES.apply)) succeedingToken = Apply;
    else if (lexeme[2].match(REGEXES.space)) succeedingToken = Space;
    else throw new Error(`Unexpected token after Lambda lexeme:\n${lexeme}`);
    return new LambdaExpression(lexeme[1], succeedingToken);
  };
  const parseBoundVariable = (lexeme) => new BoundVariable(lexeme[0]);
  // (y)
  const parseUnboundVariable = (lexeme) => new UnboundVariable(lexeme[1]);

  const returnable = [];
  if (lexeme.match(REGEXES.lambda)) returnable.push(parseLambda);
  if (lexeme.match(REGEXES.boundVariable)) returnable.push(parseBoundVariable);
  if (lexeme.match(REGEXES.unboundVariable)) returnable.push(parseUnboundVariable);

  if (returnable.length > 1) throw new Error(
    `Parser returned more than one possible interpretation for lexeme:
    '${lexeme}'
    ${returnable}`
  );
  if (returnable.length === 0) throw new Error(
    `Parser cold not interpret lexeme:\n'${lexeme}'`
  );

  return returnable[0](lexeme);
};
