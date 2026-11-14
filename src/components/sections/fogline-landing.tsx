"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Reveal } from "@/components/motion/reveal";
import { TextsReveal } from "@/components/motion/texts-reveal";
import { useAnchorScroll } from "@/hooks/use-anchor-scroll";
import { useLenisInstance } from "@/components/providers/lenis-provider";
import { FoglineScene } from "@/components/graphics/fogline-scenes";
import { FoglinePixelScene } from "@/components/graphics/fogline-pixel-scenes";
import "@/styles/fogline.css";
import "@/styles/fogline-pixel.css";

const stops = [
  { id: "morning", number: "01", label: "The fog", place: "Golden Gate · 6:42 AM" },
  { id: "connections", number: "02", label: "The connections", place: "Painted Ladies · 10:15 AM" },
  { id: "review", number: "03", label: "The clarity", place: "Crissy Field · 5:28 PM" },
  { id: "sunset", number: "04", label: "The view", place: "City overlook · 6:53 PM" },
] as const;

type Stop = (typeof stops)[number];

function FoglineLogo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return <span className={`fg-logo ${light ? "fg-logo--light" : ""}`} aria-label="Fogline">
    <svg width="33" height="30" viewBox="0 0 33 30" aria-hidden="true" fill="none">
      <path d="M3 21h4v-4h4v-4h4V9h5v4h4v4h5v4h-4v4H7v-4H3Z" stroke="currentColor" strokeWidth="1.65" strokeLinejoin="miter"/>
      <path d="M7 25h2v2H7Zm5 2h2v2h-2Zm8 0h2v2h-2ZM2 16h2v2H2Zm27 0h2v2h-2Z" fill="currentColor"/>
      <path d="M11 21h14M15 17h9" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
    {!compact && <span>fogline<span className="fg-logo-period">.</span></span>}
  </span>;
}

function MiniTram() {
  return <svg width="24" height="19" viewBox="0 0 24 19" aria-hidden="true">
    <path d="M5 4h14l2 3v7H3V7Z" fill="#454a46" stroke="#454a46" strokeWidth="1"/>
    <path d="M6 7h4v4H6Zm6 0h4v4h-4Zm6 0h2v4h-2Z" fill="#e9ded1"/>
    <path d="M3 14h18" stroke="#e9ded1" strokeWidth="1.2"/>
    <path d="M12 4V1h3" stroke="#454a46" strokeWidth="1.2" fill="none"/>
    <circle cx="7" cy="16" r="1.5" fill="#454a46"/><circle cx="18" cy="16" r="1.5" fill="#454a46"/>
  </svg>;
}

function JourneyRail({ active, onVisit }: { active: number; onVisit: (id: string) => void }) {
  return <nav className="fg-rail" aria-label="Journey through Fogline">
    <div className="fg-rail-line"><span className="fg-rail-progress"/><span className="fg-rail-tram"><MiniTram/></span></div>
    {stops.map((stop, index)=><button type="button" key={stop.id} className={`fg-stop ${active===index?"is-active":""}`} onClick={()=>onVisit(stop.id)} aria-current={active===index?"step":undefined}>
      <span className="fg-stop-no">{stop.number}</span>
      <span className="fg-stop-bullet"/>
      <span className="fg-stop-label">{stop.label}</span>
    </button>)}
  </nav>;
}

