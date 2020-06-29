// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    audioSource: cc.AudioSource;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.audioSource = this.getComponent(cc.AudioSource);
        cc.game.addPersistRootNode(this.node);
     }

    start () {
        cc.audioEngine.playMusic(this.audioSource.clip,true);
    }

    play () {
        this.audioSource.play();
    }

    pause (){
        this.audioSource.pause();
    }

    // update (dt) {}
}
