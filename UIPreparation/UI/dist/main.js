(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\kadir\Desktop\BANUPASS\UIPreparation\UI\src\main.ts */"zUnb");


/***/ }),

/***/ "2ew8":
/*!******************************************************************!*\
  !*** ./src/app/core/components/app/sidebar/sidebar.component.ts ***!
  \******************************************************************/
/*! exports provided: ADMINROUTES, USERROUTES, SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMINROUTES", function() { return ADMINROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERROUTES", function() { return USERROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _raw_loader_sidebar_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./sidebar.component.html */ "HHWu");
/* harmony import */ var _sidebar_component_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar.component.css */ "P7m5");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../admin/login/Services/auth.service */ "a9M/");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var ADMINROUTES = [
    { path: '/user', title: 'Users', icon: 'people', class: '', claim: "GetUsersQuery" },
    { path: '/group', title: 'Groups', icon: 'group_work', class: '', claim: "GetGroupsQuery" },
    //{ path: '/operationclaim', title: 'OperationClaim', icon: 'security', class: '', claim:"GetOperationClaimsQuery"},
    { path: '/language', title: 'Languages', icon: 'translate', class: '', claim: "GetLanguagesQuery" },
    { path: '/translate', title: 'TranslateWords', icon: 'language', class: '', claim: "GetTranslatesQuery" },
    { path: '/banu-log', title: 'Ana Raporlama İşlemleri', icon: 'assignment', class: '', claim: "GetUsersQuery" },
    { path: '/visit', title: 'Ziyaret Kayıtları', icon: 'event_note', class: '', claim: "GetUsersQuery" }
];
var USERROUTES = [
    { path: '/banu-logs', title: 'Güvenlik Rapor İşlemleri', icon: 'admin_panel_settings', class: '', claim: "GetBanuLogsForSecurityQuery" },
    { path: '/security-transactions', title: 'Güvenlik Ziyaret İşlemleri', icon: 'security', class: '', claim: "GetVisitsMultiVisitsQuery" },
    { path: '/visit-add', title: 'Ziyaret Talebi', icon: 'add_circle', class: '', claim: "VehicleEntranceCommand" }
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(router, authService, translateService) {
        this.router = router;
        this.authService = authService;
        this.translateService = translateService;
        this.adminMenuItems = [];
        this.userMenuItems = [];
    }
    SidebarComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lang;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authService.loadClaims()];
                    case 1:
                        _a.sent();
                        this.claimsSubscription = this.authService.claims$.subscribe(function () {
                            _this.updateMenuItems();
                        });
                        lang = localStorage.getItem('lang') || 'tr-TR';
                        this.translateService.use(lang);
                        return [2 /*return*/];
                }
            });
        });
    };
    SidebarComponent.prototype.updateMenuItems = function () {
        var _this = this;
        this.adminMenuItems = ADMINROUTES.filter(function (menuItem) {
            return menuItem && _this.checkClaim(menuItem.claim);
        });
        this.userMenuItems = USERROUTES.filter(function (menuItem) {
            return menuItem && _this.checkClaim(menuItem.claim);
        });
    };
    SidebarComponent.prototype.isMobileMenu = function () {
        return $(window).width() <= 991;
    };
    SidebarComponent.prototype.checkClaim = function (claim) {
        return this.authService.claimGuard(claim);
    };
    SidebarComponent.prototype.ngOnDestroy = function () {
        if (this.claimsSubscription) {
            this.claimsSubscription.unsubscribe();
        }
        if (!this.authService.loggedIn()) {
            localStorage.removeItem('token');
            this.authService.logOut();
            this.router.navigateByUrl("/login");
        }
    };
    SidebarComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] }
    ]; };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-sidebar',
            template: _raw_loader_sidebar_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_sidebar_component_css__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "3G0t":
/*!********************************************************!*\
  !*** ./src/app/core/services/local-storage.service.ts ***!
  \********************************************************/
/*! exports provided: LocalStorageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalStorageService", function() { return LocalStorageService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LocalStorageService = /** @class */ (function () {
    function LocalStorageService() {
    }
    LocalStorageService.prototype.setToken = function (token) {
        localStorage.setItem("token", token);
    };
    LocalStorageService.prototype.removeToken = function () {
        localStorage.removeItem("token");
    };
    LocalStorageService.prototype.removeItem = function (itemName) {
        localStorage.removeItem(itemName);
    };
    LocalStorageService.prototype.getToken = function () {
        return localStorage.getItem("token");
    };
    LocalStorageService.prototype.setItem = function (key, data) {
        localStorage.setItem(key, data);
    };
    LocalStorageService.prototype.getItem = function (key) {
        return localStorage.getItem(key);
    };
    LocalStorageService.ctorParameters = function () { return []; };
    LocalStorageService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], LocalStorageService);
    return LocalStorageService;
}());



/***/ }),

/***/ "A3xY":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    getApiUrl: 'https://localhost:5001/api/v1',
    getDropDownSetting: {
        singleSelection: false,
        idField: 'id',
        textField: 'label',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
    },
    getDatatableSettings: {
        pagingType: 'full_numbers',
        pageLength: 2
    }
};


/***/ }),

/***/ "DAyg":
/*!***************************************************!*\
  !*** ./src/app/core/services/alertify.service.ts ***!
  \***************************************************/
/*! exports provided: AlertifyService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertifyService", function() { return AlertifyService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertifyService = /** @class */ (function () {
    function AlertifyService(httpClient, translateService) {
        this.httpClient = httpClient;
        this.translateService = translateService;
        alertify.set('notifier', 'position', 'top-right');
    }
    AlertifyService.prototype.success = function (message) {
        this.translateService.get(message).subscribe(function (mes) {
            alertify.success(mes);
        });
    };
    AlertifyService.prototype.error = function (message) {
        this.translateService.get(message).subscribe(function (mes) {
            alertify.error(mes);
        });
    };
    AlertifyService.prototype.info = function (message) {
        this.translateService.get(message).subscribe(function (mes) {
            alertify.info(mes);
        });
    };
    AlertifyService.prototype.warning = function (message) {
        this.translateService.get(message).subscribe(function (mes) {
            alertify.warning(message);
        });
    };
    AlertifyService.prototype.confirmDelete = function (url, values) {
        // alertify.confirm("aa", "bb", () => { this.deleteRequest(url,values); }
        // , () => { this.error("hata")});
        //alertify.confirm('Confirm Message', function(){ alertify.success('Ok') }, function(){ alertify.error('Cancel')});
        // 
        // alertify.confirm('Delete Message',this.deleteRequest(url,values),this.error("Hata"));
        // 
        alertify.alert()
            .setting({
            'label': 'Agree',
            'message': 'This dialog is ',
            'onok': this.delete(url, values)
        }).show();
    };
    AlertifyService.prototype.delete = function (url, values) {
        this.httpClient.request("delete", url, values);
    };
    AlertifyService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"] }
    ]; };
    AlertifyService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"]])
    ], AlertifyService);
    return AlertifyService;
}());



/***/ }),

/***/ "EaH1":
/*!****************************************************************!*\
  !*** ./src/app/core/components/app/navbar/navbar.component.ts ***!
  \****************************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var _raw_loader_navbar_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./navbar.component.html */ "PP4n");
/* harmony import */ var _navbar_component_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navbar.component.css */ "k379");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var app_core_services_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/services/shared.service */ "Im7X");
/* harmony import */ var _admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../admin/login/Services/auth.service */ "a9M/");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(authService, router, sharedService) {
        var _this = this;
        this.authService = authService;
        this.router = router;
        this.sharedService = sharedService;
        this.clickEventSubscription = this.sharedService.getChangeUserNameClickEvent().subscribe(function () {
            _this.setUserName();
        });
    }
    NavbarComponent.prototype.isLoggedIn = function () {
        return this.authService.loggedIn();
    };
    NavbarComponent.prototype.logOut = function () {
        this.authService.logOut();
        this.router.navigateByUrl("/login");
    };
    NavbarComponent.prototype.help = function () {
        window.open('https://www.reqspark.com/', '_blank');
    };
    NavbarComponent.prototype.ngOnInit = function () {
        this.userName = this.authService.getUserName();
    };
    NavbarComponent.prototype.setUserName = function () {
        this.userName = this.authService.getUserName();
    };
    NavbarComponent.prototype.checkClaim = function (claim) {
        return this.authService.claimGuard(claim);
    };
    NavbarComponent.ctorParameters = function () { return [
        { type: _admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: app_core_services_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"] }
    ]; };
    NavbarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-navbar',
            template: _raw_loader_navbar_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_navbar_component_css__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"], app_core_services_shared_service__WEBPACK_IMPORTED_MODULE_4__["SharedService"]])
    ], NavbarComponent);
    return NavbarComponent;
}());



/***/ }),

/***/ "GEyL":
/*!***********************************************************************!*\
  !*** ./src/app/core/components/admin/login/Services/token.service.ts ***!
  \***********************************************************************/
