import {BoundVariable, IExpression, Lambda, REGEXES} from '../model/model';
import { tail } from '../helpers/arrayHelpers';

export default function parse(lexemeArray: string[]): IExpression {
  const handleNextLexeme = () => lexemeArray[1] ? parse(tail(lexemeArray)) : null
  const parseLambda = (lexeme: string): IExpression => {
    return new Lambda(lexeme[1], handleNextLexeme());
  };
  const parseBoundVariable = (lexeme: string): IExpression => {
    return new BoundVariable(lexeme[0], handleNextLexeme());
  };
  
  const lexeme = lexemeArray[0];
  // handle possibility of parser identifying lexeme as more than one type of thing
  const parseFn: Array<(lexeme: string) => IExpression> = [];
  if (lexeme.match(REGEXES.lambda)) parseFn.push(parseLambda);
  if (lexeme.match(REGEXES.boundVariable)) parseFn.push(parseBoundVariable);

  if (parseFn.length > 1) throw new Error(
    `Parser returned more than one possible interpretation for lexeme:
    '${lexeme}'
    ${parseFn}`
  );
  if (parseFn.length === 0) throw new Error(
    `Parser cold not interpret lexeme:\n'${lexeme}'`
  );

  return parseFn[0](lexeme);
};
