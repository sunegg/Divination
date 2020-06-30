"use strict";
cc._RF.push(module, '1e4de7fS5ZHaKUT/EPmZvTx', 'UIGenderBtn');
// Script/UIGenderBtn.ts

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
var UIGenderBtn = /** @class */ (function (_super) {
    __extends(UIGenderBtn, _super);
    function UIGenderBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btn = null;
        _this.gender = 1;
        return _this;
        // update (dt) {}
    }
    UIGenderBtn.prototype.onLoad = function () {
        this.btn = this.node.getComponent(cc.Button);
    };
    UIGenderBtn.prototype.start = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        clickEventHandler.component = "UIGenderBtn"; //这个是脚本文件名
        clickEventHandler.handler = "selectGender"; //回调函名称
        clickEventHandler.customEventData = null; //用户数据
        this.btn.clickEvents.push(clickEventHandler);
    };
    UIGenderBtn.prototype.selectGender = function () {
        GameData_1.default.gender = this.gender;
        this.hideView.active = false;
        this.view.active = true;
    };
    __decorate([
        property
    ], UIGenderBtn.prototype, "gender", void 0);
    __decorate([
        property(cc.Node)
    ], UIGenderBtn.prototype, "hideView", void 0);
    __decorate([
        property(cc.Node)
    ], UIGenderBtn.prototype, "view", void 0);
    UIGenderBtn = __decorate([
        ccclass
    ], UIGenderBtn);
    return UIGenderBtn;
}(cc.Component));
exports.default = UIGenderBtn;

cc._RF.pop();