/*! exports provided: TokenService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenService", function() { return TokenService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var app_core_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/core/services/local-storage.service */ "3G0t");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! environments/environment */ "AytR");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TokenService = /** @class */ (function () {
    function TokenService(httpClient, storageService) {
        this.httpClient = httpClient;
        this.storageService = storageService;
    }
    TokenService.prototype.refreshToken = function () {
        var _this = this;
        if (this.storageService.getItem("refreshToken") !== null)
            return this.httpClient
                .post(environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getApiUrl + "/Auth/refresh-token", { refreshToken: this.storageService.getItem("refreshToken") })
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(function (res) {
                if (res.success) {
                    _this.storageService.setToken(res.data.token);
                    _this.storageService.setItem("refreshToken", res.data.refreshToken);
                }
            }));
    };
    TokenService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] },
        { type: app_core_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"] }
    ]; };
    TokenService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"], app_core_services_local_storage_service__WEBPACK_IMPORTED_MODULE_2__["LocalStorageService"]])
    ], TokenService);
    return TokenService;
}());



/***/ }),

/***/ "HHWu":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/components/app/sidebar/sidebar.component.html ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"logo\" style=\"padding: 5px\">\r\n  <a class=\"simple-text\" href=\"#\">\r\n    <div class=\"logo-container\">\r\n      <img src=\"../../../../../assets/img/analogo.jpg\" width=\"150\" alt=\"Logo\" class=\"logo\">\r\n    </div>\r\n    <h4 class=\"mt-3 text-black\">Misafir Takip Sistemi</h4>\r\n  </a>\r\n</div>\r\n<div class=\"sidebar-wrapper\">\r\n  <div class=\"nav-container\">\r\n    <ul class=\"nav\" *ngIf=\"checkClaim('GetBanuLogsForSecurityQuery')\">\r\n      <li routerLinkActive=\"active\">\r\n        <a data-toggle=\"collapse\" class=\"nav-link\" href=\"#Management\">\r\n          <i class=\"material-icons\">widgets</i>\r\n          <p>\r\n            {{ \"Management\" | translate }}\r\n            <b class=\"caret\"></b>\r\n          </p>\r\n        </a>\r\n        <div class=\"collapse\" id=\"Management\">\r\n          <ul class=\"nav\">\r\n            <li\r\n              *ngFor=\"let menuItem of adminMenuItems\"\r\n              class=\"{{ menuItem.class }} nav-item\"\r\n            >\r\n              <a\r\n                *ngIf=\"checkClaim(menuItem.claim)\"\r\n                class=\"nav-link\"\r\n                [routerLink]=\"[menuItem.path]\"\r\n              >\r\n                <i class=\"material-icons\">{{ menuItem.icon }}</i>\r\n                <p>{{ menuItem.title | translate }}</p>\r\n              </a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n      </li>\r\n\t</ul>\r\n\t\r\n\t<ul class=\"nav\">\r\n\t\t<li routerLinkActive=\"active\">\r\n\t\t  <a data-toggle=\"collapse\" class=\"nav-link\" href=\"#AppMenu\">\r\n\t\t\t<i class=\"material-icons\">extension</i>\r\n\t\t\t<p>\r\n\t\t\t  {{ \"AppMenu\" | translate }}\r\n\t\t\t  <b class=\"caret\"></b>\r\n\t\t\t</p>\r\n\t\t  </a>\r\n\t\t  <div class=\"collapse\" id=\"AppMenu\">\r\n\t\t\t<ul class=\"nav\">\r\n\t\t\t  <li\r\n\t\t\t\t*ngFor=\"let menuItem of userMenuItems\"\r\n\t\t\t\tclass=\"{{ menuItem.class }} nav-item\"\r\n\t\t\t  >\r\n\t\t\t\t<a\r\n\t\t\t\t  *ngIf=\"checkClaim(menuItem.claim)\"\r\n\t\t\t\t  class=\"nav-link\"\r\n\t\t\t\t  [routerLink]=\"[menuItem.path]\"\r\n\t\t\t\t>\r\n\t\t\t\t  <i class=\"material-icons\">{{ menuItem.icon }}</i>\r\n\t\t\t\t  <p>{{ menuItem.title | translate }}</p>\r\n\t\t\t\t</a>\r\n\t\t\t  </li>\r\n\t\t\t</ul>\r\n\t\t  </div>\r\n\t\t</li>\r\n\t  </ul>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "Hms8":
/*!************************************************************************************!*\
  !*** ./src/app/core/components/app/layouts/admin-layout/admin-layout.component.ts ***!
  \************************************************************************************/
/*! exports provided: AdminLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AdminLayoutComponent", function() { return AdminLayoutComponent; });
/* harmony import */ var _raw_loader_admin_layout_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./admin-layout.component.html */ "Nlv3");
/* harmony import */ var _admin_layout_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin-layout.component.scss */ "bhfX");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var app_core_components_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/components/admin/login/Services/auth.service */ "a9M/");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery */ "EVdn");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var perfect_scrollbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! perfect-scrollbar */ "t/UT");
/* harmony import */ var rxjs_add_operator_filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/add/operator/filter */ "fjAU");
/* harmony import */ var rxjs_add_operator_filter__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(rxjs_add_operator_filter__WEBPACK_IMPORTED_MODULE_9__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var AdminLayoutComponent = /** @class */ (function () {
    function AdminLayoutComponent(location, router, authService, translate) {
        this.location = location;
        this.router = router;
        this.authService = authService;
        this.translate = translate;
        this.yScrollStack = [];
        this.translate.setDefaultLang("tr-TR");
        this.translate.use('tr-TR');
    }
    AdminLayoutComponent.prototype.isLoggedIn = function () {
        return this.authService.loggedIn();
    };
    AdminLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.translate.use('tr-TR');
        if (this.isLoggedIn()) {
            var isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;
            if (isWindows && !document.getElementsByTagName('body')[0].classList.contains('sidebar-mini')) {
                // if we are on windows OS we activate the perfectScrollbar function
                document.getElementsByTagName('body')[0].classList.add('perfect-scrollbar-on');
            }
            else {
                document.getElementsByTagName('body')[0].classList.remove('perfect-scrollbar-off');
            }
            var elemMainPanel_1 = document.querySelector('.main-panel');
            var elemSidebar_1 = document.querySelector('.sidebar .sidebar-wrapper');
            this.location.subscribe(function (ev) {
                _this.lastPoppedUrl = ev.url;
            });
            this.router.events.subscribe(function (event) {
                if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["NavigationStart"]) {
                    if (event.url != _this.lastPoppedUrl)
                        _this.yScrollStack.push(window.scrollY);
                }
                else if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["NavigationEnd"]) {
                    if (event.url == _this.lastPoppedUrl) {
                        _this.lastPoppedUrl = undefined;
                        window.scrollTo(0, _this.yScrollStack.pop());
                    }
                    else
                        window.scrollTo(0, 0);
                }
            });
            this._router = this.router.events.filter(function (event) { return event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_4__["NavigationEnd"]; }).subscribe(function (event) {
                elemMainPanel_1.scrollTop = 0;
                elemSidebar_1.scrollTop = 0;
            });
            if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
                var ps = new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_8__["default"](elemMainPanel_1);
                ps = new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_8__["default"](elemSidebar_1);
            }
            var window_width = jquery__WEBPACK_IMPORTED_MODULE_7__(window).width();
            var $sidebar_1 = jquery__WEBPACK_IMPORTED_MODULE_7__('.sidebar');
            var $sidebar_responsive_1 = jquery__WEBPACK_IMPORTED_MODULE_7__('body > .navbar-collapse');
            var $sidebar_img_container_1 = $sidebar_1.find('.sidebar-background');
            if (window_width > 767) {
                if (jquery__WEBPACK_IMPORTED_MODULE_7__('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
                    jquery__WEBPACK_IMPORTED_MODULE_7__('.fixed-plugin .dropdown').addClass('open');
                }
            }
            jquery__WEBPACK_IMPORTED_MODULE_7__('.fixed-plugin a').click(function (event) {
                // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide, otherwise we set the  section active
                if (jquery__WEBPACK_IMPORTED_MODULE_7__(this).hasClass('switch-trigger')) {
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    else if (window.event) {
                        window.event.cancelBubble = true;
                    }
                }
            });
            jquery__WEBPACK_IMPORTED_MODULE_7__('.fixed-plugin .badge').click(function () {
                var $full_page_background = jquery__WEBPACK_IMPORTED_MODULE_7__('.full-page-background');
                jquery__WEBPACK_IMPORTED_MODULE_7__(this).siblings().removeClass('active');
                jquery__WEBPACK_IMPORTED_MODULE_7__(this).addClass('active');
                var new_color = jquery__WEBPACK_IMPORTED_MODULE_7__(this).data('color');
                if ($sidebar_1.length !== 0) {
                    $sidebar_1.attr('data-color', new_color);
                }
                if ($sidebar_responsive_1.length != 0) {
                    $sidebar_responsive_1.attr('data-color', new_color);
                }
            });
            jquery__WEBPACK_IMPORTED_MODULE_7__('.fixed-plugin .img-holder').click(function () {
                var $full_page_background = jquery__WEBPACK_IMPORTED_MODULE_7__('.full-page-background');
                jquery__WEBPACK_IMPORTED_MODULE_7__(this).parent('li').siblings().removeClass('active');
                jquery__WEBPACK_IMPORTED_MODULE_7__(this).parent('li').addClass('active');
                var new_image = jquery__WEBPACK_IMPORTED_MODULE_7__(this).find("img").attr('src');
                if ($sidebar_img_container_1.length != 0) {
                    $sidebar_img_container_1.fadeOut('fast', function () {
                        $sidebar_img_container_1.css('background-image', 'url("' + new_image + '")');
                        $sidebar_img_container_1.fadeIn('fast');
                    });
                }
                if ($full_page_background.length != 0) {
                    $full_page_background.fadeOut('fast', function () {
                        $full_page_background.css('background-image', 'url("' + new_image + '")');
                        $full_page_background.fadeIn('fast');
                    });
                }
                if ($sidebar_responsive_1.length != 0) {
                    $sidebar_responsive_1.css('background-image', 'url("' + new_image + '")');
                }
            });
        }
    };
    AdminLayoutComponent.prototype.ngAfterViewInit = function () {
        this.runOnRouteChange();
    };
    AdminLayoutComponent.prototype.isMaps = function (path) {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice(1);
        if (path == titlee) {
            return false;
        }
        else {
            return true;
        }
    };
    AdminLayoutComponent.prototype.runOnRouteChange = function () {
        if (window.matchMedia("(min-width: 960px)").matches && !this.isMac()) {
            var elemMainPanel = document.querySelector('.main-panel');
            var ps = new perfect_scrollbar__WEBPACK_IMPORTED_MODULE_8__["default"](elemMainPanel);
            ps.update();
        }
    };
    AdminLayoutComponent.prototype.isMac = function () {
        var bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
    };
    AdminLayoutComponent.ctorParameters = function () { return [
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: app_core_components_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"] },
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"] }
    ]; };
    AdminLayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-admin-layout',
            template: _raw_loader_admin_layout_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_admin_layout_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], app_core_components_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_6__["AuthService"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateService"]])
    ], AdminLayoutComponent);
    return AdminLayoutComponent;
}());



