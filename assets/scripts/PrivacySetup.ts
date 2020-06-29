// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Appegg from "./Appegg";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrivacySetup extends cc.Component {

    @property(cc.WebView)
    webView: cc.WebView;
        
    onLoad() {
        cc.log("privacyUrl"+Appegg.privacyUrl);
        this.webView.url = Appegg.privacyUrl;
    }

}
