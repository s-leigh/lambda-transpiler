// split on . and space but keep in matching group: positive lookbehind
export default str => str.split(/(?<=[ .])/);
