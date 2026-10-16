(function(root){
const types={
bandit:{name:'山賊',hp:62,damage:13,speed:2.25,reach:2.2,recovery:1.7,windup:.35,height:1},
samurai:{name:'侍',hp:100,damage:19,speed:1.7,reach:2.2,recovery:1.9,windup:.4,height:1},
cavalry:{name:'騎馬兵',hp:220,damage:28,speed:3.1,reach:2.5,recovery:2.8,windup:.85,height:1.8},
shogun:{name:'将軍',hp:600,damage:24,speed:2.1,reach:3.3,recovery:2.1,windup:.65,height:1.3,boss:true},
oni:{name:'赤鬼',hp:1500,damage:36,speed:1.65,reach:6,recovery:3.3,windup:1.25,height:1.8,boss:true}
};
const modes={
training:{name:'訓練',hpScale:1,damageScale:0,speedScale:0,heal:0,practice:true,waves:[],description:'無傷・静止標的・自動復活。全5種で武器を試せます。'},
normal:{name:'ノーマル',hpScale:1,damageScale:1,speedScale:1,heal:25,practice:false,waves:[['bandit','samurai','bandit','samurai','cavalry'],['samurai','samurai','samurai','cavalry','cavalry','shogun'],['bandit','samurai','bandit','samurai','cavalry','cavalry','oni']],description:'全18戦。敵1体ごとに戦場を移動。第11戦に将軍、最終戦に赤鬼。章の節目で25回復。'},
oni:{name:'鬼',hpScale:1.5,damageScale:1.5,speedScale:1.2,heal:0,practice:false,waves:[['samurai','samurai','samurai','samurai','bandit','bandit','cavalry','cavalry'],['samurai','samurai','samurai','samurai','cavalry','cavalry','cavalry','shogun'],['samurai','samurai','samurai','cavalry','cavalry','cavalry','shogun','oni']],description:'全24戦。敵体力・攻撃力1.5倍、速度1.2倍。章間回復なし・銭の報酬2倍。'}
};
function totalEnemies(mode){return mode.waves.reduce((n,w)=>n+w.length,0);}
const api={types,modes,totalEnemies};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.EdoEncounters=api;
})(typeof window==='undefined'?globalThis:window);
