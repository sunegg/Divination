
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/resources/UIDatePicker/UIDatePicker');
require('./assets/resources/UIDatePicker/UIItemDay');
require('./assets/scripts/Appegg');
require('./assets/scripts/AudioManager');
require('./assets/scripts/GameData');
require('./assets/scripts/GameLoader');
require('./assets/scripts/GameManager');
require('./assets/scripts/PrivacySetup');
require('./assets/scripts/UICheckBtn');
require('./assets/scripts/UIEditBoxGroup');
require('./assets/scripts/UIGenderBtn');
require('./assets/scripts/UILoadScene');
require('./assets/scripts/UIShowNode');
require('./assets/scripts/WebViewObject');

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameLoader.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5645cw+5rBNX7jjiZWEfHYF', 'GameLoader');
// scripts/GameLoader.ts

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
var GameLoader = /** @class */ (function (_super) {
    __extends(GameLoader, _super);
    function GameLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameLoader.prototype.start = function () {
        cc.loader.loadResDir("race", cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            GameData_1.default.race = assets;
        });
        cc.loader.loadResDir("job", cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            GameData_1.default.job = assets;
            // this.caculateLife(this.selectId);
        });
    };
    GameLoader = __decorate([
        ccclass
    ], GameLoader);
    return GameLoader;
}(cc.Component));
exports.default = GameLoader;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWVMb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsdUNBQWtDO0FBRTVCLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBd0MsOEJBQVk7SUFBcEQ7O0lBb0JBLENBQUM7SUFsQkcsMEJBQUssR0FBTDtRQUNJLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQVUsR0FBRyxFQUFFLE1BQU07WUFDN0QsSUFBSSxHQUFHLEVBQUU7Z0JBQ0wsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDZCxPQUFPO2FBQ1Y7WUFDRCxrQkFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxVQUFVLEdBQUcsRUFBRSxNQUFNO1lBQzVELElBQUksR0FBRyxFQUFFO2dCQUNMLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2QsT0FBTzthQUNWO1lBQ0Qsa0JBQVEsQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ3ZCLG9DQUFvQztRQUN2QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFsQmdCLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FvQjlCO0lBQUQsaUJBQUM7Q0FwQkQsQUFvQkMsQ0FwQnVDLEVBQUUsQ0FBQyxTQUFTLEdBb0JuRDtrQkFwQm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuL0dhbWVEYXRhXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUxvYWRlciBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzRGlyKFwicmFjZVwiLGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBhc3NldHMpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEdhbWVEYXRhLnJhY2UgPSBhc3NldHM7XG4gICAgICAgIH0pO1xuICAgICAgICBjYy5sb2FkZXIubG9hZFJlc0RpcihcImpvYlwiLGNjLlNwcml0ZUZyYW1lICxmdW5jdGlvbiAoZXJyLCBhc3NldHMpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjYy5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEdhbWVEYXRhLmpvYiA9IGFzc2V0cztcbiAgICAgICAgICAgLy8gdGhpcy5jYWN1bGF0ZUxpZmUodGhpcy5zZWxlY3RJZCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/resources/UIDatePicker/UIItemDay.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '252a5nAq6pLOITqXWwWN/H/', 'UIItemDay');
// resources/UIDatePicker/UIItemDay.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    lbDay: cc.Label,
    spSel: cc.Sprite
  },
  setDay: function setDay(index, day, sel, cb) {
    this.index = index;
    this.day = day;
    this.cb = cb;
    this.lbDay.string = day;
    this.spSel.enabled = sel;
  },
  onClickItem: function onClickItem() {
    if (this.cb) {
      this.cb(this.index, this.day);
    }
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9yZXNvdXJjZXMvVUlEYXRlUGlja2VyL1VJSXRlbURheS5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxiRGF5IiwiTGFiZWwiLCJzcFNlbCIsIlNwcml0ZSIsInNldERheSIsImluZGV4IiwiZGF5Iiwic2VsIiwiY2IiLCJzdHJpbmciLCJlbmFibGVkIiwib25DbGlja0l0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxLQUFLLEVBQUVKLEVBQUUsQ0FBQ0ssS0FERjtBQUVSQyxJQUFBQSxLQUFLLEVBQUVOLEVBQUUsQ0FBQ087QUFGRixHQUhQO0FBUUxDLEVBQUFBLE1BUkssa0JBUUVDLEtBUkYsRUFRU0MsR0FSVCxFQVFjQyxHQVJkLEVBUW1CQyxFQVJuQixFQVF1QjtBQUN4QixTQUFLSCxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLRSxFQUFMLEdBQVVBLEVBQVY7QUFFQSxTQUFLUixLQUFMLENBQVdTLE1BQVgsR0FBb0JILEdBQXBCO0FBQ0EsU0FBS0osS0FBTCxDQUFXUSxPQUFYLEdBQXFCSCxHQUFyQjtBQUNILEdBZkk7QUFpQkxJLEVBQUFBLFdBakJLLHlCQWlCUztBQUNWLFFBQUksS0FBS0gsRUFBVCxFQUFhO0FBQ1QsV0FBS0EsRUFBTCxDQUFRLEtBQUtILEtBQWIsRUFBb0IsS0FBS0MsR0FBekI7QUFDSDtBQUNKO0FBckJJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxiRGF5OiBjYy5MYWJlbCxcbiAgICAgICAgc3BTZWw6IGNjLlNwcml0ZSxcbiAgICB9LFxuXG4gICAgc2V0RGF5KGluZGV4LCBkYXksIHNlbCwgY2IpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmRheSA9IGRheTtcbiAgICAgICAgdGhpcy5jYiA9IGNiO1xuXG4gICAgICAgIHRoaXMubGJEYXkuc3RyaW5nID0gZGF5O1xuICAgICAgICB0aGlzLnNwU2VsLmVuYWJsZWQgPSBzZWw7XG4gICAgfSxcblxuICAgIG9uQ2xpY2tJdGVtKCkge1xuICAgICAgICBpZiAodGhpcy5jYikge1xuICAgICAgICAgICAgdGhpcy5jYih0aGlzLmluZGV4LCB0aGlzLmRheSk7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/AudioManager.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '46249tsAlFNuLMLBbjCIuQi', 'AudioManager');
// Script/AudioManager.ts

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
var AudioManager = /** @class */ (function (_super) {
    __extends(AudioManager, _super);
    function AudioManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // LIFE-CYCLE CALLBACKS:
    AudioManager.prototype.onLoad = function () {
        this.audioSource = this.getComponent(cc.AudioSource);
        cc.game.addPersistRootNode(this.node);
    };
    AudioManager.prototype.start = function () {
        cc.audioEngine.playMusic(this.audioSource.clip, true);
    };
    AudioManager.prototype.play = function () {
        this.audioSource.play();
    };
    AudioManager.prototype.pause = function () {
        this.audioSource.pause();
    };
    AudioManager = __decorate([
        ccclass
    ], AudioManager);
    return AudioManager;
}(cc.Component));
exports.default = AudioManager;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQXVkaW9NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRTVFLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBMEMsZ0NBQVk7SUFBdEQ7O0lBd0JBLENBQUM7SUFwQkcsd0JBQXdCO0lBRXhCLDZCQUFNLEdBQU47UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRiw0QkFBSyxHQUFMO1FBQ0ksRUFBRSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELDJCQUFJLEdBQUo7UUFDSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCw0QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBckJnQixZQUFZO1FBRGhDLE9BQU87T0FDYSxZQUFZLENBd0JoQztJQUFELG1CQUFDO0NBeEJELEFBd0JDLENBeEJ5QyxFQUFFLENBQUMsU0FBUyxHQXdCckQ7a0JBeEJvQixZQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXVkaW9NYW5hZ2VyIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIGF1ZGlvU291cmNlOiBjYy5BdWRpb1NvdXJjZTtcblxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxuXG4gICAgb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmF1ZGlvU291cmNlID0gdGhpcy5nZXRDb21wb25lbnQoY2MuQXVkaW9Tb3VyY2UpO1xuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xuICAgICB9XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyh0aGlzLmF1ZGlvU291cmNlLmNsaXAsdHJ1ZSk7XG4gICAgfVxuXG4gICAgcGxheSAoKSB7XG4gICAgICAgIHRoaXMuYXVkaW9Tb3VyY2UucGxheSgpO1xuICAgIH1cblxuICAgIHBhdXNlICgpe1xuICAgICAgICB0aGlzLmF1ZGlvU291cmNlLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c7a17o8ms9MnqFnpz4c/Dkx', 'GameData');
// scripts/GameData.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var GameData = /** @class */ (function () {
    function GameData() {
    }
    GameData.year = 0;
    GameData.month = 0;
    GameData.day = 0;
    GameData.century = 0;
    GameData.gender = 1;
    GameData.currentCode = 0;
    return GameData;
}());
exports.default = GameData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL0dhbWVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvQkFBb0I7QUFDcEIsd0VBQXdFO0FBQ3hFLG1CQUFtQjtBQUNuQixrRkFBa0Y7QUFDbEYsOEJBQThCO0FBQzlCLGtGQUFrRjs7QUFFbEY7SUFBQTtJQTJCQSxDQUFDO0lBekJVLGFBQUksR0FBUSxDQUFDLENBQUM7SUFFZCxjQUFLLEdBQVEsQ0FBQyxDQUFDO0lBSWYsWUFBRyxHQUFRLENBQUMsQ0FBQztJQUViLGdCQUFPLEdBQVMsQ0FBQyxDQUFDO0lBRWxCLGVBQU0sR0FBVyxDQUFDLENBQUM7SUFFbkIsb0JBQVcsR0FBVyxDQUFDLENBQUM7SUFhbkMsZUFBQztDQTNCRCxBQTJCQyxJQUFBO2tCQTNCb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lRGF0YSB7XG5cbiAgICBzdGF0aWMgeWVhcjpudW1iZXI9MDtcbiAgXG4gICAgc3RhdGljIG1vbnRoOm51bWJlcj0wO1xuICBcbiAgICBzdGF0aWMgbmlja25hbWU6c3RyaW5nO1xuICBcbiAgICBzdGF0aWMgZGF5Om51bWJlcj0wO1xuICBcbiAgICBzdGF0aWMgY2VudHVyeTogbnVtYmVyPTA7XG5cbiAgICBzdGF0aWMgZ2VuZGVyOiBudW1iZXIgPSAxO1xuICAgIFxuICAgIHN0YXRpYyBjdXJyZW50Q29kZTogbnVtYmVyID0gMDtcbiAgICBcbiAgICBzdGF0aWMgcmFjZTogYW55W107XG4gICAgXG4gICAgc3RhdGljIGpvYjogYW55W107XG4gICAgXG4gICAgc3RhdGljIGN1cnJlbnRSYWNlOiBudW1iZXI7XG4gICAgXG4gICAgc3RhdGljIGN1cnJlbnRKb2I6IG51bWJlcjtcblxuICAgIHN0YXRpYyB1cmw6IHN0cmluZztcbiAgICBcbiAgICBzdGF0aWMgcHJpdmFjeVVybDogc3RyaW5nO1xufSJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UILoadScene.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '92a4fiLq49HoZM25wCQV52m', 'UILoadScene');
// Script/UILoadScene.ts

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
var UILoadScene = /** @class */ (function (_super) {
    __extends(UILoadScene, _super);
    function UILoadScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scene = 'main';
        return _this;
    }
    UILoadScene.prototype.loadScene = function () {
        cc.director.loadScene(this.scene);
    };
    UILoadScene.prototype.onLoad = function () {
        this.btn = this.node.getComponent(cc.Button);
    };
    UILoadScene.prototype.start = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        clickEventHandler.component = "UILoadScene"; //这个是脚本文件名
        clickEventHandler.handler = "loadScene"; //回调函名称
        clickEventHandler.customEventData = null; //用户数据
        this.btn.clickEvents.push(clickEventHandler);
    };
    __decorate([
        property
    ], UILoadScene.prototype, "scene", void 0);
    UILoadScene = __decorate([
        ccclass
    ], UILoadScene);
    return UILoadScene;
}(cc.Component));
exports.default = UILoadScene;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVUlMb2FkU2NlbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFNUUsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUF5QywrQkFBWTtJQURyRDtRQUFBLHFFQTBCQztRQXRCRyxXQUFLLEdBQVcsTUFBTSxDQUFDOztJQXNCM0IsQ0FBQztJQWxCVSwrQkFBUyxHQUFoQjtRQUNJLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsNEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCwyQkFBSyxHQUFMO1FBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEQsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyx3Q0FBd0M7UUFDOUUsaUJBQWlCLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFBLFVBQVU7UUFDdEQsaUJBQWlCLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLE9BQU87UUFDaEQsaUJBQWlCLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU07UUFFaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQXBCRDtRQURDLFFBQVE7OENBQ2M7SUFITixXQUFXO1FBRC9CLE9BQU87T0FDYSxXQUFXLENBeUIvQjtJQUFELGtCQUFDO0NBekJELEFBeUJDLENBekJ3QyxFQUFFLENBQUMsU0FBUyxHQXlCcEQ7a0JBekJvQixXQUFXIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gTGVhcm4gVHlwZVNjcmlwdDpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxuLy8gTGVhcm4gQXR0cmlidXRlOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlMb2FkU2NlbmUgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5XG4gICAgc2NlbmU6IHN0cmluZyA9ICdtYWluJztcblxuICAgIGJ0bjogY2MuQnV0dG9uO1xuXG4gICAgcHVibGljIGxvYWRTY2VuZSgpIHtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHRoaXMuc2NlbmUpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5idG4gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHZhciBjbGlja0V2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLnRhcmdldCA9IHRoaXMubm9kZTsgLy/ov5nkuKogbm9kZSDoioLngrnmmK/kvaDnmoTkuovku7blpITnkIbku6PnoIHnu4Tku7bmiYDlsZ7nmoToioLngrnvvIzov5nph4zlsLHmmK9CdXR0b24yXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IFwiVUlMb2FkU2NlbmVcIjsvL+i/meS4quaYr+iEmuacrOaWh+S7tuWQjVxuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5oYW5kbGVyID0gXCJsb2FkU2NlbmVcIjsgLy/lm57osIPlh73lkI3np7BcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuY3VzdG9tRXZlbnREYXRhID0gbnVsbDsgLy/nlKjmiLfmlbDmja5cblxuICAgICAgICB0aGlzLmJ0bi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnRIYW5kbGVyKTtcbiAgICB9XG4gICAgXG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UICheckBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVUlDaGVja0J0bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRiw2Q0FBd0M7QUFFbEMsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUF3Qyw4QkFBWTtJQURwRDtRQUFBLHFFQW1DQztRQXZCRyxRQUFFLEdBQVcsQ0FBQyxDQUFDOztJQXVCbkIsQ0FBQztJQW5CVSwrQkFBVSxHQUFqQjtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCwyQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELDBCQUFLLEdBQUw7UUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4RCxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLHdDQUF3QztRQUM5RSxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDLENBQUEsVUFBVTtRQUNyRCxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLENBQUMsT0FBTztRQUNqRCxpQkFBaUIsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTTtRQUVoRCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBL0JEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ0M7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDQztJQUduQjtRQURDLFFBQVEsQ0FBQyxxQkFBVyxDQUFDO21EQUNHO0lBR3pCO1FBREMsUUFBUTswQ0FDTTtJQVhFLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0FrQzlCO0lBQUQsaUJBQUM7Q0FsQ0QsQUFrQ0MsQ0FsQ3VDLEVBQUUsQ0FBQyxTQUFTLEdBa0NuRDtrQkFsQ29CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IEdhbWVNYW5hZ2VyIGZyb20gXCIuL0dhbWVNYW5hZ2VyXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlDaGVja0J0biBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaGlkZVNjZW5lOiBjYy5Ob2RlO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgc2hvd1NjZW5lOiBjYy5Ob2RlO1xuXG4gICAgQHByb3BlcnR5KEdhbWVNYW5hZ2VyKVxuICAgIEdhbWVNYW5hZ2VyOiBHYW1lTWFuYWdlcjtcblxuICAgIEBwcm9wZXJ0eVxuICAgIGlkOiBudW1iZXIgPSAwO1xuXG4gICAgYnRuOiBjYy5CdXR0b247XG5cbiAgICBwdWJsaWMgc2hvd0Fuc3dlcigpIHtcbiAgICAgICAgdGhpcy5oaWRlU2NlbmUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hvd1NjZW5lLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuR2FtZU1hbmFnZXIuY2FjdWxhdGVMaWZlKHRoaXMuaWQpO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5idG4gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHZhciBjbGlja0V2ZW50SGFuZGxlciA9IG5ldyBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyKCk7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLnRhcmdldCA9IHRoaXMubm9kZTsgLy/ov5nkuKogbm9kZSDoioLngrnmmK/kvaDnmoTkuovku7blpITnkIbku6PnoIHnu4Tku7bmiYDlsZ7nmoToioLngrnvvIzov5nph4zlsLHmmK9CdXR0b24yXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IFwiVUlDaGVja0J0blwiOy8v6L+Z5Liq5piv6ISa5pys5paH5Lu25ZCNXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmhhbmRsZXIgPSBcInNob3dBbnN3ZXJcIjsgLy/lm57osIPlh73lkI3np7BcbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuY3VzdG9tRXZlbnREYXRhID0gbnVsbDsgLy/nlKjmiLfmlbDmja5cblxuICAgICAgICB0aGlzLmJ0bi5jbGlja0V2ZW50cy5wdXNoKGNsaWNrRXZlbnRIYW5kbGVyKTtcbiAgICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/resources/UIDatePicker/UIDatePicker.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '6d106l+tDRL5rbAU45iCnts', 'UIDatePicker');
// resources/UIDatePicker/UIDatePicker.js

