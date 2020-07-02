// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

export default class GameData {

    static year:number=0;
  
    static month:number=0;
  
    static nickname:string;
  
    static day:number=0;
  
    static century: number=0;

    static gender: number = 1;
    
    static currentCode: number = 0;
    
    static race: any[];
    
    static job: any[];
    
    static currentRace: number;
    
    static currentJob: number;

    static url: string;
    
    static privacyUrl: string;
}