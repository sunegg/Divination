// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "./GameData";

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
        console.log("加载" + this.encode_utf8(this.FormatString(GameData.url,idfa,idfv)));
        webView.url = this.encode_utf8(this.FormatString(GameData.url,idfa,idfv));
    }

    FormatString(str: string, ...val: string[]) {
        for (let index = 0; index < val.length; index++) {
          str = str.replace(`{${index}}`, val[index]);
        }
        return str;
      }

   encode_utf8( s ){
        return unescape( encodeURIComponent( s ) );
    }
  

}
