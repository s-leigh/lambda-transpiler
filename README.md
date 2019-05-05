# Lambda Transpiler

Takes a basic lambda calculus expression in the form e.g.
`lx.ly.x` or `λx.λy.x`
and an optional value to apply, and returns the stringified function in JavaScript, or the determined value.

## Example usage
Values are given as command-line arguments:

`npm start λx.λy.y`
returns `(x => y => (y))`

The tool can apply basic unbound variables, as long as enough are supplied:

`npm start λx.x 2`
returns `2`

`npm start λx.λy.x 5 6`
returns `5`
