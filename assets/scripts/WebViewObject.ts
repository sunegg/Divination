// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Appegg from "./Appegg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WebViewObject extends cc.Component {

    start() {
        //cc.log(cc.director.getWinSizeInPixels());
        //cc.log(cc.director.getWinSize());
        //cc.log(cc.winSize);
        //cc.log(cc.view.getVisibleSize());
        //cc.log(cc.view.getFrameSize());
        this.node.setContentSize (cc.winSize);
        let webView = this.getComponent(cc.WebView);
       webView.url = Appegg.url;
    }

}
