// ***
// A basic example.
// ***

class Employee {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Programmer extends Employee {
  program() {}
}

class Manager extends Employee {
  manage() {}
}

class Accountant {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  audit() {}
  program() {}
}

let employee: Programmer = new Accountant('Jack');

// ***
// Function Parameter Bivariance.
// ***

interface MyEvent {
  type: string;
}

interface MyMouseEvent extends MyEvent {
  x: number;
  y: number;
}

function listenEvent(eventName: string, callback: (e: MyEvent) => void) {
  const event = { type: 'some-event-type' };
  callback(event);
}

listenEvent('click', (e: MyMouseEvent) => {});

// ***
// Optional Parameters and Rest Parameters.
// ***

function invokeLater(args: number[], callback: (...args: number[]) => void) {
  /* ... Invoke callback with 'args' ... */
  callback();
}

// Unsound - invokeLater "might" provide any number of arguments
const myCallback = (x: number, y: number) => console.log(x + ', ' + y);
invokeLater([1, 2], myCallback);

// Confusing (x and y are actually required) and undiscoverable
invokeLater([1, 2], (x?, y?) => console.log(x + ', ' + y));

// ***
// Functions with overloads.
// ***

function x(a: number): number;
function x(a: string): string;
function x(a: number | string) {
  return a;
}

function y(a: boolean): boolean;
function y(a: number): number;
function y(a: string): string;
function y(a: number | string | boolean) {
  return a;
}

let xFunc: typeof x = y;
let yFunc: typeof y = x;

// ***
// Enums.
// ***

enum Status {
  Ready,
  Waiting,
}

let someNumber: number = Status.Ready;

let someStatus: Status = 0;

enum Color {
  Red,
  Blue,
  Green,
}

// let s = Status.Ready;
// s = Color.Red;

// ***
// Classes.
// ***

class Animal {
  feet: number;
  public static hello() {}
  constructor(name: string, numFeet: number) {
    this.feet = numFeet;
  }
}

class Size {
  feet: number;
  constructor(numFeet: number) {
    this.feet = numFeet;
  }
}

let a: Animal = new Animal('Cat', 4);
let s: Size = new Size(4);

a = s; // OK
s = a; // OK

// ***
// Private and protected members in classes.
// ***

class A {
  a: string;
  private b: number;
  constructor(a: string, b: number) {
    this.a = a;
    this.b = b;
  }
}

class SubclassA extends A {}

class B {
  a: string;
  private b: number;
  constructor(a: string, b: number) {
    this.a = a;
    this.b = b;
  }
}

class SubclassB extends B {}

let classA = new A('A', 1);
let classB = new B('B', 2);

let subclassA = new SubclassA('SUBCLASS A', 1);
let subclassB = new SubclassB('SUBCLASS B', 2);

classB = subclassB;
classA = subclassA;
