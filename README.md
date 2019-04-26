# Lambda Compiler

Takes a lambda calculus expression in the form e.g.
`lx.ly.x`
and an optional value to apply, and returns the stringified function in JavaScript, or the determined value.

## Example usage
Values are given as command-line arguments:

`npm start lx.ly.ly`
returns `(x => y => y)`

`npm start lx.x 2`
returns `2`

`npm start lx.ly.x 5 6`
returns `5`