/***/ }),

/***/ "Im7X":
/*!*************************************************!*\
  !*** ./src/app/core/services/shared.service.ts ***!
  \*************************************************/
/*! exports provided: SharedService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedService", function() { return SharedService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var SharedService = /** @class */ (function () {
    function SharedService() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    SharedService.prototype.sendChangeUserNameEvent = function () {
        this.subject.next();
    };
    SharedService.prototype.getChangeUserNameClickEvent = function () {
        return this.subject.asObservable();
    };
    SharedService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        })
    ], SharedService);
    return SharedService;
}());



/***/ }),

/***/ "JgYw":
/*!***************************************************************!*\
  !*** ./src/app/core/interceptors/auth-interceptor.service.ts ***!
  \***************************************************************/
/*! exports provided: AuthInterceptorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthInterceptorService", function() { return AuthInterceptorService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _components_admin_login_Services_token_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/admin/login/Services/token.service */ "GEyL");
/* harmony import */ var _services_alertify_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/alertify.service */ "DAyg");
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/local-storage.service */ "3G0t");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AuthInterceptorService = /** @class */ (function () {
    function AuthInterceptorService(tokenService, router, localStorage, alertifyService) {
        this.tokenService = tokenService;
        this.router = router;
        this.localStorage = localStorage;
        this.alertifyService = alertifyService;
        this.isRefreshing = false;
        this.refreshTokenSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
    }
    AuthInterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        req = this.addToken(req);
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) {
            if (error instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpErrorResponse"]) {
                if (error.status === 401) {
                    return _this.handle401Error(req, next);
                }
                else if (error.status === 403) {
                    // Yetkisiz erişim
                    _this.handleLogout('Yetkisiz erişim. Lütfen tekrar giriş yapın.');
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(error);
                }
                else if (error.status === 0) {
                    // Backend'e erişilemediğinde
                    _this.handleLogout('Sunucuya erişilemiyor. Lütfen daha sonra tekrar deneyin.');
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(error);
                }
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(error);
        }));
    };
    AuthInterceptorService.prototype.addToken = function (request) {
        var token = this.localStorage.getToken();
        if (token) {
            // Token'ın geçerliliğini kontrol et (örn: JWT decode edip exp kontrolü)
            try {
                var tokenData = JSON.parse(atob(token.split('.')[1]));
                var expirationDate = new Date(tokenData.exp * 1000);
                if (expirationDate <= new Date()) {
                    this.handleLogout('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
                    return request;
                }
            }
            catch (e) {
                this.handleLogout('Geçersiz oturum. Lütfen tekrar giriş yapın.');
                return request;
            }
            return request.clone({
                setHeaders: {
                    Authorization: "Bearer " + token
                }
            });
        }
        return request;
    };
    AuthInterceptorService.prototype.handle401Error = function (req, next) {
        var _this = this;
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);
            return this.tokenService.refreshToken().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (token) {
                _this.isRefreshing = false;
                if (token && token.success) {
                    _this.refreshTokenSubject.next(token.data.token);
                    return next.handle(_this.addToken(req));
                }
                else {
                    _this.handleLogout('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
                    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Token yenileme başarısız');
                }
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(function (error) {
                _this.isRefreshing = false;
                _this.handleLogout('Oturum yenilenemedi. Lütfen tekrar giriş yapın.');
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(error);
            }));
        }
        else {
            return this.refreshTokenSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (token) { return token != null; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (jwt) {
                return next.handle(_this.addToken(req));
            }));
        }
    };
    AuthInterceptorService.prototype.handleLogout = function (message) {
        // Sadece token ile ilgili verileri temizle
        this.localStorage.removeItem('token');
        this.localStorage.removeItem('refreshToken');
        this.alertifyService.warning(message);
        this.router.navigate(['/login']);
    };
    AuthInterceptorService.ctorParameters = function () { return [
        { type: _components_admin_login_Services_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _services_local_storage_service__WEBPACK_IMPORTED_MODULE_7__["LocalStorageService"] },
        { type: _services_alertify_service__WEBPACK_IMPORTED_MODULE_6__["AlertifyService"] }
    ]; };
    AuthInterceptorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_components_admin_login_Services_token_service__WEBPACK_IMPORTED_MODULE_5__["TokenService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_local_storage_service__WEBPACK_IMPORTED_MODULE_7__["LocalStorageService"],
            _services_alertify_service__WEBPACK_IMPORTED_MODULE_6__["AlertifyService"]])
    ], AuthInterceptorService);
    return AuthInterceptorService;
}());



/***/ }),

/***/ "JosV":
/*!********************************************************************************!*\
  !*** ./src/app/core/components/app/mobile-sidebar/mobile-sidebar.component.ts ***!
  \********************************************************************************/
/*! exports provided: ADMINROUTES, USERROUTES, MobileSidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADMINROUTES", function() { return ADMINROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERROUTES", function() { return USERROUTES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileSidebarComponent", function() { return MobileSidebarComponent; });
/* harmony import */ var _raw_loader_mobile_sidebar_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./mobile-sidebar.component.html */ "axmD");
/* harmony import */ var _mobile_sidebar_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mobile-sidebar.component.scss */ "mQAL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../admin/login/Services/auth.service */ "a9M/");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};








var ADMINROUTES = [
    { path: '/user', title: 'Users', icon: 'people', class: '', claim: "GetUsersQuery" },
    { path: '/group', title: 'Groups', icon: 'group_work', class: '', claim: "GetGroupsQuery" },
    { path: '/operationclaim', title: 'OperationClaim', icon: 'security', class: '', claim: "GetOperationClaimsQuery" },
    { path: '/language', title: 'Languages', icon: 'translate', class: '', claim: "GetLanguagesQuery" },
    { path: '/translate', title: 'TranslateWords', icon: 'language', class: '', claim: "GetTranslatesQuery" },
    { path: '/banu-log', title: 'Ana Raporlama İşlemleri', icon: 'assignment', class: '', claim: "GetUsersQuery" },
    { path: '/visit', title: 'Ziyaret Kayıtları', icon: 'event_note', class: '', claim: "GetUsersQuery" }
];
var USERROUTES = [
    { path: '/banu-logs', title: 'Güvenlik Rapor İşlemleri', icon: 'admin_panel_settings', class: '', claim: "GetBanuLogsForSecurityQuery" },
    { path: '/security-transactions', title: 'Güvenlik Ziyaret İşlemleri', icon: 'security', class: '', claim: "GetVisitsMultiVisitsQuery" },
    { path: '/visit-add', title: 'Ziyaret Talebi', icon: 'add_circle', class: '', claim: "VehicleEntranceCommand" },
    { path: '/personel-visit', title: 'Ziyaret Taleplerim', icon: 'event_note', class: '', claim: "GetPersonnelVisitsQuery" }
];
var MobileSidebarComponent = /** @class */ (function () {
    function MobileSidebarComponent(location, router, authService) {
        this.router = router;
        this.authService = authService;
        this.menuItems = [];
        this.isOpen = false;
        this.isMobile = false;
        this.previousIsMobile = false;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_5__["Subject"]();
        this.location = location;
        this.checkScreenSize();
    }
    MobileSidebarComponent.prototype.onResize = function () {
        this.checkScreenSize();
    };
    MobileSidebarComponent.prototype.checkScreenSize = function () {
        var wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= 991;
        // Eğer mobile durumu değiştiyse menuItems'ı güncelle
        if (wasMobile !== this.isMobile) {
            this.initializeMenuItems();
            // Mobile'dan desktop'a geçişte sidebar'ı kapat
            if (!this.isMobile) {
                this.isOpen = false;
            }
        }
    };
    MobileSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeMenuItems();
        // Route değişikliklerini dinle
        this.router.events
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["takeUntil"])(this.destroy$))
            .subscribe(function () {
            if (_this.isMobile && _this.isOpen) {
                _this.isOpen = false;
            }
        });
    };
    MobileSidebarComponent.prototype.initializeMenuItems = function () {
        var _this = this;
        if (this.isMobile) {
            this.menuItems = __spreadArrays(ADMINROUTES, USERROUTES).filter(function (menuItem) {
                return menuItem && (!menuItem.claim || _this.checkClaim(menuItem.claim));
            });
        }
        else {
            this.menuItems = [];
        }
    };
    MobileSidebarComponent.prototype.checkClaim = function (claim) {
        return this.authService.claimGuard(claim);
    };
    MobileSidebarComponent.prototype.toggleSidebar = function () {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.initializeMenuItems();
        }
    };
    MobileSidebarComponent.prototype.logOut = function () {
        this.authService.logOut();
        this.router.navigate(['/login']);
    };
    MobileSidebarComponent.prototype.trackByFn = function (index, item) {
        return item.path;
    };
    MobileSidebarComponent.prototype.ngOnDestroy = function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    MobileSidebarComponent.ctorParameters = function () { return [
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"] }
    ]; };
    MobileSidebarComponent.propDecorators = {
        onResize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["HostListener"], args: ['window:resize',] }]
    };
    MobileSidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
            selector: 'app-mobile-sidebar',
            template: _raw_loader_mobile_sidebar_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_mobile_sidebar_component_scss__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"]])
    ], MobileSidebarComponent);
    return MobileSidebarComponent;
}());



