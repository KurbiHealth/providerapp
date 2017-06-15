webpackJsonp([0],{

/***/ 447:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_menu_popover__ = __webpack_require__(450);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserMenuPopoverPageModule", function() { return UserMenuPopoverPageModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var UserMenuPopoverPageModule = (function () {
    function UserMenuPopoverPageModule() {
    }
    return UserMenuPopoverPageModule;
}());
UserMenuPopoverPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__user_menu_popover__["a" /* UserMenuPopoverPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__user_menu_popover__["a" /* UserMenuPopoverPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__user_menu_popover__["a" /* UserMenuPopoverPage */]
        ]
    })
], UserMenuPopoverPageModule);

//# sourceMappingURL=user-menu-popover.module.js.map

/***/ }),

/***/ 450:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMenuPopoverPage; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the UserMenuPopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserMenuPopoverPage = (function () {
    function UserMenuPopoverPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    UserMenuPopoverPage.prototype.logout = function () {
    };
    UserMenuPopoverPage.prototype.ionViewDidLoad = function () {
    };
    return UserMenuPopoverPage;
}());
UserMenuPopoverPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-user-menu-popover',template:/*ion-inline-start:"/home/mati/Development/Kurbi/providerapp/src/pages/user-menu-popover/user-menu-popover.html"*/'<ion-content padding>\n  <ion-list>\n    <button ion-item (click)="logout()">\n      Logout\n    </button>  \n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/mati/Development/Kurbi/providerapp/src/pages/user-menu-popover/user-menu-popover.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], UserMenuPopoverPage);

//# sourceMappingURL=user-menu-popover.js.map

/***/ })

});
//# sourceMappingURL=0.main.js.map