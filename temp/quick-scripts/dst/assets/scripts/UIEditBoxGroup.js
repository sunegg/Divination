
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UIEditBoxGroup.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1VJRWRpdEJveEdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRWxGLHVDQUFrQztBQUU1QixJQUFBLGtCQUFxQyxFQUFuQyxvQkFBTyxFQUFFLHNCQUEwQixDQUFDO0FBRzVDO0lBQTRDLGtDQUFZO0lBQXhEOztJQWlGQSxDQUFDO0lBeERDLHdCQUF3QjtJQUV4QiwrQkFBTSxHQUFOO1FBQ0E7OztzQ0FHOEI7SUFDOUIsQ0FBQztJQUVNLGlDQUFRLEdBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ2pDLE9BQU87U0FDUjthQUFNO1lBQ0wsa0JBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDekM7UUFFRixrQkFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxrQkFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNsRCxrQkFBUSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU5QyxFQUFFLENBQUMsR0FBRyxDQUFDLGtCQUFRLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxrQkFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLEdBQUcsa0JBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQTRCSztRQUNELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUM1QixFQUFFLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBN0VEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7bURBQ0Q7SUFHcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQzttREFDRDtJQUdwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO29EQUNBO0lBR3JCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUM7bURBQ0Q7SUFHcEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztxREFDQztJQUVwQjtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNFO0lBRXJCO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7b0RBQ0E7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDRTtJQXJCRixjQUFjO1FBRGxDLE9BQU87T0FDYSxjQUFjLENBaUZsQztJQUFELHFCQUFDO0NBakZELEFBaUZDLENBakYyQyxFQUFFLENBQUMsU0FBUyxHQWlGdkQ7a0JBakZvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCBHYW1lRGF0YSBmcm9tIFwiLi9HYW1lRGF0YVwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlFZGl0Qm94R3JvdXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgbmFtZUJveDogY2MuRWRpdEJveDtcblxuICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgeWVhckJveDogY2MuRWRpdEJveDtcblxuICBAcHJvcGVydHkoY2MuRWRpdEJveClcbiAgbW9udGhCb3g6IGNjLkVkaXRCb3g7XG5cbiAgQHByb3BlcnR5KGNjLkVkaXRCb3gpXG4gIGRhdGVCb3g6IGNjLkVkaXRCb3g7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICB5ZWFyTGFiZWw6IGNjLkxhYmVsO1xuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIG1vbnRoTGFiZWw6IGNjLkxhYmVsO1xuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIGRheUxhYmVsOiBjYy5MYWJlbDtcblxuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIGVycm9yTGFiZWw6IGNjLkxhYmVsO1xuXG4gIHllYXI7IG1vbnRoOyBkYXk7XG5cbiAgLy8gTElGRS1DWUNMRSBDQUxMQkFDS1M6XG5cbiAgb25Mb2FkKCkge1xuICAvKiAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIHRoaXMueWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICB0aGlzLm1vbnRoID0gZGF0ZS5nZXRNb250aCgpO1xuICAgIHRoaXMuZGF5ID0gZGF0ZS5nZXREYXRlKCk7Ki9cbiAgfVxuXG4gIHB1YmxpYyBvblN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5uYW1lQm94LnN0cmluZy50cmltKCkubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuZXJyb3JMYWJlbC5zdHJpbmcgPSBcIuivt+i+k+WFpeWQjeWtl1wiO1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICBHYW1lRGF0YS5uaWNrbmFtZSA9IHRoaXMubmFtZUJveC5zdHJpbmc7XG4gICAgfVxuXG4gICBHYW1lRGF0YS55ZWFyID0gcGFyc2VJbnQodGhpcy55ZWFyTGFiZWwuc3RyaW5nKTtcbiAgICBHYW1lRGF0YS5tb250aCA9IHBhcnNlSW50KHRoaXMubW9udGhMYWJlbC5zdHJpbmcpO1xuICAgIEdhbWVEYXRhLmRheSA9IHBhcnNlSW50KHRoaXMuZGF5TGFiZWwuc3RyaW5nKTtcblxuICAgIGNjLmxvZyhHYW1lRGF0YS55ZWFyICsgXCIuXCIgKyBHYW1lRGF0YS5tb250aCArIFwiLlwiICsgR2FtZURhdGEuZGF5KTtcbiAgICBcbiAgLyogIGlmIChcbiAgICAgIHRoaXMueWVhckJveC5zdHJpbmcudHJpbSgpLmxlbmd0aCA8IDQgfHxcbiAgICAgIHBhcnNlSW50KHRoaXMueWVhckJveC5zdHJpbmcpIDwgMFxuICAgICkge1xuICAgICAgdGhpcy5lcnJvckxhYmVsLnN0cmluZyA9IFwi6K+36L6T5YWl5q2j56Gu55qE5Ye655Sf5bm05Lu9XCI7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIEdhbWVEYXRhLnllYXIgPSBwYXJzZUludCh0aGlzLnllYXJCb3guc3RyaW5nKTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgdGhpcy5tb250aEJveC5zdHJpbmcudHJpbSgpLmxlbmd0aCA8IDIgfHxcbiAgICAgIHBhcnNlSW50KHRoaXMubW9udGhCb3guc3RyaW5nKSA+IDEyIHx8XG4gICAgICBwYXJzZUludCh0aGlzLm1vbnRoQm94LnN0cmluZykgPCAwXG4gICAgKSB7XG4gICAgICB0aGlzLmVycm9yTGFiZWwuc3RyaW5nID0gXCLor7fovpPlhaXmraPnoa7nmoTlh7rnlJ/mnIjku71cIjtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgR2FtZURhdGEubW9udGggPSBwYXJzZUludCh0aGlzLm1vbnRoQm94LnN0cmluZyk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIHRoaXMuZGF0ZUJveC5zdHJpbmcudHJpbSgpLmxlbmd0aCA8IDIgfHxcbiAgICAgIHBhcnNlSW50KHRoaXMuZGF0ZUJveC5zdHJpbmcpID4gMzEgfHxcbiAgICAgIHBhcnNlSW50KHRoaXMuZGF0ZUJveC5zdHJpbmcpIDwgMFxuICAgICkge1xuICAgICAgdGhpcy5lcnJvckxhYmVsLnN0cmluZyA9IFwi6K+36L6T5YWl5q2j56Gu55qE5Ye655Sf5pel5pyfXCI7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgIEdhbWVEYXRhLmRheSA9IHBhcnNlSW50KHRoaXMuZGF0ZUJveC5zdHJpbmcpO1xuICAgIH0qL1xuICAgICAgdGhpcy5lcnJvckxhYmVsLnN0cmluZyA9IFwiXCI7XG4gICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIpO1xuICB9XG4gIC8vIHVwZGF0ZSAoZHQpIHt9XG59XG4iXX0=