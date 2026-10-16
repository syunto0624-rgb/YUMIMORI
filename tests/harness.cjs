const fs=require('node:fs'),vm=require('node:vm');
module.exports=function createHarness({funded=true,withWorld=false}={}){
const B=require('../dist/vendor/babylon.js');
class TestEngine extends B.NullEngine{constructor(){super();}runRenderLoop(){} }
const elements=new Map();const el=()=>({style:{setProperty(){}},classList:{add(){},remove(){},toggle(){}},setAttribute(){},listeners:{},addEventListener(n,fn){this.listeners[n]=fn},focus(){},requestPointerLock(){return Promise.resolve()},firstElementChild:{style:{}}});
const modeChoices=['training','normal','oni'].map(id=>({...el(),dataset:{mode:id}}));const slots=Array.from({length:4},el);const doc={getElementById:id=>{if(!elements.has(id))elements.set(id,el());return elements.get(id)},querySelectorAll:selector=>selector==='.mode-choice'?modeChoices:selector==='[data-buy]'?[]:slots,body:el(),exitPointerLock(){},addEventListener(){}};
const win={BABYLON:B,devicePixelRatio:1,listeners:{},addEventListener(n,fn){this.listeners[n]=fn}};
const ctx={BABYLON:{...B,Engine:TestEngine},window:win,document:doc,EdoCombat:require('../dist/weapons.js'),EdoEncounters:require('../dist/encounters.js'),EdoCampaign:require('../dist/campaign.js'),console,setTimeout:()=>0,clearTimeout(){}};
vm.createContext(ctx);if(withWorld)vm.runInContext(fs.readFileSync(require.resolve('../dist/stages.js'),'utf8'),ctx);let src=fs.readFileSync(require.resolve('../dist/game.js'),'utf8');
src=src.replace('window.__yumimori=',`window.test={scene,camera,clear,enemy,shoot,profile,stageWorld,currentStage,completeStage,continueJourney,purchaseWeapon,openShop,closeShop,get stageIndex(){return stageIndex},selectWeapon,advanceProjectile,explode,update,updateEnemy,damage,hurtEnemy,selectMode,restart,returnToTitle,spawnWave,spawnTraining,modal,get wave(){return wave},get mode(){return modeId},get state(){return state},get kills(){return kills},setState:s=>state=s,get enemies(){return enemies},get arrows(){return arrows},get cooldowns(){return cooldowns},get hp(){return hp}};window.__yumimori=`);
vm.runInContext(src,ctx);const t=win.test;if(funded){t.profile.award(2000);for(const id of ['matchlock','shuriken','firearrow'])t.profile.buy(id);}
return {t,win,ctx,elements,B};
};
