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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/string-replace-webpack-plugin/loader.js?id=h2rxofqj8u5!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/Workers/transferTypedArrayTest.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/string-replace-webpack-plugin/loader.js?id=h2rxofqj8u5!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/Workers/transferTypedArrayTest.js":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/string-replace-webpack-plugin/loader.js?id=h2rxofqj8u5!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/Workers/transferTypedArrayTest.js ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// make sure self is defined so that the Dojo build can evaluate this file without crashing.\nif (typeof self === \"undefined\") {\n  //eslint-disable-next-line no-implicit-globals, no-global-assign\n  self = {};\n}\n\nself.onmessage = function (event) {\n  var array = event.data.array;\n  var postMessage = self.webkitPostMessage || self.postMessage;\n\n  try {\n    // transfer the test array back to the caller\n    postMessage(\n      {\n        array: array,\n      },\n      [array.buffer]\n    );\n  } catch (e) {\n    postMessage({});\n  }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ub2RlX21vZHVsZXMvc3RyaW5nLXJlcGxhY2Utd2VicGFjay1wbHVnaW4vbG9hZGVyLmpzP2lkPWgycnhvZnFqOHU1IS4vbm9kZV9tb2R1bGVzL3RlcnJpYWpzL2J1aWxkcHJvY2Vzcy9yZW1vdmVDZXNpdW1EZWJ1Z1ByYWdtYXMuanMhLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Xb3JrZXJzL3RyYW5zZmVyVHlwZWRBcnJheVRlc3QuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdGVycmlhanMtY2VzaXVtL1NvdXJjZS9Xb3JrZXJzL3RyYW5zZmVyVHlwZWRBcnJheVRlc3QuanM/YmQ2NCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtYWtlIHN1cmUgc2VsZiBpcyBkZWZpbmVkIHNvIHRoYXQgdGhlIERvam8gYnVpbGQgY2FuIGV2YWx1YXRlIHRoaXMgZmlsZSB3aXRob3V0IGNyYXNoaW5nLlxuaWYgKHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiKSB7XG4gIC8vZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWltcGxpY2l0LWdsb2JhbHMsIG5vLWdsb2JhbC1hc3NpZ25cbiAgc2VsZiA9IHt9O1xufVxuXG5zZWxmLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldmVudCkge1xuICB2YXIgYXJyYXkgPSBldmVudC5kYXRhLmFycmF5O1xuICB2YXIgcG9zdE1lc3NhZ2UgPSBzZWxmLndlYmtpdFBvc3RNZXNzYWdlIHx8IHNlbGYucG9zdE1lc3NhZ2U7XG5cbiAgdHJ5IHtcbiAgICAvLyB0cmFuc2ZlciB0aGUgdGVzdCBhcnJheSBiYWNrIHRvIHRoZSBjYWxsZXJcbiAgICBwb3N0TWVzc2FnZShcbiAgICAgIHtcbiAgICAgICAgYXJyYXk6IGFycmF5LFxuICAgICAgfSxcbiAgICAgIFthcnJheS5idWZmZXJdXG4gICAgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHBvc3RNZXNzYWdlKHt9KTtcbiAgfVxufTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./node_modules/string-replace-webpack-plugin/loader.js?id=h2rxofqj8u5!./node_modules/terriajs/buildprocess/removeCesiumDebugPragmas.js!./node_modules/terriajs-cesium/Source/Workers/transferTypedArrayTest.js\n");

/***/ })

/******/ });