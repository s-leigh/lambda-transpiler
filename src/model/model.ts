export const REGEXES = {
  boundVariable: /[a-km-z] /,
  lambda: /l[a-km-z][.]/,
  unboundVariable: /\([a-km-z]\)/
};

export const LAMBDA = 'lambda';
export const BOUND_VARIABLE = 'boundVariable';
export const UNBOUND_VARIABLE = 'unboundVariable';

export class Lambda {
  public symbolType = LAMBDA;
  public variable;
  public apply;
  constructor(val: string, apply: IExpression) {
    this.variable = val;
    this.apply = apply;
  }
}

export class BoundVariable {
  public symbolType = BOUND_VARIABLE;
  public variable;
  public apply;
  constructor(val: string, apply: IExpression) {
    this.variable = val;
    this.apply = apply;
  }
}

export class UnboundVariable implements IExpression {
  public symbolType = UNBOUND_VARIABLE;
  public variable;
  public apply;
  constructor(val: string, apply: IExpression) {
    this.variable = val;
    this.apply = apply;
  }
}

export interface IExpression {
  symbolType: string;
  variable: string;
  apply: IExpression;
}
