import lex from "./actions/lex";
import parse from "./actions/parse";
import transpile from "./actions/transpile";

export default (rawLambdaInput: string): string => transpile(parse(lex(rawLambdaInput)));
