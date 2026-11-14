type TimeOfDay="fog"|"day"|"coast"|"sunset";

const schemes={
  fog:{sky:"#b9c6c4",light:"#e5e3d8",hills:"#96a9a0",hills2:"#728d88",water:"#aebfbd",land:"#6c8177",sun:"#eee5ce",ink:"#647e79"},
  day:{sky:"#b9d4d8",light:"#e9e6d5",hills:"#aec2aa",hills2:"#799889",water:"#a7c3c2",land:"#638579",sun:"#e5d5a2",ink:"#5b7f83"},
  coast:{sky:"#d1bcbe",light:"#f0cfb2",hills:"#b9b2a5",hills2:"#8c9692",water:"#9cb7b6",land:"#8c9b89",sun:"#f7d6a8",ink:"#786c73"},
  sunset:{sky:"#a0a6b1",light:"#ebc9b5",hills:"#8b9091",hills2:"#676f74",water:"#8a9fac",land:"#50666d",sun:"#f0c8a4",ink:"#4b5b67"}
} as const;

function Victorian({x,y,shade,scale=1}:{x:number;y:number;shade:string;scale?:number}) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="#52615E" strokeWidth="2.2" strokeLinejoin="miter">
    <path d="M-8 63 58 0l66 63H-8Z" fill="#647E7A"/>
    <path d="M0 63h116v170H0Z" fill={shade}/>
    <path d="M9 63 58 18l49 45" fill="none" stroke="#E5DFCF" strokeWidth="4"/>
    <rect x="45" y="55" width="27" height="41" fill="#829A9B"/>
    <path d="M42 58h33M58 55v40" stroke="#E9E6DC"/>
    {[0,1,2].map(i=><g key={i}>
      <rect x={13+i*36} y="111" width="25" height="42" fill="#78989D"/>
      <path d={`M${25+i*36} 112v41M${14+i*36} 131h23`} stroke="#EDE5DA" strokeWidth="2"/>
      <rect x={13+i*36} y="168" width="25" height="43" fill="#78989D"/>
      <path d={`M${25+i*36} 169v42M${14+i*36} 188h23`} stroke="#EDE5DA" strokeWidth="2"/>
    </g>)}
    <path d="M0 104h116M0 157h116M0 224h116" stroke="#EAE5D9" strokeWidth="3"/>
    <path d="M-6 228h128" stroke="#596F6C" strokeWidth="6"/>
    <path d="M47 232v-38h22v38" fill="#667D78"/>
  </g>;
}

function PixelTram({x,y,scale=1}:{x:number;y:number;scale?:number}){
  return <g className="fg-scene-tram" transform={`translate(${x} ${y}) scale(${scale})`} stroke="#3c4e4c" strokeWidth="2">
    <path d="M8 4h96l8 14v51H0V18Z" fill="#A26050"/>
    <path d="M5 13H109" stroke="#E7C1A2" strokeWidth="6"/>
    {[0,1,2,3].map(i=><rect key={i} x={9+i*26} y="22" width="20" height="22" fill="#E7D9B8" stroke="#576F71" strokeWidth="2"/>)}
    <rect x="4" y="49" width="104" height="5" fill="#F0D2B0" stroke="none"/>
    <path d="M0 70h112" strokeWidth="4"/>
    <circle cx="20" cy="71" r="6" fill="#283937"/><circle cx="91" cy="71" r="6" fill="#283937"/>
    <path d="M47 4V-16h28" fill="none"/>
  </g>;
}

function Skyline({variant}:{variant:"fog"|"day"|"coast"|"sunset"}){
 const dark=variant==="sunset"?"#4D6570":"#718C8A";
 const tall=variant==="sunset"?"#5C6D76":"#7C9797";
 const buildings=Array.from({length:52},(_,i)=>({
    x:18+i*31,w:24+(i*7)%16,h:62+(i*59)%150
 }));
 return <g opacity={variant==="fog"?.6:.92}>
   {buildings.map((b,i)=><g key={i}>
      <rect x={b.x} y={480-b.h} width={b.w} height={b.h} fill={i%4?tall:dark}/>
      {Array.from({length:5},(_,j)=><rect key={j} x={b.x+5+(j%2)*9} y={480-b.h+15+Math.floor(j/2)*22} width="3" height="5" fill="#E1DBC9" opacity=".55"/>)}
   </g>)}
   <path d="M1008 478V205l33-86 33 86v273Z" fill={tall}/>
   <path d="M1032 234h17m-29 30h40" stroke="#c3d1c8" strokeWidth="5"/>
   <path d="M899 480V265l20-57 19 57v215Z" fill={dark}/>
 </g>
}

