/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/App.tsx":
/*!*********************!*\
  !*** ./src/App.tsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Layout */ "./src/components/Layout.tsx");
/* harmony import */ var _components_Home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Home */ "./src/components/Home.tsx");
/* harmony import */ var _components_Counter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Counter */ "./src/components/Counter.tsx");
/* harmony import */ var _components_FetchData__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/FetchData */ "./src/components/FetchData.tsx");
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./main.scss */ "./src/main.scss");
/* harmony import */ var _main_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_main_scss__WEBPACK_IMPORTED_MODULE_6__);







/* harmony default export */ __webpack_exports__["default"] = (function () { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_components_Layout__WEBPACK_IMPORTED_MODULE_2__["default"], null,
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { exact: true, path: "/", component: _components_Home__WEBPACK_IMPORTED_MODULE_3__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/counter", component: _components_Counter__WEBPACK_IMPORTED_MODULE_4__["default"] }),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], { path: "/fetch-data/:startDateIndex?", component: _components_FetchData__WEBPACK_IMPORTED_MODULE_5__["default"] }))); });


/***/ }),

/***/ "./src/components/Counter.tsx":
/*!************************************!*\
  !*** ./src/components/Counter.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _store_Counter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/Counter */ "./src/store/Counter.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Counter = (function (_super) {
    __extends(Counter, _super);
    function Counter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Counter.prototype.render = function () {
        var _this = this;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Counter"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "This is a simple example of a React component."),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", { "aria-live": "polite" },
                "Current count: ",
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, this.props.count)),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("button", { type: "button", className: "btn btn-primary btn-lg", onClick: function () {
                    _this.props.increment();
                } }, "Increment")));
    };
    return Counter;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(function (state) { return state.counter; }, _store_Counter__WEBPACK_IMPORTED_MODULE_2__["actionCreators"])(Counter));


/***/ }),

/***/ "./src/components/FetchData.tsx":
/*!**************************************!*\
  !*** ./src/components/FetchData.tsx ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _store_WeatherForecasts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../store/WeatherForecasts */ "./src/store/WeatherForecasts.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var FetchData = (function (_super) {
    __extends(FetchData, _super);
    function FetchData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FetchData.prototype.componentDidMount = function () {
        this.ensureDataFetched();
    };
    FetchData.prototype.componentDidUpdate = function () {
        this.ensureDataFetched();
    };
    FetchData.prototype.render = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", { id: "tabelLabel" }, "Weather forecast"),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "This component demonstrates fetching data from the server and working with URL parameters."),
            this.renderForecastsTable(),
            this.renderPagination()));
    };
    FetchData.prototype.ensureDataFetched = function () {
        var startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
        this.props.requestWeatherForecasts(startDateIndex);
    };
    FetchData.prototype.renderForecastsTable = function () {
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("table", { className: 'table table-striped', "aria-labelledby": "tabelLabel" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("thead", null,
                react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", null,
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Date"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Temp. (C)"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Temp. (F)"),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("th", null, "Summary"))),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tbody", null, this.props.forecasts.map(function (forecast) {
                return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("tr", { key: forecast.date },
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, forecast.date),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, forecast.temperatureC),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, forecast.temperatureF),
                    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("td", null, forecast.summary));
            }))));
    };
    FetchData.prototype.renderPagination = function () {
        var prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
        var nextStartDateIndex = (this.props.startDateIndex || 0) + 5;
        return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "d-flex justify-content-between" },
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { className: 'btn btn-outline-secondary btn-sm', to: "/fetch-data/" + prevStartDateIndex }, "Previous"),
            this.props.isLoading && react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("span", null, "Loading..."),
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Link"], { className: 'btn btn-outline-secondary btn-sm', to: "/fetch-data/" + nextStartDateIndex }, "Next")));
    };
    return FetchData;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(function (state) { return state.weatherForecasts; }, _store_WeatherForecasts__WEBPACK_IMPORTED_MODULE_3__["actionCreators"])(FetchData));


/***/ }),

/***/ "./src/components/Home.tsx":
/*!*********************************!*\
  !*** ./src/components/Home.tsx ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");


var Home = function () { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", null,
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("h1", null, "Hello, world!"),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "Welcome to your new single-page application, built with:"),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { href: 'https://get.asp.net/' }, "ASP.NET Core"),
            " and ",
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { href: 'https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx' }, "C#"),
            " for cross-platform server-side code"),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { href: 'https://facebook.github.io/react/' }, "React"),
            " and ",
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { href: 'https://redux.js.org/' }, "Redux"),
            " for client-side code"),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("a", { href: 'http://getbootstrap.com/' }, "Bootstrap"),
            " for layout and styling")),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null, "To help you get started, we've also set up:"),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("ul", null,
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Client-side navigation"),
            ". For example, click ",
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "Counter"),
            " then ",
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("em", null, "Back"),
            " to return here."),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Development server integration"),
            ". In development mode, the development server from ",
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("code", null, "create-react-app"),
            " runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file."),
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("li", null,
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("strong", null, "Efficient production builds"),
            ". In production mode, development-time features are disabled, and your ",
            react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("code", null, "dotnet publish"),
            " configuration produces minified, efficiently bundled JavaScript files.")),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("p", null,
        "The ",
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("code", null, "ClientApp"),
        " subdirectory is a standard React application based on the ",
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("code", null, "create-react-app"),
        " template. If you open a command prompt in that directory, you can run ",
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("code", null, "npm"),
        " commands such as ",
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("code", null, "npm test"),
        " or ",
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("code", null, "npm install"),
        "."))); };
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])()(Home));


/***/ }),

/***/ "./src/components/Layout.tsx":
/*!***********************************!*\
  !*** ./src/components/Layout.tsx ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _NavMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NavMenu */ "./src/components/NavMenu.tsx");


/* harmony default export */ __webpack_exports__["default"] = (function (props) { return (react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null,
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_NavMenu__WEBPACK_IMPORTED_MODULE_1__["default"], null),
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("div", { className: "main-container" }, props.children))); });


/***/ }),

/***/ "./src/components/NavMenu.tsx":
/*!************************************!*\
  !*** ./src/components/NavMenu.tsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NavMenu = (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isOpen: false
        };
        _this.toggle = function () {
            _this.setState({
                isOpen: !_this.state.isOpen
            });
        };
        return _this;
    }
    NavMenu.prototype.render = function () {
        return react__WEBPACK_IMPORTED_MODULE_0__["createElement"]("header", null);
    };
    return NavMenu;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]));
/* harmony default export */ __webpack_exports__["default"] = (NavMenu);