"use strict";

/** 
 * 日期组件
 */
cc.Class({
  "extends": cc.Component,
  properties: {
    lbYearMonth: cc.Label,
    ndDays: cc.Node,
    pfbDay: cc.Prefab,
    yearText: cc.Label,
    monthText: cc.Label,
    dayText: cc.Label
  },
  onLoad: function onLoad() {
    this.initData();
    this.updateDate();
    this.setDate(1994, 4, 29);
  },
  initData: function initData() {
    this.date = this.date ? this.date : new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
    this.pfgListDay = [];

    for (var i = 0; i < 31; ++i) {
      var node = cc.instantiate(this.pfbDay);
      node.parent = this.ndDays;
      this.pfgListDay.push(node);
    }
  },
  // 设置显示的日志，默认为当前日期
  setDate: function setDate(year, month, day) {
    this.date = new Date(year, month, day);
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.day = this.date.getDate();
    this.updateDate();
  },
  updateDate: function updateDate() {
    var _this = this;

    this.lbYearMonth.string = cc.js.formatStr("%s年%s月", this.year, this.month + 1);
    var date = new Date(this.year, this.month, 0);
    var totalDays = date.getDate();
    var fromWeek = date.getDay();

    for (var i = 0; i < this.pfgListDay.length; ++i) {
      var node = this.pfgListDay[i];

      if (i < totalDays) {
        node.active = true;
        var index = fromWeek + i;
        var row = Math.floor(index / 7);
        var col = index % 7;
        var x = -(this.ndDays.width - node.width) * 0.5 + col * node.width;
        var y = (this.ndDays.height - node.height) * 0.5 - row * node.height;
        node.setPosition(x, y);
        var script = node.getComponent("UIItemDay");
        script.setDay(i, i + 1, this.day === i + 1, function (selIndex, selDay) {
          _this.day = selDay;

          _this.updateDate();
        });
      } else {
        node.active = false;
      }
    }

    this.yearText.string = this.year;
    this.monthText.string = this.month + 1;
    this.dayText.string = this.day; //console.log( this.yearText + "." +   this.monthText + "."+ this.dayText);
  },
  onClickLeft: function onClickLeft() {
    if (this.month > 0) {
      this.month -= 1;
    } else {
      this.month = 11;
      this.year -= 1;
    }

    this.date.setFullYear(this.year);
    this.date.setMonth(this.month);
    this.updateDate();
  },
  onClickRight: function onClickRight() {
    if (this.month < 11) {
      this.month += 1;
    } else {
      this.month = 0;
      this.year += 1;
    }

    this.date.setFullYear(this.year);
    this.date.setMonth(this.month);
    this.updateDate();
  },
  // 设置选中日期之后的回调
  setPickDateCallback: function setPickDateCallback(cb) {
    this.cb = cb;
  },
  onClickClose: function onClickClose() {
    if (this.cb) {
      this.cb(this.year, this.month, this.day);
    }

    this.node.parent = null;
  }
});

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9yZXNvdXJjZXMvVUlEYXRlUGlja2VyL1VJRGF0ZVBpY2tlci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImxiWWVhck1vbnRoIiwiTGFiZWwiLCJuZERheXMiLCJOb2RlIiwicGZiRGF5IiwiUHJlZmFiIiwieWVhclRleHQiLCJtb250aFRleHQiLCJkYXlUZXh0Iiwib25Mb2FkIiwiaW5pdERhdGEiLCJ1cGRhdGVEYXRlIiwic2V0RGF0ZSIsImRhdGUiLCJEYXRlIiwieWVhciIsImdldEZ1bGxZZWFyIiwibW9udGgiLCJnZXRNb250aCIsImRheSIsImdldERhdGUiLCJwZmdMaXN0RGF5IiwiaSIsIm5vZGUiLCJpbnN0YW50aWF0ZSIsInBhcmVudCIsInB1c2giLCJzdHJpbmciLCJqcyIsImZvcm1hdFN0ciIsInRvdGFsRGF5cyIsImZyb21XZWVrIiwiZ2V0RGF5IiwibGVuZ3RoIiwiYWN0aXZlIiwiaW5kZXgiLCJyb3ciLCJNYXRoIiwiZmxvb3IiLCJjb2wiLCJ4Iiwid2lkdGgiLCJ5IiwiaGVpZ2h0Iiwic2V0UG9zaXRpb24iLCJzY3JpcHQiLCJnZXRDb21wb25lbnQiLCJzZXREYXkiLCJzZWxJbmRleCIsInNlbERheSIsIm9uQ2xpY2tMZWZ0Iiwic2V0RnVsbFllYXIiLCJzZXRNb250aCIsIm9uQ2xpY2tSaWdodCIsInNldFBpY2tEYXRlQ2FsbGJhY2siLCJjYiIsIm9uQ2xpY2tDbG9zZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUVKLEVBQUUsQ0FBQ0ssS0FEUjtBQUVSQyxJQUFBQSxNQUFNLEVBQUVOLEVBQUUsQ0FBQ08sSUFGSDtBQUdSQyxJQUFBQSxNQUFNLEVBQUVSLEVBQUUsQ0FBQ1MsTUFISDtBQUlQQyxJQUFBQSxRQUFRLEVBQUVWLEVBQUUsQ0FBQ0ssS0FKTjtBQUtQTSxJQUFBQSxTQUFTLEVBQUVYLEVBQUUsQ0FBQ0ssS0FMUDtBQU1QTyxJQUFBQSxPQUFPLEVBQUVaLEVBQUUsQ0FBQ0s7QUFOTCxHQUhQO0FBWUxRLEVBQUFBLE1BWkssb0JBWUs7QUFDTixTQUFLQyxRQUFMO0FBQ0EsU0FBS0MsVUFBTDtBQUNBLFNBQUtDLE9BQUwsQ0FBYSxJQUFiLEVBQWtCLENBQWxCLEVBQW9CLEVBQXBCO0FBQ0gsR0FoQkk7QUFrQkxGLEVBQUFBLFFBbEJLLHNCQWtCTTtBQUNQLFNBQUtHLElBQUwsR0FBWSxLQUFLQSxJQUFMLEdBQVksS0FBS0EsSUFBakIsR0FBd0IsSUFBSUMsSUFBSixFQUFwQztBQUNBLFNBQUtDLElBQUwsR0FBWSxLQUFLRixJQUFMLENBQVVHLFdBQVYsRUFBWjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLSixJQUFMLENBQVVLLFFBQVYsRUFBYjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxLQUFLTixJQUFMLENBQVVPLE9BQVYsRUFBWDtBQUVBLFNBQUtDLFVBQUwsR0FBa0IsRUFBbEI7O0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCLEVBQUVBLENBQTFCLEVBQTZCO0FBQ3pCLFVBQUlDLElBQUksR0FBRzNCLEVBQUUsQ0FBQzRCLFdBQUgsQ0FBZSxLQUFLcEIsTUFBcEIsQ0FBWDtBQUNBbUIsTUFBQUEsSUFBSSxDQUFDRSxNQUFMLEdBQWMsS0FBS3ZCLE1BQW5CO0FBQ0EsV0FBS21CLFVBQUwsQ0FBZ0JLLElBQWhCLENBQXFCSCxJQUFyQjtBQUNIO0FBQ0osR0E5Qkk7QUFnQ0w7QUFDQVgsRUFBQUEsT0FqQ0ssbUJBaUNHRyxJQWpDSCxFQWlDU0UsS0FqQ1QsRUFpQ2dCRSxHQWpDaEIsRUFpQ3FCO0FBQ3RCLFNBQUtOLElBQUwsR0FBWSxJQUFJQyxJQUFKLENBQVNDLElBQVQsRUFBZUUsS0FBZixFQUFzQkUsR0FBdEIsQ0FBWjtBQUNBLFNBQUtKLElBQUwsR0FBWSxLQUFLRixJQUFMLENBQVVHLFdBQVYsRUFBWjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxLQUFLSixJQUFMLENBQVVLLFFBQVYsRUFBYjtBQUNBLFNBQUtDLEdBQUwsR0FBVyxLQUFLTixJQUFMLENBQVVPLE9BQVYsRUFBWDtBQUNBLFNBQUtULFVBQUw7QUFDSCxHQXZDSTtBQXlDTEEsRUFBQUEsVUF6Q0ssd0JBeUNTO0FBQUE7O0FBQ1YsU0FBS1gsV0FBTCxDQUFpQjJCLE1BQWpCLEdBQTBCL0IsRUFBRSxDQUFDZ0MsRUFBSCxDQUFNQyxTQUFOLENBQWdCLFFBQWhCLEVBQTBCLEtBQUtkLElBQS9CLEVBQXFDLEtBQUtFLEtBQUwsR0FBYSxDQUFsRCxDQUExQjtBQUVBLFFBQUlKLElBQUksR0FBRyxJQUFJQyxJQUFKLENBQVMsS0FBS0MsSUFBZCxFQUFvQixLQUFLRSxLQUF6QixFQUFnQyxDQUFoQyxDQUFYO0FBQ0EsUUFBSWEsU0FBUyxHQUFHakIsSUFBSSxDQUFDTyxPQUFMLEVBQWhCO0FBQ0EsUUFBSVcsUUFBUSxHQUFHbEIsSUFBSSxDQUFDbUIsTUFBTCxFQUFmOztBQUNBLFNBQUssSUFBSVYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxLQUFLRCxVQUFMLENBQWdCWSxNQUFwQyxFQUE0QyxFQUFFWCxDQUE5QyxFQUFpRDtBQUM3QyxVQUFJQyxJQUFJLEdBQUcsS0FBS0YsVUFBTCxDQUFnQkMsQ0FBaEIsQ0FBWDs7QUFDQSxVQUFJQSxDQUFDLEdBQUdRLFNBQVIsRUFBbUI7QUFDZlAsUUFBQUEsSUFBSSxDQUFDVyxNQUFMLEdBQWMsSUFBZDtBQUNBLFlBQUlDLEtBQUssR0FBR0osUUFBUSxHQUFHVCxDQUF2QjtBQUNBLFlBQUljLEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdILEtBQUssR0FBRyxDQUFuQixDQUFWO0FBQ0EsWUFBSUksR0FBRyxHQUFHSixLQUFLLEdBQUcsQ0FBbEI7QUFDQSxZQUFJSyxDQUFDLEdBQUcsRUFBRSxLQUFLdEMsTUFBTCxDQUFZdUMsS0FBWixHQUFvQmxCLElBQUksQ0FBQ2tCLEtBQTNCLElBQW9DLEdBQXBDLEdBQTBDRixHQUFHLEdBQUdoQixJQUFJLENBQUNrQixLQUE3RDtBQUNBLFlBQUlDLENBQUMsR0FBRyxDQUFDLEtBQUt4QyxNQUFMLENBQVl5QyxNQUFaLEdBQXFCcEIsSUFBSSxDQUFDb0IsTUFBM0IsSUFBcUMsR0FBckMsR0FBMkNQLEdBQUcsR0FBR2IsSUFBSSxDQUFDb0IsTUFBOUQ7QUFDQXBCLFFBQUFBLElBQUksQ0FBQ3FCLFdBQUwsQ0FBaUJKLENBQWpCLEVBQW9CRSxDQUFwQjtBQUNBLFlBQUlHLE1BQU0sR0FBR3RCLElBQUksQ0FBQ3VCLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBYjtBQUNBRCxRQUFBQSxNQUFNLENBQUNFLE1BQVAsQ0FBY3pCLENBQWQsRUFBaUJBLENBQUMsR0FBRyxDQUFyQixFQUF3QixLQUFLSCxHQUFMLEtBQWFHLENBQUMsR0FBRyxDQUF6QyxFQUE0QyxVQUFDMEIsUUFBRCxFQUFXQyxNQUFYLEVBQW9CO0FBQzVELFVBQUEsS0FBSSxDQUFDOUIsR0FBTCxHQUFXOEIsTUFBWDs7QUFDQSxVQUFBLEtBQUksQ0FBQ3RDLFVBQUw7QUFDSCxTQUhEO0FBSUgsT0FiRCxNQWFPO0FBQ0hZLFFBQUFBLElBQUksQ0FBQ1csTUFBTCxHQUFjLEtBQWQ7QUFDSDtBQUNKOztBQUNELFNBQUs1QixRQUFMLENBQWNxQixNQUFkLEdBQXVCLEtBQUtaLElBQTVCO0FBQ0EsU0FBS1IsU0FBTCxDQUFlb0IsTUFBZixHQUF3QixLQUFLVixLQUFMLEdBQVcsQ0FBbkM7QUFDQSxTQUFLVCxPQUFMLENBQWFtQixNQUFiLEdBQXNCLEtBQUtSLEdBQTNCLENBM0JVLENBNEJWO0FBQ0gsR0F0RUk7QUF3RUwrQixFQUFBQSxXQXhFSyx5QkF3RVU7QUFDWCxRQUFJLEtBQUtqQyxLQUFMLEdBQWEsQ0FBakIsRUFBb0I7QUFDaEIsV0FBS0EsS0FBTCxJQUFjLENBQWQ7QUFDSCxLQUZELE1BRU87QUFDSCxXQUFLQSxLQUFMLEdBQWEsRUFBYjtBQUNBLFdBQUtGLElBQUwsSUFBYSxDQUFiO0FBQ0g7O0FBQ0QsU0FBS0YsSUFBTCxDQUFVc0MsV0FBVixDQUFzQixLQUFLcEMsSUFBM0I7QUFDQSxTQUFLRixJQUFMLENBQVV1QyxRQUFWLENBQW1CLEtBQUtuQyxLQUF4QjtBQUNBLFNBQUtOLFVBQUw7QUFDSCxHQWxGSTtBQW9GTDBDLEVBQUFBLFlBcEZLLDBCQW9GVztBQUNaLFFBQUksS0FBS3BDLEtBQUwsR0FBYSxFQUFqQixFQUFxQjtBQUNqQixXQUFLQSxLQUFMLElBQWMsQ0FBZDtBQUNILEtBRkQsTUFFTztBQUNILFdBQUtBLEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBS0YsSUFBTCxJQUFhLENBQWI7QUFDSDs7QUFDRCxTQUFLRixJQUFMLENBQVVzQyxXQUFWLENBQXNCLEtBQUtwQyxJQUEzQjtBQUNBLFNBQUtGLElBQUwsQ0FBVXVDLFFBQVYsQ0FBbUIsS0FBS25DLEtBQXhCO0FBQ0EsU0FBS04sVUFBTDtBQUNILEdBOUZJO0FBZ0dMO0FBQ0EyQyxFQUFBQSxtQkFqR0ssK0JBaUdlQyxFQWpHZixFQWlHbUI7QUFDcEIsU0FBS0EsRUFBTCxHQUFVQSxFQUFWO0FBRUgsR0FwR0k7QUFzR0xDLEVBQUFBLFlBdEdLLDBCQXNHVztBQUNaLFFBQUksS0FBS0QsRUFBVCxFQUFhO0FBQ1gsV0FBS0EsRUFBTCxDQUFRLEtBQUt4QyxJQUFiLEVBQW1CLEtBQUtFLEtBQXhCLEVBQStCLEtBQUtFLEdBQXBDO0FBQ0Q7O0FBQ0QsU0FBS0ksSUFBTCxDQUFVRSxNQUFWLEdBQW1CLElBQW5CO0FBQ0g7QUEzR0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLyoqIFxuICog5pel5pyf57uE5Lu2XG4gKi9cbmNjLkNsYXNzKHtcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGxiWWVhck1vbnRoOiBjYy5MYWJlbCxcbiAgICAgICAgbmREYXlzOiBjYy5Ob2RlLFxuICAgICAgICBwZmJEYXk6IGNjLlByZWZhYixcbiAgICAgICAgIHllYXJUZXh0OiBjYy5MYWJlbCxcbiAgICAgICAgIG1vbnRoVGV4dDogY2MuTGFiZWwsXG4gICAgICAgICBkYXlUZXh0OiBjYy5MYWJlbCxcbiAgICB9LFxuXG4gICAgb25Mb2FkICgpIHtcbiAgICAgICAgdGhpcy5pbml0RGF0YSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGUoKTtcbiAgICAgICAgdGhpcy5zZXREYXRlKDE5OTQsNCwyOSk7XG4gICAgfSxcblxuICAgIGluaXREYXRhKCkge1xuICAgICAgICB0aGlzLmRhdGUgPSB0aGlzLmRhdGUgPyB0aGlzLmRhdGUgOiBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLnllYXIgPSB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5tb250aCA9IHRoaXMuZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICB0aGlzLmRheSA9IHRoaXMuZGF0ZS5nZXREYXRlKCk7XG5cbiAgICAgICAgdGhpcy5wZmdMaXN0RGF5ID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzE7ICsraSkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBmYkRheSk7XG4gICAgICAgICAgICBub2RlLnBhcmVudCA9IHRoaXMubmREYXlzO1xuICAgICAgICAgICAgdGhpcy5wZmdMaXN0RGF5LnB1c2gobm9kZSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8g6K6+572u5pi+56S655qE5pel5b+X77yM6buY6K6k5Li65b2T5YmN5pel5pyfXG4gICAgc2V0RGF0ZSh5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgIHRoaXMuZGF0ZSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgICB0aGlzLnllYXIgPSB0aGlzLmRhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgdGhpcy5tb250aCA9IHRoaXMuZGF0ZS5nZXRNb250aCgpO1xuICAgICAgICB0aGlzLmRheSA9IHRoaXMuZGF0ZS5nZXREYXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlRGF0ZSgpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVEYXRlICgpIHtcbiAgICAgICAgdGhpcy5sYlllYXJNb250aC5zdHJpbmcgPSBjYy5qcy5mb3JtYXRTdHIoXCIlc+W5tCVz5pyIXCIsIHRoaXMueWVhciwgdGhpcy5tb250aCArIDEpO1xuXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUodGhpcy55ZWFyLCB0aGlzLm1vbnRoLCAwKTtcbiAgICAgICAgbGV0IHRvdGFsRGF5cyA9IGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICBsZXQgZnJvbVdlZWsgPSBkYXRlLmdldERheSgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucGZnTGlzdERheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnBmZ0xpc3REYXlbaV07XG4gICAgICAgICAgICBpZiAoaSA8IHRvdGFsRGF5cykge1xuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBmcm9tV2VlayArIGk7XG4gICAgICAgICAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoaW5kZXggLyA3KTtcbiAgICAgICAgICAgICAgICBsZXQgY29sID0gaW5kZXggJSA3O1xuICAgICAgICAgICAgICAgIGxldCB4ID0gLSh0aGlzLm5kRGF5cy53aWR0aCAtIG5vZGUud2lkdGgpICogMC41ICsgY29sICogbm9kZS53aWR0aDtcbiAgICAgICAgICAgICAgICBsZXQgeSA9ICh0aGlzLm5kRGF5cy5oZWlnaHQgLSBub2RlLmhlaWdodCkgKiAwLjUgLSByb3cgKiBub2RlLmhlaWdodDtcbiAgICAgICAgICAgICAgICBub2RlLnNldFBvc2l0aW9uKHgsIHkpO1xuICAgICAgICAgICAgICAgIGxldCBzY3JpcHQgPSBub2RlLmdldENvbXBvbmVudChcIlVJSXRlbURheVwiKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQuc2V0RGF5KGksIGkgKyAxLCB0aGlzLmRheSA9PT0gaSArIDEsIChzZWxJbmRleCwgc2VsRGF5KT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRheSA9IHNlbERheTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVEYXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy55ZWFyVGV4dC5zdHJpbmcgPSB0aGlzLnllYXI7XG4gICAgICAgIHRoaXMubW9udGhUZXh0LnN0cmluZyA9IHRoaXMubW9udGgrMTtcbiAgICAgICAgdGhpcy5kYXlUZXh0LnN0cmluZyA9IHRoaXMuZGF5O1xuICAgICAgICAvL2NvbnNvbGUubG9nKCB0aGlzLnllYXJUZXh0ICsgXCIuXCIgKyAgIHRoaXMubW9udGhUZXh0ICsgXCIuXCIrIHRoaXMuZGF5VGV4dCk7XG4gICAgfSxcblxuICAgIG9uQ2xpY2tMZWZ0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9udGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoIC09IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vbnRoID0gMTE7XG4gICAgICAgICAgICB0aGlzLnllYXIgLT0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGUuc2V0RnVsbFllYXIodGhpcy55ZWFyKTtcbiAgICAgICAgdGhpcy5kYXRlLnNldE1vbnRoKHRoaXMubW9udGgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGUoKTtcbiAgICB9LFxuXG4gICAgb25DbGlja1JpZ2h0ICgpIHtcbiAgICAgICAgaWYgKHRoaXMubW9udGggPCAxMSkge1xuICAgICAgICAgICAgdGhpcy5tb250aCArPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb250aCA9IDA7XG4gICAgICAgICAgICB0aGlzLnllYXIgKz0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGUuc2V0RnVsbFllYXIodGhpcy55ZWFyKTtcbiAgICAgICAgdGhpcy5kYXRlLnNldE1vbnRoKHRoaXMubW9udGgpO1xuICAgICAgICB0aGlzLnVwZGF0ZURhdGUoKTtcbiAgICB9LFxuXG4gICAgLy8g6K6+572u6YCJ5Lit5pel5pyf5LmL5ZCO55qE5Zue6LCDXG4gICAgc2V0UGlja0RhdGVDYWxsYmFjayhjYikge1xuICAgICAgICB0aGlzLmNiID0gY2I7XG4gICAgICBcbiAgICB9LFxuXG4gICAgb25DbGlja0Nsb3NlICgpIHtcbiAgICAgICAgaWYgKHRoaXMuY2IpIHtcbiAgICAgICAgICB0aGlzLmNiKHRoaXMueWVhciwgdGhpcy5tb250aCwgdGhpcy5kYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubm9kZS5wYXJlbnQgPSBudWxsO1xuICAgIH0sXG59KTtcbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/PrivacySetup.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '80a3eHlGQFCMbIs8tiJCwBG', 'PrivacySetup');
// scripts/PrivacySetup.ts

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
var PrivacySetup = /** @class */ (function (_super) {
    __extends(PrivacySetup, _super);
    function PrivacySetup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrivacySetup.prototype.onLoad = function () {
        cc.log("privacyUrl" + this.encode_utf8(GameData_1.default.privacyUrl));
        this.webView.url = this.encode_utf8(GameData_1.default.privacyUrl);
    };
    PrivacySetup.prototype.encode_utf8 = function (s) {
        return unescape(encodeURIComponent(s));
    };
    __decorate([
        property(cc.WebView)
    ], PrivacySetup.prototype, "webView", void 0);
    PrivacySetup = __decorate([
        ccclass
    ], PrivacySetup);
    return PrivacySetup;
}(cc.Component));
exports.default = PrivacySetup;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9zY3JpcHRzL1ByaXZhY3lTZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVsRix1Q0FBa0M7QUFFNUIsSUFBQSxrQkFBbUMsRUFBbEMsb0JBQU8sRUFBRSxzQkFBeUIsQ0FBQztBQUcxQztJQUEwQyxnQ0FBWTtJQUF0RDs7SUFjQSxDQUFDO0lBVEcsNkJBQU0sR0FBTjtRQUNJLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQsa0NBQVcsR0FBWCxVQUFhLENBQUM7UUFDVixPQUFPLFFBQVEsQ0FBRSxrQkFBa0IsQ0FBRSxDQUFDLENBQUUsQ0FBRSxDQUFDO0lBQy9DLENBQUM7SUFURDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDO2lEQUNEO0lBSEgsWUFBWTtRQURoQyxPQUFPO09BQ2EsWUFBWSxDQWNoQztJQUFELG1CQUFDO0NBZEQsQUFjQyxDQWR5QyxFQUFFLENBQUMsU0FBUyxHQWNyRDtrQkFkb0IsWUFBWSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIFR5cGVTY3JpcHQ6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy90eXBlc2NyaXB0Lmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vIExlYXJuIGxpZmUtY3ljbGUgY2FsbGJhY2tzOlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgR2FtZURhdGEgZnJvbSBcIi4vR2FtZURhdGFcIjtcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcml2YWN5U2V0dXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KGNjLldlYlZpZXcpXG4gICAgd2ViVmlldzogY2MuV2ViVmlldztcbiAgICAgICAgXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjYy5sb2coXCJwcml2YWN5VXJsXCIrdGhpcy5lbmNvZGVfdXRmOChHYW1lRGF0YS5wcml2YWN5VXJsKSk7XG4gICAgICAgIHRoaXMud2ViVmlldy51cmwgPSB0aGlzLmVuY29kZV91dGY4KEdhbWVEYXRhLnByaXZhY3lVcmwpO1xuICAgIH1cblxuICAgIGVuY29kZV91dGY4KCBzICl7XG4gICAgICAgIHJldHVybiB1bmVzY2FwZSggZW5jb2RlVVJJQ29tcG9uZW50KCBzICkgKTtcbiAgICB9XG5cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UIGenderBtn.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVUlHZW5kZXJCdG4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9CQUFvQjtBQUNwQix3RUFBd0U7QUFDeEUsbUJBQW1CO0FBQ25CLGtGQUFrRjtBQUNsRiw4QkFBOEI7QUFDOUIsa0ZBQWtGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFbEYsdUNBQWtDO0FBRTVCLElBQUEsa0JBQW1DLEVBQWxDLG9CQUFPLEVBQUUsc0JBQXlCLENBQUM7QUFHMUM7SUFBeUMsK0JBQVk7SUFEckQ7UUFBQSxxRUFrQ0M7UUEvQkcsU0FBRyxHQUFjLElBQUksQ0FBQztRQUd0QixZQUFNLEdBQVcsQ0FBQyxDQUFDOztRQTJCbkIsaUJBQWlCO0lBQ3JCLENBQUM7SUFwQkcsNEJBQU0sR0FBTjtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCwyQkFBSyxHQUFMO1FBQ0ksSUFBSSxpQkFBaUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEQsaUJBQWlCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyx3Q0FBd0M7UUFDOUUsaUJBQWlCLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFBLFVBQVU7UUFDdEQsaUJBQWlCLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyxDQUFDLE9BQU87UUFDbkQsaUJBQWlCLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDLE1BQU07UUFDaEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUdNLGtDQUFZLEdBQW5CO1FBQ0ksa0JBQVEsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM5QixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUExQkQ7UUFEQyxRQUFROytDQUNVO0lBR25CO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ0E7SUFHbEI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQzs2Q0FDSDtJQVhFLFdBQVc7UUFEL0IsT0FBTztPQUNhLFdBQVcsQ0FpQy9CO0lBQUQsa0JBQUM7Q0FqQ0QsQUFpQ0MsQ0FqQ3dDLEVBQUUsQ0FBQyxTQUFTLEdBaUNwRDtrQkFqQ29CLFdBQVciLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuaW1wb3J0IEdhbWVEYXRhIGZyb20gXCIuL0dhbWVEYXRhXCI7XG5cbmNvbnN0IHtjY2NsYXNzLCBwcm9wZXJ0eX0gPSBjYy5fZGVjb3JhdG9yO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUlHZW5kZXJCdG4gZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgYnRuOiBjYy5CdXR0b24gPSBudWxsO1xuXG4gICAgQHByb3BlcnR5XG4gICAgZ2VuZGVyOiBudW1iZXIgPSAxO1xuXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgaGlkZVZpZXc6IGNjLk5vZGU7XG4gICAgXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgdmlldzogY2MuTm9kZSA7XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYnRuID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgY2xpY2tFdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci50YXJnZXQgPSB0aGlzLm5vZGU7IC8v6L+Z5LiqIG5vZGUg6IqC54K55piv5L2g55qE5LqL5Lu25aSE55CG5Luj56CB57uE5Lu25omA5bGe55qE6IqC54K577yM6L+Z6YeM5bCx5pivQnV0dG9uMlxuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5jb21wb25lbnQgPSBcIlVJR2VuZGVyQnRuXCI7Ly/ov5nkuKrmmK/ohJrmnKzmlofku7blkI1cbiAgICAgICAgY2xpY2tFdmVudEhhbmRsZXIuaGFuZGxlciA9IFwic2VsZWN0R2VuZGVyXCI7IC8v5Zue6LCD5Ye95ZCN56ewXG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmN1c3RvbUV2ZW50RGF0YSA9IG51bGw7IC8v55So5oi35pWw5o2uXG4gICAgICAgIHRoaXMuYnRuLmNsaWNrRXZlbnRzLnB1c2goY2xpY2tFdmVudEhhbmRsZXIpO1xuICAgIH1cbiAgICBcblxuICAgIHB1YmxpYyBzZWxlY3RHZW5kZXIoKSB7XG4gICAgICAgIEdhbWVEYXRhLmdlbmRlciA9IHRoaXMuZ2VuZGVyO1xuICAgICAgICB0aGlzLmhpZGVWaWV3LmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpZXcuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgLy8gdXBkYXRlIChkdCkge31cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/UIShowNode.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c7e52EeQyRGf6mHfDgZBH2u', 'UIShowNode');
// Script/UIShowNode.ts

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
var UIShowNode = /** @class */ (function (_super) {
    __extends(UIShowNode, _super);
    function UIShowNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIShowNode.prototype.show = function () {
        this.hideScene.active = false;
        this.showScene.active = true;
    };
    UIShowNode.prototype.onLoad = function () {
        this.btn = this.node.getComponent(cc.Button);
    };
    UIShowNode.prototype.start = function () {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "UIShowNode";
        clickEventHandler.handler = "show";
        clickEventHandler.customEventData = null;
        this.btn.clickEvents.push(clickEventHandler);
    };
    __decorate([
        property(cc.Node)
    ], UIShowNode.prototype, "hideScene", void 0);
    __decorate([
        property(cc.Node)
    ], UIShowNode.prototype, "showScene", void 0);
    UIShowNode = __decorate([
        ccclass
    ], UIShowNode);
    return UIShowNode;
}(cc.Component));
exports.default = UIShowNode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvVUlTaG93Tm9kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ3BCLHdFQUF3RTtBQUN4RSxtQkFBbUI7QUFDbkIsa0ZBQWtGO0FBQ2xGLDhCQUE4QjtBQUM5QixrRkFBa0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUU1RSxJQUFBLGtCQUFtQyxFQUFsQyxvQkFBTyxFQUFFLHNCQUF5QixDQUFDO0FBRzFDO0lBQXdDLDhCQUFZO0lBQXBEOztJQTZCQSxDQUFDO0lBakJVLHlCQUFJLEdBQVg7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ2pDLENBQUM7SUFFRCwyQkFBTSxHQUFOO1FBQ0ksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELDBCQUFLLEdBQUw7UUFDSSxJQUFJLGlCQUFpQixHQUFHLElBQUksRUFBRSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4RCxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNyQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFDO1FBQzNDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbkMsaUJBQWlCLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBekJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7aURBQ0M7SUFHbkI7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztpREFDQztJQU5GLFVBQVU7UUFEOUIsT0FBTztPQUNhLFVBQVUsQ0E2QjlCO0lBQUQsaUJBQUM7Q0E3QkQsQUE2QkMsQ0E3QnVDLEVBQUUsQ0FBQyxTQUFTLEdBNkJuRDtrQkE3Qm9CLFVBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBUeXBlU2NyaXB0OlxuLy8gIC0gaHR0cHM6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC9lbi9zY3JpcHRpbmcvdHlwZXNjcmlwdC5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBodHRwczovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcblxuY29uc3Qge2NjY2xhc3MsIHByb3BlcnR5fSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSVNob3dOb2RlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIGhpZGVTY2VuZTogY2MuTm9kZTtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHNob3dTY2VuZTogY2MuTm9kZTtcblxuXG5cbiAgICBidG46IGNjLkJ1dHRvbjtcblxuICAgIHB1YmxpYyBzaG93KCkge1xuICAgICAgICB0aGlzLmhpZGVTY2VuZS5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zaG93U2NlbmUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuYnRuID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICB2YXIgY2xpY2tFdmVudEhhbmRsZXIgPSBuZXcgY2MuQ29tcG9uZW50LkV2ZW50SGFuZGxlcigpO1xuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci50YXJnZXQgPSB0aGlzLm5vZGU7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmNvbXBvbmVudCA9IFwiVUlTaG93Tm9kZVwiO1xuICAgICAgICBjbGlja0V2ZW50SGFuZGxlci5oYW5kbGVyID0gXCJzaG93XCI7XG4gICAgICAgIGNsaWNrRXZlbnRIYW5kbGVyLmN1c3RvbUV2ZW50RGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuYnRuLmNsaWNrRXZlbnRzLnB1c2goY2xpY2tFdmVudEhhbmRsZXIpO1xuICAgIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------
