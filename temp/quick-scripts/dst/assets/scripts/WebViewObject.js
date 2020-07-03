
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
        console.log(this.encode_utf8(this.FormatString(GameData_1.default.url, idfa, idfv)));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1dlYlZpZXdPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsdUNBQWtDO0FBRTVCLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBMkMsaUNBQVk7SUFBdkQ7O0lBb0NBLENBQUM7SUFsQ0csNkJBQUssR0FBTDtRQUNJLDJDQUEyQztRQUMzQyxtQ0FBbUM7UUFDbkMscUJBQXFCO1FBQ3JCLG1DQUFtQztRQUNuQyxpQ0FBaUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzNFLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzNCLDBEQUEwRDtRQUMxRCx1RUFBdUU7UUFDdkUsZ0RBQWdEO1FBQ2hELG1EQUFtRDtRQUNuRCx1QkFBdUI7UUFDdkIsZ0pBQWdKO1FBQ2hKLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFRLENBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekUsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsa0JBQVEsQ0FBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELG9DQUFZLEdBQVosVUFBYSxHQUFXO1FBQUUsYUFBZ0I7YUFBaEIsVUFBZ0IsRUFBaEIscUJBQWdCLEVBQWhCLElBQWdCO1lBQWhCLDRCQUFnQjs7UUFDdEMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDL0MsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBSSxLQUFLLE1BQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM3QztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVKLG1DQUFXLEdBQVgsVUFBYSxDQUFDO1FBQ1QsT0FBTyxRQUFRLENBQUUsa0JBQWtCLENBQUUsQ0FBQyxDQUFFLENBQUUsQ0FBQztJQUMvQyxDQUFDO0lBakNnQixhQUFhO1FBRGpDLE9BQU87T0FDYSxhQUFhLENBb0NqQztJQUFELG9CQUFDO0NBcENELEFBb0NDLENBcEMwQyxFQUFFLENBQUMsU0FBUyxHQW9DdEQ7a0JBcENvQixhQUFhIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi9HYW1lRGF0YVwiO1xuXG5jb25zdCB7Y2NjbGFzcywgcHJvcGVydHl9ID0gY2MuX2RlY29yYXRvcjtcblxuQGNjY2xhc3NcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYlZpZXdPYmplY3QgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIC8vY2MubG9nKGNjLmRpcmVjdG9yLmdldFdpblNpemVJblBpeGVscygpKTtcbiAgICAgICAgLy9jYy5sb2coY2MuZGlyZWN0b3IuZ2V0V2luU2l6ZSgpKTtcbiAgICAgICAgLy9jYy5sb2coY2Mud2luU2l6ZSk7XG4gICAgICAgIC8vY2MubG9nKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKSk7XG4gICAgICAgIC8vY2MubG9nKGNjLnZpZXcuZ2V0RnJhbWVTaXplKCkpO1xuICAgICAgICB0aGlzLm5vZGUuc2V0Q29udGVudFNpemUgKGNjLndpblNpemUpO1xuICAgICAgICBsZXQgd2ViVmlldyA9IHRoaXMuZ2V0Q29tcG9uZW50KGNjLldlYlZpZXcpO1xuICAgICAgICB2YXIgaWRmYSA9IGpzYi5yZWZsZWN0aW9uLmNhbGxTdGF0aWNNZXRob2QoXCJEZXZpY2VVdGlsc1wiLCBcImdldElERkFTdHJpbmdcIik7XG4gICAgICAgIHZhciBpZGZ2ID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIkRldmljZVV0aWxzXCIsIFwiZ2V0SURGVlN0cmluZ1wiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJpZGZhXCIgKyBpZGZhKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJpZGZ2XCIgKyBpZGZ2KTtcbiAgICAgICAgLy92YXIgcmV0ID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChcIkRldmljZVV0aWxzXCIsXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjYWxsTmF0aXZlVUlXaXRoVGl0bGU6YW5kQ29udGVudDpcIixcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvY29zMmQtanNcIixcbiAgICAgICAgLy8gICAgXCJZZXMhIHlvdSBjYWxsIGEgTmF0aXZlIFVJIGZyb20gUmVmbGVjdGlvblwiKTtcbiAgICAgICAgLy8gICAgY29uc29sZS5sb2cocmV0KTtcbiAgICAgICAgLy9HYW1lRGF0YS51cmwgPSBcImh0dHA6Ly9zZGsucGFuZ3VoeS5jb20vZ2FtZS8/cGdjaWQ9MiZnYW1lSWQ9MyZzaWQ9ODBlMDFiODU3MmZkNDEzMGIzNTkxZGQ2ZWFjMGZlZTgmZGV2aWNlSWQ9NzUyMmI2NzA4Yjg4NDY0YjcwYzNiZjBjOWVlNjBlYTFcIjtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5lbmNvZGVfdXRmOCh0aGlzLkZvcm1hdFN0cmluZyhHYW1lRGF0YS51cmwsaWRmYSxpZGZ2KSkpO1xuICAgICAgICB3ZWJWaWV3LnVybCA9IHRoaXMuZW5jb2RlX3V0ZjgodGhpcy5Gb3JtYXRTdHJpbmcoR2FtZURhdGEudXJsLGlkZmEsaWRmdikpO1xuICAgIH1cblxuICAgIEZvcm1hdFN0cmluZyhzdHI6IHN0cmluZywgLi4udmFsOiBzdHJpbmdbXSkge1xuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdmFsLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKGB7JHtpbmRleH19YCwgdmFsW2luZGV4XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgIH1cblxuICAgZW5jb2RlX3V0ZjgoIHMgKXtcbiAgICAgICAgcmV0dXJuIHVuZXNjYXBlKCBlbmNvZGVVUklDb21wb25lbnQoIHMgKSApO1xuICAgIH1cbiAgXG5cbn1cbiJdfQ==