/***/ }),

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var history__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! history */ "./node_modules/history/esm/history.js");
/* harmony import */ var _store_configureStore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store/configureStore */ "./src/store/configureStore.ts");
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App */ "./src/App.tsx");







var baseUrl = document
    .getElementsByTagName("base")[0]
    .getAttribute("href");
var history = Object(history__WEBPACK_IMPORTED_MODULE_4__["createBrowserHistory"])({ basename: baseUrl });
var store = Object(_store_configureStore__WEBPACK_IMPORTED_MODULE_5__["default"])(history);
react_dom__WEBPACK_IMPORTED_MODULE_1__["render"](react__WEBPACK_IMPORTED_MODULE_0__["createElement"](react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], { store: store },
    react__WEBPACK_IMPORTED_MODULE_0__["createElement"](connected_react_router__WEBPACK_IMPORTED_MODULE_3__["ConnectedRouter"], { history: history },
        react__WEBPACK_IMPORTED_MODULE_0__["createElement"](_App__WEBPACK_IMPORTED_MODULE_6__["default"], null))), document.getElementById("root"));


/***/ }),

/***/ "./src/main.scss":
/*!***********************!*\
  !*** ./src/main.scss ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/store/Counter.ts":
/*!******************************!*\
  !*** ./src/store/Counter.ts ***!
  \******************************/
/*! exports provided: actionCreators, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionCreators", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
var actionCreators = {
    increment: function () { return ({ type: "INCREMENT_COUNT" }); },
    decrement: function () { return ({ type: "DECREMENT_COUNT" }); }
};
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return { count: 0 };
    }
    var action = incomingAction;
    switch (action.type) {
        case "INCREMENT_COUNT":
            return { count: state.count + 1 };
        case "DECREMENT_COUNT":
            return { count: state.count - 1 };
        default:
            return state;
    }
};


/***/ }),

/***/ "./src/store/WeatherForecasts.ts":
/*!***************************************!*\
  !*** ./src/store/WeatherForecasts.ts ***!
  \***************************************/
/*! exports provided: actionCreators, reducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "actionCreators", function() { return actionCreators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
var actionCreators = {
    requestWeatherForecasts: function (startDateIndex) { return function (dispatch, getState) {
        var appState = getState();
        if (appState &&
            appState.weatherForecasts &&
            startDateIndex !== appState.weatherForecasts.startDateIndex) {
            fetch("weatherforecast")
                .then(function (response) { return response.json(); })
                .then(function (data) {
                dispatch({
                    type: "RECEIVE_WEATHER_FORECASTS",
                    startDateIndex: startDateIndex,
                    forecasts: data
                });
            });
            dispatch({
                type: "REQUEST_WEATHER_FORECASTS",
                startDateIndex: startDateIndex
            });
        }
    }; }
};
var unloadedState = {
    forecasts: [],
    isLoading: false
};
var reducer = function (state, incomingAction) {
    if (state === undefined) {
        return unloadedState;
    }
    var action = incomingAction;
    switch (action.type) {
        case "REQUEST_WEATHER_FORECASTS":
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true
            };
        case "RECEIVE_WEATHER_FORECASTS":
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false
                };
            }
            break;
    }
    return state;
};


/***/ }),

/***/ "./src/store/configureStore.ts":
/*!*************************************!*\
  !*** ./src/store/configureStore.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return configureStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");
/* harmony import */ var connected_react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! connected-react-router */ "./node_modules/connected-react-router/esm/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ */ "./src/store/index.ts");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};




function configureStore(history, initialState) {
    var middleware = [redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"], Object(connected_react_router__WEBPACK_IMPORTED_MODULE_2__["routerMiddleware"])(history)];
    var rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(__assign(__assign({}, ___WEBPACK_IMPORTED_MODULE_3__["reducers"]), { router: Object(connected_react_router__WEBPACK_IMPORTED_MODULE_2__["connectRouter"])(history) }));
    var enhancers = [];
    var windowIfDefined = typeof window === "undefined" ? null : window;
    if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
    }
    return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(rootReducer, initialState, redux__WEBPACK_IMPORTED_MODULE_0__["compose"].apply(void 0, __spreadArrays([redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"].apply(void 0, middleware)], enhancers)));
}


/***/ }),

/***/ "./src/store/index.ts":
/*!****************************!*\
  !*** ./src/store/index.ts ***!
  \****************************/
/*! exports provided: reducers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducers", function() { return reducers; });
/* harmony import */ var _WeatherForecasts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WeatherForecasts */ "./src/store/WeatherForecasts.ts");
/* harmony import */ var _Counter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Counter */ "./src/store/Counter.ts");


var reducers = {
    counter: _Counter__WEBPACK_IMPORTED_MODULE_1__["reducer"],
    weatherForecasts: _WeatherForecasts__WEBPACK_IMPORTED_MODULE_0__["reducer"]
};


/***/ }),

