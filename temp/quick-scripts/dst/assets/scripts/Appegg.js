
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0FwcGVnZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQW9DLDBCQUFZO0lBRGhEO1FBQUEscUVBZ0hDO1FBOUdDLGVBQVMsR0FBVyw4Q0FBOEMsQ0FBQztRQUNuRSxZQUFNLEdBQVcsa0NBQWtDLENBQUM7UUFDcEQsZ0JBQVUsR0FBVyxrQ0FBa0MsQ0FBQztRQThCeEQsb0JBQWMsR0FBVyxDQUFDLENBQUM7O1FBNkUzQixpQkFBaUI7SUFDbkIsQ0FBQztlQS9Hb0IsTUFBTTtJQWtDekIsd0JBQXdCO0lBRXhCLHVCQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsc0JBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsd0JBQU8sR0FBUDtRQUNFLElBQUks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UUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7K0NBQ0c7SUFHdkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzsrQ0FDRztJQUd2QjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDOzZDQUNDO0lBR25CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkNBQ0Q7SUEzQkUsTUFBTTtRQUQxQixPQUFPO09BQ2EsTUFBTSxDQStHMUI7SUFBRCxhQUFDO0NBL0dELEFBK0dDLENBL0dtQyxFQUFFLENBQUMsU0FBUyxHQStHL0M7a0JBL0dvQixNQUFNIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBlZ2cgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICBjb25maWdVcmw6IHN0cmluZyA9IFwiaHR0cHM6Ly9hcGkyLmJtb2IuY24vMS9jbGFzc2VzL0xpc3QvdThReEZGRlNcIjtcbiAgYXBpS2V5OiBzdHJpbmcgPSBcIjg5ZjJkNmNjMjc5ODUzMzQ2OTk4NzliZmE4YWE5ZGZkXCI7XG4gIHJlc3RBcGlLZXk6IHN0cmluZyA9IFwiOTI3OGE3ZTM2MTNhZWZlN2VjMDdlMzkwYzIyNzZiZjJcIjtcblxuICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgY2hhbmdlbG9nVmlldzogY2MuTm9kZTtcblxuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIGNoYW5nZWxvZ1RpdGxlTGFiZWw6IGNjLkxhYmVsO1xuXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgY2hhbmdlbG9nQ29udGVudExhYmVsOiBjYy5MYWJlbDtcblxuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICBwcml2YWN5QnV0dG9uOiBjYy5CdXR0b247XG5cbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcbiAgc3RhcnRCdXR0b246IGNjLkJ1dHRvbjtcblxuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxuICByZXRyeUJ1dHRvbjogY2MuQnV0dG9uO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBlcnJvclZpZXc6IGNjLk5vZGU7XG5cbiAgQHByb3BlcnR5KGNjLk5vZGUpXG4gIHdlYlZpZXc6IGNjLk5vZGU7XG5cbiAgc3RhdGljIHVybDtcblxuICBzdGF0aWMgcHJpdmFjeVVybDtcblxuICBjdXJyZW50VmVyc2lvbjogbnVtYmVyID0gMDtcbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgb25Mb2FkKCkge1xuICAgIHRoaXMucHJpdmFjeUJ1dHRvbi5ub2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5vblByaXZhY3lDbGljaywgdGhpcyk7XG4gICAgdGhpcy5zdGFydEJ1dHRvbi5ub2RlLm9uKFwiY2xpY2tcIiwgdGhpcy5vblN0YXJ0Q2xpY2ssIHRoaXMpO1xuICAgIHRoaXMucmV0cnlCdXR0b24ubm9kZS5vbihcImNsaWNrXCIsIHRoaXMub25SZXRyeUNsaWNrLCB0aGlzKTtcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIHRoaXMuY3VycmVudFZlcnNpb24gPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ2ZXJzaW9uXCIpO1xuICAgIHRoaXMuY29ubmVjdCgpO1xuICB9XG5cbiAgY29ubmVjdCgpIHtcbiAgICB0aGlzLmh0dHBHZXRBc3luYyhcbiAgICAgIHRoaXMuY29uZmlnVXJsLFxuICAgICAgZnVuY3Rpb24gKHN0cikge1xuICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShzdHIpO1xuICAgICAgICBBcHBlZ2cudXJsID0gb2JqLnVybDtcbiAgICAgICAgQXBwZWdnLnByaXZhY3lVcmwgPSBvYmoucHJpdmFjeVVybDtcbiAgICAgICAgY2MubG9nKHN0cik7XG4gICAgICAgIGNjLmxvZyhcIuW9k+WJjWFwcFR5cGXkuLpcIiArIG9iai5hcHBUeXBlKTtcbiAgICAgICAgc3dpdGNoIChvYmouYXBwVHlwZSkge1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIC8vaWYgKHRoaXMuY3VycmVudFZlcnNpb24gIT0gb2JqLnZlcnNpb24pXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJlbnRyeVwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIndlYlwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICAvL2NjLmxvZyhcIui/nuaOpeWksei0pVwiKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgaHR0cEdldEFzeW5jKHRoZVVybCwgY2FsbGJhY2ssIGVycm9yID0gbnVsbCkge1xuICAgIHZhciB4bWxIdHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeG1sSHR0cC5vbmVycm9yID09XG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjYy5sb2coXCLnvZHnu5zplJnor69cIik7XG4gICAgICB9O1xuICAgIHhtbEh0dHAub250aW1lb3V0ID09XG4gICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBjYy5sb2coXCLnvZHnu5zotoXml7ZcIik7XG4gICAgICB9O1xuICAgIHhtbEh0dHAub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHhtbEh0dHAucmVhZHlTdGF0ZSA9PSA0ICYmIHhtbEh0dHAuc3RhdHVzID09IDIwMClcbiAgICAgICAgY2FsbGJhY2soeG1sSHR0cC5yZXNwb25zZVRleHQpO1xuICAgICAgZWxzZSB7XG4gICAgICAgIGVycm9yKCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHhtbEh0dHAub3BlbihcIkdFVFwiLCB0aGVVcmwsIGZhbHNlKTsgLy8gdHJ1ZSDkuLrlvILmraVcbiAgICB4bWxIdHRwLnNldFJlcXVlc3RIZWFkZXIoXCJYLUJtb2ItQXBwbGljYXRpb24tSWRcIiwgdGhpcy5hcGlLZXkpO1xuICAgIHhtbEh0dHAuc2V0UmVxdWVzdEhlYWRlcihcIlgtQm1vYi1SRVNULUFQSS1LZXlcIiwgdGhpcy5yZXN0QXBpS2V5KTtcbiAgICB4bWxIdHRwLnNlbmQobnVsbCk7XG4gIH1cblxuICBvblJldHJ5Q2xpY2soZXZlbnQpIHtcbiAgICB0aGlzLmVycm9yVmlldy5hY3RpdmUgPSBmYWxzZTtcbiAgICB0aGlzLmNvbm5lY3QoKTtcbiAgfVxuXG4gIG9uUHJpdmFjeUNsaWNrKGV2ZW50KSB7XG4gICAgdGhpcy53ZWJWaWV3LmFjdGl2ZSA9IHRydWU7XG4gIH1cblxuICBvblN0YXJ0Q2xpY2soZXZlbnQpIHtcbiAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJlbnRyeVwiKTtcbiAgfVxuICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19