export const REGEXES = {
  lambda: /l[a-km-z][.]/,
  boundVariable: /[a-km-z] /,
  unboundVariable: /\([a-km-z]\)/
};

export const LAMBDA = 'lambda';
export const BOUND_VARIABLE = 'boundVariable';
export const UNBOUND_VARIABLE = 'unboundVariable';

export class Lambda {
  constructor(val, apply) {
    this.symbolType = LAMBDA;
    this.variable = val;
    this.apply = apply;
  }
}

export class BoundVariable {
  constructor(val, apply) {
    this.symbolType = BOUND_VARIABLE;
    this.variable = val;
    this.apply = apply;
  }
}

export class UnboundVariable {
  constructor(val, apply) {
    this.symbolType = UNBOUND_VARIABLE;
    this.variable = val;
    this.apply = apply;
  }
}

