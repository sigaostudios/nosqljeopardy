webpackJsonp([2,4],{

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GameService = (function () {
    function GameService(http) {
        this.http = http;
        this.gamesUrl = 'http://localhost:2475/api/questions/';
    }
    GameService.prototype.getGame = function (showNumber, round) {
        var url = this.gamesUrl + '?showNumber=' + String(showNumber) + '&round=' + encodeURI(round);
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
        //return Promise.resolve(MOCK_BOARD);
    };
    GameService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    GameService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], GameService);
    return GameService;
    var _a;
}());
//# sourceMappingURL=D:/Users/ChristopherSims/Source/SqlSaturday/NoSqlJeopardy-Client/src/game.service.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SearchService = (function () {
    function SearchService(http) {
        this.http = http;
        this.searchKey = "E0F403E6B9C1174623A0E98D43D00052";
        this.searchBaseUrl = "https://cs-sqlsaturday-search.search.windows.net/indexes/jeopardy/docs?api-version=2016-09-01";
    }
    SearchService.prototype.getSearchResults = function (searchString, airDateStart, airDateEnd, showJeopardy, showDoubleJeopardy, showFinalJeopardy) {
        var searchUrl = this.buildSearchUrl(searchString, airDateStart, airDateEnd, showJeopardy, showDoubleJeopardy, showFinalJeopardy);
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]();
        this.addAuthorizationHeader(headers);
        return this.http.get(searchUrl, {
            headers: headers
        })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    SearchService.prototype.buildSearchUrl = function (searchString, airDateStart, airDateEnd, showJeopardy, showDoubleJeopardy, showFinalJeopardy) {
        console.log(this.formatDate(airDateStart));
        var searchFilter = "&search=" + searchString + "&facet=Round&facet=Category";
        var airDateFilter = "AirDate ge " + this.formatDate(airDateStart) + " and AirDate le " + this.formatDate(airDateEnd);
        //add airDateFilter
        searchFilter = searchFilter + "&$filter=" + airDateFilter + " and (" + this.formatRoundFilter(showJeopardy, showDoubleJeopardy, showFinalJeopardy) + ")";
        console.log(this.searchBaseUrl + searchFilter);
        return this.searchBaseUrl + encodeURI(searchFilter);
    };
    SearchService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    SearchService.prototype.addAuthorizationHeader = function (headers) {
        headers.append('api-key', this.searchKey);
    };
    SearchService.prototype.formatDate = function (date) {
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var monthStr;
        var dayStr;
        if (month < 10)
            monthStr = "0" + month.toString();
        else
            monthStr = month.toString();
        if (day < 10)
            dayStr = "0" + day.toString();
        else
            dayStr = day.toString();
        return date.getFullYear().toString() + "-" + monthStr + "-" + dayStr + "T00:00:00-08:00";
    };
    SearchService.prototype.formatRoundFilter = function (showJeopardy, showDoubleJeopardy, showFinalJeopardy) {
        var roundFilter = "";
        if (showJeopardy)
            roundFilter = "Round eq 'Jeopardy!'";
        if (showDoubleJeopardy)
            if (showJeopardy)
                roundFilter = roundFilter + " or Round eq 'Double Jeopardy!'";
            else
                roundFilter = "Round eq 'Double Jeopardy!'";
        if (showFinalJeopardy)
            if (showJeopardy || showDoubleJeopardy)
                roundFilter = roundFilter + " or Round eq 'Final Jeopardy!'";
            else
                roundFilter = "Round eq 'Final Jeopardy!'";
        return roundFilter;
    };
    SearchService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object])
    ], SearchService);
    return SearchService;
    var _a;
}());
//# sourceMappingURL=D:/Users/ChristopherSims/Source/SqlSaturday/NoSqlJeopardy-Client/src/search.service.js.map

/***/ }),

/***/ 586:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 586;


/***/ }),

/***/ 587:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_app_module__ = __webpack_require__(708);




if (__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_3__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=D:/Users/ChristopherSims/Source/SqlSaturday/NoSqlJeopardy-Client/src/main.js.map

/***/ }),

/***/ 707:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'NoSQL Jeopardy! ';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(896),
            styles: [__webpack_require__(893)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=D:/Users/ChristopherSims/Source/SqlSaturday/NoSqlJeopardy-Client/src/app.component.js.map

/***/ }),

