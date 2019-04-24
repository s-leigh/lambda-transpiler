import {REGEXES, Lambda, BoundVariable, UnboundVariable} from './model/model';

export default (lexemes) => {

  const handleLexeme = (lexeme, lexemeIndex, lexemeArray) => {
    if (lexemeIndex > lexemeArray.length) return lexemeArray[lexemeArray.length - 1];
    const nextLexemeIndex = lexemeIndex + 1;
    const nextLexeme = lexemeArray[nextLexemeIndex];
    // lx[. ]
    const parseLambda = (lexeme) => new Lambda(lexeme[1], handleLexeme(nextLexeme, nextLexemeIndex, lexemeArray));
    const parseBoundVariable = (lexeme) => new BoundVariable(lexeme[0], handleLexeme(nextLexeme, nextLexemeIndex, lexemeArray));
    // (y)
    const parseUnboundVariable = (lexeme) => new UnboundVariable(lexeme[1], nextLexeme ? handleLexeme(nextLexeme, nextLexemeIndex, lexemeArray) : null);

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

  return handleLexeme(lexemes[0], 0, lexemes);
};