/***/ }),

/***/ "LjPS":
/*!******************************************************!*\
  !*** ./src/app/core/services/Translation.service.ts ***!
  \******************************************************/
/*! exports provided: TranslationService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TranslationService", function() { return TranslationService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ "AytR");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import 'rxjs/Rx';
var TranslationService = /** @class */ (function () {
    function TranslationService(http) {
        this.http = http;
    }
    TranslationService.prototype.getTranslation = function (lang) {
        return this.http.get(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].getApiUrl + ("/translates/languages/" + lang));
    };
    TranslationService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }
    ]; };
    TranslationService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], TranslationService);
    return TranslationService;
}());



/***/ }),

/***/ "Nlv3":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/components/app/layouts/admin-layout/admin-layout.component.html ***!
  \****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-mobile-sidebar *ngIf=\"isLoggedIn()\"></app-mobile-sidebar>\r\n<div class=\"wrapper\">\r\n  <div class=\"sidebar\" data-color=\"danger\" data-background-color=\"white\" data-image=\"./assets/img/sidebar-1.jpg\" *ngIf=\"isLoggedIn()\">\r\n    <app-sidebar></app-sidebar>\r\n  </div>\r\n  <div class=\"main-panel\">\r\n    <app-navbar></app-navbar>\r\n    <router-outlet></router-outlet>\r\n    <app-footer></app-footer>\r\n  </div>\r\n</div>");

/***/ }),

/***/ "P7m5":
/*!*******************************************************************!*\
  !*** ./src/app/core/components/app/sidebar/sidebar.component.css ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n.logo-container {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  height: 100%;\r\n}\r\n\r\n.h4 {\r\n  color: black !important;\r\n  font-size: 1.5rem !important;\r\n  text-transform: lowercase !important;\r\n  font-weight: bold !important;\r\n  text-align: center !important;\r\n  margin-top: 1rem !important;\r\n  margin-bottom: 1rem !important;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNpZGViYXIuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsNEJBQTRCO0VBQzVCLG9DQUFvQztFQUNwQyw0QkFBNEI7RUFDNUIsNkJBQTZCO0VBQzdCLDJCQUEyQjtFQUMzQiw4QkFBOEI7QUFDaEMiLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5sb2dvLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLmg0IHtcclxuICBjb2xvcjogYmxhY2sgIWltcG9ydGFudDtcclxuICBmb250LXNpemU6IDEuNXJlbSAhaW1wb3J0YW50O1xyXG4gIHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2UgIWltcG9ydGFudDtcclxuICBmb250LXdlaWdodDogYm9sZCAhaW1wb3J0YW50O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlciAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi10b3A6IDFyZW0gIWltcG9ydGFudDtcclxuICBtYXJnaW4tYm90dG9tOiAxcmVtICFpbXBvcnRhbnQ7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "PP4n":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/components/app/navbar/navbar.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav class=\"navbar navbar-expand-lg navbar-transparent  navbar-absolute fixed-top\">\r\n    <div class=\"container-fluid\">\r\n        <div class=\"collapse navbar-collapse justify-content-end\" id=\"navigation\">\r\n            \r\n            <ul class=\"navbar-nav\" *ngIf=\"isLoggedIn()\">\r\n                <li class=\"nav-item\" *ngIf=\"checkClaim('GetPersonnelVisitsQuery')\">\r\n                    <a class=\"nav-link\" [routerLink]=\"['/personel-visit']\">{{'Ziyaret Taleplerim' | translate}}</a>\r\n                  </li>\r\n                <li class=\"nav-item\">\r\n                  <span>{{userName}}</span>\r\n                </li>   \r\n                <li class=\"nav-item\" (click)=\"help()\" >                \r\n                    <span class=\"material-icons\" title=\"Help\">\r\n                      help_outline\r\n                    </span>\r\n                  \r\n                </li>\r\n                <li class=\"nav-item\"   (click)=\"logOut()\">\r\n                      <span class=\"material-icons\" title=\"Logout\">login</span>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n</nav>\r\n\r\n");

/***/ }),

/***/ "RZsi":
/*!********************************************************!*\
  !*** ./src/app/core/services/token-monitor.service.ts ***!
  \********************************************************/
/*! exports provided: TokenMonitorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenMonitorService", function() { return TokenMonitorService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! environments/environment */ "AytR");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _alertify_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./alertify.service */ "DAyg");
/* harmony import */ var _local_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./local-storage.service */ "3G0t");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var TokenMonitorService = /** @class */ (function () {
    function TokenMonitorService(localStorage, router, alertifyService, http) {
        this.localStorage = localStorage;
        this.router = router;
        this.alertifyService = alertifyService;
        this.http = http;
        this.lastCheckTime = 0;
        this.CHECK_INTERVAL = 2000; // 2 saniye
    }
    TokenMonitorService.prototype.checkTokenValidity = function () {
        var currentTime = Date.now();
        if (currentTime - this.lastCheckTime < this.CHECK_INTERVAL) {
            return;
        }
        this.lastCheckTime = currentTime;
        var token = this.localStorage.getToken();
        if (!token) {
            return;
        }
        // Önce token'ın yapısal kontrolü
        try {
            var tokenData = JSON.parse(atob(token.split('.')[1]));
            var expirationDate = new Date(tokenData.exp * 1000);
            if (expirationDate <= new Date()) {
                this.handleLogout('Oturumunuz sona erdi. Lütfen tekrar giriş yapın.');
                return;
            }
        }
        catch (e) {
            this.handleLogout('Geçersiz oturum. Lütfen tekrar giriş yapın.');
            return;
        }
        // Token yapısal olarak geçerliyse, backend kontrolü yap
        this.checkBackendTokenValidity();
    };
    TokenMonitorService.prototype.checkBackendTokenValidity = function () {
        var _this = this;
        this.http.get(environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].getApiUrl + "/auth/cx0_d_s91o2_xw24").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function (error) {
            var _a;
            if (error.status === 401) {
                // Cache'de kullanıcı bulunamadı veya token geçersiz
                _this.handleLogout(((_a = error.error) === null || _a === void 0 ? void 0 : _a.message) || 'Oturumunuz sonlandırıldı. Lütfen tekrar giriş yapın.');
            }
            else if (error.status === 0) {
                // Backend'e erişilemediğinde sessiz kalabilir veya kullanıcıyı bilgilendirebilirsiniz
                console.warn('Backend bağlantısı kontrol edilemiyor');
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(null);
        })).subscribe(function (response) {
            if (response && !response.valid) {
                _this.handleLogout(response.message || 'Oturumunuz sonlandırıldı. Lütfen tekrar giriş yapın.');
            }
        });
    };
    TokenMonitorService.prototype.handleLogout = function (message) {
        this.localStorage.removeItem('token');
        this.localStorage.removeItem('refreshToken');
        this.alertifyService.warning(message);
        this.router.navigate(['/login']);
    };
    TokenMonitorService.ctorParameters = function () { return [
        { type: _local_storage_service__WEBPACK_IMPORTED_MODULE_7__["LocalStorageService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _alertify_service__WEBPACK_IMPORTED_MODULE_6__["AlertifyService"] },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }
    ]; };
    TokenMonitorService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_local_storage_service__WEBPACK_IMPORTED_MODULE_7__["LocalStorageService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _alertify_service__WEBPACK_IMPORTED_MODULE_6__["AlertifyService"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], TokenMonitorService);
    return TokenMonitorService;
}());



/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./app.component.html */ "VzVu");
/* harmony import */ var _app_component_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.css */ "A3xY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _core_components_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/components/admin/login/Services/auth.service */ "a9M/");
/* harmony import */ var _core_services_token_monitor_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./core/services/token-monitor.service */ "RZsi");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = /** @class */ (function () {
    function AppComponent(translate, authService, router, tokenMonitor) {
        this.translate = translate;
        this.authService = authService;
        this.router = router;
        this.tokenMonitor = tokenMonitor;
        translate.setDefaultLang("tr-TR");
        translate.use("tr-TR");
        if (!this.authService.loggedIn()) {
            this.authService.logOut();
            this.router.navigateByUrl("/login");
        }
        this.subscription = router.events.subscribe(function (event) {
            if (event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationStart"]) {
                browserRefresh = !router.navigated;
            }
        });
    }
    AppComponent.prototype.onMouseMove = function () {
        if (this.authService.loggedIn()) {
            this.tokenMonitor.checkTokenValidity();
        }
    };
    AppComponent.prototype.isLoggedIn = function () {
        return this.authService.loggedIn();
    };
    AppComponent.ctorParameters = function () { return [
        { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"] },
        { type: _core_components_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _core_services_token_monitor_service__WEBPACK_IMPORTED_MODULE_6__["TokenMonitorService"] }
    ]; };
    AppComponent.propDecorators = {
        onMouseMove: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["HostListener"], args: ['mousemove',] }]
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: "app-root",
            template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_app_component_css__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__["TranslateService"],
            _core_components_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _core_services_token_monitor_service__WEBPACK_IMPORTED_MODULE_6__["TokenMonitorService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "UENe":
/*!*****************************************************************!*\
  !*** ./src/app/core/components/app/footer/footer.component.css ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJmb290ZXIuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "VzVu":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n<router-outlet></router-outlet>\r\n");

/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: tokenGetter, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenGetter", function() { return tokenGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_common_locales_tr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/locales/tr */ "6/97");
/* harmony import */ var _angular_common_locales_tr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_angular_common_locales_tr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/paginator */ "M9IT");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ "1kSV");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @sweetalert2/ngx-sweetalert2 */ "QJFE");
/* harmony import */ var ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-multiselect-dropdown */ "Egam");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _app_routing__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./app.routing */ "beVS");
/* harmony import */ var _core_components_app_layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./core/components/app/layouts/admin-layout/admin-layout.component */ "Hms8");
/* harmony import */ var _core_guards_login_guard__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./core/guards/login-guard */ "sppB");
/* harmony import */ var _core_interceptors_auth_interceptor_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./core/interceptors/auth-interceptor.service */ "JgYw");
/* harmony import */ var _core_modules_components_module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./core/modules/components.module */ "qYzc");
/* harmony import */ var _core_services_http_entity_repository_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./core/services/http-entity-repository.service */ "qU61");
/* harmony import */ var _core_services_Translation_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./core/services/Translation.service */ "LjPS");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















