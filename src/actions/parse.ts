import {BoundVariable, IExpression, Lambda, REGEXES, UnboundVariable} from '../model/model';

export default (lexemes: string[]): IExpression => {

  const handleLexeme = (lexeme: string, index: number, lexemeArray: string[]): IExpression => {
    const nextIndex = index + 1;
    const nextLexeme = lexemeArray[nextIndex];
    // lx[. ?]
    const parseLambda = (token: string): IExpression => {
      return new Lambda(token[1], nextLexeme ? handleLexeme(nextLexeme, nextIndex, lexemeArray) : null);
    };
    const parseBoundVariable = (token: string): IExpression => {
      return new BoundVariable(token[0], nextLexeme ? handleLexeme(nextLexeme, nextIndex, lexemeArray) : null);
    };
    // (y)
    const parseUnboundVariable = (token: string): IExpression => {
      return new UnboundVariable(token[1], nextLexeme ? handleLexeme(nextLexeme, nextIndex, lexemeArray) : null);
    };

    const returnable: Array<(token: string) => IExpression> = [];
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

  return handleLexeme(lexemes[0], 0, lexemes);
};
