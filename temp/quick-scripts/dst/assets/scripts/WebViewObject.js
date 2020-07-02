
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/WebViewObject.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '95bacYoyGRP8IFn7Mwr1xDx', 'WebViewObject');
// scripts/WebViewObject.ts

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
var WebViewObject = /** @class */ (function (_super) {
    __extends(WebViewObject, _super);
    function WebViewObject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebViewObject.prototype.start = function () {
        //cc.log(cc.director.getWinSizeInPixels());
        //cc.log(cc.director.getWinSize());
        //cc.log(cc.winSize);
        //cc.log(cc.view.getVisibleSize());
        //cc.log(cc.view.getFrameSize());
        this.node.setContentSize(cc.winSize);
        var webView = this.getComponent(cc.WebView);
        var idfa = jsb.reflection.callStaticMethod("DeviceUtils", "getIDFAString");
        var idfv = jsb.reflection.callStaticMethod("DeviceUtils", "getIDFVString");
        console.log("idfa" + idfa);
        console.log("idfv" + idfv);
        //var ret = jsb.reflection.callStaticMethod("DeviceUtils",
        //                                 "callNativeUIWithTitle:andContent:",
        //                                 "cocos2d-js",
        //    "Yes! you call a Native UI from Reflection");
        //    console.log(ret);
        //GameData.url = "http://sdk.panguhy.com/game/?pgcid=2&gameId=3&sid=80e01b8572fd4130b3591dd6eac0fee8&deviceId=7522b6708b88464b70c3bf0c9ee60ea1";
        console.log("加载" + this.encode_utf8(this.FormatString(GameData_1.default.url, idfa, idfv)));
        webView.url = this.encode_utf8(this.FormatString(GameData_1.default.url, idfa, idfv));
    };
    WebViewObject.prototype.FormatString = function (str) {
        var val = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            val[_i - 1] = arguments[_i];
        }
        for (var index = 0; index < val.length; index++) {
            str = str.replace("{" + index + "}", val[index]);
        }
        return str;
    };
    WebViewObject.prototype.encode_utf8 = function (s) {
        return unescape(encodeURIComponent(s));
    };
    WebViewObject = __decorate([
        ccclass
    ], WebViewObject);
    return WebViewObject;
}(cc.Component));
exports.default = WebViewObject;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1dlYlZpZXdPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsdUNBQWtDO0FBRTVCLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7O0lBb0NBLENBQUM7SUFsQ0csNkJBQUssR0FBTDtRQUNJLDJDQUEyQztRQUMzQyxtQ0FBbUM7UUFDbkMscUJBQXFCO1FBQ3JCLG1DQUFtQztRQUNuQyxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzNFLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzNCLDBEQUEwRDtRQUMxRCx1RUFBdUU7UUFDdkUsZ0RBQWdEO1FBQ2hELG1EQUFtRDtRQUNuRCx1QkFBdUI7UUFDdkIsZ0pBQWdKO1FBQ2hKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBUSxDQUFDLEdBQUcsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hGLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxvQ0FBWSxHQUFaLFVBQWEsR0FBVztRQUFFLGFBQWdCO2FBQWhCLFVBQWdCLEVBQWhCLHFCQUFnQixFQUFoQixJQUFnQjtZQUFoQiw0QkFBZ0I7O1FBQ3RDLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQy9DLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQUksS0FBSyxNQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDN0M7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFSixtQ0FBVyxHQUFYLFVBQWEsQ0FBQztRQUNULE9BQU8sUUFBUSxDQUFFLGtCQUFrQixDQUFFLENBQUMsQ0FBRSxDQUFFLENBQUM7SUFDL0MsQ0FBQztJQWpDZ0IsYUFBYTtRQURqQyxPQUFPO09BQ2EsYUFBYSxDQW9DakM7SUFBRCxvQkFBQztDQXBDRCxBQW9DQyxDQXBDMEMsRUFBRSxDQUFDLFNBQVMsR0FvQ3REO2tCQXBDb0IsYUFBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4vR2FtZURhdGFcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJWaWV3T2JqZWN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIHN0YXJ0KCkge1xuICAgICAgICAvL2NjLmxvZyhjYy5kaXJlY3Rvci5nZXRXaW5TaXplSW5QaXhlbHMoKSk7XG4gICAgICAgIC8vY2MubG9nKGNjLmRpcmVjdG9yLmdldFdpblNpemUoKSk7XG4gICAgICAgIC8vY2MubG9nKGNjLndpblNpemUpO1xuICAgICAgICAvL2NjLmxvZyhjYy52aWV3LmdldFZpc2libGVTaXplKCkpO1xuICAgICAgICAvL2NjLmxvZyhjYy52aWV3LmdldEZyYW1lU2l6ZSgpKTtcbiAgICAgICAgdGhpcy5ub2RlLnNldENvbnRlbnRTaXplIChjYy53aW5TaXplKTtcbiAgICAgICAgbGV0IHdlYlZpZXcgPSB0aGlzLmdldENvbXBvbmVudChjYy5XZWJWaWV3KTtcbiAgICAgICAgdmFyIGlkZmEgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKFwiRGV2aWNlVXRpbHNcIiwgXCJnZXRJREZBU3RyaW5nXCIpO1xuICAgICAgICB2YXIgaWRmdiA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJEZXZpY2VVdGlsc1wiLCBcImdldElERlZTdHJpbmdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaWRmYVwiICsgaWRmYSk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaWRmdlwiICsgaWRmdik7XG4gICAgICAgIC8vdmFyIHJldCA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJEZXZpY2VVdGlsc1wiLFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FsbE5hdGl2ZVVJV2l0aFRpdGxlOmFuZENvbnRlbnQ6XCIsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb2NvczJkLWpzXCIsXG4gICAgICAgIC8vICAgIFwiWWVzISB5b3UgY2FsbCBhIE5hdGl2ZSBVSSBmcm9tIFJlZmxlY3Rpb25cIik7XG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKHJldCk7XG4gICAgICAgIC8vR2FtZURhdGEudXJsID0gXCJodHRwOi8vc2RrLnBhbmd1aHkuY29tL2dhbWUvP3BnY2lkPTImZ2FtZUlkPTMmc2lkPTgwZTAxYjg1NzJmZDQxMzBiMzU5MWRkNmVhYzBmZWU4JmRldmljZUlkPTc1MjJiNjcwOGI4ODQ2NGI3MGMzYmYwYzllZTYwZWExXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5Yqg6L29XCIgKyB0aGlzLmVuY29kZV91dGY4KHRoaXMuRm9ybWF0U3RyaW5nKEdhbWVEYXRhLnVybCxpZGZhLGlkZnYpKSk7XG4gICAgICAgIHdlYlZpZXcudXJsID0gdGhpcy5lbmNvZGVfdXRmOCh0aGlzLkZvcm1hdFN0cmluZyhHYW1lRGF0YS51cmwsaWRmYSxpZGZ2KSk7XG4gICAgfVxuXG4gICAgRm9ybWF0U3RyaW5nKHN0cjogc3RyaW5nLCAuLi52YWw6IHN0cmluZ1tdKSB7XG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB2YWwubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UoYHske2luZGV4fX1gLCB2YWxbaW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgfVxuXG4gICBlbmNvZGVfdXRmOCggcyApe1xuICAgICAgICByZXR1cm4gdW5lc2NhcGUoIGVuY29kZVVSSUNvbXBvbmVudCggcyApICk7XG4gICAgfVxuICBcblxufVxuIl19