// i18 kullanıclak ise aşağıdaki metod aktif edilecek
//  export function HttpLoaderFactory(http: HttpClient) {
//    
//    var asd=new TranslateHttpLoader(http, '../../../../assets/i18n/', '.json'); 
//    return asd;
//  }
function tokenGetter() {
    return localStorage.getItem("token");
}
Object(_angular_common__WEBPACK_IMPORTED_MODULE_0__["registerLocaleData"])(_angular_common_locales_tr__WEBPACK_IMPORTED_MODULE_2___default.a);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            imports: [
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_7__["BrowserAnimationsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClientModule"],
                _core_modules_components_module__WEBPACK_IMPORTED_MODULE_18__["ComponentsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterModule"],
                _app_routing__WEBPACK_IMPORTED_MODULE_14__["AppRoutingModule"],
                _angular_material_input__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__["MatPaginatorModule"],
                ng_multiselect_dropdown__WEBPACK_IMPORTED_MODULE_12__["NgMultiSelectDropDownModule"].forRoot(),
                _sweetalert2_ngx_sweetalert2__WEBPACK_IMPORTED_MODULE_11__["SweetAlert2Module"].forRoot(),
                _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_9__["NgbModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__["TranslateLoader"],
                        //useFactory:HttpLoaderFactory, //i18 kullanılacak ise useClass kapatılıp yukarıda bulunan HttpLoaderFactory ve bu satır aktif edilecek
                        useClass: _core_services_Translation_service__WEBPACK_IMPORTED_MODULE_20__["TranslationService"],
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]]
                    }
                })
            ],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"],
                _core_components_app_layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_15__["AdminLayoutComponent"],
            ],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["DatePipe"],
                _core_guards_login_guard__WEBPACK_IMPORTED_MODULE_16__["LoginGuard"], { provide: _angular_core__WEBPACK_IMPORTED_MODULE_3__["LOCALE_ID"], useValue: 'tr' },
                {
                    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HTTP_INTERCEPTORS"],
                    useClass: _core_interceptors_auth_interceptor_service__WEBPACK_IMPORTED_MODULE_17__["AuthInterceptorService"],
                    multi: true,
                },
                _core_services_http_entity_repository_service__WEBPACK_IMPORTED_MODULE_19__["HttpEntityRepositoryService"],
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_13__["AppComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["CUSTOM_ELEMENTS_SCHEMA"]],
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "a9M/":
/*!**********************************************************************!*\
  !*** ./src/app/core/components/admin/login/Services/auth.service.ts ***!
  \**********************************************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/angular-jwt */ "Nm8O");
/* harmony import */ var app_core_services_alertify_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! app/core/services/alertify.service */ "DAyg");
/* harmony import */ var app_core_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/services/local-storage.service */ "3G0t");
/* harmony import */ var app_core_services_shared_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! app/core/services/shared.service */ "Im7X");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! environments/environment */ "AytR");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "qCKp");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var AuthService = /** @class */ (function () {
    function AuthService(httpClient, storageService, router, alertifyService, sharedService) {
        this.httpClient = httpClient;
        this.storageService = storageService;
        this.router = router;
        this.alertifyService = alertifyService;
        this.sharedService = sharedService;
        this.claimsSubject = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"]([]);
        this.claims$ = this.claimsSubject.asObservable();
        this.jwtHelper = new _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"]();
        this.claimsLoaded = false;
        this.initializeAuth();
    }
    AuthService.prototype.initializeAuth = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.storageService.getToken() && this.loggedIn())) return [3 /*break*/, 2];
                        this.setUserInfoFromToken();
                        return [4 /*yield*/, this.loadClaims()];
                    case 1:
                        _a.sent();
                        this.sharedService.sendChangeUserNameEvent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.setUserInfoFromToken = function () {
        var token = this.storageService.getToken();
        if (token) {
            var decode = this.jwtHelper.decodeToken(token);
            var propUserName = Object.keys(decode).filter(function (x) { return x.endsWith("/name"); })[0];
            this.userName = decode[propUserName];
        }
    };
    AuthService.prototype.loadClaims = function () {
        return __awaiter(this, void 0, void 0, function () {
            var claims, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!this.claimsLoaded && this.storageService.getToken() && this.loggedIn())) return [3 /*break*/, 4];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.httpClient.get(environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].getApiUrl + "/operation-claims/cache").toPromise()];
                    case 2:
                        claims = _a.sent();
                        this.claimsSubject.next(claims);
                        this.claimsLoaded = true;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.claimsSubject.next([]);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (loginUser) {
        var _this = this;
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpHeaders"]();
        headers = headers.append("Content-Type", "application/json");
        this.httpClient.post(environments_environment__WEBPACK_IMPORTED_MODULE_7__["environment"].getApiUrl + "/Auth/login", loginUser, { headers: headers })
            .subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data.success) {
                    this.storageService.setToken(data.data.token);
                    this.storageService.setItem("refreshToken", data.data.refreshToken);
                    this.claimsSubject.next(data.data.claims);
                    this.claimsLoaded = true;
                    this.setUserInfoFromToken();
                    this.sharedService.sendChangeUserNameEvent();
                    this.router.navigateByUrl("/dashboard");
                    this.alertifyService.success(data.message);
                }
                else {
                    this.alertifyService.warning("Kullanıcı adı veya şifre hatalı");
                }
                return [2 /*return*/];
            });
        }); }, function (error) {
            _this.alertifyService.error("Kullanıcı adı veya şifre hatalı");
        });
    };
    AuthService.prototype.logOut = function () {
        this.storageService.removeToken();
        this.storageService.removeItem("lang");
        this.storageService.removeItem("refreshToken");
        this.claimsSubject.next([]);
        this.claimsLoaded = false;
        this.router.navigate(['/login']);
    };
    AuthService.prototype.loggedIn = function () {
        try {
            return !this.jwtHelper.isTokenExpired(this.storageService.getToken(), -120);
        }
        catch (error) {
            this.logOut();
            this.router.navigate(["/login"]);
            return false;
        }
    };
    AuthService.prototype.getCurrentUserId = function () {
        return this.jwtHelper.decodeToken(this.storageService.getToken()).userId;
    };
    AuthService.prototype.claimGuard = function (claim) {
        //this.loadClaims();
        try {
            if (!this.loggedIn()) {
                this.router.navigate(["/login"]);
                return false;
            }
            var currentClaims = this.claimsSubject.getValue();
            return currentClaims.includes(claim);
        }
        catch (error) {
            this.logOut();
            this.router.navigate(["/login"]);
            return false;
        }
    };
    AuthService.prototype.getUserName = function () {
        return this.userName;
    };
    AuthService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] },
        { type: app_core_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: app_core_services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"] },
        { type: app_core_services_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"] }
    ]; };
    AuthService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"],
            app_core_services_local_storage_service__WEBPACK_IMPORTED_MODULE_5__["LocalStorageService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            app_core_services_alertify_service__WEBPACK_IMPORTED_MODULE_4__["AlertifyService"],
            app_core_services_shared_service__WEBPACK_IMPORTED_MODULE_6__["SharedService"]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "axmD":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/components/app/mobile-sidebar/mobile-sidebar.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<button class=\"mobile-toggle-btn\" (click)=\"toggleSidebar()\" *ngIf=\"isMobile\">\r\n  <i class=\"material-icons\">{{isOpen ? 'chevron_right' : 'menu'}}</i>\r\n</button>\r\n\r\n<div class=\"mobile-sidebar\" [class.open]=\"isOpen\" *ngIf=\"isMobile\">\r\n  <div class=\"sidebar-overlay\" (click)=\"toggleSidebar()\" *ngIf=\"isOpen\"></div>\r\n  <div class=\"sidebar-content\">\r\n    <div class=\"sidebar-menu\">\r\n      <div class=\"logo\">\r\n        <a class=\"simple-text\">\r\n          <div class=\"logo-img\">\r\n            <img src=\"../../../../../assets/img/analogo.jpg\" width=\"200\" alt=\"Logo\"/>\r\n          </div>\r\n          Misafir Takip Sistemi\r\n        </a>\r\n      </div>\r\n      <ul class=\"nav\">\r\n        <li routerLinkActive=\"active\" *ngFor=\"let menuItem of menuItems; trackBy: trackByFn\" class=\"nav-item\">\r\n          <a class=\"nav-link\" [routerLink]=\"[menuItem.path]\" (click)=\"toggleSidebar()\" *ngIf=\"!menuItem.claim || checkClaim(menuItem.claim)\">\r\n            <i class=\"material-icons\">{{menuItem.icon}}</i>\r\n            <p>{{menuItem.title}}</p>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n      <button mat-button color=\"warn\" (click)=\"logOut()\" class=\"logout-btn\" style=\"margin-top: 20px; display: flex; align-items: center; background-color: #f44336; color: white; border-radius: 5px; padding: 10px 15px; transition: background-color 0.3s;\">\r\n        <i class=\"material-icons\" style=\"margin-right: 8px;\">exit_to_app</i>\r\n        Güvenli Çıkış Yap\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div> ");

