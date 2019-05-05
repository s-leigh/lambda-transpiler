import lex from "./actions/lex";
import parse from "./actions/parse";
import transpile from "./actions/transpile";
import { tail, head } from "./helpers/arrayHelpers";

const applyArgs = (args: string[], lambda: Function): Function | string => {
  if (!args.length) return lambda;
  if (!(lambda instanceof Function)) throw new Error(
    `Lambda resolved to non-function too soon (too many arguments?)
    Final application gave result: ${lambda}`
  )  
  const partialApplication = lambda(head(args));
  return applyArgs(tail(args), partialApplication);
}

export default (rawLambdaInput: string, unboundVarsInput: string[]) => {
  const resultantLambda: Function = transpile(parse(lex(rawLambdaInput)));
  // console.log(`Representation: (${resultantLambda.toString()})${unboundVarsInput.map(v => `(${v})`).join('')}`);

  const result: Function | string = applyArgs(unboundVarsInput, resultantLambda);
  console.log(`Result: ${result instanceof String ? result : `(${result.toString()})`}`);
  return result;
}
