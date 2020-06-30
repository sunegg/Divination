
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