/***/ 708:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__game_game_component__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__search_search_component__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_game_service__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_search_service__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_bootstrap__ = __webpack_require__(535);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__swimlane_ngx_datatable__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__swimlane_ngx_datatable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__swimlane_ngx_datatable__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__game_game_component__["a" /* GameComponent */],
                __WEBPACK_IMPORTED_MODULE_7__search_search_component__["a" /* SearchComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_11__swimlane_ngx_datatable__["NgxDatatableModule"],
                __WEBPACK_IMPORTED_MODULE_10_ng2_bootstrap__["a" /* DatepickerModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10_ng2_bootstrap__["b" /* AlertModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot([
                    {
                        path: '',
                        redirectTo: '/game',
                        pathMatch: 'full'
                    },
                    {
                        path: 'game',
                        component: __WEBPACK_IMPORTED_MODULE_6__game_game_component__["a" /* GameComponent */]
                    },
                    {
                        path: 'search',
                        component: __WEBPACK_IMPORTED_MODULE_7__search_search_component__["a" /* SearchComponent */]
                    }
                ]),
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__services_game_service__["a" /* GameService */],
                __WEBPACK_IMPORTED_MODULE_9__services_search_service__["a" /* SearchService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=D:/Users/ChristopherSims/Source/SqlSaturday/NoSqlJeopardy-Client/src/app.module.js.map

/***/ }),

/***/ 709:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_game_service__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jeopardy_board__ = __webpack_require__(710);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GameComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GameComponent = (function () {
    function GameComponent(gameService) {
        this.gameService = gameService;
        this.board = new __WEBPACK_IMPORTED_MODULE_2__jeopardy_board__["a" /* JeopardyBoard */]();
    }
    GameComponent.prototype.ngOnInit = function () {
        this.showNumberField = 4680;
        this.roundField = 'Jeopardy!';
        this.getBoard();
    };
    GameComponent.prototype.getBoard = function () {
        var _this = this;
        this.gameService.getGame(this.showNumberField, this.roundField).then(function (boardV) { _this.board = boardV; console.log(boardV); });
    };
    GameComponent.prototype.setCurrentQuestion = function (question) {
        this.currentQuestion = question;
    };
    GameComponent.prototype.clearCurrentQuestion = function () {
        this.currentQuestion = undefined;
    };
    GameComponent.prototype.updateShow = function () {
        this.getBoard();
    };
    GameComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-game',
            template: __webpack_require__(897),
            styles: [__webpack_require__(894)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_game_service__["a" /* GameService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_game_service__["a" /* GameService */]) === 'function' && _a) || Object])
    ], GameComponent);
    return GameComponent;
    var _a;
}());
//# sourceMappingURL=D:/Users/ChristopherSims/Source/SqlSaturday/NoSqlJeopardy-Client/src/game.component.js.map

/***/ }),

/***/ 710:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JeopardyBoard; });
var JeopardyBoard = (function () {
    function JeopardyBoard() {
    }
    return JeopardyBoard;
}());
//# sourceMappingURL=D:/Users/ChristopherSims/Source/SqlSaturday/NoSqlJeopardy-Client/src/jeopardy-board.js.map

/***/ }),

/***/ 711:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_search_service__ = __webpack_require__(365);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchComponent = (function () {
    function SearchComponent(searchService) {
        this.searchService = searchService;
        this.searchResults = { value: [] };
        this.searchString = "";
        this.airDateStart = new Date(1990, 0, 1);
        this.airDateEnd = new Date();
        this.jeopardy = true;
        this.doubleJeopardy = true;
        this.finalJeopardy = true;
        this.columns = [
            { name: "Show Number", prop: "ShowNumber" },
            { name: "Air Date", prop: "AirDate" },
            { name: "Round", prop: "Round" },
            { name: "Category", prop: "Category" },
            { name: "Value", prop: "Value" },
            { name: "Question", prop: "Question" },
            { name: "Answer", prop: "Answer" }
        ];
        this.configureGridOptions();
    }
    SearchComponent.prototype.ngOnInit = function () {
        this.getSearchResults();
    };
    SearchComponent.prototype.getSearchResults = function () {
        var _this = this;
        this.searchService.getSearchResults(this.searchString, this.airDateStart, this.airDateEnd, this.jeopardy, this.doubleJeopardy, this.finalJeopardy).then(function (results) {
            _this.searchResults = results;
        });
    };
    SearchComponent.prototype.configureGridOptions = function () {
        // this.gridOptions = {};
        // this.gridOptions.enableSorting = true;
        // this.gridOptions.enableColResize = true;
        // this.gridOptions.rowData = this.searchResults.value;
        // this.gridOptions.columnDefs = [
        //   {
        //     headerName: "Show Number",
        //     field: "ShowNumber",
        //     width: 100
        //   },
        //   {
        //     headerName: "Air Date",
        //     field: "AirDate",
        //     width: 100
        //   },
        //   {
        //     headerName: "Round",
        //     field: "Round",
        //     width: 100
        //   },
        //   {
        //     headerName: "Category",
        //     field: "Category",
        //     width: 100
        //   },
        //   {
        //     headerName: "Value",
        //     field: "Value",
        //     width: 50
        //   },
        //   {
        //     headerName: "Question",
        //     field: "Question",
        //     width: 450
        //   },
        //   {
        //     headerName: "Answer",
        //     field: "Answer",
        //     width: 200
        //   }
        // ];
    };
    SearchComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-search',
            template: __webpack_require__(898),
            styles: [__webpack_require__(895)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_search_service__["a" /* SearchService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_search_service__["a" /* SearchService */]) === 'function' && _a) || Object])
    ], SearchComponent);
    return SearchComponent;
    var _a;
}());
//# sourceMappingURL=D:/Users/ChristopherSims/Source/SqlSaturday/NoSqlJeopardy-Client/src/search.component.js.map

