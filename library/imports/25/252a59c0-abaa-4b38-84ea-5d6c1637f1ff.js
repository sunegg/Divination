"use strict";
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