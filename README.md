# Typescript

This repo will contain TypeScript definitions & examples where you might see my skills around this tool!

## Type annotations

Code we add to tell TypeScript what type of value a variable will refer to.

## Type inference

TypeScript tries to figure out what type of value a variable refers to.

## Type annotations vs Type inference

We use `Type inference` *always*! Every time TypeScript can infer out type we should use it. `Type annotations` are used when:

- We declare a variable on one line the initialize it later.
- We want a variable to have a type that can't be inferred.
- A function returns the `any` type and we need to clarify the value.

```Javascript
const json = '{"x": 10, "y": 20}'
const coordinates: {x: number; y: number} = JSON.parse(json) // { x: 10, y: 20 }
```

## What `any` means?

- `any` is a type, just as `string` or `boolean` are.
- Means TS has no idea what this is - can't check for correct property references.
- **avoid variables with `any` at all costs**

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