/***/ }),

/***/ "beVS":
/*!********************************!*\
  !*** ./src/app/app.routing.ts ***!
  \********************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _core_components_app_layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./core/components/app/layouts/admin-layout/admin-layout.component */ "Hms8");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { LoginComponent } from './login/login.component';
var routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: _core_components_app_layouts_admin_layout_admin_layout_component__WEBPACK_IMPORTED_MODULE_4__["AdminLayoutComponent"],
        children: [{
                path: '',
                // loadChildren: './core/components/app/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
                loadChildren: './core/modules/admin-layout.module#AdminLayoutModule'
            }]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes, {
                    useHash: true
                })
            ],
            exports: [
                [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
            ],
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "bhfX":
/*!**************************************************************************************!*\
  !*** ./src/app/core/components/app/layouts/admin-layout/admin-layout.component.scss ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("tbody {\n  height: 400px;\n  overflow-y: scroll;\n  display: block;\n}\n\nth {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXC4uXFxhZG1pbi1sYXlvdXQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBTSxhQUFBO0VBQWUsa0JBQUE7RUFBbUIsY0FBQTtBQUl4Qzs7QUFIQTtFQUFLLHdCQUFBO0VBQUEsZ0JBQUE7RUFBa0IsTUFBQTtBQVF2QiIsImZpbGUiOiJhZG1pbi1sYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0Ym9keXtoZWlnaHQ6IDQwMHB4OyBvdmVyZmxvdy15OiBzY3JvbGw7ZGlzcGxheTpibG9jazt9XHJcbnRoIHsgcG9zaXRpb246IHN0aWNreTsgdG9wOiAwOyB9Il19 */");

/***/ }),

/***/ "k379":
/*!*****************************************************************!*\
  !*** ./src/app/core/components/app/navbar/navbar.component.css ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".nav-item{\r\npadding-right: 5px;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5hdmJhci5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0Esa0JBQWtCO0FBQ2xCIiwiZmlsZSI6Im5hdmJhci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5hdi1pdGVte1xyXG5wYWRkaW5nLXJpZ2h0OiA1cHg7XHJcbn1cclxuIl19 */");

/***/ }),

