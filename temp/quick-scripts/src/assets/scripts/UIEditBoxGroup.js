"use strict";
cc._RF.push(module, '83e8b7s8c5Ci4Hl8Ah3HN2q', 'UIEditBoxGroup');
// scripts/UIEditBoxGroup.ts

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
var UIEditBoxGroup = /** @class */ (function (_super) {
    __extends(UIEditBoxGroup, _super);
    function UIEditBoxGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    UIEditBoxGroup.prototype.onLoad = function () {
        /*  let date = new Date();
          this.year = date.getFullYear();
          this.month = date.getMonth();
          this.day = date.getDate();*/
    };
    UIEditBoxGroup.prototype.onSubmit = function () {
        if (this.nameBox.string.trim().length == 0) {
            this.errorLabel.string = "请输入名字";
            return;
        }
        else {
            GameData_1.default.nickname = this.nameBox.string;
        }
        GameData_1.default.year = parseInt(this.yearLabel.string);
        GameData_1.default.month = parseInt(this.monthLabel.string);
        GameData_1.default.day = parseInt(this.dayLabel.string);
        cc.log(GameData_1.default.year + "." + GameData_1.default.month + "." + GameData_1.default.day);
        /*  if (
            this.yearBox.string.trim().length < 4 ||
            parseInt(this.yearBox.string) < 0
          ) {
            this.errorLabel.string = "请输入正确的出生年份";
            return;
          } else {
            GameData.year = parseInt(this.yearBox.string);
          }
          if (
            this.monthBox.string.trim().length < 2 ||
            parseInt(this.monthBox.string) > 12 ||
            parseInt(this.monthBox.string) < 0
          ) {
            this.errorLabel.string = "请输入正确的出生月份";
            return;
          } else {
            GameData.month = parseInt(this.monthBox.string);
          }
          if (
            this.dateBox.string.trim().length < 2 ||
            parseInt(this.dateBox.string) > 31 ||
            parseInt(this.dateBox.string) < 0
          ) {
            this.errorLabel.string = "请输入正确的出生日期";
            return;
          } else {
            GameData.day = parseInt(this.dateBox.string);
          }*/
        this.errorLabel.string = "";
        cc.director.loadScene("game");
    };
    __decorate([
        property(cc.EditBox)
    ], UIEditBoxGroup.prototype, "nameBox", void 0);
    __decorate([
        property(cc.EditBox)
    ], UIEditBoxGroup.prototype, "yearBox", void 0);
    __decorate([
        property(cc.EditBox)
    ], UIEditBoxGroup.prototype, "monthBox", void 0);
    __decorate([
        property(cc.EditBox)
    ], UIEditBoxGroup.prototype, "dateBox", void 0);
    __decorate([
        property(cc.Label)
    ], UIEditBoxGroup.prototype, "yearLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIEditBoxGroup.prototype, "monthLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIEditBoxGroup.prototype, "dayLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIEditBoxGroup.prototype, "errorLabel", void 0);
    UIEditBoxGroup = __decorate([
        ccclass
    ], UIEditBoxGroup);
    return UIEditBoxGroup;
}(cc.Component));
exports.default = UIEditBoxGroup;

cc._RF.pop();