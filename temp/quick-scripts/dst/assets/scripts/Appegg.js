
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/Appegg.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
var GameData_1 = require("./GameData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Appegg = /** @class */ (function (_super) {
    __extends(Appegg, _super);
    function Appegg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.configUrl = "https://api2.bmob.cn/1/classes/List/u8QxFFFS";
        _this.apiKey = "89f2d6cc27985334699879bfa8aa9dfd";
        _this.restApiKey = "9278a7e3613aefe7ec07e390c2276bf2";
        return _this;
        // update (dt) {}
    }
    //static url;
    //static privacyUrl;
    //currentVersion: number = 0;
    // LIFE-CYCLE CALLBACKS:
    Appegg.prototype.onLoad = function () {
        this.privacyButton.node.on("click", this.onPrivacyClick, this);
        this.startButton.node.on("click", this.onStartClick, this);
        this.retryButton.node.on("click", this.onRetryClick, this);
    };
    Appegg.prototype.start = function () {
        //this.currentVersion = cc.sys.localStorage.getItem("version");
        this.connect();
    };
    Appegg.prototype.connect = function () {
        this.httpGetAsync(this.configUrl, function (str) {
            console.log(str);
            var obj = JSON.parse(str);
            console.log(obj.url);
            //obj.url = "http://sdk.panguhy.com/game/?pgcid=2&gameId=3&sid=b788b530481b40e8a988b189510d26cc&deviceId=7522b6708b88464b70c3bf0c9ee60ea1";
            GameData_1.default.url = obj.url;
            GameData_1.default.privacyUrl = obj.privacyUrl;
            console.log("当前appType为" + obj.appType);
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
                console.log("网络错误");
            };
        xmlHttp.ontimeout ==
            function (e) {
                console.log("网络超时");
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
    Appegg = __decorate([
        ccclass
    ], Appegg);
    return Appegg;
}(cc.Component));
exports.default = Appegg;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0FwcGVnZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRix1Q0FBa0M7QUFFNUIsSUFBQSxrQkFBcUMsRUFBbkMsb0JBQU8sRUFBRSxzQkFBMEIsQ0FBQztBQUc1QztJQUFvQywwQkFBWTtJQURoRDtRQUFBLHFFQW9IQztRQWxIQyxlQUFTLEdBQVcsOENBQThDLENBQUM7UUFDbkUsWUFBTSxHQUFXLGtDQUFrQyxDQUFDO1FBQ3BELGdCQUFVLEdBQVcsa0NBQWtDLENBQUM7O1FBK0d4RCxpQkFBaUI7SUFDbkIsQ0FBQztJQXRGQyxhQUFhO0lBRWIsb0JBQW9CO0lBRXBCLDZCQUE2QjtJQUM3Qix3QkFBd0I7SUFFeEIsdUJBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxzQkFBSyxHQUFMO1FBQ0MsK0RBQStEO1FBQzlELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUNFLElBQUksQ0FBQyxZQUFZLENBQ2YsSUFBSSxDQUFDLFNBQVMsRUFDZCxVQUFVLEdBQUc7WUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsMklBQTJJO1lBQzNJLGtCQUFRLENBQUMsR0FBRyxHQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUM7WUFDdEIsa0JBQVEsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEMsUUFBUSxHQUFHLENBQUMsT0FBTyxFQUFFO2dCQUNuQixLQUFLLENBQUM7b0JBQ0oseUNBQXlDO29CQUN6QyxFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDL0IsTUFBTTtnQkFDUixLQUFLLENBQUM7b0JBQ0osRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzdCLE1BQU07Z0JBQ1IsS0FBSyxDQUFDO29CQUNKLE1BQU07YUFDVDtRQUNILENBQUMsRUFDRDtZQUNFLGlCQUFpQjtRQUNuQixDQUFDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFJRCw2QkFBWSxHQUFaLFVBQWEsTUFBTSxFQUFFLFFBQVEsRUFBRSxLQUFZO1FBQVosc0JBQUEsRUFBQSxZQUFZO1FBQ3pDLElBQUksT0FBTyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDbkMsT0FBTyxDQUFDLE9BQU87WUFDYixVQUFVLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUztZQUNmLFVBQVUsQ0FBQztnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxrQkFBa0IsR0FBRztZQUMzQixJQUFJLE9BQU8sQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRztnQkFDbEQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztpQkFDNUI7Z0JBQ0gsS0FBSyxFQUFFLENBQUM7YUFDVDtRQUNILENBQUMsQ0FBQztRQUVGLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVc7UUFDL0MsT0FBTyxDQUFDLGdCQUFnQixDQUFDLHVCQUF1QixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxPQUFPLENBQUMsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUVELDZCQUFZLEdBQVosVUFBYSxLQUFLO1FBQ2hCLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELCtCQUFjLEdBQWQsVUFBZSxLQUFLO1FBQ2xCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUM3QixDQUFDO0lBRUQsNkJBQVksR0FBWixVQUFhLEtBQUs7UUFDaEIsRUFBRSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQTNHRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2lEQUNLO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7dURBQ1c7SUFHOUI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzt5REFDYTtJQUdoQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lEQUNLO0lBR3pCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ0c7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDRztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNDO0lBR25CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0Q7SUEzQkUsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQW1IMUI7SUFBRCxhQUFDO0NBbkhELEFBbUhDLENBbkhtQyxFQUFFLENBQUMsU0FBUyxHQW1IL0M7a0JBbkhvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi9HYW1lRGF0YVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwZWdnIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgY29uZmlnVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vYXBpMi5ibW9iLmNuLzEvY2xhc3Nlcy9MaXN0L3U4UXhGRkZTXCI7XG4gIGFwaUtleTogc3RyaW5nID0gXCI4OWYyZDZjYzI3OTg1MzM0Njk5ODc5YmZhOGFhOWRmZFwiO1xuICByZXN0QXBpS2V5OiBzdHJpbmcgPSBcIjkyNzhhN2UzNjEzYWVmZTdlYzA3ZTM5MGMyMjc2YmYyXCI7XG5cbiAgQHByb3BlcnR5KGNjLk5vZGUpXG4gIGNoYW5nZWxvZ1ZpZXc6IGNjLk5vZGU7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBjaGFuZ2Vsb2dUaXRsZUxhYmVsOiBjYy5MYWJlbDtcblxuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIGNoYW5nZWxvZ0NvbnRlbnRMYWJlbDogY2MuTGFiZWw7XG5cbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgcHJpdmFjeUJ1dHRvbjogY2MuQnV0dG9uO1xuXG4gIEBwcm9wZXJ0eShjYy5CdXR0b24pXG4gIHN0YXJ0QnV0dG9uOiBjYy5CdXR0b247XG5cbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgcmV0cnlCdXR0b246IGNjLkJ1dHRvbjtcblxuICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgZXJyb3JWaWV3OiBjYy5Ob2RlO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICB3ZWJWaWV3OiBjYy5Ob2RlO1xuXG4gIC8vc3RhdGljIHVybDtcblxuICAvL3N0YXRpYyBwcml2YWN5VXJsO1xuXG4gIC8vY3VycmVudFZlcnNpb246IG51bWJlciA9IDA7XG4gIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gIG9uTG9hZCgpIHtcbiAgICB0aGlzLnByaXZhY3lCdXR0b24ubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25Qcml2YWN5Q2xpY2ssIHRoaXMpO1xuICAgIHRoaXMuc3RhcnRCdXR0b24ubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25TdGFydENsaWNrLCB0aGlzKTtcbiAgICB0aGlzLnJldHJ5QnV0dG9uLm5vZGUub24oXCJjbGlja1wiLCB0aGlzLm9uUmV0cnlDbGljaywgdGhpcyk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgIC8vdGhpcy5jdXJyZW50VmVyc2lvbiA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInZlcnNpb25cIik7XG4gICAgdGhpcy5jb25uZWN0KCk7XG4gIH1cblxuICBjb25uZWN0KCkge1xuICAgIHRoaXMuaHR0cEdldEFzeW5jKFxuICAgICAgdGhpcy5jb25maWdVcmwsXG4gICAgICBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHN0cik7XG4gICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKHN0cik7XG4gICAgICAgIGNvbnNvbGUubG9nKG9iai51cmwpO1xuICAgICAgICAvL29iai51cmwgPSBcImh0dHA6Ly9zZGsucGFuZ3VoeS5jb20vZ2FtZS8/cGdjaWQ9MiZnYW1lSWQ9MyZzaWQ9Yjc4OGI1MzA0ODFiNDBlOGE5ODhiMTg5NTEwZDI2Y2MmZGV2aWNlSWQ9NzUyMmI2NzA4Yjg4NDY0YjcwYzNiZjBjOWVlNjBlYTFcIjtcbiAgICAgICAgR2FtZURhdGEudXJsPSBvYmoudXJsO1xuICAgICAgICBHYW1lRGF0YS5wcml2YWN5VXJsID0gb2JqLnByaXZhY3lVcmw7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi5b2T5YmNYXBwVHlwZeS4ulwiICsgb2JqLmFwcFR5cGUpO1xuICAgICAgICBzd2l0Y2ggKG9iai5hcHBUeXBlKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgLy9pZiAodGhpcy5jdXJyZW50VmVyc2lvbiAhPSBvYmoudmVyc2lvbilcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImVudHJ5XCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwid2ViXCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vY2MubG9nKFwi6L+e5o6l5aSx6LSlXCIpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuXG5cbiAgaHR0cEdldEFzeW5jKHRoZVVybCwgY2FsbGJhY2ssIGVycm9yID0gbnVsbCkge1xuICAgIHZhciB4bWxIdHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeG1sSHR0cC5vbmVycm9yID09XG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIue9kee7nOmUmeivr1wiKTtcbiAgICAgIH07XG4gICAgeG1sSHR0cC5vbnRpbWVvdXQgPT1cbiAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwi572R57uc6LaF5pe2XCIpO1xuICAgICAgfTtcbiAgICB4bWxIdHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh4bWxIdHRwLnJlYWR5U3RhdGUgPT0gNCAmJiB4bWxIdHRwLnN0YXR1cyA9PSAyMDApXG4gICAgICAgIGNhbGxiYWNrKHhtbEh0dHAucmVzcG9uc2VUZXh0KTtcbiAgICAgIGVsc2Uge1xuICAgICAgICBlcnJvcigpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB4bWxIdHRwLm9wZW4oXCJHRVRcIiwgdGhlVXJsLCBmYWxzZSk7IC8vIHRydWUg5Li65byC5q2lXG4gICAgeG1sSHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiWC1CbW9iLUFwcGxpY2F0aW9uLUlkXCIsIHRoaXMuYXBpS2V5KTtcbiAgICB4bWxIdHRwLnNldFJlcXVlc3RIZWFkZXIoXCJYLUJtb2ItUkVTVC1BUEktS2V5XCIsIHRoaXMucmVzdEFwaUtleSk7XG4gICAgeG1sSHR0cC5zZW5kKG51bGwpO1xuICB9XG5cbiAgb25SZXRyeUNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy5lcnJvclZpZXcuYWN0aXZlID0gZmFsc2U7XG4gICAgdGhpcy5jb25uZWN0KCk7XG4gIH1cblxuICBvblByaXZhY3lDbGljayhldmVudCkge1xuICAgIHRoaXMud2ViVmlldy5hY3RpdmUgPSB0cnVlO1xuICB9XG5cbiAgb25TdGFydENsaWNrKGV2ZW50KSB7XG4gICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiZW50cnlcIik7XG4gIH1cbiAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==