function GoldenGate({variant}:{variant:TimeOfDay}){
 const stroke=variant==="fog"?"#987F79":variant==="sunset"?"#9B6561":"#BB7464";
 return <g fill="none" stroke={stroke} strokeWidth="5" opacity={variant==="fog"?.65:.91}>
   <path d="M440 463V253H478V463M985 463V254h38v209" strokeWidth="11"/>
   <path d="M437 269h45M985 269h42" strokeWidth="7"/>
   <path d="M350 457h835" strokeWidth="8"/>
   <path d="M350 279C535 475 896 475 1185 281" strokeWidth="3"/>
   {Array.from({length:25},(_,i)=>{let x=380+i*32;return <path key={i} d={`M${x} 452V${302+Math.floor(Math.abs(780-x)*.22)}`} strokeWidth="2.2"/>})}
 </g>;
}

function FloweringForeground({theme}:{theme:TimeOfDay}){
 return <g>
   <path d="M0 774C270 691 407 780 577 741S1102 706 1600 760V920H0Z" fill={schemes[theme].land}/>
   <path d="M-30 803C141 768 252 766 409 811S801 781 1090 793S1426 762 1640 796" stroke="#657A70" strokeWidth="4" fill="none" opacity=".5"/>
   {[...Array.from({length:22},(_,i)=>({x:(i*139)%1600,y:755+(i*73)%170}))].map((v,i)=><g key={i} opacity={i%3===0?.85:.65}>
     <path d={`M${v.x} ${v.y+28}l6-48`} stroke="#536C58" strokeWidth="2" fill="none"/>
     <circle cx={v.x+6} cy={v.y-24} r={i%3===0?6:4} fill={i%4===0?"#D9C9DA":i%4===1?"#E8D0B0":i%4===2?"#D7DBC7":"#F0DEC6"}/>
     <circle cx={v.x} cy={v.y-17} r="4" fill="#CBD8CA"/>
   </g>)}
   <g opacity=".8">
     <path d="M0 0C82 80 80 153 118 231M0 56C137 77 179 162 210 246" stroke="#475F52" strokeWidth="16" fill="none"/>
     {[[6,30],[47,71],[75,115],[118,186],[170,193],[202,237]].map(([x,y],i)=><g key={i}>
       <path d={`M${x} ${y}q45-34 62-8q-30 32-62 8Z`} fill="#647B66"/>
       <path d={`M${x+6} ${y+7}q-41-16-50 7q28 17 50-7Z`} fill="#8DA48B"/>
     </g>)}
   </g>
 </g>
}

function CableTracks(){
 return <g>
   <path d="M0 796C280 750 500 718 705 712s570-53 895-82" stroke="#5B6662" strokeWidth="7" fill="none"/>
   <path d="M0 812C280 766 500 734 705 728s570-53 895-82" stroke="#C6B4A0" strokeWidth="5" fill="none"/>
   {Array.from({length:20},(_,i)=><path key={i} d={`M${i*85} ${801-i*5}l3 14`} stroke="#879288" strokeWidth="3"/>)}
 </g>
}

