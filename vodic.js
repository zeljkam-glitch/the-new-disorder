{
const I=window.TND_IDEAS||[];const R=["I","II","III","IV","V","VI","VII"];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bind=t=>t.replace(/(^|\s)([aikosuzAIKOSUZ]) /g,'$1$2 ');
const bi=(i,k)=>`<span lang="en">${esc(I[i].en[k])}</span><span lang="hr">${bind(esc(I[i].hr[k]))}</span>`;
const d=document.getElementById('gdoc');
if(d){
d.innerHTML=`<header class="gd-cover"><div class="lbl"><span lang="en">Discussion guide</span><span lang="hr">Vodič za raspravu</span></div><h2>The New Disorder</h2><p class="gd-sub"><span lang="en">Rebuilding Meaning, Trust and Democratic Coherence in an Age of Fragmentation</span><span lang="hr">Obnova smisla, povjerenja i demokratske kohezije u doba fragmentacije</span></p><p class="gd-by">Domagoj Juričić</p><p class="gd-how"><span lang="en">How to use it: take one idea per session. Read it aloud, then spend most of the time on the question. Good discussions end with one decision or one thing to watch.</span><span lang="hr">Kako ga koristiti: jedna ideja po susretu. Pročitajte je naglas, a većinu vremena posvetite pitanju. Dobra rasprava završava jednom odlukom ili jednom stvari koju treba pratiti.</span></p></header>`+
I.map((x,i)=>`<article class="gd-idea"><div class="gd-n">${R[i]}</div><div><h3>${bi(i,0)}</h3><p>${bi(i,1)}</p><p class="gd-w">${bi(i,2)}</p><p class="gd-q"><span class="lbl"><span lang="en">Question</span><span lang="hr">Pitanje</span></span><br>${bi(i,3)}</p><div class="gd-lines"></div></div></article>`).join('')+
`<footer class="gd-foot"><span>The New Disorder · Domagoj Juričić · Vanguard Press, 2026</span></footer>`;
}
const p=document.getElementById('print');
if(p)p.addEventListener('click',()=>{try{window.print()}catch(e){}});
}
