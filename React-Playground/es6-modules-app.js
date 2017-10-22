/*
TIP: Because "subtract" is set as a default export, it must be 
referenced outside of the braces, otherwise a reference error 
is thrown. It can still be named explicitly, but cannot be 
within the braces. The point of the default export is that the 
variable referencing it in the import statement is not required 
to match that defined in the export statement of the imported 
file. In this example, the default export is named "subtract" 
but it is referenced in app.js as "sub."
*/
//import './utils';
import sub, {square, add} from './utils';

console.log('app.js is running!');
console.log(square(4));
console.log(add(2,4));
console.log(sub(10,2));