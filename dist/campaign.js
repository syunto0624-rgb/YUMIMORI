(function(root){
const key='yumimori.progress.v1';
const prices={bow:0,matchlock:300,shuriken:120,firearrow:450};
const terrains=[{id:'plains',name:'風渡る平原',label:'平原',reward:75},{id:'marsh',name:'霧隠れの沼地',label:'沼地',reward:90},{id:'river',name:'清流の川辺',label:'川辺',reward:100}];
function stageAt(mode,index){let i=0;for(let chapter=0;chapter<mode.waves.length;chapter++)for(const kind of mode.waves[chapter]){if(i===index)return{index,number:index+1,chapter:chapter+1,kind,terrain:terrains[index%terrains.length],reward:kind==='oni'?400:kind==='shogun'?250:terrains[index%terrains.length].reward};i++;}return null;}
function createProfile(storage){let state={coins:0,unlocked:['bow']},persistent=!!storage;try{const raw=storage?.getItem(key);if(raw){const data=JSON.parse(raw);if(Number.isSafeInteger(data.coins)&&data.coins>=0&&data.coins<=10000000&&Array.isArray(data.unlocked))state={coins:data.coins,unlocked:[...new Set(['bow',...data.unlocked.filter(id=>Object.hasOwn(prices,id))])]};}}catch{persistent=false;}
function save(){try{if(storage)storage.setItem(key,JSON.stringify(state));else persistent=false;}catch{persistent=false;}}
return{get coins(){return state.coins},get unlocked(){return [...state.unlocked]},get persistent(){return persistent},owns:id=>state.unlocked.includes(id),award(amount){if(!Number.isSafeInteger(amount)||amount<0||state.coins+amount>10000000)return false;state.coins+=amount;save();return true;},buy(id){if(!Object.hasOwn(prices,id))return{ok:false,reason:'unknown'};if(state.unlocked.includes(id))return{ok:false,reason:'owned'};if(state.coins<prices[id])return{ok:false,reason:'funds'};state.coins-=prices[id];state.unlocked.push(id);save();return{ok:true};}};
}
const api={prices,terrains,stageAt,createProfile};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.EdoCampaign=api;
})(typeof window==='undefined'?globalThis:window);
