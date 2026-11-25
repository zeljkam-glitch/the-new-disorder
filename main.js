{
const root=document.documentElement;
const $=id=>document.getElementById(id);
const hrBind=t=>t.replace(/(^|\s)([aikosuzAIKOSUZ]) /g,'$1$2 ');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* language */
const setLang=l=>{root.dataset.lang=l;root.lang=l;document.querySelectorAll('.lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===l));try{localStorage.setItem('tnd-lang',l)}catch(e){}};
document.querySelectorAll('.lang button').forEach(b=>b.addEventListener('click',()=>setLang(b.dataset.l)));
let saved=null;try{saved=localStorage.getItem('tnd-lang')}catch(e){}
setLang(saved||((navigator.language||'').toLowerCase().startsWith('hr')?'hr':'en'));
const isHr=()=>root.dataset.lang==='hr';

/* toast + copy */
const toast=$('toast');
const say=m=>{if(!toast)return;toast.textContent=m;toast.classList.add('on');clearTimeout(say.t);say.t=setTimeout(()=>toast.classList.remove('on'),1900);};
document.addEventListener('click',async e=>{
  const b=e.target.closest('[data-copy]');if(!b)return;
  let text=b.dataset.copy;
  if(text.startsWith('#')){const el=document.querySelector(text+' [lang='+root.dataset.lang+']')||document.querySelector(text);text=el?el.textContent.trim():''}
  try{await navigator.clipboard.writeText(text);say(isHr()?'Kopirano':'Copied');}catch(err){say(isHr()?'Označite tekst i kopirajte ručno':'Select the text and copy it manually');}
});

/* reading guide */
const track=$('track');
if(track){
const ideas=[
{en:["There is no way back to the old order","We keep describing this as an interregnum between two orders. The book argues it is a lasting new condition: instability has become the rule, not the exception.","Where you see it: decisions that wait for things to “return to normal” keep being postponed.","If disorder is permanent, which of our plans still assume a return to normal?"],
 hr:["Nema povratka na stari poredak","Navikli smo ovo zvati međurazdobljem između dvaju poredaka. Knjiga tvrdi da je riječ o trajnom stanju: nestabilnost je postala pravilo, a ne iznimka.","Gdje se vidi: odluke koje čekaju „povratak u normalu“ stalno se odgađaju.","Ako je nered trajan, koji naši planovi još računaju na povratak u normalu?"]},
{en:["No one can shape the system alone","Neither the United States, China nor the European Union has enough power, legitimacy and cohesion to build a stable order on its own.","Where you see it: alliances become flexible, temporary and transactional.","Which of our partners would still choose us if they no longer had to?"],
 hr:["Nitko više ne može sam","Ni SAD, ni Kina, ni Europska unija nemaju dovoljno moći, legitimiteta i kohezije da sami izgrade stabilan poredak.","Gdje se vidi: savezništva postaju fleksibilna, privremena i transakcijska.","Tko od naših partnera bi nas i dalje birao kad više ne bi morao?"]},
{en:["The real crisis is a crisis of trust","Democracy does not require agreement on policy, but it does require a minimum of agreement on facts. Algorithms that reward attention over truth accelerate an erosion that was already under way.","Where you see it: the same event, two incompatible realities.","On which facts does our own organisation no longer agree?"],
 hr:["Prava kriza je kriza povjerenja","Demokracija ne traži slaganje oko politika, ali traži minimum slaganja oko činjenica. Algoritmi koji nagrađuju pažnju umjesto istine ubrzavaju eroziju koja je već bila u tijeku.","Gdje se vidi: isti događaj, dvije nespojive stvarnosti.","Oko kojih se činjenica ni u našoj organizaciji više ne slažemo?"]},
{en:["Cohesion is not unity","Unity means agreement. Cohesion is the ability to act together despite disagreement. Democracies need the second far more than the first.","Where you see it: societies that cannot agree on anything long-term, even when they agree on a lot.","Can we still act together on the things we disagree about?"],
 hr:["Kohezija nije jedinstvo","Jedinstvo znači slaganje. Kohezija je sposobnost da djelujemo zajedno unatoč neslaganju. Demokracijama je mnogo potrebnija druga nego prva.","Gdje se vidi: društva koja se ne mogu dogovoriti ni oko čega dugoročnog, iako se oko mnogo toga slažu.","Možemo li i dalje djelovati zajedno oko onoga oko čega se ne slažemo?"]},
{en:["Stability is change without losing legitimacy","Stability no longer means the absence of change. It means institutions can adapt without losing legitimacy. Trust returns not through better PR, but when institutions act consistently, admit mistakes and apply the same rules to everyone.","Where you see it: reforms that fail not on substance, but on credibility.","Would people trust us more if we admitted one mistake publicly?"],
 hr:["Stabilnost je promjena bez gubitka legitimiteta","Stabilnost više ne znači izostanak promjene, nego da se institucije mogu prilagoditi bez gubitka legitimiteta. Povjerenje se ne vraća boljim PR-om, nego kad institucije djeluju dosljedno, priznaju pogreške i primjenjuju ista pravila na sve.","Gdje se vidi: reforme koje ne padaju na sadržaju, nego na vjerodostojnosti.","Bi li nam ljudi više vjerovali kad bismo javno priznali jednu pogrešku?"]},
{en:["Power runs through systems","Influence now comes from controlling technology platforms, standards, regulation, financial flows and supply chains, not only armies, borders and territory.","Where you see it: rules that shape a whole economy, written far from the people they affect.","Which systems do we depend on, and who writes their rules?"],
 hr:["Moć prolazi kroz sustave","Utjecaj danas dolazi iz kontrole tehnoloških platformi, standarda, regulacije, financijskih tokova i opskrbnih lanaca, a ne samo vojske, granica i teritorija.","Gdje se vidi: pravila koja oblikuju cijelo gospodarstvo pišu se daleko od onih na koje se odnose.","O kojim sustavima ovisimo i tko piše njihova pravila?"]},
{en:["Sovereignty is managing dependencies","For a small state the problem is not dependence, but asymmetric dependence. Real sovereignty means diversifying dependencies and keeping alternatives. Flexibility is an asset only when paired with a clear strategic goal.","Where you see it: full formal sovereignty, little real room to manoeuvre.","Do we have a real alternative for our most important dependency?"],
 hr:["Suverenitet je upravljanje ovisnostima","Za malu državu problem nije ovisnost, nego asimetrična ovisnost. Stvarni suverenitet znači diversificirati ovisnosti i čuvati alternative. Fleksibilnost je prednost samo uz jasan strateški cilj.","Gdje se vidi: pun formalni suverenitet, malo stvarnog prostora za manevar.","Imamo li stvarnu alternativu za svoju najvažniju ovisnost?"]}
];
const roman=["I","II","III","IV","V","VI","VII"];
const dots=$('dots'),count=$('count'),prev=$('prev'),next=$('next');
const part=(i,k)=>`<span lang="en">${esc(ideas[i].en[k])}</span><span lang="hr">${hrBind(esc(ideas[i].hr[k]))}</span>`;
track.innerHTML=ideas.map((d,i)=>`<article class="card" aria-label="${roman[i]}"><div class="num">${roman[i]} / VII</div><h3>${part(i,0)}</h3><p>${part(i,1)}</p><p class="where">${part(i,2)}</p><button class="q-t" type="button" aria-expanded="false" aria-controls="qa-${i}"><span lang="en">Question to discuss</span><span lang="hr">Pitanje za raspravu</span></button><div class="q-a" id="qa-${i}">${part(i,3)}</div></article>`).join('');
dots.innerHTML=ideas.map((d,i)=>`<button type="button" aria-label="${roman[i]}" data-i="${i}"></button>`).join('');
const cards=[...track.children];let cur=0;
const go=i=>{i=Math.max(0,Math.min(ideas.length-1,i));track.scrollTo({left:cards[i].offsetLeft-track.offsetLeft,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});};
const mark=i=>{cur=i;count.textContent=(i+1)+' / '+ideas.length;[...dots.children].forEach((b,j)=>b.setAttribute('aria-current',j===i));prev.disabled=i===0;next.disabled=i===ideas.length-1;};
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>.6)mark(cards.indexOf(e.target));});},{root:track,threshold:[.6]});
cards.forEach(c=>io.observe(c));mark(0);
prev.addEventListener('click',()=>go(cur-1));next.addEventListener('click',()=>go(cur+1));
dots.addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(+b.dataset.i);});
track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(cur+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(cur-1);}});
track.addEventListener('click',e=>{const t=e.target.closest('.q-t');if(!t)return;const o=t.closest('.card').classList.toggle('open');t.setAttribute('aria-expanded',o);});
}

/* newsletter */
const form=$('nl-form');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const email=$('nl-email').value.trim(),ok=$('nl-consent').checked,err=$('nl-err');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){err.textContent=isHr()?'Upišite ispravnu e-mail adresu.':'Please enter a valid email address.';$('nl-email').focus();return;}
    if(!ok){err.textContent=isHr()?'Potrebna je vaša privola.':'Please confirm your consent.';return;}
    err.textContent='';form.hidden=true;$('nl-ok').classList.add('on');
  });
}

/* media filter */
const chips=document.querySelectorAll('.chip');
if(chips.length){
  chips.forEach(c=>c.addEventListener('click',()=>{
    chips.forEach(x=>x.setAttribute('aria-pressed',x===c));
    const f=c.dataset.f;let n=0;
    document.querySelectorAll('.tl li').forEach(li=>{const show=f==='all'||li.dataset.t===f;li.hidden=!show;if(show)n++;});
    const st=$('tl-n');if(st)st.textContent=n;
  }));
}
}
