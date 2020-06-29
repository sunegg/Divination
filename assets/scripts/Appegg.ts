// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Appegg extends cc.Component {
  configUrl: string = "https://api2.bmob.cn/1/classes/List/DNQcZZZx";
  apiKey: string = "35f40c516134ef64cd6f4932abd0e0f9";
  restApiKey: string = "c0a621b693adb49f837c7ef5bf4dadcb";

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

  static url;

  serverConfig;

  currentVersion: number = 0;
  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.privacyButton.node.on("click", this.onPrivacyClick, this);
    this.startButton.node.on("click", this.onStartClick, this);
    this.retryButton.node.on("click", this.onRetryClick, this);
  }

  start() {
    this.currentVersion = cc.sys.localStorage.getItem("version");
    this.connect();
  }

  connect() {
    this.httpGetAsync(
      this.configUrl,
      function (str) {
        var obj = JSON.parse(str);
        this.serverConfig = obj;
        //obj.appType = 2;
        //obj.url =
          "https://games.cdn.famobi.com/html5games/z/zoo-boom/v450/?fg_domain=play.famobi.com&fg_aid=A1000-1&fg_uid=5e772ebe-9e0a-4cd3-adcf-bba662f35535&fg_pid=4638e320-4444-4514-81c4-d80a8c662371&fg_beat=837&original_ref=https%3A%2F%2Fhtml5games.com%2FGame%2FZoo-Boom%2F5e772ebe-9e0a-4cd3-adcf-bba662f35535";
        console.log(str);
        console.log("当前appType为" + obj.appType);
        switch (obj.appType) {
          case 1:
            //if (this.currentVersion != obj.version)
            cc.director.loadScene("entry");
            break;
          case 2:
            Appegg.url = obj.url;
            cc.director.loadScene("web");
            break;
          case 3:
            break;
        }
      },
      function () {
        cc.log("连接失败");
      }
    );
  }

  httpGetAsync(theUrl, callback, error = null) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onerror ==
      function (e) {
        cc.log("网络错误");
      };
    xmlHttp.ontimeout ==
      function (e) {
        cc.log("网络超时");
      };
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(xmlHttp.responseText);
      // 这里获得返回数据。如有需要，结合实际情况进行解析处理。
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
    Appegg.url = this.serverConfig.privacyUrl;
    this.webView.active = true;
  }

  onStartClick(event) {
    cc.director.loadScene("entry");
  }
  // update (dt) {}
}
