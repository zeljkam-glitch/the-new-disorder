import re
hdr=open('_hdr.txt',encoding='utf-8').read()
def nav(cur):
    items=[('index.html#book','Knjiga','The book',None),('index.html#guide','Vodič','Guide',None),('test.html','Test','Test','test'),('organizatori.html','Predavanja','Talks','org'),('index.html#brief','Bilten','The Brief',None),('mediji.html','Mediji','Media','med')]
    out='<nav aria-label="Main">\n'
    for h,hr,en,k in items:
        ac=' aria-current="page"' if k==cur else ''
        out+=f'<a href="{h}"{ac}><span lang="hr">{hr}</span><span lang="en">{en}</span></a>\n'
    return out+'</nav>'
def page(fn,title,desc,cur,body,extra_js=''):
    h=re.sub(r'<nav aria-label="Main">.*?</nav>',nav(cur),hdr,count=1,flags=re.S)
    html=f'''<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inconsolata:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>
{h}
{body}
<footer class="dark"><div class="wrap"><span>Domagoj Juričić · Zagreb</span><span class="social"><a href="https://hr.linkedin.com/in/djuricic">LinkedIn</a></span><span lang="en">Concept: Salty Brand Studio</span><span lang="hr">Koncept: Salty Brand Studio</span></div></footer>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script src="main.js"></script>
{extra_js}
</body>
</html>
'''
    a=html.index('<body>'); b=html.index('<script src="main.js">')
    def fix(m): return re.sub(r'(?<![\wčćžšđČĆŽŠĐ])([iIuUsSoOaAkKzZ]) (?=\S)', lambda x: x.group(1)+'&#160;', m.group(0))
    html=html[:a]+re.sub(r'>[^<]+<',fix,html[a:b])+html[b:]
    open(fn,'w',encoding='utf-8').write(html)

page('test.html','Test · The New Disorder','How ready is your organisation for the new disorder? A ten-question self-assessment based on the book by Domagoj Juričić.','test','''
<section class="pagehead">
<div class="wrap">
<div class="k"><span lang="en">Self-assessment</span><span lang="hr">Samoprocjena</span></div>
<h1><span lang="en">How ready is your organisation for the new disorder?</span><span lang="hr">Koliko je vaša organizacija spremna na novi nered?</span></h1>
<p class="body"><span lang="en">Ten questions drawn from the seven ideas of the book. Three minutes. At the end you get a profile and the two ideas worth reading first.</span><span lang="hr">Deset pitanja izvedenih iz sedam ideja knjige. Tri minute. Na kraju dobivate profil i dvije ideje koje vrijedi pročitati prve.</span></p>
</div>
</section>
<section class="band" style="padding-top:48px"><div class="wrap"><div id="quiz" class="quiz" aria-live="polite"></div></div></section>
''','<script src="test.js"></script>')

