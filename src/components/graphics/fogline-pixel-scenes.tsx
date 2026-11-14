import Image from "next/image";

type SceneName = "fog" | "day" | "coast" | "sunset";

const imageByScene: Record<SceneName, {src:string;label:string}> = {
  fog: {src:"/images/fogline/morning.webp",label:"Pixel-art San Francisco street and cable car emerging from morning fog"},
  day: {src:"/images/fogline/painted-ladies.webp",label:"The Painted Ladies in bright San Francisco daylight"},
  coast: {src:"/images/fogline/golden-gate.webp",label:"Coastal view of the Golden Gate Bridge"},
  sunset: {src:"/images/fogline/skyline.webp",label:"Golden-hour skyline and bay over San Francisco"},
};

/**
 * Cropped pixel-art landscapes from the approved art direction.
 * Positioned behind the SaaS mockups, layered over the existing vector
 * atmosphere. Scroll progress sets --fg-visual-shift on each section.
 */
export function FoglinePixelScene({time}:{time:SceneName}) {
  const scene=imageByScene[time];
  return <div className={`fg-pixel-scene fg-pixel-scene--${time}`} aria-hidden="true">
    <div className="fg-pixel-sky"/>
    <div className="fg-pixel-window">
      <Image
        src={scene.src}
        alt=""
        fill
        unoptimized
        priority={time==="fog"}
        sizes="(max-width: 760px) 100vw, 78vw"
        className="fg-pixel-image"
      />
    </div>
    <div className="fg-pixel-mist"/>
    <div className="fg-pixel-filmgrain"/>
  </div>;
}
