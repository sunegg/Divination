// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PrivacySetup extends cc.Component {

    @property(cc.WebView)
    webView: cc.WebView;
        
    onLoad() {
        cc.log("privacyUrl"+this.encode_utf8(GameData.privacyUrl));
        this.webView.url = this.encode_utf8(GameData.privacyUrl);
    }

    encode_utf8( s ){
        return unescape( encodeURIComponent( s ) );
    }

}
