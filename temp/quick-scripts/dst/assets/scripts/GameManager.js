
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWVNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLHVDQUFrQztBQUU1QixJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXlDLCtCQUFZO0lBRHJEO1FBQUEscUVBb0ZDO1FBaEZHLFVBQUksR0FBYyxJQUFJLENBQUM7UUFHdkIsU0FBRyxHQUFjLElBQUksQ0FBQzs7UUE0RXRCLGlCQUFpQjtJQUNyQixDQUFDO0lBbkVHLHdCQUF3QjtJQUV4Qiw0QkFBTSxHQUFOO1FBQ0U7Ozs7Ozs7Ozs7Ozs7O2VBY087SUFFVCxDQUFDO0lBRU0sa0NBQVksR0FBbkIsVUFBb0IsRUFBRTtRQUNsQixFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNuQixrQkFBUSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzdELEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLGtCQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsa0JBQVEsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxrQkFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEYsa0JBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBUSxDQUFDLFdBQVcsRUFBRSxrQkFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsa0JBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxrQkFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLGtCQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsa0JBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3JELENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUVILCtCQUFTLEdBQVQsVUFBVSxHQUFHLEVBQUMsRUFBRTtRQUNaLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3BELFVBQVUsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM1QyxxQkFBcUI7WUFDckIsTUFBTSxJQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztTQUNyRDtRQUNELEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGtCQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsa0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sTUFBTSxHQUFHLGtCQUFRLENBQUMsSUFBSSxHQUFHLGtCQUFRLENBQUMsS0FBSyxHQUFHLGtCQUFRLENBQUMsR0FBRyxHQUFHLGtCQUFRLENBQUMsTUFBTSxHQUFDLEVBQUUsQ0FBQztJQUN2RixDQUFDO0lBRUQsaUNBQVcsR0FBWCxVQUFZLEtBQUssRUFBQyxVQUFVO1FBQ3hCLE9BQU8sS0FBSyxHQUFHLFVBQVU7WUFDckIsS0FBSyxJQUFJLFVBQVUsQ0FBQztRQUN4QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQTdFRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzZDQUNHO0lBR3ZCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NENBQ0U7SUFHdEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztrREFDRTtJQUdyQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lEQUNBO0lBWkYsV0FBVztRQUQvQixPQUFPO09BQ2EsV0FBVyxDQW1GL0I7SUFBRCxrQkFBQztDQW5GRCxBQW1GQyxDQW5Gd0MsRUFBRSxDQUFDLFNBQVMsR0FtRnBEO2tCQW5Gb0IsV0FBVyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4vR2FtZURhdGFcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFuYWdlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIHJhY2U6IGNjLlNwcml0ZSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxuICAgIGpvYjogY2MuU3ByaXRlID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICByYWNlTGFiZWw6IGNjLkxhYmVsIDtcblxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgICBqb2JMYWJlbDogY2MuTGFiZWw7XG5cbiAgICBzZWxlY3RJZDtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgLyogIGNjLmxvYWRlci5sb2FkUmVzRGlyKFwicmFjZVwiLGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBhc3NldHMpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEdhbWVEYXRhLnJhY2UgPSBhc3NldHM7XG4gICAgICAgIH0pO1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcihcImpvYlwiLGNjLlNwcml0ZUZyYW1lICxmdW5jdGlvbiAoZXJyLCBhc3NldHMpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEdhbWVEYXRhLmpvYiA9IGFzc2V0cztcbiAgICAgICAgICAgLy8gdGhpcy5jYWN1bGF0ZUxpZmUodGhpcy5zZWxlY3RJZCk7XG4gICAgICAgIH0pOyovXG4gXG4gICAgfVxuXG4gICAgcHVibGljIGNhY3VsYXRlTGlmZShpZCkge1xuICAgICAgICBjYy5sb2coXCJpZFwiICsgaWQpO1xuICAgICAgICB0aGlzLnNlbGVjdElkID0gaWQ7XG4gICAgICAgIEdhbWVEYXRhLmN1cnJlbnRDb2RlID0gdGhpcy50b1VuaWNvZGUoR2FtZURhdGEubmlja25hbWUsIGlkKTtcbiAgICAgICAgY2MubG9nKFwiY29kZVwiICsgR2FtZURhdGEuY3VycmVudENvZGUpO1xuICAgICAgICBHYW1lRGF0YS5jdXJyZW50UmFjZSA9IHRoaXMudG9JbWFnZWNvZGUoR2FtZURhdGEuY3VycmVudENvZGUsIEdhbWVEYXRhLnJhY2UubGVuZ3RoLTEpO1xuICAgICAgICBHYW1lRGF0YS5jdXJyZW50Sm9iID0gdGhpcy50b0ltYWdlY29kZShHYW1lRGF0YS5jdXJyZW50Q29kZSwgR2FtZURhdGEuam9iLmxlbmd0aC0xKTtcbiAgICAgICAgY2MubG9nKFwicmFjZVwiICsgR2FtZURhdGEuY3VycmVudFJhY2UpO1xuICAgICAgICBjYy5sb2coXCJqb2JcIiArIEdhbWVEYXRhLmN1cnJlbnRKb2IpO1xuICAgICAgICB0aGlzLnJhY2Uuc3ByaXRlRnJhbWUgPSBHYW1lRGF0YS5yYWNlW0dhbWVEYXRhLmN1cnJlbnRSYWNlXTtcbiAgICAgICAgdGhpcy5qb2Iuc3ByaXRlRnJhbWUgPSBHYW1lRGF0YS5qb2JbR2FtZURhdGEuY3VycmVudEpvYl07XG4gICAgICAgIHRoaXMucmFjZUxhYmVsLnN0cmluZyA9IHRoaXMucmFjZS5zcHJpdGVGcmFtZS5uYW1lO1xuICAgICAgICB0aGlzLmpvYkxhYmVsLnN0cmluZyA9IHRoaXMuam9iLnNwcml0ZUZyYW1lLm5hbWU7XG4gICAgfVxuXG4gICAgLypkZWNvZGVOYW1lKHN0cik6IG51bWJlcnsgXG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xuICAgICAgICB2YXIgdmFsdWU9Jyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHN0ci5jaGFyQ29kZUF0KGkpKS50b1N0cmluZygxNik7XG4gICAgICAgICAgICByZXN1bHQrPXBhcnNlSW50KHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQrIEdhbWVEYXRhLnllYXIgKyBHYW1lRGF0YS5tb250aCArIEdhbWVEYXRhLmRhdGUgKyBHYW1lRGF0YS5nZW5kZXI7O1xuICAgIH0qL1xuXG4gICAgdG9Vbmljb2RlKHN0cixpZCk6IG51bWJlcntcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGxldCB1bmljb2RlU3RyID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBpTGVuZ3RoID0gc3RyLmxlbmd0aDsgaSA8IGlMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdW5pY29kZVN0ciA9IHN0ci5jaGFyQ29kZUF0KGkpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgIC8vY2MubG9nKHVuaWNvZGVTdHIpO1xuICAgICAgICAgICAgcmVzdWx0Kz1wYXJzZUludCh1bmljb2RlU3RyLnJlcGxhY2UoL1xcRC9nLCAnJyksMCk7XG4gICAgICAgIH1cbiAgICAgICAgY2MubG9nKFwiZGF5XCIsIEdhbWVEYXRhLmRheSk7XG4gICAgICAgIGNjLmxvZyhcIm1vbnRoXCIsIEdhbWVEYXRhLm1vbnRoKTtcbiAgICAgICAgY2MubG9nKFwiZ2VuZGVyXCIsIEdhbWVEYXRhLmdlbmRlcik7XG4gICAgICAgIHJldHVybiByZXN1bHQgKyBHYW1lRGF0YS55ZWFyICsgR2FtZURhdGEubW9udGggKyBHYW1lRGF0YS5kYXkgKiBHYW1lRGF0YS5nZW5kZXIqaWQ7XG4gICAgfVxuXG4gICAgdG9JbWFnZWNvZGUodmFsdWUsaW1hZ2VDb3VudCk6IG51bWJlcntcbiAgICAgICAgd2hpbGUgKHZhbHVlID4gaW1hZ2VDb3VudClcbiAgICAgICAgICAgIHZhbHVlIC09IGltYWdlQ291bnQ7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlKTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgKGR0KSB7fVxufVxuIl19