/***/ }),

/***/ 712:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=D:/Users/ChristopherSims/Source/SqlSaturday/NoSqlJeopardy-Client/src/environment.js.map

/***/ }),

/***/ 870:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 405,
	"./af.js": 405,
	"./ar": 411,
	"./ar-dz": 406,
	"./ar-dz.js": 406,
	"./ar-ly": 407,
	"./ar-ly.js": 407,
	"./ar-ma": 408,
	"./ar-ma.js": 408,
	"./ar-sa": 409,
	"./ar-sa.js": 409,
	"./ar-tn": 410,
	"./ar-tn.js": 410,
	"./ar.js": 411,
	"./az": 412,
	"./az.js": 412,
	"./be": 413,
	"./be.js": 413,
	"./bg": 414,
	"./bg.js": 414,
	"./bn": 415,
	"./bn.js": 415,
	"./bo": 416,
	"./bo.js": 416,
	"./br": 417,
	"./br.js": 417,
	"./bs": 418,
	"./bs.js": 418,
	"./ca": 419,
	"./ca.js": 419,
	"./cs": 420,
	"./cs.js": 420,
	"./cv": 421,
	"./cv.js": 421,
	"./cy": 422,
	"./cy.js": 422,
	"./da": 423,
	"./da.js": 423,
	"./de": 425,
	"./de-at": 424,
	"./de-at.js": 424,
	"./de.js": 425,
	"./dv": 426,
	"./dv.js": 426,
	"./el": 427,
	"./el.js": 427,
	"./en-au": 428,
	"./en-au.js": 428,
	"./en-ca": 429,
	"./en-ca.js": 429,
	"./en-gb": 430,
	"./en-gb.js": 430,
	"./en-ie": 431,
	"./en-ie.js": 431,
	"./en-nz": 432,
	"./en-nz.js": 432,
	"./eo": 433,
	"./eo.js": 433,
	"./es": 435,
	"./es-do": 434,
	"./es-do.js": 434,
	"./es.js": 435,
	"./et": 436,
	"./et.js": 436,
	"./eu": 437,
	"./eu.js": 437,
	"./fa": 438,
	"./fa.js": 438,
	"./fi": 439,
	"./fi.js": 439,
	"./fo": 440,
	"./fo.js": 440,
	"./fr": 443,
	"./fr-ca": 441,
	"./fr-ca.js": 441,
	"./fr-ch": 442,
	"./fr-ch.js": 442,
	"./fr.js": 443,
	"./fy": 444,
	"./fy.js": 444,
	"./gd": 445,
	"./gd.js": 445,
	"./gl": 446,
	"./gl.js": 446,
	"./he": 447,
	"./he.js": 447,
	"./hi": 448,
	"./hi.js": 448,
	"./hr": 449,
	"./hr.js": 449,
	"./hu": 450,
	"./hu.js": 450,
	"./hy-am": 451,
	"./hy-am.js": 451,
	"./id": 452,
	"./id.js": 452,
	"./is": 453,
	"./is.js": 453,
	"./it": 454,
	"./it.js": 454,
	"./ja": 455,
	"./ja.js": 455,
	"./jv": 456,
	"./jv.js": 456,
	"./ka": 457,
	"./ka.js": 457,
	"./kk": 458,
	"./kk.js": 458,
	"./km": 459,
	"./km.js": 459,
	"./ko": 460,
	"./ko.js": 460,
	"./ky": 461,
	"./ky.js": 461,
	"./lb": 462,
	"./lb.js": 462,
	"./lo": 463,
	"./lo.js": 463,
	"./lt": 464,
	"./lt.js": 464,
	"./lv": 465,
	"./lv.js": 465,
	"./me": 466,
	"./me.js": 466,
	"./mi": 467,
	"./mi.js": 467,
	"./mk": 468,
	"./mk.js": 468,
	"./ml": 469,
	"./ml.js": 469,
	"./mr": 470,
	"./mr.js": 470,
	"./ms": 472,
	"./ms-my": 471,
	"./ms-my.js": 471,
	"./ms.js": 472,
	"./my": 473,
	"./my.js": 473,
	"./nb": 474,
	"./nb.js": 474,
	"./ne": 475,
	"./ne.js": 475,
	"./nl": 477,
	"./nl-be": 476,
	"./nl-be.js": 476,
	"./nl.js": 477,
	"./nn": 478,
	"./nn.js": 478,
	"./pa-in": 479,
	"./pa-in.js": 479,
	"./pl": 480,
	"./pl.js": 480,
	"./pt": 482,
	"./pt-br": 481,
	"./pt-br.js": 481,
	"./pt.js": 482,
	"./ro": 483,
	"./ro.js": 483,
	"./ru": 484,
	"./ru.js": 484,
	"./se": 485,
	"./se.js": 485,
	"./si": 486,
	"./si.js": 486,
	"./sk": 487,
	"./sk.js": 487,
	"./sl": 488,
	"./sl.js": 488,
	"./sq": 489,
	"./sq.js": 489,
	"./sr": 491,
	"./sr-cyrl": 490,
	"./sr-cyrl.js": 490,
	"./sr.js": 491,
	"./ss": 492,
	"./ss.js": 492,
	"./sv": 493,
	"./sv.js": 493,
	"./sw": 494,
	"./sw.js": 494,
	"./ta": 495,
	"./ta.js": 495,
	"./te": 496,
	"./te.js": 496,
	"./tet": 497,
	"./tet.js": 497,
	"./th": 498,
	"./th.js": 498,
	"./tl-ph": 499,
	"./tl-ph.js": 499,
	"./tlh": 500,
	"./tlh.js": 500,
	"./tr": 501,
	"./tr.js": 501,
	"./tzl": 502,
	"./tzl.js": 502,
	"./tzm": 504,
	"./tzm-latn": 503,
	"./tzm-latn.js": 503,
	"./tzm.js": 504,
	"./uk": 505,
	"./uk.js": 505,
	"./uz": 506,
	"./uz.js": 506,
	"./vi": 507,
	"./vi.js": 507,
	"./x-pseudo": 508,
	"./x-pseudo.js": 508,
	"./yo": 509,
	"./yo.js": 509,
	"./zh-cn": 510,
	"./zh-cn.js": 510,
	"./zh-hk": 511,
	"./zh-hk.js": 511,
	"./zh-tw": 512,
	"./zh-tw.js": 512
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 870;


