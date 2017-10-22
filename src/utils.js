console.log('utils.js is running.');

/* 
TIP: When using named exports, adding export before the variable 
declaration achieves the same result as if an isolated export 
statement were used.
*/
//export const square = x => x * x;
//export const add = (a,b) => a + b;
//export {square, add};

export const square = x => x * x;
export const add = (a,b) => a + b;
/*
TIP: "export default" does not work the same way as "export" in that 
you cannnot use "export default" before a variable assignment. Thus 
it must be broken onto two lines.

Alternatively, the variable assignment can usually be removed entirely 
resulting in "export default" followed by an expression that is to be 
exported as the default value, as shown below.

export {square, add, subtract as default};

OR

const subtract = (a,b) => a - b;
export default subtract;
*/
export default (a,b) => a - b;