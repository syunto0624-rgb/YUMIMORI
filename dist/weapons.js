/* Gameplay values, in game metres and seconds. */
(function(root){
const weapons=[
{id:'bow',name:'竹弓',damage:83,minDamage:38,headDamage:150,range:60,cooldown:.55,penetration:1,speed:64,gravity:7.5,chargeTime:.9,radius:0,description:'長押しで引く・離して放つ',trait:'溜め射ち・精密射撃'},
{id:'matchlock',name:'火縄銃',damage:160,headDamage:240,range:100,cooldown:3.6,penetration:3,retention:.7,speed:210,gravity:.3,radius:0,description:'左クリックで発砲・装填 3.6秒',trait:'高威力・敵を3体まで貫通'},
{id:'shuriken',name:'手裏剣',damage:28,headDamage:56,range:24,cooldown:.22,penetration:1,speed:48,gravity:3,radius:0,armorScale:.65,description:'左長押しで連続投擲',trait:'高速連射・侍の胴には威力減'},
{id:'firearrow',name:'焙烙火矢',damage:25,headDamage:25,blastMax:130,blastMin:35,range:42,cooldown:4.5,penetration:1,speed:29,gravity:5.5,radius:5.5,fuse:2,description:'左クリックで放つ・着弾／2秒で爆発',trait:'範囲爆発・近距離は自爆に注意'}
];
function hitDamage(w,{head=false,samurai=false,charge=1,hitIndex=0}={}){let damage=head?w.headDamage:w.id==='bow'?w.minDamage+(w.damage-w.minDamage)*charge:w.damage;if(w.id==='shuriken'&&samurai&&!head)damage*=w.armorScale;return damage*Math.pow(w.retention??1,hitIndex);}
function blastDamage(w,distance){return distance>w.radius?0:w.blastMax+(w.blastMin-w.blastMax)*Math.max(0,distance)/w.radius;}
const api={weapons,hitDamage,blastDamage};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.EdoCombat=api;
})(typeof window==='undefined'?globalThis:window);
