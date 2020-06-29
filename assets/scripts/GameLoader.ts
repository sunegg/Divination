// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameLoader extends cc.Component {

    start () {
        cc.loader.loadResDir("race",cc.SpriteFrame, function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            GameData.race = assets;
        });
        cc.loader.loadResDir("job",cc.SpriteFrame ,function (err, assets) {
            if (err) {
                cc.error(err);
                return;
            }
            GameData.job = assets;
           // this.caculateLife(this.selectId);
        });
    }

}