function ReviewQueue() {
  const rows = [
    { id:"#482",title:"Improve session renewal",detail:"auth/session.ts · 4 files",status:"Needs review",statusClass:"review" },
    { id:"#478",title:"Update billing retry logic",detail:"billing/retries.ts · 2 files",status:"Changes requested",statusClass:"changes" },
    { id:"#469",title:"Add search query cache",detail:"search/cache.ts · 6 files",status:"Ready to merge",statusClass:"ready" },
  ];
  return <div className="fg-queue fg-browser" role="group" aria-label="Conceptual review queue preview">
    <div className="fg-browser-bar"><div className="fg-browser-dots"><i/><i/><i/></div><span>fogline / my reviews</span><span className="fg-browser-bar-end">⌘ K</span></div>
    <div className="fg-queue-content">
      <div className="fg-queue-head"><span>WORKSPACE / ENGINEERING</span><span>MON · 9:41</span></div>
      <div className="fg-queue-title"><h3>Your review queue<span className="fg-count">03</span></h3><span>↗ &nbsp; View all</span></div>
      <div className="fg-queue-tabs"><span className="is-active">Assigned to me</span><span>Created by me</span><span>All activity</span></div>
      {rows.map(row=><div className="fg-queue-row" key={row.id}>
        <div className="fg-row-icon">↗</div><div className="fg-row-copy"><strong>{row.title}</strong><small>{row.detail}</small></div>
        <span className={`fg-status fg-status--${row.statusClass}`}>{row.status}</span><span className="fg-row-id">{row.id}</span>
      </div>)}
      <div className="fg-queue-footer"><span>Connected to GitHub · Linear · Notion</span><span>Updated just now</span></div>
    </div>
  </div>;
}

function ContextCards() {
  return <div className="fg-context-stack" aria-label="Related work cards">
    <div className="fg-context-label">ONE REVIEW. THE WHOLE STORY.</div>
    <div className="fg-context-row"><span className="fg-context-key">PR</span><div><strong>#482 · Improve session renewal</strong><small>4 files changed · 2 reviewers</small></div><span className="fg-context-arrow">↗</span></div>
    <div className="fg-context-row"><span className="fg-context-key">TASK</span><div><strong>PLAT-184 · Refresh sessions safely</strong><small>In progress · Maya Chen</small></div><span className="fg-context-arrow">↗</span></div>
    <div className="fg-context-row"><span className="fg-context-key">DOC</span><div><strong>Authentication strategy</strong><small>Updated 2 days ago</small></div><span className="fg-context-arrow">↗</span></div>
    <div className="fg-context-foot">Three tools. One connected conversation.</div>
  </div>;
}

const diff = [
  { num: "41", type: "normal", code: "export async function getSession(userId: string) {" },
  { num: "42", type: "remove", code: "  const token = await getToken(userId);" },
  { num: "42", type: "add", code: "  const token = await cache.getOrCreate(userId, fetchToken);" },
  { num: "43", type: "normal", code: "  if (!token) {" },
  { num: "44", type: "remove", code: '    throw new Error("missing token");' },
  { num: "44", type: "add", code: '    return redirect("/login");' },
  { num: "45", type: "normal", code: "  }" },
  { num: "46", type: "normal", code: "  return token;" },
  { num: "47", type: "normal", code: "}" },
];

