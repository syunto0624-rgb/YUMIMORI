const assert=require('node:assert/strict');
const {t,win,ctx,elements,B}=require('./harness.cjs')();
function setup(index){t.clear();t.setState('playing');t.camera.position.set(0,1.3,-5);t.camera.rotation.set(0,0,0);t.selectWeapon(index);t.cooldowns.fill(0);}
function matrices(){t.scene.meshes.forEach(m=>m.computeWorldMatrix(true));t.camera.computeWorldMatrix(true);}
setup(1);const targets=[0,2,4,6].map(z=>t.enemy(0,z,true));matrices();assert.equal(t.shoot(),true);t.advanceProjectile(t.arrows[0],.05);assert.equal(targets[0].dead,true);assert.equal(targets[1].dead,true);assert.ok(Math.abs(targets[2].hp-21.6)<.01);assert.equal(targets[3].hp,100);assert.equal(t.arrows[0].hitEnemies.size,3);
// Switching away and back must never erase the matchlock's reload.
t.selectWeapon(2);assert.equal(t.shoot(),true);t.selectWeapon(1);assert.equal(t.shoot(),false);assert.equal(t.cooldowns[1],3.6);
// A solid wall terminates a penetrating shot before an enemy behind it.
setup(1);const wall=B.MeshBuilder.CreateBox('house',{width:3,height:3,depth:.3},t.scene);wall.position.set(0,1.5,-1);const blocked=t.enemy(0,1,true);matrices();t.shoot();t.advanceProjectile(t.arrows[0],.05);assert.equal(blocked.hp,100);assert.equal(t.arrows[0].remove,true);wall.dispose();
// Blast falloff affects a group once; walls protect targets and the player.
setup(3);const near=t.enemy(0,0,true),far=t.enemy(4,0,true),outside=t.enemy(6,0,true);matrices();const a={w:ctx.EdoCombat.weapons[3]};t.explode(a,new B.Vector3(0,1,0));assert.equal(near.dead,true);assert.ok(far.hp>30&&far.hp<50);assert.equal(outside.hp,100);const old=far.hp;t.explode(a,new B.Vector3(0,1,0));assert.equal(far.hp,old);
setup(3);const protectedEnemy=t.enemy(0,2,true);const cover=B.MeshBuilder.CreateBox('house',{width:6,height:4,depth:.3},t.scene);cover.position.set(0,2,1);matrices();t.explode({w:ctx.EdoCombat.weapons[3]},new B.Vector3(0,1,0));assert.equal(protectedEnemy.hp,100);cover.dispose();
// Range cutoff and timed detonation work without a direct hit.
setup(2);matrices();t.shoot();const star=t.arrows[0];for(let i=0;i<20&&!star.remove;i++)t.advanceProjectile(star,.05);assert.equal(star.remove,true);assert.ok(star.distance<=24.001);
setup(3);t.camera.rotation.x=-.6;matrices();t.shoot();const fire=t.arrows[0];for(let i=0;i<50&&!fire.remove;i++)t.advanceProjectile(fire,.05);assert.equal(fire.exploded,true);assert.equal(fire.remove,true);
// Exercise the actual input handlers and per-weapon timers.
setup(1);const canvas=elements.get('renderCanvas');canvas.listeners.pointerdown({button:0});assert.equal(t.arrows.length,1);assert.equal(t.cooldowns[1],3.6);win.listeners.pointerup({button:0});assert.equal(t.arrows.length,1);
win.listeners.keydown({code:'Digit3'});canvas.listeners.pointerdown({button:0});for(let i=0;i<10;i++)t.update(.05);win.listeners.pointerup({button:0});assert.ok(t.arrows.filter(a=>a.w.id==='shuriken').length>=2);assert.ok(t.cooldowns[1]<3.6&&t.cooldowns[1]>3);win.listeners.keydown({code:'Digit2'});assert.equal(t.shoot(),false);
setup(0);canvas.listeners.pointerdown({button:0});for(let i=0;i<18;i++)t.update(.05);win.listeners.pointerup({button:0});assert.ok(Math.abs(t.arrows[0].power-1)<.001);assert.equal(t.cooldowns[0],.55);
t.setState('paused');const frozen=t.cooldowns[0];t.update(.5);assert.equal(t.cooldowns[0],frozen);
t.scene.dispose();console.log('Projectile integration: penetration, reload persistence, walls, grouped blast, range and fuse passed.');
