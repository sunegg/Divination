// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "./GameData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Appegg extends cc.Component {
  configUrl: string = "https://api2.bmob.cn/1/classes/List/u8QxFFFS";
  apiKey: string = "89f2d6cc27985334699879bfa8aa9dfd";
  restApiKey: string = "9278a7e3613aefe7ec07e390c2276bf2";

  @property(cc.Node)
  changelogView: cc.Node;

  @property(cc.Label)
  changelogTitleLabel: cc.Label;

  @property(cc.Label)
  changelogContentLabel: cc.Label;

  @property(cc.Button)
  privacyButton: cc.Button;

  @property(cc.Button)
  startButton: cc.Button;

  @property(cc.Button)
  retryButton: cc.Button;

  @property(cc.Node)
  errorView: cc.Node;

  @property(cc.Node)
  webView: cc.Node;

  //static url;

  //static privacyUrl;

  //currentVersion: number = 0;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.privacyButton.node.on("click", this.onPrivacyClick, this);
    this.startButton.node.on("click", this.onStartClick, this);
    this.retryButton.node.on("click", this.onRetryClick, this);
  }

  start() {
   //this.currentVersion = cc.sys.localStorage.getItem("version");
    this.connect();
  }

  connect() {
    this.httpGetAsync(
      this.configUrl,
      function (str) {
        console.log(str);
        var obj = JSON.parse(str);
        console.log(obj.url);
        //obj.url = "http://sdk.panguhy.com/game/?pgcid=2&gameId=3&sid=b788b530481b40e8a988b189510d26cc&deviceId=7522b6708b88464b70c3bf0c9ee60ea1";
        GameData.url= obj.url;
        GameData.privacyUrl = obj.privacyUrl;
        console.log("当前appType为" + obj.appType);
        switch (obj.appType) {
          case 1:
            //if (this.currentVersion != obj.version)
            cc.director.loadScene("entry");
            break;
          case 2:
            cc.director.loadScene("web");
            break;
          case 3:
            break;
        }
      },
      function () {
        //cc.log("连接失败");
      }
    );
  }



  httpGetAsync(theUrl, callback, error = null) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onerror ==
      function (e) {
        console.log("网络错误");
      };
    xmlHttp.ontimeout ==
      function (e) {
        console.log("网络超时");
      };
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
      else {
        error();
      }
    };

    xmlHttp.open("GET", theUrl, false); // true 为异步
    xmlHttp.setRequestHeader("X-Bmob-Application-Id", this.apiKey);
    xmlHttp.setRequestHeader("X-Bmob-REST-API-Key", this.restApiKey);
    xmlHttp.send(null);
  }

  onRetryClick(event) {
    this.errorView.active = false;
    this.connect();
  }

  onPrivacyClick(event) {
    this.webView.active = true;
  }

  onStartClick(event) {
    cc.director.loadScene("entry");
  }
  // update (dt) {}
}