/***/ }),

/***/ 893:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 894:
/***/ (function(module, exports) {

module.exports = ".board {\r\n  width: 100%;\r\n  margin: auto;\r\n}\r\n\r\nul.categories {\r\n  list-style-type: none;\r\n  margin: 10px;\r\n  padding: 0;\r\n}\r\n\r\nul.categories>li {\r\n  float: left;\r\n  text-align: center;\r\n  margin: 20px;\r\n  height: 130px;\r\n}\r\n\r\nul.category {\r\n  list-style-type: none;\r\n}\r\n\r\nul.category>li {\r\n  margin: 20px;\r\n  height: 80px;\r\n  text-align: center;\r\n}\r\n\r\n.category-name {\r\n  font-weight: 500;\r\n  font-size: 30px;\r\n  color: white;\r\n  max-width: 280px;\r\n  display: block;\r\n  height: 130px;\r\n}\r\n\r\n.question-value {\r\n  font-weight: 500;\r\n  font-size: 30px;\r\n  color: yellow;\r\n  text-align: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.search-footer {\r\n  position: absolute;\r\n  bottom: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  height: 60px;\r\n  /* Height of the footer */\r\n  background: #6cf;\r\n  margin-top: 10px;\r\n  margin-left:auto;\r\n}\r\n\r\n.question-display {\r\n  text-align: center;\r\n}\r\n\r\n.question {\r\n  color: yellow;\r\n  font-size: 60px;\r\n}\r\n\r\n.answer {\r\n  color: white;\r\n  font-size: 20px;\r\n}\r\n"

/***/ }),

