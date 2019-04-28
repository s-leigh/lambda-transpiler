const flatten = (arr: any): string[] => {
  return arr.reduce(function (flat: string[], toFlatten: any) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

// split on . and space but keep in matching group: positive lookbehind
export default (str: string): string[] => {
  const intermediate = str.split(/(?<=[ .])/);
  return flatten(intermediate.map(lexeme => {
    // handle vars in omega combinator e.g. 'xx' in lx.xx
    if (!lexeme.includes('l') && !lexeme.includes(' ') && lexeme.length > 1) {
      return lexeme.split('');
    }
    return lexeme;
  }));
}
