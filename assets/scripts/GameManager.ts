// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameData from "./GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Sprite)
    race: cc.Sprite = null;

    @property(cc.Sprite)
    job: cc.Sprite = null;

    @property(cc.Label)
    raceLabel: cc.Label ;

    @property(cc.Label)
    jobLabel: cc.Label;

    selectId;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
      /*  cc.loader.loadResDir("race",cc.SpriteFrame, function (err, assets) {
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
        });*/
 
    }

    public caculateLife(id) {
        cc.log("id" + id);
        this.selectId = id;
        GameData.currentCode = this.toUnicode(GameData.nickname, id);
        cc.log("code" + GameData.currentCode);
        GameData.currentRace = this.toImagecode(GameData.currentCode, GameData.race.length-1);
        GameData.currentJob = this.toImagecode(GameData.currentCode, GameData.job.length-1);
        cc.log("race" + GameData.currentRace);
        cc.log("job" + GameData.currentJob);
        this.race.spriteFrame = GameData.race[GameData.currentRace];
        this.job.spriteFrame = GameData.job[GameData.currentJob];
        this.raceLabel.string = this.race.spriteFrame.name;
        this.jobLabel.string = this.job.spriteFrame.name;
    }

    /*decodeName(str): number{ 
        let result = 0;
        var value='';
        for (var i = 0; i < str.length; i++) {
            value = parseInt(str.charCodeAt(i)).toString(16);
            result+=parseInt(value.replace(/\D/g, ''));
        }
        return result+ GameData.year + GameData.month + GameData.date + GameData.gender;;
    }*/

    toUnicode(str,id): number{
        let result = 0;
        let unicodeStr = '';
        for (let i = 0, iLength = str.length; i < iLength; i++) {
            unicodeStr = str.charCodeAt(i).toString(16);
            //cc.log(unicodeStr);
            result+=parseInt(unicodeStr.replace(/\D/g, ''),0);
        }
        cc.log("day", GameData.day);
        cc.log("month", GameData.month);
        cc.log("gender", GameData.gender);
        return result + GameData.year + GameData.month + GameData.day * GameData.gender*id;
    }

    toImagecode(value,imageCount): number{
        while (value > imageCount)
            value -= imageCount;
        return Math.round(value);
    }

    // update (dt) {}
}
