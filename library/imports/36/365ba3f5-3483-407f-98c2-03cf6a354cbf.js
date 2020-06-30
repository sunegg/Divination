"use strict";
cc._RF.push(module, '365baP1NINAf5jCA89qNUy/', 'Appegg');
// scripts/Appegg.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Appegg = /** @class */ (function (_super) {
    __extends(Appegg, _super);
    function Appegg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.configUrl = "https://api2.bmob.cn/1/classes/List/u8QxFFFS";
        _this.apiKey = "89f2d6cc27985334699879bfa8aa9dfd";
        _this.restApiKey = "9278a7e3613aefe7ec07e390c2276bf2";
        _this.currentVersion = 0;
        return _this;
        // update (dt) {}
    }
    Appegg_1 = Appegg;
    // LIFE-CYCLE CALLBACKS:
    Appegg.prototype.onLoad = function () {
        this.privacyButton.node.on("click", this.onPrivacyClick, this);
        this.startButton.node.on("click", this.onStartClick, this);
        this.retryButton.node.on("click", this.onRetryClick, this);
    };
    Appegg.prototype.start = function () {
        this.currentVersion = cc.sys.localStorage.getItem("version");
        this.connect();
    };
    Appegg.prototype.connect = function () {
        this.httpGetAsync(this.configUrl, function (str) {
            var obj = JSON.parse(str);
            Appegg_1.url = obj.url;
            Appegg_1.privacyUrl = obj.privacyUrl;
            cc.log(str);
            cc.log("当前appType为" + obj.appType);
            switch (obj.appType) {
                case 1:
                    //if (this.currentVersion != obj.version)
                    cc.director.loadScene("entry");
                    break;
                case 2:
                    cc.director.loadScene("web");
                    break;
                case 3:
                    break;
            }
        }, function () {
            //cc.log("连接失败");
        });
    };
    Appegg.prototype.httpGetAsync = function (theUrl, callback, error) {
        if (error === void 0) { error = null; }
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onerror ==
            function (e) {
                cc.log("网络错误");
            };
        xmlHttp.ontimeout ==
            function (e) {
                cc.log("网络超时");
            };
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
            else {
                error();
            }
        };
        xmlHttp.open("GET", theUrl, false); // true 为异步
        xmlHttp.setRequestHeader("X-Bmob-Application-Id", this.apiKey);
        xmlHttp.setRequestHeader("X-Bmob-REST-API-Key", this.restApiKey);
        xmlHttp.send(null);
    };
    Appegg.prototype.onRetryClick = function (event) {
        this.errorView.active = false;
        this.connect();
    };
    Appegg.prototype.onPrivacyClick = function (event) {
        this.webView.active = true;
    };
    Appegg.prototype.onStartClick = function (event) {
        cc.director.loadScene("entry");
    };
    var Appegg_1;
    __decorate([
        property(cc.Node)
    ], Appegg.prototype, "changelogView", void 0);
    __decorate([
        property(cc.Label)
    ], Appegg.prototype, "changelogTitleLabel", void 0);
    __decorate([
        property(cc.Label)
    ], Appegg.prototype, "changelogContentLabel", void 0);
    __decorate([
        property(cc.Button)
    ], Appegg.prototype, "privacyButton", void 0);
    __decorate([
        property(cc.Button)
    ], Appegg.prototype, "startButton", void 0);
    __decorate([
        property(cc.Button)
    ], Appegg.prototype, "retryButton", void 0);
    __decorate([
        property(cc.Node)
    ], Appegg.prototype, "errorView", void 0);
    __decorate([
        property(cc.Node)
    ], Appegg.prototype, "webView", void 0);
    Appegg = Appegg_1 = __decorate([
        ccclass
    ], Appegg);
    return Appegg;
}(cc.Component));
exports.default = Appegg;

cc._RF.pop();