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
const ideas=window.TND_IDEAS||[];
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

/* generic concept forms */
document.querySelectorAll('form[data-form]').forEach(f=>{
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const err=f.querySelector('.err');let bad=null;
    f.querySelectorAll('[required]').forEach(i=>{if(!bad&&!i.value.trim())bad=i;});
    const em=f.querySelector('input[type=email]');
    if(!bad&&em&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim()))bad=em;
    if(bad){err.textContent=isHr()?'Molimo ispunite označena polja.':'Please complete the required fields.';bad.focus();return;}
    err.textContent='';f.hidden=true;f.nextElementSibling.classList.add('on');
  });
});

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