/***/ "mQAL":
/*!**********************************************************************************!*\
  !*** ./src/app/core/components/app/mobile-sidebar/mobile-sidebar.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mobile-toggle-btn {\n  position: fixed;\n  left: 15px;\n  top: 15px;\n  z-index: 1032;\n  background: #fff;\n  border: none;\n  color: #333;\n  width: 45px;\n  height: 45px;\n  border-radius: 50%;\n  cursor: pointer;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);\n  transition: all 0.3s ease;\n}\n@media (max-width: 991px) {\n  .mobile-toggle-btn {\n    display: flex;\n  }\n}\n.mobile-toggle-btn i {\n  font-size: 24px;\n  transition: transform 0.3s ease;\n}\n.mobile-toggle-btn:hover {\n  transform: translateX(5px);\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);\n}\n.mobile-sidebar {\n  display: none;\n}\n@media (max-width: 991px) {\n  .mobile-sidebar {\n    display: block;\n  }\n}\n.mobile-sidebar .sidebar-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.3);\n  -webkit-backdrop-filter: blur(3px);\n          backdrop-filter: blur(3px);\n  z-index: 1030;\n  opacity: 0;\n  visibility: hidden;\n  transition: all 0.3s ease;\n}\n.mobile-sidebar .sidebar-content {\n  position: fixed;\n  top: 0;\n  left: -300px;\n  width: 300px;\n  height: 100vh;\n  background: linear-gradient(to bottom, #ffffff, #f8f9fa);\n  z-index: 1031;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 5px 0 25px rgba(0, 0, 0, 0.1);\n  overflow-y: auto;\n}\n.mobile-sidebar .sidebar-content::-webkit-scrollbar {\n  width: 6px;\n}\n.mobile-sidebar .sidebar-content::-webkit-scrollbar-track {\n  background: #f1f1f1;\n}\n.mobile-sidebar .sidebar-content::-webkit-scrollbar-thumb {\n  background: #888;\n  border-radius: 3px;\n}\n.mobile-sidebar.open .mobile-toggle-btn {\n  left: 280px;\n  transform: translateX(-50%);\n  background: #f44336;\n  color: white;\n}\n.mobile-sidebar.open .mobile-toggle-btn i {\n  transform: rotate(180deg);\n}\n.mobile-sidebar.open .mobile-toggle-btn:hover {\n  transform: translateX(-50%) translateX(-5px);\n}\n.mobile-sidebar.open .sidebar-overlay {\n  opacity: 1;\n  visibility: visible;\n}\n.mobile-sidebar.open .sidebar-content {\n  left: 0;\n}\n.mobile-sidebar .sidebar-header {\n  padding: 20px;\n  background: #fff;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 2;\n}\n.mobile-sidebar .sidebar-header h4 {\n  margin: 0;\n  font-size: 18px;\n  font-weight: 500;\n  color: #2c3e50;\n}\n.mobile-sidebar .sidebar-header .close-btn {\n  width: 35px;\n  height: 35px;\n  border: none;\n  background: #f8f9fa;\n  border-radius: 10px;\n  color: #2c3e50;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.mobile-sidebar .sidebar-header .close-btn:hover {\n  background: #f1f1f1;\n  transform: rotate(90deg);\n}\n.mobile-sidebar .sidebar-header .close-btn i {\n  font-size: 20px;\n}\n.mobile-sidebar .sidebar-menu {\n  padding: 20px;\n}\n.mobile-sidebar .sidebar-menu .logo {\n  padding: 10px 0 25px;\n  text-align: center;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  margin-bottom: 20px;\n}\n.mobile-sidebar .sidebar-menu .logo .simple-text {\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  justify-content: center;\n  text-decoration: none;\n  color: #2c3e50;\n  font-weight: 500;\n  font-size: 20px;\n}\n.mobile-sidebar .sidebar-menu .logo .simple-text .logo-img {\n  width: 100px;\n  margin-right: 10px;\n  position: relative;\n}\n.mobile-sidebar .sidebar-menu .logo .simple-text .logo-img img {\n  width: 100%;\n  height: 100%;\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n.mobile-sidebar .sidebar-menu .nav {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n.mobile-sidebar .sidebar-menu .nav li {\n  margin-bottom: 5px;\n}\n.mobile-sidebar .sidebar-menu .nav li a {\n  padding: 12px 15px;\n  border-radius: 12px;\n  color: #2c3e50;\n  text-decoration: none;\n  display: flex;\n  align-items: center;\n  transition: all 0.2s ease;\n  font-weight: 400;\n}\n.mobile-sidebar .sidebar-menu .nav li a:hover {\n  background: rgba(0, 0, 0, 0.03);\n  transform: translateX(5px);\n}\n.mobile-sidebar .sidebar-menu .nav li a i {\n  font-size: 20px;\n  margin-right: 12px;\n  color: #666;\n  width: 25px;\n  text-align: center;\n}\n.mobile-sidebar .sidebar-menu .nav li a p {\n  margin: 0;\n  font-size: 14px;\n}\n.mobile-sidebar .sidebar-menu .nav li.active > a {\n  background: linear-gradient(45deg, #f44336, #ff5252);\n  color: #fff;\n  box-shadow: 0 5px 15px rgba(244, 67, 54, 0.3);\n}\n.mobile-sidebar .sidebar-menu .nav li.active > a i {\n  color: #fff;\n}\n.mobile-sidebar .sidebar-menu .nav li.active > a:hover {\n  transform: translateX(5px) translateY(-2px);\n}\n.logout-btn {\n  margin-top: 20px;\n  display: flex;\n  align-items: center;\n  background-color: #f44336;\n  /* Red color for exit */\n  color: white;\n  /* Text color */\n  border-radius: 5px;\n  /* Rounded corners */\n  padding: 10px 15px;\n  /* Padding for better size */\n  transition: background-color 0.3s, transform 0.2s;\n  /* Smooth transition */\n  width: 100%;\n  /* Full width */\n  justify-content: center;\n  /* Center the content */\n}\n.logout-btn:hover {\n  background-color: #d32f2f;\n  /* Darker red on hover */\n  transform: scale(1.05);\n  /* Slightly enlarge on hover */\n}\n.logout-btn:focus {\n  outline: none;\n  /* Remove default outline */\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcLi5cXG1vYmlsZS1zaWRlYmFyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsZUFBQTtFQUNBLFVBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsMENBQUE7RUFDQSx5QkFBQTtBQUNGO0FBQ0U7RUFsQkY7SUFtQkksYUFBQTtFQUVGO0FBQ0Y7QUFBRTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtBQUVKO0FBQ0U7RUFDRSwwQkFBQTtFQUNBLHlDQUFBO0FBQ0o7QUFHQTtFQUNFLGFBQUE7QUFBRjtBQUVFO0VBSEY7SUFJSSxjQUFBO0VBQ0Y7QUFDRjtBQUNFO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxvQ0FBQTtFQUNBLGtDQUFBO1VBQUEsMEJBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUFDSjtBQUVFO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSx3REFBQTtFQUNBLGFBQUE7RUFDQSxpREFBQTtFQUNBLHlDQUFBO0VBQ0EsZ0JBQUE7QUFBSjtBQUVJO0VBQ0UsVUFBQTtBQUFOO0FBR0k7RUFDRSxtQkFBQTtBQUROO0FBSUk7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FBRk47QUFPSTtFQUNFLFdBQUE7RUFDQSwyQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQUxOO0FBT007RUFDRSx5QkFBQTtBQUxSO0FBUU07RUFDRSw0Q0FBQTtBQU5SO0FBVUk7RUFDRSxVQUFBO0VBQ0EsbUJBQUE7QUFSTjtBQVdJO0VBQ0UsT0FBQTtBQVROO0FBYUU7RUFDRSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0Q0FBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0Esd0JBQUE7RUFBQSxnQkFBQTtFQUNBLE1BQUE7RUFDQSxVQUFBO0FBWEo7QUFhSTtFQUNFLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBWE47QUFjSTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBWk47QUFjTTtFQUNFLG1CQUFBO0VBQ0Esd0JBQUE7QUFaUjtBQWVNO0VBQ0UsZUFBQTtBQWJSO0FBa0JFO0VBQ0UsYUFBQTtBQWhCSjtBQWtCSTtFQUNFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSw0Q0FBQTtFQUNBLG1CQUFBO0FBaEJOO0FBa0JNO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQWhCUjtBQWtCUTtFQUNFLFlBQUE7RUFFQSxrQkFBQTtFQUNBLGtCQUFBO0FBakJWO0FBbUJVO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtLQUFBLG1CQUFBO0FBakJaO0FBdUJJO0VBQ0UsU0FBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQXJCTjtBQXVCTTtFQUNFLGtCQUFBO0FBckJSO0FBdUJRO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUFyQlY7QUF1QlU7RUFDRSwrQkFBQTtFQUNBLDBCQUFBO0FBckJaO0FBd0JVO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQXRCWjtBQXlCVTtFQUNFLFNBQUE7RUFDQSxlQUFBO0FBdkJaO0FBMkJRO0VBQ0Usb0RBQUE7RUFDQSxXQUFBO0VBQ0EsNkNBQUE7QUF6QlY7QUEyQlU7RUFDRSxXQUFBO0FBekJaO0FBNEJVO0VBQ0UsMkNBQUE7QUExQlo7QUFrQ0E7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0VBQTJCLHVCQUFBO0VBQzNCLFlBQUE7RUFBYyxlQUFBO0VBQ2Qsa0JBQUE7RUFBb0Isb0JBQUE7RUFDcEIsa0JBQUE7RUFBb0IsNEJBQUE7RUFDcEIsaURBQUE7RUFBbUQsc0JBQUE7RUFDbkQsV0FBQTtFQUFhLGVBQUE7RUFDYix1QkFBQTtFQUF5Qix1QkFBQTtBQXhCM0I7QUEyQkE7RUFDRSx5QkFBQTtFQUEyQix3QkFBQTtFQUMzQixzQkFBQTtFQUF3Qiw4QkFBQTtBQXRCMUI7QUF5QkE7RUFDRSxhQUFBO0VBQWUsMkJBQUE7QUFyQmpCIiwiZmlsZSI6Im1vYmlsZS1zaWRlYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1vYmlsZS10b2dnbGUtYnRuIHtcclxuICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgbGVmdDogMTVweDtcclxuICB0b3A6IDE1cHg7XHJcbiAgei1pbmRleDogMTAzMjtcclxuICBiYWNrZ3JvdW5kOiAjZmZmO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBjb2xvcjogIzMzMztcclxuICB3aWR0aDogNDVweDtcclxuICBoZWlnaHQ6IDQ1cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYm94LXNoYWRvdzogMCAzcHggMTBweCByZ2JhKDAsMCwwLDAuMDgpO1xyXG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcblxyXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA5OTFweCkge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICB9XHJcblxyXG4gIGkge1xyXG4gICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTtcclxuICB9XHJcblxyXG4gICY6aG92ZXIge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDVweCk7XHJcbiAgICBib3gtc2hhZG93OiAwIDVweCAxNXB4IHJnYmEoMCwwLDAsMC4xKTtcclxuICB9XHJcbn1cclxuXHJcbi5tb2JpbGUtc2lkZWJhciB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxuXHJcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDk5MXB4KSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcblxyXG4gIC5zaWRlYmFyLW92ZXJsYXkge1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xyXG4gICAgYmFja2Ryb3AtZmlsdGVyOiBibHVyKDNweCk7XHJcbiAgICB6LWluZGV4OiAxMDMwO1xyXG4gICAgb3BhY2l0eTogMDtcclxuICAgIHZpc2liaWxpdHk6IGhpZGRlbjtcclxuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XHJcbiAgfVxyXG5cclxuICAuc2lkZWJhci1jb250ZW50IHtcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IC0zMDBweDtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIGhlaWdodDogMTAwdmg7XHJcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAjZmZmZmZmLCAjZjhmOWZhKTtcclxuICAgIHotaW5kZXg6IDEwMzE7XHJcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xyXG4gICAgYm94LXNoYWRvdzogNXB4IDAgMjVweCByZ2JhKDAsMCwwLDAuMSk7XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG5cclxuICAgICY6Oi13ZWJraXQtc2Nyb2xsYmFyIHtcclxuICAgICAgd2lkdGg6IDZweDtcclxuICAgIH1cclxuXHJcbiAgICAmOjotd2Via2l0LXNjcm9sbGJhci10cmFjayB7XHJcbiAgICAgIGJhY2tncm91bmQ6ICNmMWYxZjE7XHJcbiAgICB9XHJcblxyXG4gICAgJjo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWIge1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjODg4O1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAmLm9wZW4ge1xyXG4gICAgLm1vYmlsZS10b2dnbGUtYnRuIHtcclxuICAgICAgbGVmdDogMjgwcHg7XHJcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcclxuICAgICAgYmFja2dyb3VuZDogI2Y0NDMzNjtcclxuICAgICAgY29sb3I6IHdoaXRlO1xyXG4gICAgICBcclxuICAgICAgaSB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVgoLTVweCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAuc2lkZWJhci1vdmVybGF5IHtcclxuICAgICAgb3BhY2l0eTogMTtcclxuICAgICAgdmlzaWJpbGl0eTogdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICAuc2lkZWJhci1jb250ZW50IHtcclxuICAgICAgbGVmdDogMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5zaWRlYmFyLWhlYWRlciB7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMDUpO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwb3NpdGlvbjogc3RpY2t5O1xyXG4gICAgdG9wOiAwO1xyXG4gICAgei1pbmRleDogMjtcclxuXHJcbiAgICBoNCB7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICBjb2xvcjogIzJjM2U1MDtcclxuICAgIH1cclxuXHJcbiAgICAuY2xvc2UtYnRuIHtcclxuICAgICAgd2lkdGg6IDM1cHg7XHJcbiAgICAgIGhlaWdodDogMzVweDtcclxuICAgICAgYm9yZGVyOiBub25lO1xyXG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmOWZhO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgICBjb2xvcjogIzJjM2U1MDtcclxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xyXG4gICAgICBcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZDogI2YxZjFmMTtcclxuICAgICAgICB0cmFuc2Zvcm06IHJvdGF0ZSg5MGRlZyk7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGkge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnNpZGViYXItbWVudSB7XHJcbiAgICBwYWRkaW5nOiAyMHB4O1xyXG5cclxuICAgIC5sb2dvIHtcclxuICAgICAgcGFkZGluZzogMTBweCAwIDI1cHg7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4wNSk7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcblxyXG4gICAgICAuc2ltcGxlLXRleHQge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgICAgICBjb2xvcjogIzJjM2U1MDtcclxuICAgICAgICBmb250LXdlaWdodDogNTAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuXHJcbiAgICAgICAgLmxvZ28taW1nIHtcclxuICAgICAgICAgIHdpZHRoOiAxMDBweDtcclxuICAgICAgICAgXHJcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XHJcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICAgICAgICAgaW1nIHtcclxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcclxuICAgICAgICAgICAgb2JqZWN0LWZpdDogY29udGFpbjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAubmF2IHtcclxuICAgICAgbWFyZ2luOiAwO1xyXG4gICAgICBwYWRkaW5nOiAwO1xyXG4gICAgICBsaXN0LXN0eWxlOiBub25lO1xyXG5cclxuICAgICAgbGkge1xyXG4gICAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxuXHJcbiAgICAgICAgYSB7XHJcbiAgICAgICAgICBwYWRkaW5nOiAxMnB4IDE1cHg7XHJcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gICAgICAgICAgY29sb3I6ICMyYzNlNTA7XHJcbiAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNDAwO1xyXG5cclxuICAgICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuMDMpO1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNXB4KTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBpIHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjNjY2O1xyXG4gICAgICAgICAgICB3aWR0aDogMjVweDtcclxuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIHAge1xyXG4gICAgICAgICAgICBtYXJnaW46IDA7XHJcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICYuYWN0aXZlID4gYSB7XHJcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsICNmNDQzMzYsICNmZjUyNTIpO1xyXG4gICAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDVweCAxNXB4IHJnYmEoMjQ0LCA2NywgNTQsIDAuMyk7XHJcblxyXG4gICAgICAgICAgaSB7XHJcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICY6aG92ZXIge1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoNXB4KSB0cmFuc2xhdGVZKC0ycHgpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSBcclxuXHJcbi5sb2dvdXQtYnRuIHtcclxuICBtYXJnaW4tdG9wOiAyMHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjQ0MzM2OyAvKiBSZWQgY29sb3IgZm9yIGV4aXQgKi9cclxuICBjb2xvcjogd2hpdGU7IC8qIFRleHQgY29sb3IgKi9cclxuICBib3JkZXItcmFkaXVzOiA1cHg7IC8qIFJvdW5kZWQgY29ybmVycyAqL1xyXG4gIHBhZGRpbmc6IDEwcHggMTVweDsgLyogUGFkZGluZyBmb3IgYmV0dGVyIHNpemUgKi9cclxuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIDAuM3MsIHRyYW5zZm9ybSAwLjJzOyAvKiBTbW9vdGggdHJhbnNpdGlvbiAqL1xyXG4gIHdpZHRoOiAxMDAlOyAvKiBGdWxsIHdpZHRoICovXHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IC8qIENlbnRlciB0aGUgY29udGVudCAqL1xyXG59XHJcblxyXG4ubG9nb3V0LWJ0bjpob3ZlciB7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QzMmYyZjsgLyogRGFya2VyIHJlZCBvbiBob3ZlciAqL1xyXG4gIHRyYW5zZm9ybTogc2NhbGUoMS4wNSk7IC8qIFNsaWdodGx5IGVubGFyZ2Ugb24gaG92ZXIgKi9cclxufVxyXG5cclxuLmxvZ291dC1idG46Zm9jdXMge1xyXG4gIG91dGxpbmU6IG5vbmU7IC8qIFJlbW92ZSBkZWZhdWx0IG91dGxpbmUgKi9cclxufSJdfQ== */");

/***/ }),

