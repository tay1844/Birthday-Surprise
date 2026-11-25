const $=id=>document.getElementById(id);
const welcome=$('welcome'), surprise=$('surprise');
$('open').addEventListener('click',()=>{welcome.classList.add('hidden');surprise.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'});burst(24)});
$('wish').addEventListener('click',()=>{$('result').textContent='May your sweetest wishes come true, may happiness find you in every season, and may this year be your most magical one yet. You deserve all the beautiful things in life. ✨💖';burst(35)});
$('back').addEventListener('click',()=>{surprise.classList.add('hidden');welcome.classList.remove('hidden');window.scrollTo({top:0,behavior:'smooth'})});

// Synthesized public-domain Happy Birthday melody. No MP3 or external recording needed.
const notes=[['G4',.34],['G4',.22],['A4',.56],['G4',.56],['C5',.56],['B4',.9],['G4',.34],['G4',.22],['A4',.56],['G4',.56],['D5',.56],['C5',.9],['G4',.34],['G4',.22],['G5',.56],['E5',.56],['C5',.56],['B4',.56],['A4',.9],['F5',.34],['F5',.22],['E5',.56],['C5',.56],['D5',.56],['C5',1.05]];
const hz={G4:392,A4:440,B4:493.88,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99};
let ctx=null,playing=false,timer=null,index=0;
function tone(n,d){const t=ctx.currentTime;const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=hz[n];g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.14,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(ctx.destination);o.start(t);o.stop(t+d+.03)}
function next(){if(!playing)return;const [n,d]=notes[index];tone(n,d*.82);index=(index+1)%notes.length;timer=setTimeout(next,d*1000)}
$('music').addEventListener('click',async()=>{if(playing){playing=false;clearTimeout(timer);$('music').textContent='♫ Play birthday music';return}const AC=window.AudioContext||window.webkitAudioContext;if(!AC){$('music').textContent='Music unavailable';return}ctx=ctx||new AC();await ctx.resume();playing=true;$('music').textContent='Ⅱ Pause birthday music';next()});
function heart(){const e=document.createElement('span');e.className='heart';e.textContent=['♡','♥','✦','💕'][Math.floor(Math.random()*4)];e.style.left=Math.random()*100+'vw';e.style.fontSize=(14+Math.random()*20)+'px';e.style.animationDuration=(4+Math.random()*4)+'s';$('hearts').appendChild(e);setTimeout(()=>e.remove(),8500)}
function burst(n){for(let i=0;i<n;i++)setTimeout(heart,i*55)}
setInterval(heart,1100);
