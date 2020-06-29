// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "./GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIEditBoxGroup extends cc.Component {
  @property(cc.EditBox)
  nameBox: cc.EditBox;

  @property(cc.EditBox)
  yearBox: cc.EditBox;

  @property(cc.EditBox)
  monthBox: cc.EditBox;

  @property(cc.EditBox)
  dateBox: cc.EditBox;

  @property(cc.Label)
  yearLabel: cc.Label;
  @property(cc.Label)
  monthLabel: cc.Label;
  @property(cc.Label)
  dayLabel: cc.Label;

  @property(cc.Label)
  errorLabel: cc.Label;

  year; month; day;

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
  /*  let date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth();
    this.day = date.getDate();*/
  }

  public onSubmit() {
    if (this.nameBox.string.trim().length == 0) {
      this.errorLabel.string = "请输入名字";
      return;
    } else {
      GameData.nickname = this.nameBox.string;
    }

   GameData.year = parseInt(this.yearLabel.string);
    GameData.month = parseInt(this.monthLabel.string);
    GameData.day = parseInt(this.dayLabel.string);

    cc.log(GameData.year + "." + GameData.month + "." + GameData.day);
    
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
  }
  // update (dt) {}
}
