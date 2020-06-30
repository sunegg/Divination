"use strict";
cc._RF.push(module, 'f2b565G9QxKzZIjoXeWi2m+', 'GameManager');
// scripts/GameManager.ts

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
var GameManager = /** @class */ (function (_super) {
    __extends(GameManager, _super);
    function GameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.race = null;
        _this.job = null;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    GameManager.prototype.onLoad = function () {
        /*  cc.loader.loadResDir("race",cc.SpriteFrame, function (err, assets) {
              if (err) {
                  cc.error(err);
                  return;
              }
              GameData.race = assets;
          });
          cc.loader.loadResDir("job",cc.SpriteFrame ,function (err, assets) {
              if (err) {
                  cc.error(err);
                  return;
              }
              GameData.job = assets;
             // this.caculateLife(this.selectId);
          });*/
    };
    GameManager.prototype.caculateLife = function (id) {
        cc.log("id" + id);
        this.selectId = id;
        GameData_1.default.currentCode = this.toUnicode(GameData_1.default.nickname, id);
        cc.log("code" + GameData_1.default.currentCode);
        GameData_1.default.currentRace = this.toImagecode(GameData_1.default.currentCode, GameData_1.default.race.length - 1);
        GameData_1.default.currentJob = this.toImagecode(GameData_1.default.currentCode, GameData_1.default.job.length - 1);
        cc.log("race" + GameData_1.default.currentRace);
        cc.log("job" + GameData_1.default.currentJob);
        this.race.spriteFrame = GameData_1.default.race[GameData_1.default.currentRace];
        this.job.spriteFrame = GameData_1.default.job[GameData_1.default.currentJob];
        this.raceLabel.string = this.race.spriteFrame.name;
        this.jobLabel.string = this.job.spriteFrame.name;
    };
    /*decodeName(str): number{
        let result = 0;
        var value='';
        for (var i = 0; i < str.length; i++) {
            value = parseInt(str.charCodeAt(i)).toString(16);
            result+=parseInt(value.replace(/\D/g, ''));
        }
        return result+ GameData.year + GameData.month + GameData.date + GameData.gender;;
    }*/
    GameManager.prototype.toUnicode = function (str, id) {
        var result = 0;
        var unicodeStr = '';
        for (var i = 0, iLength = str.length; i < iLength; i++) {
            unicodeStr = str.charCodeAt(i).toString(16);
            //cc.log(unicodeStr);
            result += parseInt(unicodeStr.replace(/\D/g, ''), 0);
        }
        cc.log("day", GameData_1.default.day);
        cc.log("month", GameData_1.default.month);
        cc.log("gender", GameData_1.default.gender);
        return result + GameData_1.default.year + GameData_1.default.month + GameData_1.default.day * GameData_1.default.gender * id;
    };
    GameManager.prototype.toImagecode = function (value, imageCount) {
        while (value > imageCount)
            value -= imageCount;
        return Math.round(value);
    };
    __decorate([
        property(cc.Sprite)
    ], GameManager.prototype, "race", void 0);
    __decorate([
        property(cc.Sprite)
    ], GameManager.prototype, "job", void 0);
    __decorate([
        property(cc.Label)
    ], GameManager.prototype, "raceLabel", void 0);
    __decorate([
        property(cc.Label)
    ], GameManager.prototype, "jobLabel", void 0);
    GameManager = __decorate([
        ccclass
    ], GameManager);
    return GameManager;
}(cc.Component));
exports.default = GameManager;

cc._RF.pop();