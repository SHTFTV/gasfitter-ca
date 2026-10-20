import React, { useEffect, useRef, useState } from 'react';
import './service-hero.css';
import { ArrowRight, Pause, Play } from 'lucide-react';

const scenes = [
  { key: 'furnace', title: 'Furnaces', detail: 'Comfort starts at home.', alt: 'Residential furnace in a clean utility room' },
  { key: 'boiler', title: 'Boilers', detail: 'Heat for the way you live.', alt: 'Wall-mounted boiler and hydronic equipment' },
  { key: 'hot-water', title: 'Hot water tanks', detail: 'Everyday hot water.', alt: 'Residential hot water storage tank' },
  { key: 'range', title: 'Gas ranges', detail: 'The heart of the kitchen.', alt: 'Gas cooking range in a contemporary kitchen' },
  { key: 'bbq', title: 'BBQ connections', detail: 'Take the comfort outside.', alt: 'Outdoor barbecue and exterior gas outlet box' },
  { key: 'underground', title: 'Underground gas lines', detail: 'Connections beyond the house.', alt: 'Concept of a gas utility pipe route in a residential trench' },
];

export function ServiceHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReducedMotion(preference.matches);
      const video = videoRef.current;
      if (!video) return;
      if (preference.matches) video.pause();
      else video.play().catch(() => setPlaying(false));
    };
    apply();
    preference.addEventListener('change', apply);
    return () => preference.removeEventListener('change', apply);
  }, []);
  const choose = (index: number) => {
    setActive(index);
    const video = videoRef.current;
    if (video && video.readyState >= 1) {
      video.pause();
      video.currentTime = index * 4 + 0.6;
    }
  };
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setPlaying(false));
    else video.pause();
  };
  const scene = scenes[active];
  return <section className="service-hero" aria-label="Gas services and equipment">
    <div className="service-hero-stage">
      <div className="service-hero-media">
        <img className="service-hero-still" src={`/images/gas-services-${scene.key}-v1.webp`} alt={`${scene.alt} — AI concept illustration`} fetchPriority="high" width="1280" height="720" />
        <video ref={videoRef} className="service-hero-film" hidden={reducedMotion || failed} muted loop playsInline preload="metadata" poster="/images/gas-services-furnace-v1.webp" aria-hidden="true"
          onTimeUpdate={event => setActive(Math.min(5, Math.floor(event.currentTarget.currentTime / 4)))} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => {setFailed(true); setPlaying(false);}}>
          <source src="/media/gas-services-hero-v1.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="service-hero-shade" />
      <div className="service-hero-copy">
        <div className="service-hero-logo"><img src="/images/gasfitter-logo-light-v2.webp" alt="Gasfitter.ca — People Prices Products You Can Trust" width="1463" height="576" fetchPriority="high"/></div>
        <h1>Every connection.<br/><em>More comfort.</em></h1>
        <p className="service-hero-intro">Furnaces, boilers, hot water and the gas connections that bring your home to life.</p>
        <a className="service-hero-cta" href="/#contact">Tell us what you need <ArrowRight size={20} aria-hidden="true"/></a>
        <a className="service-hero-secondary" href="/#services">Explore gas services <ArrowRight size={17} aria-hidden="true"/></a>
      </div>
      <div className="service-hero-scene"><span>{String(active + 1).padStart(2, '0')} / 06</span><strong>{scene.title}</strong><p>{scene.detail}</p></div>
      {!reducedMotion && !failed && <button className="service-hero-play" onClick={toggle} type="button" aria-label={playing ? 'Pause service video' : 'Play service video'}>{playing ? <Pause size={15}/> : <Play size={15}/>} {playing ? 'Pause' : 'Play'}</button>}
      <p className="service-hero-credit">AI concept imagery · Not photographs of completed installations.</p>
    </div>
    <div className="service-hero-selector" role="group" aria-label="Choose equipment scene">{scenes.map((item, index) => <button key={item.key} type="button" aria-pressed={active === index} onClick={() => choose(index)}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}<i aria-hidden="true"/></button>)}</div>
  </section>;
}
