// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class UILoadScene extends cc.Component {

    @property
    scene: string = 'main';

    btn: cc.Button;

    public loadScene() {
        cc.director.loadScene(this.scene);
    }

    onLoad() {
        this.btn = this.node.getComponent(cc.Button);
    }

    start() {
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点，这里就是Button2
        clickEventHandler.component = "UILoadScene";//这个是脚本文件名
        clickEventHandler.handler = "loadScene"; //回调函名称
        clickEventHandler.customEventData = null; //用户数据

        this.btn.clickEvents.push(clickEventHandler);
    }
    
}