export function FoglineScene({time}:{time:TimeOfDay}){
 const scheme=schemes[time];
 const isFog=time==="fog";
 const isDay=time==="day";
 const isCoast=time==="coast";
 const isSunset=time==="sunset";
 return <svg className={`fg-scene-svg fg-scene-svg--${time}`} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" role="img" aria-label={
   isFog?"Golden Gate Bridge emerging through morning fog":
   isDay?"Sunny San Francisco Victorian houses and a passing cable car":
   isCoast?"Calm golden-hour shoreline at Crissy Field and the Golden Gate Bridge":
   "Wide San Francisco skyline and hills at dusk"
 }>
   <defs>
     <linearGradient id={`fg-sky-${time}`} x1="0" y1="0" x2="0" y2="1">
       <stop offset="0%" stopColor={scheme.sky}/><stop offset="100%" stopColor={scheme.light}/>
     </linearGradient>
     <linearGradient id={`fg-bay-${time}`} x1="0" y1="0" x2="0" y2="1">
       <stop stopColor={scheme.water}/><stop offset="100%" stopColor={scheme.light}/>
     </linearGradient>
   </defs>
   <rect width="1600" height="900" fill={`url(#fg-sky-${time})`}/>
   <circle className="fg-scene-sun" cx={isFog?1208:isDay?1358:isCoast?1260:1180} cy={isFog?225:isDay?180:isCoast?327:312} r={isSunset?87:66} fill={scheme.sun} opacity=".86"/>
   <g className="fg-pixel-clouds" fill={isFog?"#D9E2DE":"#F2E6D6"} opacity={isFog?".8":".45"}>
     {Array.from({length:60},(_,i)=>{const x=(i*187+29)%1600;const y=72+((i*43)%310);return <rect key={i} x={x} y={y} width={12+(i%4)*14} height={7+(i%2)*5}/>})}
   </g>
   <path d="M0 415 165 376 305 403 446 349 630 389 826 333 998 372 1164 324 1395 360 1600 308V900H0Z" fill={scheme.hills} opacity=".8"/>
   <path d="M0 479 258 430 445 449 667 405 835 445 1090 403 1303 428 1600 385V900H0Z" fill={scheme.hills2} opacity=".8"/>
   <path d="M0 495Q400 469 800 496T1600 465V900H0Z" fill={`url(#fg-bay-${time})`}/>
   {isFog && <>
     <GoldenGate variant={time}/>
     <path d="M0 655C280 598 590 637 850 602S1290 597 1600 570V900H0Z" fill="#759188" opacity=".65"/>
     <g className="fg-scene-fog"><path d="M-100 338Q290 230 630 310T1720 275V560H-100Z" fill="#E9E8DF" opacity=".63"/><path d="M-100 516Q255 455 617 504T1750 462V689H-100Z" fill="#E6EBE4" opacity=".83"/></g>
     <CableTracks/><PixelTram x={520} y={700} scale={.45}/>
   </>}
   {isDay && <>
     <Skyline variant="day"/>
     <path d="M0 590C290 530 415 570 600 543S1060 495 1600 525V900H0Z" fill="#6E8C7C"/>
     <g className="fg-victorians">
       <Victorian x={370} y={437} shade="#E2D8C5" scale={1.35}/>
       <Victorian x={537} y={424} shade="#BFCBC4" scale={1.4}/>
       <Victorian x={712} y={445} shade="#E8CDCA" scale={1.33}/>
       <Victorian x={874} y={431} shade="#D1D7C6" scale={1.35}/>
     </g>
     <CableTracks/><PixelTram x={230} y={729} scale={.53}/>
   </>}
   {isCoast && <>
     <GoldenGate variant={time}/>
     <path d="M0 618Q350 605 700 633T1600 614V900H0Z" fill="#92ABA9" opacity=".8"/>
     {Array.from({length:15},(_,i)=><path key={i} d={`M${i*119} ${667+i%4*27}q30-7 65 0`} stroke="#EDE1D2" strokeWidth="2" fill="none" opacity=".65"/>)}
     <path d="M0 790Q320 766 583 783T1040 749T1600 737V900H0Z" fill="#D6C2A8"/>
     <path d="M0 822Q315 784 610 800T1230 770" fill="none" stroke="#ECE0CD" strokeWidth="5"/>
     <g fill="#667C70">{Array.from({length:38},(_,i)=>{const x=(i*107)%1600,y=767+(i*61)%125;return <path key={i} d={`M${x} ${y+10}q-12-33-16-35m16 35q3-34 20-47m-20 47q19-23 39-19`} stroke="#758878" strokeWidth="3" fill="none"/>})}</g>
     <g opacity=".7"><path d="M1300 663l18-10 17 10-17-5Z" fill="#7D8E8D"/><path d="M1370 650l15-10 16 10-15-6Z" fill="#7D8E8D"/></g>
   </>}
   {isSunset && <>
     <Skyline variant="sunset"/>
     <path d="M0 635Q300 564 560 612T1100 567T1600 579V900H0Z" fill="#58737B" opacity=".8"/>
     <path d="M0 700q400-35 800 15t800-20v205H0Z" fill="#5C7280"/>
     <path d="M500 644q230-37 431 2t489-20" fill="none" stroke="#E8CBB7" strokeWidth="3" opacity=".48"/>
     <g fill="#E9C8AA" opacity=".45">{Array.from({length:130},(_,i)=>{const x=(i*89)%1600,y=420+(i*37)%255;return <rect key={i} x={x} y={y} width="3" height="4"/>})}</g>
     <CableTracks/><PixelTram x={1150} y={681} scale={.4}/>
   </>}
   {!(isCoast||isSunset) && <FloweringForeground theme={time}/>}
   {isCoast && <g fill="#829786" opacity=".5">{Array.from({length:55},(_,i)=><rect key={i} x={(i*151)%1600} y={767+(i*43)%117} width={3+(i%3)} height="3"/>)}</g>}
   <g className="fg-scene-dither" fill={scheme.ink} opacity={isFog?".12":".16"}>
     {Array.from({length:300},(_,i)=>{const x=(i*173+23)%1600,y=420+(i*67)%480;return <rect key={i} x={x} y={y} width={i%4===0?5:2} height={i%3===0?5:2}/>})}
   </g>
 </svg>;
}
