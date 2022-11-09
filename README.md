# TypeScript

This repo will contain TypeScript definitions & examples where you might see my skills around this tool!

## Type annotations

Code we add to tell TypeScript what type of value a variable will refer to.

## Type inference

TypeScript tries to figure out what type of value a variable refers to.

## Type annotations vs Type inference

We use `Type inference` *always*! Every time TypeScript can infer out type we should use it. `Type annotations` are used when:

- We declare a variable on one line the initialize it later.

```Javascript
const numbers = [1, 2, 3, 4]
let foundNumber: boolean // <-- Here we declare but not initialize it, so we type the variable.

for( let i = 0; i < numbers.length; i++ ) {
  if( numbers[i] === 1 ) {
    foundNumber = true
  }
}
```

- We want a variable to have a type that can't be inferred.

```Javascript
const numbers = [-10, -20, -30]
const numberAboveZero: number | boolean = false // Value cannot be inferred because we innitialize it 
// as bool but then we assign a number type, so we use `|` pipe symbol to say that the variable can 
// take two different types

for(let i = 0; i < numbers.length; i++){
  if(numbers[i] > 0){
    numberAboveZero = numbers[i]
  }
}
```

- A function returns the `any` type and we need to clarify the value.

```Javascript
const json = '{"x": 10, "y": 20}'
const coordinates: {x: number; y: number} = JSON.parse(json) // Returns a any type because 
// we are not describing the props of the object { x: 10, y: 20 }
```

## What `any` means?

- `any` is a type, just as `string` or `boolean` are.
- Means TS has no idea what this is - can't check for correct property references.
- **Avoid variables with `any` at all costs**

## Types

The types in TypeScript are classified into two groups:

### Primitive types

- number
- boolean
- void
- undefined
- string
- symbol
- null

### Object types

- functions
- classes
- arrays
- objects

## Type annotations for functions

Code we add to tell TypeScript what type of arguments a function will receive and what type of values it will return

## Type inference for functions

Typescript tries to figure out what type of value a function will return

## Typed Arrays

Arrays where each element is some consistent type of value
