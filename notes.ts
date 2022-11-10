// Defining types.
interface Human {
  name: string
  id: number
}

// Annotations.
const entity: Human = {
  name: 'Bam',
  id: 25,
}

const nothingMuch: null = null
const nothing: undefined = undefined

// Array
let colors: string[] = ['red', 'green', 'blue']
let myNumbers: number[] = [1, 2, 3]

// Object literal
let myPoint: { x: number; y: number } = {
  x: 10,
  y: 20
}

// Functions
const logNumber: (i: number) => void = (i: number) => {
  console.log(i)
}
const add = (a: number, b: number): number => {
  return a + b
}

// Interfaces with classes.
class Human {
  name: string
  id: number

  constructor(name: string, id: number) {
    this.name = name
    this.id = id
  }
}

const otherEntity: Human = new Human('Bark', 12)

// Composity types.
type doorStates = 'locked' | 'unlocked'
type positiveNumbersUnderTen = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

function getLength(obj: string | string[]) {
  return obj.length
}

// Structural type system.
interface Point {
  x: number
  y: number
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`)
}

// TypeScript won't check the point type because the point's "shape" is exactly the same than Point interface.
const point = { x: 12, y: 26 }
// "12, 26".
logPoint(point)
// The shape-matching only requires a subset of the object's field to match. Also called "duck typing".
const rect = { x: 33, y: 3, width: 30, height: 80 }
logPoint(rect) // "33, 3".

// Structural Typing's consequences.

// Empty types.
class Empty { }

function fn(arg: Empty) {
  // do something?
}

// No error, but this isn't an 'Empty' ?
// TypeScript determines if the call to fn here is valid by seeing if the provided argument is a valid Empty.
// It does so by examining the structure of { k: 10 } and class Empty { }.
// We can see that { k: 10 } has all of the properties that Empty does,
// because Empty has no properties. Therefore, this is a valid call!
fn({ k: 10 })

// Identical types.
class Car {
  drive() {
    // hit the gas.
  }
}
class Life {
  drive() {
    // hit the face.
  }
}
// No error?
const batman: Car = new Life()

// Narrowing: refining types to more specific types than declared is called narrowing.
function padLeft(padding: number | string, input: string) {
  if (typeof padding === 'number') {
    return ' '.repeat(padding) + input
    // (parameter) padding: number
  }
  return padding + input
  //(parameter) padding: string
}

interface Container {
  value: number | null | undefined
}

// Checking if value is not null will remove the other types from the interface, so TypeScript allows us to access value safely
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value !== null) {
    console.log(container.value)
    // (property) Container.value: number

    // Now we can safely multiply 'container.value'.
    container.value *= factor
  }
}

// Exhaustiveness checking.
interface Circle {
  kind: 'circle'
  radius: number
}

interface Square {
  kind: 'square'
  sideLength: number
}

interface Triangle {
  kind: 'triangle'
  sideLength: number
}

type Shape = Circle | Square | Triangle

/**
 * The never type is assignable to every type; however,
 * no type is assignable to never (except never itself).
 * This means you can use narrowing and rely on never turning
 * up to do exhaustive checking in a switch statement.
 */
function getArea(shape: Shape) {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.sideLength ** 2
    default:
      // Adding a new member to the Shape union, will cause a TypeScript error:
      const _exhaustiveCheck: never = shape
      return _exhaustiveCheck
  }
}

/**
 * It’s common to write a function where the types of the input relate to
 * the type of the output, or where the types of two inputs are related in
 * some way. Let’s consider for a moment a function that returns the first element of an array:
 */
function _firstElement(arr: any[]) {
  return arr[0]
}
/**
 * This function does its job, but unfortunately has the return type any.
 * It’d be better if the function returned the type of the array element.
 *
 * In TypeScript, generics are used when we want to describe a correspondence
 * between two values. We do this by declaring a type parameter in the function signature:
 *
 * By adding a type parameter Type to this function and using it in two places, we’ve created
 * a link between the input of the function (the array) and the output (the return value).
 * Now when we call it, a more specific type comes out:
 */
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0]
}

// s is of type 'string'
const s = firstElement(['a', 'b', 'c'])
// n is of type 'number'
const n = firstElement([1, 2, 3])
// u is of type undefined
const u = firstElement([])

// Inference.

/**
 * Note that we didn’t have to specify Type in this sample. The type was inferred - chosen automatically - by TypeScript.
 * We can use multiple type parameters as well. For example, a standalone version of map would look like this:
 */
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output,
): Output[] {
  return arr.map(func)
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(['1', '2', '3'], n => parseInt(n))

function maps<TypeA, TypeB>(
  arr: TypeA[],
  func: (arg: TypeA) => TypeB,
): TypeB[] {
  return arr.map(func)
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const _parsed = map(['1', '2', '3'], n => parseInt(n))

// Constraints
/**
 * We’ve written some generic functions that can work on any kind of value.
 * Sometimes we want to relate two values, but can only operate on a certain
 * subset of values. In this case, we can use a constraint to limit the kinds of types that a type parameter can accept.
 *
 * Let’s write a function that returns the longer of two values.
 * To do this, we need a length property that’s a number.
 * We constrain the type parameter to that type by writing an extends clause:
 */
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a
  } else {
    return b
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3])
// longerString is of type 'alice' | 'bob'
const longerString = longest('alice', 'bob')
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100)

// Here’s a common error when working with generic constraints:
/**
 * It might look like this function is OK - Type is constrained to { length: number },
 * and the function either returns Type or a value matching that constraint.
 * The problem is that the function promises to return the same kind of object as was passed in,
 * not just some object matching the constraint. If this code were legal,
 * you could write code that definitely wouldn’t work:
 */
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number,
): Type {
  if (obj.length >= minimum) {
    return obj
  } else {
    return { length: minimum }
  }
}

// 'arr' gets value { length: 6 }
const arr = minimumLength([1, 2, 3], 6)
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
console.log(arr.slice(0))

// Specifying Type Arguments
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2)
}

const _arr = combine([1, 2, 3], ['hello'])
const noErrorArr = combine<string | number>([1, 2, 3], ['hello'])

// ❗❗❗  Thumb Rule: when possible, use the type parameter itself rather than constraining it. ❗❗❗

function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i++) {
    // I don't feel like providing the index today
    callback(arr[i])
  }
}

myForEach([1, 2, 3], (a, i) => {
  console.log(i.toFixed())
})

/**
 * Some JavaScript functions can be called in a variety of argument counts and types.
 * For example, you might write a function to produce a Date that takes either a timestamp (one argument)
 * or a month/day/year specification (three arguments).
 * In TypeScript, we can specify a function that can be called in different ways by writing overload signatures.
 * To do this, write some number of function signatures (usually two or more), followed by the body of the function:
 */
function makeDate(timestamp: number): Date
function makeDate(m: number, d: number, y: number): Date
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d)
  } else {
    return new Date(mOrTimestamp)
  }
}
const d1 = makeDate(12345678)
const d2 = makeDate(5, 5, 5)
// No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
const d3 = makeDate(1, 3)

function myFunction(x: string): void
function myFunction(): void {
  // ...
}
// Expected to be able to call with zero arguments
myFunction()

// Declaring this in a function.

// TypeScript will infer what the this should be in a function via code flow analysis, for example in the following:
const user = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true
  },
}

/**
 * TypeScript understands that the function user.becomeAdmin
 * has a corresponding this which is the outer object user.
 * This, heh, can be enough for a lot of cases, but there are a lot of cases
 * where you need more control over what object this represents.
 * The JavaScript specification states that you cannot have a parameter
 * called this, and so TypeScript uses that syntax space to let you declare the type for this in the function body.
 */
interface User {
  id: number
  isAdmin: boolean
}

interface DB {
  filterUsers(filter: (this: User) => boolean): User[]
}

declare const getDB: () => DB

const db = getDB()
const admins = db.filterUsers(function (this: User) {
  return this.isAdmin
})