/***/ "qU61":
/*!*****************************************************************!*\
  !*** ./src/app/core/services/http-entity-repository.service.ts ***!
  \*****************************************************************/
/*! exports provided: HttpEntityRepositoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpEntityRepositoryService", function() { return HttpEntityRepositoryService; });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! environments/environment */ "AytR");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//If the token is sent with interception, there is no need to send header information here, 
//but if the token information does not go in the request header with interception, it must be sent with a method in this class.
var HttpEntityRepositoryService = /** @class */ (function () {
    function HttpEntityRepositoryService(httpClient) {
        this.httpClient = httpClient;
    }
    /// /api/[controller] - GET
    HttpEntityRepositoryService.prototype.getAll = function (_url) {
        return this.httpClient.get(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].getApiUrl + _url);
    };
    //api/[controller]/:id - GET
    HttpEntityRepositoryService.prototype.get = function (_url, id) {
        return this.httpClient.get(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].getApiUrl + _url + ((id != undefined && id != null) ? +id : ""));
    };
    /// /api/[controller] - POST
    HttpEntityRepositoryService.prototype.add = function (_url, _content) {
        return this.httpClient.post(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].getApiUrl + _url, _content);
    };
    // /api/[controller] - PUT
    HttpEntityRepositoryService.prototype.update = function (_url, _content) {
        return this.httpClient.put(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].getApiUrl + _url, _content);
    };
    // /api/[controller]/:id - DELETE
    HttpEntityRepositoryService.prototype.delete = function (_url, id) {
        return this.httpClient.delete(environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].getApiUrl + _url + id);
    };
    HttpEntityRepositoryService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"] }
    ]; };
    HttpEntityRepositoryService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_0__["HttpClient"]])
    ], HttpEntityRepositoryService);
    return HttpEntityRepositoryService;
}());



/***/ }),

/***/ "qYzc":
/*!***************************************************!*\
  !*** ./src/app/core/modules/components.module.ts ***!
  \***************************************************/
/*! exports provided: ComponentsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentsModule", function() { return ComponentsModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "sYmb");
/* harmony import */ var _components_app_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/app/footer/footer.component */ "telB");
/* harmony import */ var _components_app_mobile_sidebar_mobile_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/app/mobile-sidebar/mobile-sidebar.component */ "JosV");
/* harmony import */ var _components_app_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/app/navbar/navbar.component */ "EaH1");
/* harmony import */ var _components_app_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/app/sidebar/sidebar.component */ "2ew8");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateModule"],
            ],
            declarations: [
                _components_app_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"],
                _components_app_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"],
                _components_app_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_7__["SidebarComponent"],
                _components_app_mobile_sidebar_mobile_sidebar_component__WEBPACK_IMPORTED_MODULE_5__["MobileSidebarComponent"]
            ],
            exports: [
                _components_app_footer_footer_component__WEBPACK_IMPORTED_MODULE_4__["FooterComponent"],
                _components_app_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_6__["NavbarComponent"],
                _components_app_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_7__["SidebarComponent"],
                _components_app_mobile_sidebar_mobile_sidebar_component__WEBPACK_IMPORTED_MODULE_5__["MobileSidebarComponent"]
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());



/***/ }),

/***/ "sppB":
/*!********************************************!*\
  !*** ./src/app/core/guards/login-guard.ts ***!
  \********************************************/
/*! exports provided: LoginGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginGuard", function() { return LoginGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/admin/login/Services/auth.service */ "a9M/");
/* harmony import */ var _services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/local-storage.service */ "3G0t");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginGuard = /** @class */ (function () {
    function LoginGuard(router, authService, localStorage) {
        this.router = router;
        this.authService = authService;
        this.localStorage = localStorage;
    }
    LoginGuard.prototype.canActivate = function (route, state) {
        if (this.authService.loggedIn()) {
            return true;
        }
        this.localStorage.removeItem('token');
        this.localStorage.removeItem('refreshToken');
        this.router.navigate(["login"]);
        return false;
    };
    LoginGuard.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: _components_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
        { type: _services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"] }
    ]; };
    LoginGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _components_admin_login_Services_auth_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _services_local_storage_service__WEBPACK_IMPORTED_MODULE_3__["LocalStorageService"]])
    ], LoginGuard);
    return LoginGuard;
}());



/***/ }),

/***/ "telB":
/*!****************************************************************!*\
  !*** ./src/app/core/components/app/footer/footer.component.ts ***!
  \****************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _raw_loader_footer_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! raw-loader!./footer.component.html */ "vsQ3");
/* harmony import */ var _footer_component_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./footer.component.css */ "UENe");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.test = new Date();
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent.ctorParameters = function () { return []; };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-footer',
            template: _raw_loader_footer_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
            styles: [_footer_component_css__WEBPACK_IMPORTED_MODULE_1__["default"]]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "vsQ3":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/core/components/app/footer/footer.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<footer class=\"footer \">\r\n\r\n</footer>\r\n");

/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! hammerjs */ "yLV6");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_4__);
/*!

=========================================================
* Material Dashboard Angular - v2.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-angular2
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-angular2/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/





if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]);


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./core/modules/admin-layout.module": [
		"CvCy",
		"core-modules-admin-layout-module"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "zn8P";
module.exports = webpackAsyncContext;

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map