function FullReview() {
  return <div className="fg-review-ui fg-browser" role="group" aria-label="Fogline code review product mockup">
    <div className="fg-browser-bar"><div className="fg-browser-dots"><i/><i/><i/></div><span>fogline / review / 482</span><span className="fg-browser-bar-end">Share ↗</span></div>
    <div className="fg-review-layout">
      <aside className="fg-review-sidebar">
        <FoglineLogo compact/>
        <span className="fg-review-group-label">WORKSPACE</span>
        <span>⌂ &nbsp; Overview</span><span className="is-selected">↗ &nbsp; My reviews <b>3</b></span><span>◫ &nbsp; Pull requests</span><span>▤ &nbsp; Linked tasks</span>
        <span className="fg-review-group-label">PROJECT</span><span>Platform / Core</span><span>Security</span>
        <span className="fg-sidebar-bottom">● Connected</span>
      </aside>
      <div className="fg-review-center">
        <div className="fg-review-breadcrumb">Reviews / Platform / <strong>PR #482</strong></div>
        <div className="fg-review-heading"><div><h3>Improve session renewal</h3><div className="fg-review-meta">alex/refactor-auth <span>→</span> main &nbsp; · &nbsp; 4 files changed</div></div><span className="fg-review-badge">Needs review</span></div>
        <div className="fg-review-tabs"><span>Overview</span><span className="is-active">Files changed <b>4</b></span><span>Discussion <b>2</b></span><span>Checks <b>6</b></span></div>
        <div className="fg-file-bar"><span>⌁ &nbsp; src/auth/session.ts</span><span>+14 &nbsp; −8</span></div>
        <div className="fg-code-block">{diff.map((line,i)=><div key={i} className={`fg-code-line fg-code-line--${line.type}`}><span className="fg-code-no">{line.num}</span><span className="fg-code-symbol">{line.type==="add"?"+":line.type==="remove"?"−":" "}</span><code>{line.code}</code></div>)}</div>
        <div className="fg-inline-comment"><span className="fg-comment-avatar">MC</span><div><strong>Maya Chen <small>· on line 42</small></strong><p>What happens if the cached token expires during refresh? Could we cover that edge case?</p><span className="fg-reply-link">Reply to thread ↗</span></div></div>
      </div>
      <aside className="fg-review-context">
        <span className="fg-context-title">Review context</span>
        <div className="fg-review-context-section"><span>RELATED TASK</span><strong>PLAT-184</strong><p>Refresh sessions safely</p><small>In progress</small></div>
        <div className="fg-review-context-section"><span>RELATED DOC</span><strong>Authentication strategy</strong><p>Session lifecycle and renewal</p></div>
        <div className="fg-review-context-section"><span>CHECKS</span><strong className="fg-green">✓ &nbsp; 6 checks passed</strong><p>Unit tests · Typecheck · Lint</p></div>
        <div className="fg-review-context-section"><span>REVIEWERS</span><div className="fg-avatar-row"><i>MC</i><i>JL</i><small>2 requested</small></div></div>
      </aside>
    </div>
  </div>;
}

function ShipCard() {
  return <div className="fg-ship-card" role="group" aria-label="Pull request approvals preview">
    <span className="fg-ship-kicker">PR #482 / RELEASE READY</span>
    <div className="fg-ship-check">✓</div>
    <h3>Ready when you are.</h3>
    <p>Every conversation resolved, every check accounted for. Your team can move forward with confidence.</p>
    <div className="fg-ship-metrics"><span>✓ &nbsp; 6 checks passed</span><span>✓ &nbsp; 2 approvals</span><span>✓ &nbsp; 0 unresolved threads</span></div>
    <div className="fg-ship-button">Ready to merge <span>↗</span></div>
    <small>Illustrative interface. No live integration.</small>
  </div>;
}

function WaitlistPanel({ open, setOpen }: { open: boolean; setOpen: (open:boolean)=>void }) {
  const [email,setEmail]=useState("");
  const [previewNotice,setPreviewNotice]=useState(false);
  function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(email.includes("@"))setPreviewNotice(true)}
  return <>
    <aside className={`fg-waitlist ${open?"fg-waitlist--open":"fg-waitlist--closed"}`} aria-label="Early access waitlist">
      {open?<div className="fg-waitlist-inner">
        <div className="fg-panel-top"><span>EARLY ACCESS / FOG 001</span><button aria-label="Collapse waitlist" type="button" onClick={()=>setOpen(false)}>Hide <span>↗</span></button></div>
        <div className="fg-panel-main"><span className="fg-panel-index">A CLEARER WAY TO BUILD.</span><div className="fg-panel-line-art" aria-hidden="true"><svg viewBox="0 0 240 76" fill="none"><path d="M3 59H36v-14H57V33H78V17h26v16h28v12h30v14h74" stroke="currentColor" strokeWidth="1" strokeDasharray="2 5"/><circle cx="104" cy="16" r="3" fill="currentColor"/><circle cx="163" cy="59" r="3" fill="currentColor"/></svg></div>
          <h2>Good code<br/>deserves <em>clarity.</em></h2>
          <p>Get first access to a quieter way to review code, connect context and keep your team moving.</p>
          <form onSubmit={submit}><label htmlFor="fg-email">WORK EMAIL</label><input id="fg-email" placeholder="you@company.com" type="email" autoComplete="email" required value={email} onChange={e=>{setEmail(e.target.value);setPreviewNotice(false)}}/><button type="submit">Join the waitlist <span>↗</span></button></form>
          {previewNotice && <p role="status" className="fg-panel-notice">This is a design preview. Your email hasn&apos;t been saved.</p>}
          <span className="fg-panel-note">No spam. Just an invitation when we&apos;re ready.</span>
        </div>
        <div className="fg-panel-bottom"><span>MADE FOR THE MOMENT BEFORE MERGE</span><span>SF · CA</span></div>
      </div>:<button type="button" onClick={()=>setOpen(true)} className="fg-waitlist-tab" aria-label="Open early access waitlist"><span>EARLY ACCESS</span><span>↗</span></button>}
    </aside>
    <button type="button" className="fg-mobile-cta" onClick={()=>setOpen(true)}>Join early access <span>↗</span></button>
    {open && <button type="button" className="fg-mobile-scrim" aria-label="Close waitlist panel" onClick={()=>setOpen(false)}/>}
  </>;
}

