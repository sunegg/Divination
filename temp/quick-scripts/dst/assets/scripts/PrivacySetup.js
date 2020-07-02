
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/PrivacySetup.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80a3eHlGQFCMbIs8tiJCwBG', 'PrivacySetup');
// scripts/PrivacySetup.ts

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
var GameData_1 = require("./GameData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PrivacySetup = /** @class */ (function (_super) {
    __extends(PrivacySetup, _super);
    function PrivacySetup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrivacySetup.prototype.onLoad = function () {
        cc.log("privacyUrl" + this.encode_utf8(GameData_1.default.privacyUrl));
        this.webView.url = this.encode_utf8(GameData_1.default.privacyUrl);
    };
    PrivacySetup.prototype.encode_utf8 = function (s) {
        return unescape(encodeURIComponent(s));
    };
    __decorate([
        property(cc.WebView)
    ], PrivacySetup.prototype, "webView", void 0);
    PrivacySetup = __decorate([
        ccclass
    ], PrivacySetup);
    return PrivacySetup;
}(cc.Component));
exports.default = PrivacySetup;

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1ByaXZhY3lTZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRix1Q0FBa0M7QUFFNUIsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBWTtJQUF0RDs7SUFjQSxDQUFDO0lBVEcsNkJBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFhLENBQUM7UUFDVixPQUFPLFFBQVEsQ0FBRSxrQkFBa0IsQ0FBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO0lBQy9DLENBQUM7SUFURDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2lEQUNEO0lBSEgsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWNoQztJQUFELG1CQUFDO0NBZEQsQUFjQyxDQWR5QyxFQUFFLENBQUMsU0FBUyxHQWNyRDtrQkFkb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4vR2FtZURhdGFcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcml2YWN5U2V0dXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLldlYlZpZXcpXG4gICAgd2ViVmlldzogY2MuV2ViVmlldztcbiAgICAgICAgXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjYy5sb2coXCJwcml2YWN5VXJsXCIrdGhpcy5lbmNvZGVfdXRmOChHYW1lRGF0YS5wcml2YWN5VXJsKSk7XG4gICAgICAgIHRoaXMud2ViVmlldy51cmwgPSB0aGlzLmVuY29kZV91dGY4KEdhbWVEYXRhLnByaXZhY3lVcmwpO1xuICAgIH1cblxuICAgIGVuY29kZV91dGY4KCBzICl7XG4gICAgICAgIHJldHVybiB1bmVzY2FwZSggZW5jb2RlVVJJQ29tcG9uZW50KCBzICkgKTtcbiAgICB9XG5cbn1cbiJdfQ==