/***/ 0:
/*!*******************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://localhost:3000 ./src/index.tsx ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\Users\Jeff\source\repos\Dawn\Dawn.ClientApp\node_modules\webpack-dev-server\client\index.js?http://localhost:3000 */"./node_modules/webpack-dev-server/client/index.js?http://localhost:3000");
module.exports = __webpack_require__(/*! C:\Users\Jeff\source\repos\Dawn\Dawn.ClientApp\src\index.tsx */"./src/index.tsx");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9ob3Qgc3luYyBub25yZWN1cnNpdmUgXlxcLlxcL2xvZyQiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvQ291bnRlci50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvRmV0Y2hEYXRhLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9Ib21lLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9MYXlvdXQudHN4Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL05hdk1lbnUudHN4Iiwid2VicGFjazovLy8uL3NyYy9pbmRleC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvQ291bnRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvV2VhdGhlckZvcmVjYXN0cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvY29uZmlndXJlU3RvcmUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLFFBQVEsb0JBQW9CO1FBQzVCO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EsaUJBQWlCLDRCQUE0QjtRQUM3QztRQUNBO1FBQ0Esa0JBQWtCLDJCQUEyQjtRQUM3QztRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FB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cyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcHBcIjogMFxuIFx0fTtcblxuIFx0dmFyIGRlZmVycmVkTW9kdWxlcyA9IFtdO1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvclwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9sb2dcIjogXCIuL25vZGVfbW9kdWxlcy93ZWJwYWNrL2hvdC9sb2cuanNcIlxufTtcblxuXG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0dmFyIGlkID0gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSk7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKGlkKTtcbn1cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhtYXAsIHJlcSkpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIG1hcFtyZXFdO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi9ub2RlX21vZHVsZXMvd2VicGFjay9ob3Qgc3luYyBeXFxcXC5cXFxcL2xvZyRcIjsiLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IHsgUm91dGUgfSBmcm9tIFwicmVhY3Qtcm91dGVyXCI7XHJcbmltcG9ydCBMYXlvdXQgZnJvbSBcIi4vY29tcG9uZW50cy9MYXlvdXRcIjtcclxuaW1wb3J0IEhvbWUgZnJvbSBcIi4vY29tcG9uZW50cy9Ib21lXCI7XHJcbmltcG9ydCBDb3VudGVyIGZyb20gXCIuL2NvbXBvbmVudHMvQ291bnRlclwiO1xyXG5pbXBvcnQgRmV0Y2hEYXRhIGZyb20gXCIuL2NvbXBvbmVudHMvRmV0Y2hEYXRhXCI7XHJcblxyXG5pbXBvcnQgXCIuL21haW4uc2Nzc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKCkgPT4gKFxyXG4gIDxMYXlvdXQ+XHJcbiAgICA8Um91dGUgZXhhY3QgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0hvbWV9IC8+XHJcbiAgICA8Um91dGUgcGF0aD1cIi9jb3VudGVyXCIgY29tcG9uZW50PXtDb3VudGVyfSAvPlxyXG4gICAgPFJvdXRlIHBhdGg9XCIvZmV0Y2gtZGF0YS86c3RhcnREYXRlSW5kZXg/XCIgY29tcG9uZW50PXtGZXRjaERhdGF9IC8+XHJcbiAgPC9MYXlvdXQ+XHJcbik7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XHJcbmltcG9ydCB7IFJvdXRlQ29tcG9uZW50UHJvcHMgfSBmcm9tIFwicmVhY3Qtcm91dGVyXCI7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uU3RhdGUgfSBmcm9tIFwiLi4vc3RvcmVcIjtcclxuaW1wb3J0ICogYXMgQ291bnRlclN0b3JlIGZyb20gXCIuLi9zdG9yZS9Db3VudGVyXCI7XHJcblxyXG50eXBlIENvdW50ZXJQcm9wcyA9IENvdW50ZXJTdG9yZS5Db3VudGVyU3RhdGUgJlxyXG4gIHR5cGVvZiBDb3VudGVyU3RvcmUuYWN0aW9uQ3JlYXRvcnMgJlxyXG4gIFJvdXRlQ29tcG9uZW50UHJvcHM8e30+O1xyXG5cclxuY2xhc3MgQ291bnRlciBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8Q291bnRlclByb3BzPiB7XHJcbiAgcHVibGljIHJlbmRlcigpIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDw+XHJcbiAgICAgICAgPGgxPkNvdW50ZXI8L2gxPlxyXG5cclxuICAgICAgICA8cD5UaGlzIGlzIGEgc2ltcGxlIGV4YW1wbGUgb2YgYSBSZWFjdCBjb21wb25lbnQuPC9wPlxyXG5cclxuICAgICAgICA8cCBhcmlhLWxpdmU9XCJwb2xpdGVcIj5cclxuICAgICAgICAgIEN1cnJlbnQgY291bnQ6IDxzdHJvbmc+e3RoaXMucHJvcHMuY291bnR9PC9zdHJvbmc+XHJcbiAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBidG4tbGdcIlxyXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmluY3JlbWVudCgpO1xyXG4gICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICBJbmNyZW1lbnRcclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC8+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAoc3RhdGU6IEFwcGxpY2F0aW9uU3RhdGUpID0+IHN0YXRlLmNvdW50ZXIsXHJcbiAgQ291bnRlclN0b3JlLmFjdGlvbkNyZWF0b3JzXHJcbikoQ291bnRlcik7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgUm91dGVDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0LXJvdXRlcic7XHJcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJztcclxuaW1wb3J0IHsgQXBwbGljYXRpb25TdGF0ZSB9IGZyb20gJy4uL3N0b3JlJztcclxuaW1wb3J0ICogYXMgV2VhdGhlckZvcmVjYXN0c1N0b3JlIGZyb20gJy4uL3N0b3JlL1dlYXRoZXJGb3JlY2FzdHMnO1xyXG5cclxuLy8gQXQgcnVudGltZSwgUmVkdXggd2lsbCBtZXJnZSB0b2dldGhlci4uLlxyXG50eXBlIFdlYXRoZXJGb3JlY2FzdFByb3BzID1cclxuICBXZWF0aGVyRm9yZWNhc3RzU3RvcmUuV2VhdGhlckZvcmVjYXN0c1N0YXRlIC8vIC4uLiBzdGF0ZSB3ZSd2ZSByZXF1ZXN0ZWQgZnJvbSB0aGUgUmVkdXggc3RvcmVcclxuICAmIHR5cGVvZiBXZWF0aGVyRm9yZWNhc3RzU3RvcmUuYWN0aW9uQ3JlYXRvcnMgLy8gLi4uIHBsdXMgYWN0aW9uIGNyZWF0b3JzIHdlJ3ZlIHJlcXVlc3RlZFxyXG4gICYgUm91dGVDb21wb25lbnRQcm9wczx7IHN0YXJ0RGF0ZUluZGV4OiBzdHJpbmcgfT47IC8vIC4uLiBwbHVzIGluY29taW5nIHJvdXRpbmcgcGFyYW1ldGVyc1xyXG5cclxuXHJcbmNsYXNzIEZldGNoRGF0YSBleHRlbmRzIFJlYWN0LlB1cmVDb21wb25lbnQ8V2VhdGhlckZvcmVjYXN0UHJvcHM+IHtcclxuICAvLyBUaGlzIG1ldGhvZCBpcyBjYWxsZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGZpcnN0IGFkZGVkIHRvIHRoZSBkb2N1bWVudFxyXG4gIHB1YmxpYyBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIHRoaXMuZW5zdXJlRGF0YUZldGNoZWQoKTtcclxuICB9XHJcblxyXG4gIC8vIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCB3aGVuIHRoZSByb3V0ZSBwYXJhbWV0ZXJzIGNoYW5nZVxyXG4gIHB1YmxpYyBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICB0aGlzLmVuc3VyZURhdGFGZXRjaGVkKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPFJlYWN0LkZyYWdtZW50PlxyXG4gICAgICAgIDxoMSBpZD1cInRhYmVsTGFiZWxcIj5XZWF0aGVyIGZvcmVjYXN0PC9oMT5cclxuICAgICAgICA8cD5UaGlzIGNvbXBvbmVudCBkZW1vbnN0cmF0ZXMgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXIgYW5kIHdvcmtpbmcgd2l0aCBVUkwgcGFyYW1ldGVycy48L3A+XHJcbiAgICAgICAge3RoaXMucmVuZGVyRm9yZWNhc3RzVGFibGUoKX1cclxuICAgICAgICB7dGhpcy5yZW5kZXJQYWdpbmF0aW9uKCl9XHJcbiAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBlbnN1cmVEYXRhRmV0Y2hlZCgpIHtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZUluZGV4ID0gcGFyc2VJbnQodGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuc3RhcnREYXRlSW5kZXgsIDEwKSB8fCAwO1xyXG4gICAgdGhpcy5wcm9wcy5yZXF1ZXN0V2VhdGhlckZvcmVjYXN0cyhzdGFydERhdGVJbmRleCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlckZvcmVjYXN0c1RhYmxlKCkge1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPHRhYmxlIGNsYXNzTmFtZT0ndGFibGUgdGFibGUtc3RyaXBlZCcgYXJpYS1sYWJlbGxlZGJ5PVwidGFiZWxMYWJlbFwiPlxyXG4gICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgPHRoPkRhdGU8L3RoPlxyXG4gICAgICAgICAgICA8dGg+VGVtcC4gKEMpPC90aD5cclxuICAgICAgICAgICAgPHRoPlRlbXAuIChGKTwvdGg+XHJcbiAgICAgICAgICAgIDx0aD5TdW1tYXJ5PC90aD5cclxuICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgPC90aGVhZD5cclxuICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICB7dGhpcy5wcm9wcy5mb3JlY2FzdHMubWFwKChmb3JlY2FzdDogV2VhdGhlckZvcmVjYXN0c1N0b3JlLldlYXRoZXJGb3JlY2FzdCkgPT5cclxuICAgICAgICAgICAgPHRyIGtleT17Zm9yZWNhc3QuZGF0ZX0+XHJcbiAgICAgICAgICAgICAgPHRkPntmb3JlY2FzdC5kYXRlfTwvdGQ+XHJcbiAgICAgICAgICAgICAgPHRkPntmb3JlY2FzdC50ZW1wZXJhdHVyZUN9PC90ZD5cclxuICAgICAgICAgICAgICA8dGQ+e2ZvcmVjYXN0LnRlbXBlcmF0dXJlRn08L3RkPlxyXG4gICAgICAgICAgICAgIDx0ZD57Zm9yZWNhc3Quc3VtbWFyeX08L3RkPlxyXG4gICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L3Rib2R5PlxyXG4gICAgICA8L3RhYmxlPlxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyUGFnaW5hdGlvbigpIHtcclxuICAgIGNvbnN0IHByZXZTdGFydERhdGVJbmRleCA9ICh0aGlzLnByb3BzLnN0YXJ0RGF0ZUluZGV4IHx8IDApIC0gNTtcclxuICAgIGNvbnN0IG5leHRTdGFydERhdGVJbmRleCA9ICh0aGlzLnByb3BzLnN0YXJ0RGF0ZUluZGV4IHx8IDApICsgNTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxyXG4gICAgICAgIDxMaW5rIGNsYXNzTmFtZT0nYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20nIHRvPXtgL2ZldGNoLWRhdGEvJHtwcmV2U3RhcnREYXRlSW5kZXh9YH0+UHJldmlvdXM8L0xpbms+XHJcbiAgICAgICAge3RoaXMucHJvcHMuaXNMb2FkaW5nICYmIDxzcGFuPkxvYWRpbmcuLi48L3NwYW4+fVxyXG4gICAgICAgIDxMaW5rIGNsYXNzTmFtZT0nYnRuIGJ0bi1vdXRsaW5lLXNlY29uZGFyeSBidG4tc20nIHRvPXtgL2ZldGNoLWRhdGEvJHtuZXh0U3RhcnREYXRlSW5kZXh9YH0+TmV4dDwvTGluaz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcclxuICAoc3RhdGU6IEFwcGxpY2F0aW9uU3RhdGUpID0+IHN0YXRlLndlYXRoZXJGb3JlY2FzdHMsIC8vIFNlbGVjdHMgd2hpY2ggc3RhdGUgcHJvcGVydGllcyBhcmUgbWVyZ2VkIGludG8gdGhlIGNvbXBvbmVudCdzIHByb3BzXHJcbiAgV2VhdGhlckZvcmVjYXN0c1N0b3JlLmFjdGlvbkNyZWF0b3JzIC8vIFNlbGVjdHMgd2hpY2ggYWN0aW9uIGNyZWF0b3JzIGFyZSBtZXJnZWQgaW50byB0aGUgY29tcG9uZW50J3MgcHJvcHNcclxuKShGZXRjaERhdGEgYXMgYW55KTtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5cclxuY29uc3QgSG9tZSA9ICgpID0+IChcclxuICA8ZGl2PlxyXG4gICAgPGgxPkhlbGxvLCB3b3JsZCE8L2gxPlxyXG4gICAgPHA+V2VsY29tZSB0byB5b3VyIG5ldyBzaW5nbGUtcGFnZSBhcHBsaWNhdGlvbiwgYnVpbHQgd2l0aDo8L3A+XHJcbiAgICA8dWw+XHJcbiAgICAgIDxsaT48YSBocmVmPSdodHRwczovL2dldC5hc3AubmV0Lyc+QVNQLk5FVCBDb3JlPC9hPiBhbmQgPGEgaHJlZj0naHR0cHM6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS82N2VmOHNiZC5hc3B4Jz5DIzwvYT4gZm9yIGNyb3NzLXBsYXRmb3JtIHNlcnZlci1zaWRlIGNvZGU8L2xpPlxyXG4gICAgICA8bGk+PGEgaHJlZj0naHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvJz5SZWFjdDwvYT4gYW5kIDxhIGhyZWY9J2h0dHBzOi8vcmVkdXguanMub3JnLyc+UmVkdXg8L2E+IGZvciBjbGllbnQtc2lkZSBjb2RlPC9saT5cclxuICAgICAgPGxpPjxhIGhyZWY9J2h0dHA6Ly9nZXRib290c3RyYXAuY29tLyc+Qm9vdHN0cmFwPC9hPiBmb3IgbGF5b3V0IGFuZCBzdHlsaW5nPC9saT5cclxuICAgIDwvdWw+XHJcbiAgICA8cD5UbyBoZWxwIHlvdSBnZXQgc3RhcnRlZCwgd2UndmUgYWxzbyBzZXQgdXA6PC9wPlxyXG4gICAgPHVsPlxyXG4gICAgICA8bGk+PHN0cm9uZz5DbGllbnQtc2lkZSBuYXZpZ2F0aW9uPC9zdHJvbmc+LiBGb3IgZXhhbXBsZSwgY2xpY2sgPGVtPkNvdW50ZXI8L2VtPiB0aGVuIDxlbT5CYWNrPC9lbT4gdG8gcmV0dXJuIGhlcmUuPC9saT5cclxuICAgICAgPGxpPjxzdHJvbmc+RGV2ZWxvcG1lbnQgc2VydmVyIGludGVncmF0aW9uPC9zdHJvbmc+LiBJbiBkZXZlbG9wbWVudCBtb2RlLCB0aGUgZGV2ZWxvcG1lbnQgc2VydmVyIGZyb20gPGNvZGU+Y3JlYXRlLXJlYWN0LWFwcDwvY29kZT4gcnVucyBpbiB0aGUgYmFja2dyb3VuZCBhdXRvbWF0aWNhbGx5LCBzbyB5b3VyIGNsaWVudC1zaWRlIHJlc291cmNlcyBhcmUgZHluYW1pY2FsbHkgYnVpbHQgb24gZGVtYW5kIGFuZCB0aGUgcGFnZSByZWZyZXNoZXMgd2hlbiB5b3UgbW9kaWZ5IGFueSBmaWxlLjwvbGk+XHJcbiAgICAgIDxsaT48c3Ryb25nPkVmZmljaWVudCBwcm9kdWN0aW9uIGJ1aWxkczwvc3Ryb25nPi4gSW4gcHJvZHVjdGlvbiBtb2RlLCBkZXZlbG9wbWVudC10aW1lIGZlYXR1cmVzIGFyZSBkaXNhYmxlZCwgYW5kIHlvdXIgPGNvZGU+ZG90bmV0IHB1Ymxpc2g8L2NvZGU+IGNvbmZpZ3VyYXRpb24gcHJvZHVjZXMgbWluaWZpZWQsIGVmZmljaWVudGx5IGJ1bmRsZWQgSmF2YVNjcmlwdCBmaWxlcy48L2xpPlxyXG4gICAgPC91bD5cclxuICAgIDxwPlRoZSA8Y29kZT5DbGllbnRBcHA8L2NvZGU+IHN1YmRpcmVjdG9yeSBpcyBhIHN0YW5kYXJkIFJlYWN0IGFwcGxpY2F0aW9uIGJhc2VkIG9uIHRoZSA8Y29kZT5jcmVhdGUtcmVhY3QtYXBwPC9jb2RlPiB0ZW1wbGF0ZS4gSWYgeW91IG9wZW4gYSBjb21tYW5kIHByb21wdCBpbiB0aGF0IGRpcmVjdG9yeSwgeW91IGNhbiBydW4gPGNvZGU+bnBtPC9jb2RlPiBjb21tYW5kcyBzdWNoIGFzIDxjb2RlPm5wbSB0ZXN0PC9jb2RlPiBvciA8Y29kZT5ucG0gaW5zdGFsbDwvY29kZT4uPC9wPlxyXG4gIDwvZGl2PlxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgpKEhvbWUpO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IE5hdk1lbnUgZnJvbSBcIi4vTmF2TWVudVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgKHByb3BzOiB7IGNoaWxkcmVuPzogUmVhY3QuUmVhY3ROb2RlIH0pID0+IChcclxuICA8PlxyXG4gICAgPE5hdk1lbnUgLz5cclxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWFpbi1jb250YWluZXJcIj57cHJvcHMuY2hpbGRyZW59PC9kaXY+XHJcbiAgPC8+XHJcbik7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSBcInJlYWN0LXJvdXRlci1kb21cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdk1lbnUgZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFxyXG4gIHt9LFxyXG4gIHsgaXNPcGVuOiBib29sZWFuIH1cclxuPiB7XHJcbiAgcHVibGljIHN0YXRlID0ge1xyXG4gICAgaXNPcGVuOiBmYWxzZVxyXG4gIH07XHJcblxyXG4gIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICByZXR1cm4gPGhlYWRlcj48L2hlYWRlcj47XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHRvZ2dsZSA9ICgpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICBpc09wZW46ICF0aGlzLnN0YXRlLmlzT3BlblxyXG4gICAgfSk7XHJcbiAgfTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0ICogYXMgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiO1xyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgeyBDb25uZWN0ZWRSb3V0ZXIgfSBmcm9tIFwiY29ubmVjdGVkLXJlYWN0LXJvdXRlclwiO1xyXG5pbXBvcnQgeyBjcmVhdGVCcm93c2VySGlzdG9yeSB9IGZyb20gXCJoaXN0b3J5XCI7XHJcbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tIFwiLi9zdG9yZS9jb25maWd1cmVTdG9yZVwiO1xyXG5pbXBvcnQgQXBwIGZyb20gXCIuL0FwcFwiO1xyXG5cclxuLy8gQ3JlYXRlIGJyb3dzZXIgaGlzdG9yeSB0byB1c2UgaW4gdGhlIFJlZHV4IHN0b3JlXHJcbmNvbnN0IGJhc2VVcmwgPSBkb2N1bWVudFxyXG4gIC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJhc2VcIilbMF1cclxuICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSBhcyBzdHJpbmc7XHJcbmNvbnN0IGhpc3RvcnkgPSBjcmVhdGVCcm93c2VySGlzdG9yeSh7IGJhc2VuYW1lOiBiYXNlVXJsIH0pO1xyXG5cclxuLy8gR2V0IHRoZSBhcHBsaWNhdGlvbi13aWRlIHN0b3JlIGluc3RhbmNlLCBwcmVwb3B1bGF0aW5nIHdpdGggc3RhdGUgZnJvbSB0aGUgc2VydmVyIHdoZXJlIGF2YWlsYWJsZS5cclxuY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZShoaXN0b3J5KTtcclxuXHJcblJlYWN0RE9NLnJlbmRlcihcclxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgIDxDb25uZWN0ZWRSb3V0ZXIgaGlzdG9yeT17aGlzdG9yeX0+XHJcbiAgICAgIDxBcHAgLz5cclxuICAgIDwvQ29ubmVjdGVkUm91dGVyPlxyXG4gIDwvUHJvdmlkZXI+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKVxyXG4pO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgeyBBY3Rpb24sIFJlZHVjZXIgfSBmcm9tIFwicmVkdXhcIjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIFNUQVRFIC0gVGhpcyBkZWZpbmVzIHRoZSB0eXBlIG9mIGRhdGEgbWFpbnRhaW5lZCBpbiB0aGUgUmVkdXggc3RvcmUuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIENvdW50ZXJTdGF0ZSB7XHJcbiAgY291bnQ6IG51bWJlcjtcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQUNUSU9OUyAtIFRoZXNlIGFyZSBzZXJpYWxpemFibGUgKGhlbmNlIHJlcGxheWFibGUpIGRlc2NyaXB0aW9ucyBvZiBzdGF0ZSB0cmFuc2l0aW9ucy5cclxuLy8gVGhleSBkbyBub3QgdGhlbXNlbHZlcyBoYXZlIGFueSBzaWRlLWVmZmVjdHM7IHRoZXkganVzdCBkZXNjcmliZSBzb21ldGhpbmcgdGhhdCBpcyBnb2luZyB0byBoYXBwZW4uXHJcbi8vIFVzZSBAdHlwZU5hbWUgYW5kIGlzQWN0aW9uVHlwZSBmb3IgdHlwZSBkZXRlY3Rpb24gdGhhdCB3b3JrcyBldmVuIGFmdGVyIHNlcmlhbGl6YXRpb24vZGVzZXJpYWxpemF0aW9uLlxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJbmNyZW1lbnRDb3VudEFjdGlvbiB7XHJcbiAgdHlwZTogXCJJTkNSRU1FTlRfQ09VTlRcIjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIERlY3JlbWVudENvdW50QWN0aW9uIHtcclxuICB0eXBlOiBcIkRFQ1JFTUVOVF9DT1VOVFwiO1xyXG59XHJcblxyXG4vLyBEZWNsYXJlIGEgJ2Rpc2NyaW1pbmF0ZWQgdW5pb24nIHR5cGUuIFRoaXMgZ3VhcmFudGVlcyB0aGF0IGFsbCByZWZlcmVuY2VzIHRvICd0eXBlJyBwcm9wZXJ0aWVzIGNvbnRhaW4gb25lIG9mIHRoZVxyXG4vLyBkZWNsYXJlZCB0eXBlIHN0cmluZ3MgKGFuZCBub3QgYW55IG90aGVyIGFyYml0cmFyeSBzdHJpbmcpLlxyXG5leHBvcnQgdHlwZSBLbm93bkFjdGlvbiA9IEluY3JlbWVudENvdW50QWN0aW9uIHwgRGVjcmVtZW50Q291bnRBY3Rpb247XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEFDVElPTiBDUkVBVE9SUyAtIFRoZXNlIGFyZSBmdW5jdGlvbnMgZXhwb3NlZCB0byBVSSBjb21wb25lbnRzIHRoYXQgd2lsbCB0cmlnZ2VyIGEgc3RhdGUgdHJhbnNpdGlvbi5cclxuLy8gVGhleSBkb24ndCBkaXJlY3RseSBtdXRhdGUgc3RhdGUsIGJ1dCB0aGV5IGNhbiBoYXZlIGV4dGVybmFsIHNpZGUtZWZmZWN0cyAoc3VjaCBhcyBsb2FkaW5nIGRhdGEpLlxyXG5cclxuZXhwb3J0IGNvbnN0IGFjdGlvbkNyZWF0b3JzID0ge1xyXG4gIGluY3JlbWVudDogKCkgPT4gKHsgdHlwZTogXCJJTkNSRU1FTlRfQ09VTlRcIiB9IGFzIEluY3JlbWVudENvdW50QWN0aW9uKSxcclxuICBkZWNyZW1lbnQ6ICgpID0+ICh7IHR5cGU6IFwiREVDUkVNRU5UX0NPVU5UXCIgfSBhcyBEZWNyZW1lbnRDb3VudEFjdGlvbilcclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuLy8gUkVEVUNFUiAtIEZvciBhIGdpdmVuIHN0YXRlIGFuZCBhY3Rpb24sIHJldHVybnMgdGhlIG5ldyBzdGF0ZS4gVG8gc3VwcG9ydCB0aW1lIHRyYXZlbCwgdGhpcyBtdXN0IG5vdCBtdXRhdGUgdGhlIG9sZCBzdGF0ZS5cclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyOiBSZWR1Y2VyPENvdW50ZXJTdGF0ZT4gPSAoXHJcbiAgc3RhdGU6IENvdW50ZXJTdGF0ZSB8IHVuZGVmaW5lZCxcclxuICBpbmNvbWluZ0FjdGlvbjogQWN0aW9uXHJcbik6IENvdW50ZXJTdGF0ZSA9PiB7XHJcbiAgaWYgKHN0YXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiB7IGNvdW50OiAwIH07XHJcbiAgfVxyXG5cclxuICBjb25zdCBhY3Rpb24gPSBpbmNvbWluZ0FjdGlvbiBhcyBLbm93bkFjdGlvbjtcclxuICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICBjYXNlIFwiSU5DUkVNRU5UX0NPVU5UXCI6XHJcbiAgICAgIHJldHVybiB7IGNvdW50OiBzdGF0ZS5jb3VudCArIDEgfTtcclxuICAgIGNhc2UgXCJERUNSRU1FTlRfQ09VTlRcIjpcclxuICAgICAgcmV0dXJuIHsgY291bnQ6IHN0YXRlLmNvdW50IC0gMSB9O1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufTtcclxuIiwiaW1wb3J0IHsgQWN0aW9uLCBSZWR1Y2VyIH0gZnJvbSBcInJlZHV4XCI7XHJcbmltcG9ydCB7IEFwcFRodW5rQWN0aW9uIH0gZnJvbSBcIi4vXCI7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBTVEFURSAtIFRoaXMgZGVmaW5lcyB0aGUgdHlwZSBvZiBkYXRhIG1haW50YWluZWQgaW4gdGhlIFJlZHV4IHN0b3JlLlxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBXZWF0aGVyRm9yZWNhc3RzU3RhdGUge1xyXG4gIGlzTG9hZGluZzogYm9vbGVhbjtcclxuICBzdGFydERhdGVJbmRleD86IG51bWJlcjtcclxuICBmb3JlY2FzdHM6IFdlYXRoZXJGb3JlY2FzdFtdO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFdlYXRoZXJGb3JlY2FzdCB7XHJcbiAgZGF0ZTogc3RyaW5nO1xyXG4gIHRlbXBlcmF0dXJlQzogbnVtYmVyO1xyXG4gIHRlbXBlcmF0dXJlRjogbnVtYmVyO1xyXG4gIHN1bW1hcnk6IHN0cmluZztcclxufVxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQUNUSU9OUyAtIFRoZXNlIGFyZSBzZXJpYWxpemFibGUgKGhlbmNlIHJlcGxheWFibGUpIGRlc2NyaXB0aW9ucyBvZiBzdGF0ZSB0cmFuc2l0aW9ucy5cclxuLy8gVGhleSBkbyBub3QgdGhlbXNlbHZlcyBoYXZlIGFueSBzaWRlLWVmZmVjdHM7IHRoZXkganVzdCBkZXNjcmliZSBzb21ldGhpbmcgdGhhdCBpcyBnb2luZyB0byBoYXBwZW4uXHJcblxyXG5pbnRlcmZhY2UgUmVxdWVzdFdlYXRoZXJGb3JlY2FzdHNBY3Rpb24ge1xyXG4gIHR5cGU6IFwiUkVRVUVTVF9XRUFUSEVSX0ZPUkVDQVNUU1wiO1xyXG4gIHN0YXJ0RGF0ZUluZGV4OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBSZWNlaXZlV2VhdGhlckZvcmVjYXN0c0FjdGlvbiB7XHJcbiAgdHlwZTogXCJSRUNFSVZFX1dFQVRIRVJfRk9SRUNBU1RTXCI7XHJcbiAgc3RhcnREYXRlSW5kZXg6IG51bWJlcjtcclxuICBmb3JlY2FzdHM6IFdlYXRoZXJGb3JlY2FzdFtdO1xyXG59XHJcblxyXG4vLyBEZWNsYXJlIGEgJ2Rpc2NyaW1pbmF0ZWQgdW5pb24nIHR5cGUuIFRoaXMgZ3VhcmFudGVlcyB0aGF0IGFsbCByZWZlcmVuY2VzIHRvICd0eXBlJyBwcm9wZXJ0aWVzIGNvbnRhaW4gb25lIG9mIHRoZVxyXG4vLyBkZWNsYXJlZCB0eXBlIHN0cmluZ3MgKGFuZCBub3QgYW55IG90aGVyIGFyYml0cmFyeSBzdHJpbmcpLlxyXG50eXBlIEtub3duQWN0aW9uID1cclxuICB8IFJlcXVlc3RXZWF0aGVyRm9yZWNhc3RzQWN0aW9uXHJcbiAgfCBSZWNlaXZlV2VhdGhlckZvcmVjYXN0c0FjdGlvbjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQUNUSU9OIENSRUFUT1JTIC0gVGhlc2UgYXJlIGZ1bmN0aW9ucyBleHBvc2VkIHRvIFVJIGNvbXBvbmVudHMgdGhhdCB3aWxsIHRyaWdnZXIgYSBzdGF0ZSB0cmFuc2l0aW9uLlxyXG4vLyBUaGV5IGRvbid0IGRpcmVjdGx5IG11dGF0ZSBzdGF0ZSwgYnV0IHRoZXkgY2FuIGhhdmUgZXh0ZXJuYWwgc2lkZS1lZmZlY3RzIChzdWNoIGFzIGxvYWRpbmcgZGF0YSkuXHJcblxyXG5leHBvcnQgY29uc3QgYWN0aW9uQ3JlYXRvcnMgPSB7XHJcbiAgcmVxdWVzdFdlYXRoZXJGb3JlY2FzdHM6IChcclxuICAgIHN0YXJ0RGF0ZUluZGV4OiBudW1iZXJcclxuICApOiBBcHBUaHVua0FjdGlvbjxLbm93bkFjdGlvbj4gPT4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xyXG4gICAgLy8gT25seSBsb2FkIGRhdGEgaWYgaXQncyBzb21ldGhpbmcgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIChhbmQgYXJlIG5vdCBhbHJlYWR5IGxvYWRpbmcpXHJcbiAgICBjb25zdCBhcHBTdGF0ZSA9IGdldFN0YXRlKCk7XHJcbiAgICBpZiAoXHJcbiAgICAgIGFwcFN0YXRlICYmXHJcbiAgICAgIGFwcFN0YXRlLndlYXRoZXJGb3JlY2FzdHMgJiZcclxuICAgICAgc3RhcnREYXRlSW5kZXggIT09IGFwcFN0YXRlLndlYXRoZXJGb3JlY2FzdHMuc3RhcnREYXRlSW5kZXhcclxuICAgICkge1xyXG4gICAgICBmZXRjaChgd2VhdGhlcmZvcmVjYXN0YClcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkgYXMgUHJvbWlzZTxXZWF0aGVyRm9yZWNhc3RbXT4pXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUkVDRUlWRV9XRUFUSEVSX0ZPUkVDQVNUU1wiLFxyXG4gICAgICAgICAgICBzdGFydERhdGVJbmRleDogc3RhcnREYXRlSW5kZXgsXHJcbiAgICAgICAgICAgIGZvcmVjYXN0czogZGF0YVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICBkaXNwYXRjaCh7XHJcbiAgICAgICAgdHlwZTogXCJSRVFVRVNUX1dFQVRIRVJfRk9SRUNBU1RTXCIsXHJcbiAgICAgICAgc3RhcnREYXRlSW5kZXg6IHN0YXJ0RGF0ZUluZGV4XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS1cclxuLy8gUkVEVUNFUiAtIEZvciBhIGdpdmVuIHN0YXRlIGFuZCBhY3Rpb24sIHJldHVybnMgdGhlIG5ldyBzdGF0ZS4gVG8gc3VwcG9ydCB0aW1lIHRyYXZlbCwgdGhpcyBtdXN0IG5vdCBtdXRhdGUgdGhlIG9sZCBzdGF0ZS5cclxuXHJcbmNvbnN0IHVubG9hZGVkU3RhdGU6IFdlYXRoZXJGb3JlY2FzdHNTdGF0ZSA9IHtcclxuICBmb3JlY2FzdHM6IFtdLFxyXG4gIGlzTG9hZGluZzogZmFsc2VcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWR1Y2VyOiBSZWR1Y2VyPFdlYXRoZXJGb3JlY2FzdHNTdGF0ZT4gPSAoXHJcbiAgc3RhdGU6IFdlYXRoZXJGb3JlY2FzdHNTdGF0ZSB8IHVuZGVmaW5lZCxcclxuICBpbmNvbWluZ0FjdGlvbjogQWN0aW9uXHJcbik6IFdlYXRoZXJGb3JlY2FzdHNTdGF0ZSA9PiB7XHJcbiAgaWYgKHN0YXRlID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiB1bmxvYWRlZFN0YXRlO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgYWN0aW9uID0gaW5jb21pbmdBY3Rpb24gYXMgS25vd25BY3Rpb247XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgY2FzZSBcIlJFUVVFU1RfV0VBVEhFUl9GT1JFQ0FTVFNcIjpcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBzdGFydERhdGVJbmRleDogYWN0aW9uLnN0YXJ0RGF0ZUluZGV4LFxyXG4gICAgICAgIGZvcmVjYXN0czogc3RhdGUuZm9yZWNhc3RzLFxyXG4gICAgICAgIGlzTG9hZGluZzogdHJ1ZVxyXG4gICAgICB9O1xyXG4gICAgY2FzZSBcIlJFQ0VJVkVfV0VBVEhFUl9GT1JFQ0FTVFNcIjpcclxuICAgICAgLy8gT25seSBhY2NlcHQgdGhlIGluY29taW5nIGRhdGEgaWYgaXQgbWF0Y2hlcyB0aGUgbW9zdCByZWNlbnQgcmVxdWVzdC4gVGhpcyBlbnN1cmVzIHdlIGNvcnJlY3RseVxyXG4gICAgICAvLyBoYW5kbGUgb3V0LW9mLW9yZGVyIHJlc3BvbnNlcy5cclxuICAgICAgaWYgKGFjdGlvbi5zdGFydERhdGVJbmRleCA9PT0gc3RhdGUuc3RhcnREYXRlSW5kZXgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgc3RhcnREYXRlSW5kZXg6IGFjdGlvbi5zdGFydERhdGVJbmRleCxcclxuICAgICAgICAgIGZvcmVjYXN0czogYWN0aW9uLmZvcmVjYXN0cyxcclxuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN0YXRlO1xyXG59O1xyXG4iLCJpbXBvcnQgeyBhcHBseU1pZGRsZXdhcmUsIGNvbWJpbmVSZWR1Y2VycywgY29tcG9zZSwgY3JlYXRlU3RvcmUgfSBmcm9tIFwicmVkdXhcIjtcclxuaW1wb3J0IHRodW5rIGZyb20gXCJyZWR1eC10aHVua1wiO1xyXG5pbXBvcnQgeyBjb25uZWN0Um91dGVyLCByb3V0ZXJNaWRkbGV3YXJlIH0gZnJvbSBcImNvbm5lY3RlZC1yZWFjdC1yb3V0ZXJcIjtcclxuaW1wb3J0IHsgSGlzdG9yeSB9IGZyb20gXCJoaXN0b3J5XCI7XHJcbmltcG9ydCB7IEFwcGxpY2F0aW9uU3RhdGUsIHJlZHVjZXJzIH0gZnJvbSBcIi4vXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb25maWd1cmVTdG9yZShcclxuICBoaXN0b3J5OiBIaXN0b3J5LFxyXG4gIGluaXRpYWxTdGF0ZT86IEFwcGxpY2F0aW9uU3RhdGVcclxuKSB7XHJcbiAgY29uc3QgbWlkZGxld2FyZSA9IFt0aHVuaywgcm91dGVyTWlkZGxld2FyZShoaXN0b3J5KV07XHJcblxyXG4gIGNvbnN0IHJvb3RSZWR1Y2VyID0gY29tYmluZVJlZHVjZXJzKHtcclxuICAgIC4uLnJlZHVjZXJzLFxyXG4gICAgcm91dGVyOiBjb25uZWN0Um91dGVyKGhpc3RvcnkpXHJcbiAgfSk7XHJcblxyXG4gIGNvbnN0IGVuaGFuY2VycyA9IFtdO1xyXG4gIGNvbnN0IHdpbmRvd0lmRGVmaW5lZCA9XHJcbiAgICB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiID8gbnVsbCA6ICh3aW5kb3cgYXMgYW55KTtcclxuICBpZiAod2luZG93SWZEZWZpbmVkICYmIHdpbmRvd0lmRGVmaW5lZC5fX1JFRFVYX0RFVlRPT0xTX0VYVEVOU0lPTl9fKSB7XHJcbiAgICBlbmhhbmNlcnMucHVzaCh3aW5kb3dJZkRlZmluZWQuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXygpKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjcmVhdGVTdG9yZShcclxuICAgIHJvb3RSZWR1Y2VyLFxyXG4gICAgaW5pdGlhbFN0YXRlLFxyXG4gICAgY29tcG9zZShhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSksIC4uLmVuaGFuY2VycylcclxuICApO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIFdlYXRoZXJGb3JlY2FzdHMgZnJvbSBcIi4vV2VhdGhlckZvcmVjYXN0c1wiO1xyXG5pbXBvcnQgKiBhcyBDb3VudGVyIGZyb20gXCIuL0NvdW50ZXJcIjtcclxuXHJcbi8vIFRoZSB0b3AtbGV2ZWwgc3RhdGUgb2JqZWN0XHJcbmV4cG9ydCBpbnRlcmZhY2UgQXBwbGljYXRpb25TdGF0ZSB7XHJcbiAgY291bnRlcjogQ291bnRlci5Db3VudGVyU3RhdGUgfCB1bmRlZmluZWQ7XHJcbiAgd2VhdGhlckZvcmVjYXN0czogV2VhdGhlckZvcmVjYXN0cy5XZWF0aGVyRm9yZWNhc3RzU3RhdGUgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbi8vIFdoZW5ldmVyIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLCBSZWR1eCB3aWxsIHVwZGF0ZSBlYWNoIHRvcC1sZXZlbCBhcHBsaWNhdGlvbiBzdGF0ZSBwcm9wZXJ0eSB1c2luZ1xyXG4vLyB0aGUgcmVkdWNlciB3aXRoIHRoZSBtYXRjaGluZyBuYW1lLiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZSBuYW1lcyBtYXRjaCBleGFjdGx5LCBhbmQgdGhhdCB0aGUgcmVkdWNlclxyXG4vLyBhY3RzIG9uIHRoZSBjb3JyZXNwb25kaW5nIEFwcGxpY2F0aW9uU3RhdGUgcHJvcGVydHkgdHlwZS5cclxuZXhwb3J0IGNvbnN0IHJlZHVjZXJzID0ge1xyXG4gIGNvdW50ZXI6IENvdW50ZXIucmVkdWNlcixcclxuICB3ZWF0aGVyRm9yZWNhc3RzOiBXZWF0aGVyRm9yZWNhc3RzLnJlZHVjZXJcclxufTtcclxuXHJcbi8vIFRoaXMgdHlwZSBjYW4gYmUgdXNlZCBhcyBhIGhpbnQgb24gYWN0aW9uIGNyZWF0b3JzIHNvIHRoYXQgaXRzICdkaXNwYXRjaCcgYW5kICdnZXRTdGF0ZScgcGFyYW1zIGFyZVxyXG4vLyBjb3JyZWN0bHkgdHlwZWQgdG8gbWF0Y2ggeW91ciBzdG9yZS5cclxuZXhwb3J0IGludGVyZmFjZSBBcHBUaHVua0FjdGlvbjxUQWN0aW9uPiB7XHJcbiAgKGRpc3BhdGNoOiAoYWN0aW9uOiBUQWN0aW9uKSA9PiB2b2lkLCBnZXRTdGF0ZTogKCkgPT4gQXBwbGljYXRpb25TdGF0ZSk6IHZvaWQ7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==