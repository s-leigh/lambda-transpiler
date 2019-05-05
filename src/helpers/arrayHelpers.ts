export const head = ([x]: any[]) => x;

export const tail = ([_, ...xs]: any[]) => xs;

export const flatten = (arr: any): string[] => {
  return arr.reduce(function (flat: string[], toFlatten: any) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}