page('organizatori.html','Talks · The New Disorder · Domagoj Juričić','Keynotes, board briefings and moderated conversations by Domagoj Juričić. Topics, formats and booking.','org','''
<section class="pagehead">
<div class="wrap">
<div class="k"><span lang="en">For organisers</span><span lang="hr">Za organizatore</span></div>
<h1><span lang="en">Talks and briefings</span><span lang="hr">Predavanja i brifinzi</span></h1>
<p class="body"><span lang="en">For conferences, boards and institutions that need to understand a fragmented world before they decide. In English and Croatian. Recent stages include Lider’s Izvoz 2026 and The World Ahead 2027 in Athens.</span><span lang="hr">Za konferencije, uprave i institucije koje moraju razumjeti fragmentirani svijet prije nego što odluče. Na engleskom i hrvatskom. Među nedavnim pozornicama su Liderov Izvoz 2026 i The World Ahead 2027 u Ateni.</span></p>
<div class="btns" style="margin-top:28px"><a class="btn fill" href="#ask"><span lang="en">Send an enquiry</span><span lang="hr">Pošalji upit</span></a><a class="btn" href="mediji.html"><span lang="en">Watch past appearances</span><span lang="hr">Pogledaj nastupe</span></a></div>
</div>
</section>

<section class="band dark">
<div class="wrap">
<div class="k"><span lang="en">Topics</span><span lang="hr">Teme</span></div>
<h2 class="h2"><span lang="en">Four talks, one argument.</span><span lang="hr">Četiri predavanja, jedna teza.</span></h2>
<div class="topics">
<div class="topic"><span class="lbl">Keynote · 45 min</span><h3><span lang="en">The New Disorder: leading when the old order is not coming back</span><span lang="hr">Novi nered: vodstvo kad se stari poredak ne vraća</span></h3><p><span lang="en">The book’s argument for conferences and leadership events.</span><span lang="hr">Teza knjige za konferencije i događaje za lidere.</span></p></div>
<div class="topic"><span class="lbl"><span lang="en">Board briefing · 90 min</span><span lang="hr">Brifing za upravu · 90 min</span></span><h3><span lang="en">Geopolitical risk for the boardroom</span><span lang="hr">Geopolitički rizik za upravu</span></h3><p><span lang="en">What a fragmented world means for markets, supply chains and partners. Closed-door, with time for questions.</span><span lang="hr">Što fragmentirani svijet znači za tržišta, opskrbne lance i partnere. Zatvoreno, s vremenom za pitanja.</span></p></div>
<div class="topic"><span class="lbl"><span lang="en">Lecture · Panel</span><span lang="hr">Predavanje · Panel</span></span><h3><span lang="en">Small states, flexible alliances</span><span lang="hr">Male države, fleksibilna savezništva</span></h3><p><span lang="en">Sovereignty as the management of dependencies.</span><span lang="hr">Suverenitet kao upravljanje ovisnostima.</span></p></div>
<div class="topic"><span class="lbl"><span lang="en">Keynote · Moderation</span><span lang="hr">Predavanje · Moderacija</span></span><h3><span lang="en">Trust, polarisation and the legitimacy crisis</span><span lang="hr">Povjerenje, polarizacija i kriza legitimiteta</span></h3><p><span lang="en">Why cohesion matters more than unity, for societies and for organisations.</span><span lang="hr">Zašto je kohezija važnija od jedinstva, za društva i za organizacije.</span></p></div>
</div>
</div>
</section>

<section class="band">
<div class="wrap">
<div class="k">FAQ</div>
<h2 class="h2"><span lang="en">What organisers usually ask</span><span lang="hr">Što organizatori obično pitaju</span></h2>
<div class="faq">
<details><summary><span lang="en">In which languages?</span><span lang="hr">Na kojem jeziku?</span></summary><p><span lang="en">English and Croatian. Q&amp;A can run in both.</span><span lang="hr">Engleski i hrvatski. Pitanja i odgovori mogu ići na oba jezika.</span></p></details>
<details><summary><span lang="en">Can the talk be tailored to our industry?</span><span lang="hr">Može li se predavanje prilagoditi našoj industriji?</span></summary><p><span lang="en">Yes. Every talk starts from the book, then turns to the risks and decisions your audience actually faces. A short call beforehand sets the focus.</span><span lang="hr">Da. Svako predavanje polazi od knjige, a zatim prelazi na rizike i odluke s kojima se vaša publika stvarno suočava. Kratak razgovor unaprijed određuje fokus.</span></p></details>
<details><summary><span lang="en">Do you moderate panels?</span><span lang="hr">Moderirate li panele?</span></summary><p><span lang="en">Yes, on geopolitics, Europe, regulation and trust in institutions.</span><span lang="hr">Da, na teme geopolitike, Europe, regulative i povjerenja u institucije.</span></p></details>
<details><summary><span lang="en">Can books be provided for participants?</span><span lang="hr">Mogu li sudionici dobiti knjigu?</span></summary><p><span lang="en">Yes, copies can be arranged for events, with signing on request.</span><span lang="hr">Da, primjerci se mogu osigurati za događaj, uz potpisivanje na upit.</span></p></details>
<details><summary><span lang="en">What do you need technically?</span><span lang="hr">Što je potrebno tehnički?</span></summary><p><span lang="en">A screen with HDMI, a clicker and a handheld or lapel microphone. Online formats work on any standard platform.</span><span lang="hr">Ekran s HDMI ulazom, daljinski za prezentaciju i ručni ili bubica mikrofon. Online formati rade na svim uobičajenim platformama.</span></p></details>
<details><summary><span lang="en">Fees and travel?</span><span lang="hr">Honorar i putni troškovi?</span></summary><p><span lang="en">On request, depending on format, audience and location.</span><span lang="hr">Na upit, ovisno o formatu, publici i lokaciji.</span></p></details>
</div>
</div>
</section>

<section class="band" id="ask" style="background:var(--paper2);border-top:1px solid var(--line)">
<div class="wrap">
<div class="k"><span lang="en">Enquiry</span><span lang="hr">Upit</span></div>
<h2 class="h2"><span lang="en">Tell us about your event.</span><span lang="hr">Recite nam nešto o svom događaju.</span></h2>
<form class="sub ask" id="ask-form" novalidate data-form>
<div class="row2">
<div><label for="a-name"><span lang="en">Name</span><span lang="hr">Ime i prezime</span></label><input id="a-name" type="text" autocomplete="name" required></div>
<div><label for="a-org"><span lang="en">Organisation</span><span lang="hr">Organizacija</span></label><input id="a-org" type="text" autocomplete="organization"></div>
<div><label for="a-mail"><span lang="en">Email</span><span lang="hr">E-mail</span></label><input id="a-mail" type="email" autocomplete="email" required></div>
<div><label for="a-date"><span lang="en">Date</span><span lang="hr">Datum</span></label><input id="a-date" type="date"></div>
<div><label for="a-city"><span lang="en">City or online</span><span lang="hr">Grad ili online</span></label><input id="a-city" type="text"></div>
<div><label for="a-fmt"><span lang="en">Format</span><span lang="hr">Format</span></label><select id="a-fmt"><option>Keynote</option><option>Board briefing / Brifing za upravu</option><option>Panel</option><option>Moderation / Moderacija</option><option>Other / Drugo</option></select></div>
</div>
<label for="a-msg"><span lang="en">Audience and topic</span><span lang="hr">Publika i tema</span></label>
<textarea id="a-msg" rows="4"></textarea>
<p class="err" role="alert"></p>
<button class="btn fill" type="submit" style="align-self:flex-start"><span lang="en">Send enquiry</span><span lang="hr">Pošalji upit</span></button>
</form>
<div class="ok" role="status"><b style="font-weight:400;font-size:22px"><span lang="en">Thank you.</span><span lang="hr">Hvala.</span></b><p style="margin:8px 0 0;color:var(--body)"><span lang="en">We will reply within two working days.</span><span lang="hr">Javit ćemo se u roku od dva radna dana.</span></p></div>
</div>
</section>
''')

page('vodic.html','Discussion guide · The New Disorder','A printable discussion guide to The New Disorder by Domagoj Juričić: seven ideas and questions for book clubs and boards.',None,'''
<section class="pagehead noprint">
<div class="wrap">
<div class="k"><span lang="en">For subscribers</span><span lang="hr">Za pretplatnike</span></div>
<h1><span lang="en">Discussion guide</span><span lang="hr">Vodič za raspravu</span></h1>
<p class="body"><span lang="en">Seven ideas from The New Disorder with questions for book clubs, classrooms and boards. Choose your language above, then save as PDF.</span><span lang="hr">Sedam ideja iz knjige The New Disorder s pitanjima za klubove čitanja, nastavu i uprave. Odaberite jezik gore, pa spremite kao PDF.</span></p>
<div class="btns" style="margin-top:24px"><button class="btn fill" type="button" id="print"><span lang="en">Save as PDF</span><span lang="hr">Spremi kao PDF</span></button></div>
</div>
</section>
<section class="guide-doc"><div class="wrap" id="gdoc"></div></section>
''','<script src="vodic.js"></script>')
