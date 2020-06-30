"use strict";
cc._RF.push(module, '7a476Qein1Njolowrn3SH8g', 'UICheckBtn');
// Script/UICheckBtn.ts

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
var GameManager_1 = require("./GameManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UICheckBtn = /** @class */ (function (_super) {
    __extends(UICheckBtn, _super);
    function UICheckBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = 0;
        return _this;
    }
    UICheckBtn.prototype.showAnswer = function () {
        this.hideScene.active = false;
        this.showScene.active = true;
        this.GameManager.caculateLife(this.id);
    };
    UICheckBtn.prototype.onLoad = function () {
        this.btn = this.node.getComponent(cc.Button);
    };
    UICheckBtn.prototype.start = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        clickEventHandler.component = "UICheckBtn"; //这个是脚本文件名
        clickEventHandler.handler = "showAnswer"; //回调函名称
        clickEventHandler.customEventData = null; //用户数据
        this.btn.clickEvents.push(clickEventHandler);
    };
    __decorate([
        property(cc.Node)
    ], UICheckBtn.prototype, "hideScene", void 0);
    __decorate([
        property(cc.Node)
    ], UICheckBtn.prototype, "showScene", void 0);
    __decorate([
        property(GameManager_1.default)
    ], UICheckBtn.prototype, "GameManager", void 0);
    __decorate([
        property
    ], UICheckBtn.prototype, "id", void 0);
    UICheckBtn = __decorate([
        ccclass
    ], UICheckBtn);
    return UICheckBtn;
}(cc.Component));
exports.default = UICheckBtn;

cc._RF.pop();