/***/ 895:
/***/ (function(module, exports) {

module.exports = "label {\r\n    color: white;\r\n}\r\n\r\n.form-group {\r\n    border-top: 1px solid lightgrey;\r\n    margin-top: 10px;\r\n    padding-top: 10px;\r\n}"

/***/ }),

/***/ 896:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-inverse navbar-fixed-top\">\n  <div class=\"container\">\n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\n        aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n      <a class=\"navbar-brand\" href=\"#\">{{title}}</a>\n    </div>\n    <div id=\"navbar\" class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li routerLink=\"/game\" routerLinkActive=\"active\"><a routerLink=\"/game\">Game</a></li>\n        <li routerLink=\"/search\" routerLinkActive=\"active\"><a routerLink=\"/search\">Search Questions</a></li>\n      </ul>\n    </div>\n    <!--/.nav-collapse -->\n  </div>\n</nav>\n<div class=\"container-fluid\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ 897:
/***/ (function(module, exports) {

module.exports = "<div class=\"board\" *ngIf=\"!currentQuestion\">\n  <ul class=\"categories\">\n    <li *ngFor=\"let category of board.categories\"><span class=\"category-name\">{{category.categoryName}}</span>\n      <ul class=\"category\">\n        <li *ngFor=\"let question of category.questions\" (click)=\"setCurrentQuestion(question)\"><span class=\"question-value\">{{question.value}}</span></li>\n      </ul>\n    </li>\n  </ul>\n</div>\n\n<div class=\"question-display\" *ngIf=\"currentQuestion\">\n <span class=\"question\" [innerHTML]=\"currentQuestion.question\"></span><br/>\n <span class=\"answer\">{{currentQuestion.answer}}</span> <br/>\n <span class=\"btn btn-large btn-info\" (click)=\"clearCurrentQuestion()\">Back &lt; </span>\n</div>\n\n<div class=\"search-footer\">\n  <input type=\"number\" required [(ngModel)]=\"showNumberField\" />\n  <input type=\"text\" required [(ngModel)]=\"roundField\" />\n  <span class=\"btn btn-large btn-info\" (click)=\"updateShow()\">Update Show</span>\n</div>\n"

/***/ }),

/***/ 898:
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-8\" style=\"height: 90vh\">\n    <ngx-datatable \n      class=\"material\" \n      [rows]=\"searchResults.value\" \n      [columns]=\"columns\" \n      [headerHeight]=\"50\" \n      [footerHeight]=\"50\" \n      [rowHeight]=\"50\" \n      [limit]=\"15\">\n    </ngx-datatable>\n  </div>\n  <div class=\"col-md-4\">\n\n    <div class=\"form-group\">\n      <label for=\"searchString\">Search</label>\n      <input type=\"text\" class=\"form-control\" id=\"searchString\" placeholder=\"Search\" [(ngModel)]=\"searchString\">\n    </div>\n    <div class=\"form-group\">\n      <label>Air Date</label><br>\n      <label for=\"fromDate\">From</label>\n      <datepicker #dp [(ngModel)]=\"airDateStart\" (navigate)=\"date = $event.next\"></datepicker>\n      <label for=\"thruDate\" style=\"margin-top:5px;\">Thru</label>\n      <datepicker #dp [(ngModel)]=\"airDateEnd\" (navigate)=\"date = $event.next\"></datepicker>\n    </div>\n    <div class=\"form-group\">\n      <label>Round </label><br/>\n      <label>\n          <input type=\"checkbox\" value=\"Jeopardy!\" [(ngModel)]=\"jeopardy\">Jeopardy!\n        </label><br/>\n      <label>\n          <input type=\"checkbox\" value=\"Double Jeopardy!\" [(ngModel)]=\"doubleJeopardy\">Double Jeopardy!\n        </label><br/>\n      <label>\n          <input type=\"checkbox\" value=\"Final Jeopardy!\" [(ngModel)]=\"finalJeopardy\">Final Jeopardy!\n        </label>\n    </div>\n    <div class=\"form-group\">\n      <span class=\"btn btn-large btn-info\" (click)=\"getSearchResults()\">Search!</span>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ 933:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(587);


/***/ })

},[933]);
//# sourceMappingURL=main.bundle.map