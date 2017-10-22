/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
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


console.log('app.js is running!');
console.log(Object(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* square */])(4));
console.log(Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* add */])(2,4));
console.log(Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* default */])(10,2));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
console.log('utils.js is running.');

/* 
TIP: When using named exports, adding export before the variable 
declaration achieves the same result as if an isolated export 
statement were used.
*/
//export const square = x => x * x;
//export const add = (a,b) => a + b;
//export {square, add};

const square = x => x * x;
/* harmony export (immutable) */ __webpack_exports__["c"] = square;

const add = (a,b) => a + b;
/* harmony export (immutable) */ __webpack_exports__["a"] = add;

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
/* harmony default export */ __webpack_exports__["b"] = ((a,b) => a - b);

/***/ })
/******/ ]);