export function FoglineLanding(){
  const [panelOpen,setPanelOpen]=useState(true);
  const [active,setActive]=useState(0);
  const lenis=useLenisInstance();
  const scrollTo=useAnchorScroll();

  useEffect(()=>{if(window.matchMedia("(max-width: 760px)").matches)setPanelOpen(false)},[]);
  useEffect(()=>{
    const update=()=>{
      const sections=stops.map(stop=>document.getElementById(stop.id));
      const pivot=window.innerHeight*.4;
      const index=sections.reduce((current,section,i)=>section&&section.getBoundingClientRect().top<=pivot?i:current,0);
      setActive(index);
      // This changes scenery and fog composition during the journey without
      // triggering React re-renders on every animation frame.
      for (const section of sections) {
        if (!section) continue;
        const rect=section.getBoundingClientRect();
        const local=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(rect.height+window.innerHeight)));
        section.style.setProperty("--fg-visual-shift",`${((local-.5)*88).toFixed(1)}px`);
      }
      const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
      const progress=Math.min(1,Math.max(0,window.scrollY/max));
      const bar=document.querySelector<HTMLElement>(".fg-rail-progress");
      const tram=document.querySelector<HTMLElement>(".fg-rail-tram");
      if(bar)bar.style.height=`${progress*100}%`;
      if(tram)tram.style.top=`${progress*100}%`;
    };
    update();
    if(lenis){lenis.on("scroll",update);return()=>{lenis.off("scroll",update)}}
    window.addEventListener("scroll",update,{passive:true});
    return()=>window.removeEventListener("scroll",update);
  },[lenis]);

  function visit(id:string){const node=document.getElementById(id);if(!node)return;if(lenis)lenis.scrollTo(node);else node.scrollIntoView({behavior:"smooth"});}


  return <div className={`fg-site ${panelOpen?"fg-site--panel-open":"fg-site--panel-closed"}`}>
    <header className="fg-header">
      <a href="#morning" aria-label="Fogline home" onClick={scrollTo}><FoglineLogo/></a>
      <nav className="fg-header-nav" aria-label="Main navigation"><a href="#connections" onClick={scrollTo}>Why Fogline</a><a href="#review" onClick={scrollTo}>The product</a><button type="button" onClick={()=>setPanelOpen(true)}>Early access <span>↗</span></button></nav>
    </header>

    <JourneyRail active={active} onVisit={visit}/>
    <main className="fg-main">
      <section id="morning" className="fg-section fg-section--morning" aria-label="Discover Fogline">
        <div className="fg-landscape"><FoglineScene time="fog"/><FoglinePixelScene time="fog"/><div className="fg-scene-vignette fg-scene-vignette--morning"/></div>
        <div className="fg-hero-inner">
          <TextsReveal><p className="fg-eyebrow t-stagger-line t-stagger-line--1">A CLEARER WAY TO REVIEW. &nbsp; / &nbsp; SAN FRANCISCO, CA</p>
            <h1 className="t-stagger-line t-stagger-line--2">Lift the fog<br/>around <span>your code.</span></h1>
            <p className="fg-hero-description t-stagger-line t-stagger-line--3">Pull requests, comments and the context behind every change. Together in one thoughtful workspace.</p>
            <a href="#connections" onClick={scrollTo} className="fg-link t-stagger-line t-stagger-line--4">Take a closer look <span>↘</span></a>
          </TextsReveal>
        </div>
        <div className="fg-landmark"><span>01 / EARLY MORNING</span><span>THE CITY IS SLOWLY COMING INTO FOCUS</span></div>
      </section>

      <section id="connections" className="fg-section fg-section--connections" aria-label="Connect your reviews">
        <div className="fg-landscape"><FoglineScene time="day"/><FoglinePixelScene time="day"/><div className="fg-scene-vignette fg-scene-vignette--day"/></div>
        <div className="fg-section-content">
          <Reveal><p className="fg-eyebrow">02 / PAINTED LADIES &nbsp; • &nbsp; 10:15 AM</p><h2>Every change has<br/><span>a bigger picture.</span></h2><p className="fg-description">Open a review and see the full story: related tasks, the latest decisions and the docs your team needs. No digging through tabs.</p></Reveal>
          <div className="fg-two-up"><Reveal delay={120}><ReviewQueue/></Reveal><Reveal delay={220}><ContextCards/></Reveal></div>
        </div>
        <div className="fg-landmark"><span>02 / THE CITY OPENS UP</span><span>FROM SCATTERED CONTEXT TO ONE CLEAR VIEW</span></div>
      </section>

      <section id="review" className="fg-section fg-section--review" aria-label="Review code with clarity">
        <div className="fg-landscape"><FoglineScene time="coast"/><FoglinePixelScene time="coast"/><div className="fg-scene-vignette fg-scene-vignette--coast"/></div>
        <div className="fg-section-content fg-section-content--wide">
          <Reveal><p className="fg-eyebrow">03 / CRISSY FIELD &nbsp; • &nbsp; GOLDEN HOUR</p><h2>Less back-and-forth.<br/><span>Better reviews.</span></h2><p className="fg-description">Discuss changes right beside the diff. Spot blockers early, keep relevant context close and know exactly what&apos;s left before merge.</p></Reveal>
          <Reveal delay={180} className="fg-review-container"><FullReview/></Reveal>
        </div>
        <div className="fg-landmark"><span>03 / A LITTLE BREATHING ROOM</span><span>FOCUS ON WHAT MATTERS IN THE DIFF</span></div>
      </section>

      <section id="sunset" className="fg-section fg-section--sunset" aria-label="Ship with confidence">
        <div className="fg-landscape"><FoglineScene time="sunset"/><FoglinePixelScene time="sunset"/><div className="fg-scene-vignette fg-scene-vignette--sunset"/></div>
        <div className="fg-section-content fg-section-content--end"><Reveal><p className="fg-eyebrow">04 / ABOVE THE CITY &nbsp; • &nbsp; SUNSET</p><h2>A better view of<br/><span>what&apos;s next.</span></h2><p className="fg-description">Less uncertainty between first commit and final approval. Keep the work moving, without losing the thread.</p><button type="button" className="fg-end-cta" onClick={()=>setPanelOpen(true)}>Request early access <span>↗</span></button></Reveal>
          <Reveal delay={160} className="fg-ship-container"><ShipCard/></Reveal>
        </div>
        <footer className="fg-footer"><FoglineLogo/><p>Clear thinking. Confident shipping.</p><span>DESIGN CONCEPT FOR LITEBOX &nbsp; · &nbsp; 2026</span></footer>
      </section>
    </main>
    <WaitlistPanel open={panelOpen} setOpen={setPanelOpen}/>
  </div>;
}
