// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIGenderBtn extends cc.Component {

    btn: cc.Button = null;

    @property
    gender: number = 1;

    @property(cc.Node)
    hideView: cc.Node;
    
    @property(cc.Node)
    view: cc.Node ;

    onLoad() {
        this.btn = this.node.getComponent(cc.Button);
    }

    start() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        clickEventHandler.component = "UIGenderBtn";//这个是脚本文件名
        clickEventHandler.handler = "selectGender"; //回调函名称
        clickEventHandler.customEventData = null; //用户数据
        this.btn.clickEvents.push(clickEventHandler);
    }
    

    public selectGender() {
        GameData.gender = this.gender;
        this.hideView.active = false;
        this.view.active = true;
    }
    // update (dt) {}
}
