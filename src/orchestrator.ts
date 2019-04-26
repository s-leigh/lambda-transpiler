import lex from "./actions/lex";
import parse from "./actions/parse";
import transpile from "./actions/transpile";

const applyArgs = (args: string[], lambda: Function): Function | string => {
  if (args.length === 0) return lambda;
  if (typeof lambda !== 'function') throw new Error(
    `Lambda resolved to non-function too soon (too many arguments?)
    Final application gave result: ${lambda}`
  )  
  const partialApplication = lambda(args[0]);
  args.shift();
  return applyArgs(args, partialApplication);
}

export default (rawLambdaInput: string, unboundVarsInput: string[]) => {
  const resultantLambda: Function = transpile(parse(lex(rawLambdaInput)));
  console.log(`Representation: (${resultantLambda.toString()})${unboundVarsInput.map(v => `(${v})`).join('')}`);

  const result: Function | string = applyArgs(unboundVarsInput, resultantLambda);
  console.log(`Result: ${typeof result === 'string' ? result : `(${result.toString()})`}`);
  return result;
}
