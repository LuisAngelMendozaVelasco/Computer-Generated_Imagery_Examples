import{P as u,W as f,S as m,j as c,b as l,a as b,c as p,R as x,V as h,B as g}from"./three.module-CnqCzuzg.js";class v extends m{constructor(){super()}sense(){for(var e=0;e<this.children.length;e++)this.children[e].sense!==void 0&&this.children[e].sense(this)}plan(){for(var e=0;e<this.children.length;e++)this.children[e].plan!==void 0&&this.children[e].plan(this)}act(){for(var e=0;e<this.children.length;e++)this.children[e].act!==void 0&&this.children[e].act(this)}}class d extends c{constructor(e,t=0,n=0){super(),this.add(new l(new b(e),new p)),this.step=.1,this.colision=0,this.radius=e,this.position.x=t,this.position.y=n,this.sensor=new x(this.position,new h(1,0,0))}sense(e){this.sensor.set(this.position,new h(1,0,0));const t=this.sensor.intersectObjects(e.children,!0);this.sensor.set(this.position,new h(-1,0,0));const n=this.sensor.intersectObjects(e.children,!0);t.length>0&&t[0].distance<=this.radius||n.length>0&&n[0].distance<=this.radius?this.colision=1:this.colision=0}act(){this.colision==1&&(this.step=-this.step),this.position.x+=this.step}}class i extends c{constructor(e,t=0,n=0){super(),this.add(new l(new g(e,e,e),new p)),this.size=e,this.position.x=t,this.position.y=n}}function y(){s=new v,o=new u,o.position.z=20,s.add(o),s.add(new i(1,7,0)),s.add(new i(1,-7,0)),s.add(new i(1,7,1)),s.add(new i(1,-7,1)),s.add(new i(1,7,-1)),s.add(new i(1,-7,-1)),s.add(new d(.5)),s.add(new d(.9,2,0)),r=new f,r.setSize(window.innerWidth*.5,window.innerHeight),document.body.appendChild(r.domElement)}function w(){requestAnimationFrame(w),s.sense(),s.plan(),s.act(),r.render(s,o)}var s,o,r;y();w();
