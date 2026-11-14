"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/reveal";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import "@/styles/litebox.css";

const chapters = [
  { id: "discover", number: "01", label: "Discover" },
  { id: "connect", number: "02", label: "Connect" },
  { id: "focus", number: "03", label: "Focus" },
  { id: "ship", number: "04", label: "Ship" },
] as const;

function OrganicMark({ compact = false }: { compact?: boolean }) {
  return <span className="lb-brand" aria-label="Organic">
    <svg className="lb-symbol" width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path d="M13.9 12.9C6.5 12.7 4.7 8.4 6.5 3.6c4.6.1 8 3.1 7.4 9.3Z" fill="currentColor"/>
      <path d="M15.1 12.9c2.9-6.7 7-6.3 10-2.1-2 4-5.9 5-10 2.1Z" fill="currentColor"/>
      <path d="M14.1 15c4.2 6.4 1.9 9.6-2.7 10.9-2.3-3.8-1.7-7.6 2.7-10.9Z" fill="currentColor"/>
    </svg>
    {!compact && <span>Organic</span>}
  </span>;
}

function Cityscape({ phase = "sunset" }: { phase?: "sunset" | "morning" }) {
  return (
    <svg className={`lb-city lb-city--${phase}`} viewBox="0 0 1200 620" preserveAspectRatio="xMidYMax slice" role="img" aria-label="Illustrated San Francisco hillside with Victorian houses, a bay, and a small cable car">
      <defs>
        <linearGradient id={`sky-${phase}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={phase === "morning" ? "#DFE6DE" : "#E7E1D8"}/>
          <stop offset="58%" stopColor={phase === "morning" ? "#ECDFCD" : "#E8C8B7"}/>
          <stop offset="100%" stopColor="#EEDDC4"/>
        </linearGradient>
        <linearGradient id={`bay-${phase}`} x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#B9C7C2"/><stop offset="100%" stopColor="#D3CCBC"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="620" fill={`url(#sky-${phase})`}/>
      <circle cx="975" cy="228" r="48" fill="#F1DEC1" opacity=".8"/>
      <path d="M0 360 130 344 280 363 412 330 555 356 710 319 815 340 955 307 1085 324 1200 290V620H0Z" fill="#B7B9AB"/>
      <path d="M0 404 200 378 330 389 490 372 625 390 782 361 925 394 1070 358 1200 383V620H0Z" fill="#97A99C"/>
      <path d="M580 396 700 382 755 374 834 384 915 373 1200 365V620H580Z" fill={`url(#bay-${phase})`}/>
      <path d="M665 392H1136M710 404h155m105 0h125" stroke="#F3EDE1" strokeWidth="2" opacity=".65" />
      <g opacity=".8" stroke="#766F68" strokeWidth="1.6" fill="none">
        <path d="M830 369v-115m132 115V256M764 372h263M830 254l-66 117m66-117 132 0 65 117M830 254l132 115M962 254l-132 115"/>
        <path d="M830 270c38 20 85 20 132 0" strokeWidth="1"/>
      </g>
      <g fill="#888F8D" opacity=".74">
        <rect x="802" y="242" width="16" height="107"/>
        <path d="m798 242 12-35 12 35Z"/>
        <rect x="845" y="277" width="20" height="80"/>
        <rect x="873" y="246" width="24" height="110"/>
        <rect x="903" y="270" width="30" height="90"/>
        <path d="M935 360V225l11-33 11 33v135Z"/>
        <rect x="961" y="263" width="27" height="96"/>
        <rect x="998" y="241" width="26" height="119"/>
        <rect x="1035" y="283" width="32" height="78"/>
        <rect x="1080" y="255" width="19" height="108"/>
      </g>
      <path d="M0 495C230 457 360 483 530 452c230-41 416 25 670-8V620H0Z" fill="#717F72"/>
      <g className="lb-buildings" stroke="#5D645D" strokeWidth="2" strokeLinejoin="round">
        {[
          {x:120,y:335,w:104,h:186,c:"#E7DBCB",r:"#6C7669"},
          {x:238,y:315,w:100,h:211,c:"#F1E7D5",r:"#6D7B7B"},
          {x:351,y:348,w:109,h:172,c:"#D8D8CC",r:"#63786A"},
          {x:476,y:303,w:101,h:220,c:"#E4D6C2",r:"#85736D"}
        ].map((h,i)=><g key={i}>
          <path d={`M${h.x-4} ${h.y+38} L${h.x+h.w/2} ${h.y} L${h.x+h.w+4} ${h.y+38}Z`} fill={h.r}/>
          <rect x={h.x} y={h.y+38} width={h.w} height={h.h-38} fill={h.c}/>
          <path d={`M${h.x+10} ${h.y+44}V${h.y+h.h}M${h.x+h.w-10} ${h.y+44}V${h.y+h.h}`} fill="none"/>
          {[0,1,2].map(j=><g key={j}>
            <rect x={h.x+19+j*27} y={h.y+58} width="18" height="38" rx="8" fill="#9EAEAB"/>
            <rect x={h.x+19+j*27} y={h.y+114} width="18" height="35" rx="8" fill="#A9B9B2"/>
          </g>)}
          <path d={`M${h.x} ${h.y+104}h${h.w}M${h.x} ${h.y+160}h${h.w}`} fill="none" strokeWidth="1"/>
        </g>)}
      </g>
      <path d="M0 537C237 506 441 516 660 482c245-38 354-48 540-51" fill="none" stroke="#4B4E47" strokeWidth="8"/>
      <path d="M0 548C237 517 441 527 660 493c245-38 354-48 540-51" fill="none" stroke="#D5C9B6" strokeWidth="5"/>
      <g className="lb-tram" transform="translate(75 511)" stroke="#484B43" strokeWidth="2">
        <path d="M0 4 7-10h66l9 14v25H0Z" fill="#D8D3C3"/>
        <rect x="7" y="-4" width="14" height="16" fill="#839DA0"/>
        <rect x="26" y="-4" width="14" height="16" fill="#839DA0"/>
        <rect x="45" y="-4" width="14" height="16" fill="#839DA0"/>
        <rect x="64" y="-4" width="10" height="16" fill="#839DA0"/>
        <path d="M2 19h78" strokeWidth="5" stroke="#73584B"/>
        <circle cx="14" cy="30" r="5" fill="#484B43"/>
        <circle cx="67" cy="30" r="5" fill="#484B43"/>
        <path d="M35-10V-23h18" fill="none"/>
      </g>
      <g fill="#50634F">
        <circle cx="43" cy="486" r="70"/><circle cx="100" cy="470" r="55"/>
        <circle cx="645" cy="478" r="55"/><circle cx="719" cy="475" r="38"/>
        <circle cx="1171" cy="438" r="76"/>
      </g>
      <g fill="#C2B5C6" opacity=".82">
        {[[33,450],[75,479],[115,446],[634,461],[666,487],[1162,412],[1188,465]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%2?12:8}/>)}
      </g>
      {phase==="morning" && <g className="lb-fog">
        <rect x="0" y="320" width="1200" height="200" fill="#F8F4EA" opacity=".46"/>
        <path d="M0 370Q240 320 430 368T840 357T1200 344V442H0Z" fill="#F9F4EB" opacity=".52"/>
      </g>}
      <g opacity=".24" fill="#3A4F4A">
        {Array.from({length:90},(_,i)=>{const x=(i*173)%1200;const y=350+(i*79)%260;return <rect key={i} x={x} y={y} width={2+(i%3)} height={2+(i%3)}/>})}
      </g>
    </svg>
  );
}

function WorkPreview() {
  const tasks=[["Review PR #482","Needs review","PR"],["Update API documentation","In progress","Docs"],["Ship search improvements","Ready to merge","Code"]];
  return <div className="lb-work-preview" aria-label="Conceptual product preview">
    <div className="lb-preview-top"><span className="lb-preview-name">Workspace / Platform</span><span>◷ &nbsp; Today</span></div>
    <div className="lb-preview-grid">
      <aside className="lb-preview-menu">
        <OrganicMark compact/>
        <span className="lb-preview-menu-active">Overview</span><span>My tasks</span><span>Pull requests</span><span>Notes</span>
      </aside>
      <div className="lb-preview-main">
        <span className="lb-preview-eyebrow">MONDAY, 09:41 AM</span>
        <h3>Everything in its place.</h3>
        <p>One calm view of the work that matters today.</p>
        <div className="lb-preview-list">
          {tasks.map(([task,status,tag])=><div className="lb-preview-task" key={task}>
            <span className="lb-square"/>
            <span className="lb-task-title">{task}</span>
            <span className="lb-task-tag">{tag}</span>
            <span className="lb-task-status">{status}</span>
          </div>)}
        </div>
        <div className="lb-preview-context"><span>↗ Related context</span><span>3 tasks · 2 PRs · 4 docs</span></div>
      </div>
    </div>
  </div>;
}

function Waitlist({open,setOpen}:{open:boolean;setOpen:(v:boolean)=>void}) {
  const [email,setEmail]=useState("");
  const [notice,setNotice]=useState(false);
  const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{e.preventDefault();if(email.trim())setNotice(true);};
  return <>
    <aside className={`lb-waitlist ${open?"lb-waitlist--open":"lb-waitlist--closed"}`} aria-label="Early access">
      {open ? <>
        <div className="lb-panel-top"><span className="lb-kicker">A LITTLE MORE FLOW</span><button type="button" onClick={()=>setOpen(false)} aria-label="Collapse waitlist panel">↗ <span>Hide</span></button></div>
        <div className="lb-panel-center">
          <div className="lb-panel-number">PRIVATE BETA / 2026</div>
          <h2>Good things take <em>shape.</em></h2>
          <p>A calmer way to connect the work behind the code. Be among the first to try it.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="lb-email">Your work email</label>
            <input required type="email" id="lb-email" value={email} onChange={e=>{setEmail(e.target.value);setNotice(false)}} placeholder="you@company.com"/>
            <button type="submit">Join the waitlist <span aria-hidden="true">↗</span></button>
          </form>
          {notice && <p className="lb-form-note" role="status">Preview only — the waitlist is not connected yet.</p>}
        </div>
        <div className="lb-panel-bottom"><span>MADE FOR THOSE WHO BUILD</span><span>SF · CA</span></div>
      </>:<button className="lb-panel-tab" type="button" onClick={()=>setOpen(true)} aria-label="Open waitlist panel"><span>JOIN THE WAITLIST</span><span>↗</span></button>}
    </aside>
    <button type="button" className="lb-mobile-waitlist-cta" onClick={()=>setOpen(true)}>Join the waitlist <span>↗</span></button>
    {open && <button type="button" aria-label="Close waitlist" className="lb-mobile-backdrop" onClick={()=>setOpen(false)}/>}
  </>;
}

export function LiteboxLanding() {
  const [panelOpen,setPanelOpen]=useState(true);
  const [active,setActive]=useState(0);
  const lenis=useLenisInstance();
  const scrollTo=useAnchorScroll();

  useEffect(()=>{
    const update=()=>{
      const pivot=window.innerHeight*.46;
      const sections=chapters.map(c=>document.getElementById(c.id));
      const current=sections.reduce((idx,element,i)=>element && element.getBoundingClientRect().top<=pivot?i:idx,0);
      setActive(current);
    };
    update();
    if(lenis){lenis.on("scroll",update);return()=>{lenis.off("scroll",update)}}
    window.addEventListener("scroll",update,{passive:true});
    return()=>window.removeEventListener("scroll",update);
  },[lenis]);

  return <div className={`lb-site ${panelOpen?"lb-site--panel-open":"lb-site--panel-closed"}`}>
    <header className="lb-header">
      <a href="#discover" onClick={scrollTo} aria-label="Organic home"><OrganicMark/></a>
      <div className="lb-top-links"><span>THE FUTURE OF DEVELOPER PRODUCTIVITY</span><button type="button" onClick={()=>setPanelOpen(v=>!v)}>{panelOpen?"Close waitlist":"Join waitlist"} ↗</button></div>
    </header>
    <nav className="lb-journey" aria-label="Explore the journey">
      {chapters.map((chapter,i)=><a href={`#${chapter.id}`} onClick={scrollTo} key={chapter.id} className={active===i?"lb-journey-active":""} aria-current={active===i?"step":undefined}>
        <span className="lb-journey-number">{chapter.number}</span><span className="lb-journey-dot"/><span className="lb-journey-label">{chapter.label}</span>
      </a>)}
    </nav>
    <div className="lb-story">
      <section className="lb-chapter lb-chapter--discover" id="discover">
        <div className="lb-hero-text">
          <span className="lb-kicker">01 / MADE TO MOVE WITH YOU</span>
          <h1>Less noise.<br/><em>More flow.</em></h1>
          <p>Tasks, code, and context. Together at last. One thoughtful workspace for the people building what&apos;s next.</p>
          <a href="#connect" onClick={scrollTo} className="lb-text-link">Explore how it works <span>↘</span></a>
        </div>
        <div className="lb-city-frame"><Cityscape phase="morning"/></div>
        <div className="lb-image-caption"><span>THE CITY IS WAKING UP</span><span>37° 46′ N · 122° 25′ W</span></div>
      </section>
      <section className="lb-chapter lb-chapter--connect" id="connect">
        <div className="lb-section-top"><span className="lb-kicker">02 / EVERYTHING IS CONNECTED</span><span className="lb-index">01 — 04</span></div>
        <Reveal><h2>Good work is<br/><em>never isolated.</em></h2></Reveal>
        <Reveal delay={100}><p className="lb-intro">Your tasks, pull requests and docs belong to the same story. Follow the thread, not a dozen different tabs.</p></Reveal>
        <div className="lb-connections">
          <div className="lb-connected-card"><span>01 / YOUR NEXT STEP</span><strong>Refine checkout flow</strong><small>Open task · ENG-294</small></div>
          <svg className="lb-connect-path" viewBox="0 0 500 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0 85 C110 85 110 20 250 90 S390 156 500 85" stroke="currentColor" strokeWidth="1.3" fill="none" strokeDasharray="3 8"/></svg>
          <div className="lb-connected-card lb-connected-card--other"><span>02 / RELATED CONTEXT</span><strong>PR #482 · Checkout</strong><small>2 comments · 3 files</small></div>
          <div className="lb-connect-caption">A single thread through the work.</div>
        </div>
      </section>
      <section className="lb-chapter lb-chapter--focus" id="focus">
        <div className="lb-section-top"><span className="lb-kicker">03 / CLEAR SPACE, CLEAR MIND</span><span className="lb-index">02 — 04</span></div>
        <Reveal><h2>A little clarity<br/>goes a <em>long way.</em></h2></Reveal>
        <Reveal delay={100}><p className="lb-intro">See the work that needs your attention, with the context you need right beside it.</p></Reveal>
        <Reveal delay={180} className="lb-product-wrap"><WorkPreview/></Reveal>
      </section>
      <section className="lb-chapter lb-chapter--ship" id="ship">
        <div className="lb-section-top"><span className="lb-kicker">04 / KEEP THINGS MOVING</span><span className="lb-index">03 — 04</span></div>
        <Reveal><h2>Make room for<br/><em>what comes next.</em></h2></Reveal>
        <p className="lb-intro">Spend less time finding the thread. More time making progress.</p>
        <button className="lb-end-cta" type="button" onClick={()=>setPanelOpen(true)}>Get early access <span>↗</span></button>
        <div className="lb-city-frame lb-city-frame--final"><Cityscape phase="sunset"/></div>
        <footer className="lb-footer"><OrganicMark/><span>CONCEPT EXPLORATION FOR LITEBOX · 2026</span></footer>
      </section>
    </div>
    <Waitlist open={panelOpen} setOpen={setPanelOpen}/>
  </div>;
}
