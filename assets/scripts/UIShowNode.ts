// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIShowNode extends cc.Component {

    @property(cc.Node)
    hideScene: cc.Node;

    @property(cc.Node)
    showScene: cc.Node;



    btn: cc.Button;

    public show() {
        this.hideScene.active = false;
        this.showScene.active = true;
    }

    onLoad() {
        this.btn = this.node.getComponent(cc.Button);
    }

    start() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "UIShowNode";
        clickEventHandler.handler = "show";
        clickEventHandler.customEventData = null;
        this.btn.clickEvents.push(clickEventHandler);
    }
}
