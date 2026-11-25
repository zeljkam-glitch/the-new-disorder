(()=>{
const root=document.documentElement;const isHr=()=>root.dataset.lang==='hr';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const bind=t=>t.replace(/(^|\s)([aikosuzAIKOSUZ]) /g,'$1$2 ');
const bi=(en,hr)=>`<span lang="en">${esc(en)}</span><span lang="hr">${bind(esc(hr))}</span>`;
const ideas={
I:["There is no way back to the old order","Nema povratka na stari poredak"],
II:["No one can shape the system alone","Nitko više ne može sam"],
III:["The real crisis is a crisis of trust","Prava kriza je kriza povjerenja"],
IV:["Cohesion is not unity","Kohezija nije jedinstvo"],
V:["Stability is change without losing legitimacy","Stabilnost je promjena bez gubitka legitimiteta"],
VI:["Power runs through systems","Moć prolazi kroz sustave"],
VII:["Sovereignty is managing dependencies","Suverenitet je upravljanje ovisnostima"]};
const Q=[
{i:"I",en:"When you plan the next three years, do you assume conditions will return to normal?",hr:"Kad planirate sljedeće tri godine, računate li da će se okolnosti vratiti u normalu?",a:[["Yes, the plan rests on it","Da, plan se na tome temelji"],["Partly","Djelomično"],["We work with a few scenarios","Radimo s nekoliko scenarija"],["We plan for lasting instability","Planiramo za trajnu nestabilnost"]]},
{i:"II",en:"How much of your business depends on one country, market or alliance?",hr:"Koliko vašeg poslovanja ovisi o jednoj zemlji, tržištu ili savezu?",a:[["Most of it","Većina"],["A large share","Velik dio"],["Some of it","Dio"],["Little, and it is spread","Malo, i raspoređeno je"]]},
{i:"VI",en:"Do you know which EU or foreign rules will affect you in the next two years?",hr:"Znate li koji će vas propisi EU-a ili drugih država pogoditi u iduće dvije godine?",a:[["No","Ne"],["We hear about them late","Saznajemo kasno"],["We follow the main ones","Pratimo glavne"],["We track them and plan ahead","Pratimo ih i planiramo unaprijed"]]},
{i:"VII",en:"Do you have a real alternative for your most important supplier or market?",hr:"Imate li stvarnu alternativu za najvažnijeg dobavljača ili tržište?",a:[["No","Ne"],["Only on paper","Samo na papiru"],["Yes, but it would be slow","Da, ali bila bi spora"],["Yes, tested and ready","Da, provjerenu i spremnu"]]},
{i:"VI",en:"How dependent are you on platforms and standards you do not control?",hr:"Koliko ovisite o platformama i standardima koje ne kontrolirate?",a:[["Completely","Potpuno"],["Heavily","Jako"],["Moderately","Umjereno"],["We have mapped and limited it","Mapirali smo to i ograničili"]]},
{i:"III",en:"Does your leadership share the same picture of the facts about risk?",hr:"Dijeli li vaše vodstvo istu sliku činjenica o riziku?",a:[["Rarely","Rijetko"],["On some topics","Oko nekih tema"],["Mostly","Uglavnom"],["Yes, we work from one shared picture","Da, radimo iz jedne zajedničke slike"]]},
{i:"IV",en:"When your leadership disagrees, can it still act quickly?",hr:"Kad se vodstvo ne slaže, može li ipak brzo djelovati?",a:[["No, decisions stall","Ne, odluke zapnu"],["Slowly","Sporo"],["Usually","Obično"],["Yes, disagreement does not stop us","Da, neslaganje nas ne zaustavlja"]]},
{i:"V",en:"When you make a mistake, do you admit it and apply the same rules to everyone?",hr:"Kad pogriješite, priznajete li to i primjenjujete ista pravila na sve?",a:[["Rarely","Rijetko"],["Internally only","Samo interno"],["Mostly","Uglavnom"],["Yes, consistently","Da, dosljedno"]]},
{i:"II",en:"Do you follow political change in your markets systematically: elections, sanctions, alliances?",hr:"Pratite li sustavno političke promjene na svojim tržištima: izbore, sankcije, savezništva?",a:[["No","Ne"],["Through the news","Kroz vijesti"],["Someone follows it","Netko to prati"],["Yes, it feeds our decisions","Da, to ulazi u naše odluke"]]},
{i:"VII",en:"Do you have a strategic goal that still holds when circumstances change?",hr:"Imate li strateški cilj koji vrijedi i kad se okolnosti promijene?",a:[["No","Ne"],["It changes with every crisis","Mijenja se sa svakom krizom"],["Broadly","Okvirno"],["Yes, and flexibility serves it","Da, i fleksibilnost mu služi"]]}];
const tiers=[
{max:10,en:["Exposed","Your plans rest on a world that is not coming back. The good news: the first steps are clear and inexpensive."],hr:["Izloženi","Vaši planovi počivaju na svijetu koji se ne vraća. Dobra vijest: prvi su koraci jasni i nisu skupi."]},
{max:17,en:["Reactive","You see the change, but you meet it case by case. The gap is between noticing and deciding."],hr:["Reaktivni","Promjenu vidite, ali joj pristupate od slučaja do slučaja. Jaz je između primjećivanja i odlučivanja."]},
{max:24,en:["Prepared","You have the basics in place. The next step is to turn preparation into an advantage."],hr:["Pripremljeni","Osnove imate. Sljedeći je korak pretvoriti pripremljenost u prednost."]},
{max:30,en:["Resilient","You already plan for disorder. The question is how long your partners can keep up."],hr:["Otporni","Već planirate za nered. Pitanje je koliko dugo vaši partneri mogu pratiti."]}];
const box=document.getElementById('quiz');if(!box)return;
let cur=0;const ans=new Array(Q.length).fill(null);
const render=()=>{
  if(cur>=Q.length)return result();
  const q=Q[cur];
  box.innerHTML=`<div class="qhead"><span class="lbl">${bi('Question','Pitanje')} ${cur+1} / ${Q.length}</span><span class="qbar"><i style="width:${(cur/Q.length)*100}%"></i></span></div>
  <fieldset class="qset"><legend>${bi(q.en,q.hr)}</legend>
  ${q.a.map((a,k)=>`<label class="opt"><input type="radio" name="q" value="${k}" ${ans[cur]===k?'checked':''}><span>${bi(a[0],a[1])}</span></label>`).join('')}
  </fieldset>
  <div class="qnav"><button type="button" class="btn" id="qb" ${cur===0?'disabled':''}>${bi('Back','Natrag')}</button><button type="button" class="btn fill" id="qn" ${ans[cur]===null?'disabled':''}>${cur===Q.length-1?bi('See result','Pogledaj rezultat'):bi('Next','Dalje')}</button></div>`;
  box.querySelectorAll('input').forEach(r=>r.addEventListener('change',()=>{ans[cur]=+r.value;document.getElementById('qn').disabled=false;}));
  document.getElementById('qb').addEventListener('click',()=>{cur--;render();});
  document.getElementById('qn').addEventListener('click',()=>{cur++;render();box.scrollIntoView({block:'start',behavior:'smooth'});});
  const f=box.querySelector('input:checked')||box.querySelector('input');f&&f.focus({preventScroll:true});
};
const result=()=>{
  const score=ans.reduce((s,v)=>s+v,0);const t=tiers.find(x=>score<=x.max);
  const byIdea={};Q.forEach((q,i)=>{(byIdea[q.i]=byIdea[q.i]||[]).push(ans[i]);});
  const weak=Object.entries(byIdea).map(([k,v])=>[k,v.reduce((a,b)=>a+b,0)/v.length]).sort((a,b)=>a[1]-b[1]).slice(0,2);
  box.innerHTML=`<div class="res">
  <div class="lbl">${bi('Your result','Vaš rezultat')} · ${score} / 30</div>
  <h2 class="h2" style="margin-top:8px">${bi(t.en[0],t.hr[0])}</h2>
  <div class="scale" aria-hidden="true">${tiers.map(x=>`<span class="${x===t?'on':''}">${bi(x.en[0],x.hr[0])}</span>`).join('')}</div>
  <p class="lead">${bi(t.en[1],t.hr[1])}</p>
  <div class="lbl" style="margin-top:28px">${bi('Where to start reading','Gdje početi čitati')}</div>
  <ul class="weak">${weak.map(([k])=>`<li><span class="rn">${k}</span>${bi(ideas[k][0],ideas[k][1])}</li>`).join('')}</ul>
  <div class="btns" style="margin-top:28px"><a class="btn fill" href="index.html#buy">${bi('Get the book','Kupi knjigu')}</a><a class="btn" href="index.html#contact">${bi('Discuss it with us','Razgovarajmo o tome')}</a><button class="btn" type="button" id="qr">${bi('Start again','Ponovi test')}</button></div>
  <p class="body" style="margin-top:22px;font-size:16px">${bi('This self-assessment is a conversation starter, not an audit. Answers stay in your browser.','Ova samoprocjena je početak razgovora, a ne revizija. Odgovori ostaju u vašem pregledniku.')}</p></div>`;
  document.getElementById('qr').addEventListener('click',()=>{ans.fill(null);cur=0;render();});
};
render();
})();
