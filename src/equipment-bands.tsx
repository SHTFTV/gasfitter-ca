import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './equipment-bands.css';

const equipment = [
 {id:'furnaces',title:'Furnaces',label:'HOME HEATING',image:'gas-services-furnace-v1.webp',copy:'Heating plans, gas supply, venting and the next step for your existing system.',href:'/bc-heat-pump-gas-furnace-planning/',link:'Plan your heating'},
 {id:'boilers',title:'Boilers',label:'HYDRONIC HEAT',image:'gas-services-boiler-v1.webp',copy:'A clearer starting point for boiler maintenance, repair assessment and replacement.',href:'/older-boiler-no-heat-burnaby-repair-assessment/',link:'Explore boiler service'},
 {id:'hot-water-tanks',title:'Hot water tanks',label:'EVERYDAY COMFORT',image:'gas-services-hot-water-v1.webp',copy:'Tank selection, gas connections, venting and access—planned around your home.',href:'mailto:colin@gasfitter.ca?subject=Hot%20water%20tank%20enquiry',link:'Discuss hot water'},
 {id:'heat-pumps',title:'Heat pumps',label:'HEATING & COOLING',image:'bc-heat-pump-gas-furnace-planning.jpg',copy:'Keep the heat pump, retained furnace and gas-work responsibilities in one clear plan.',href:'/bc-heat-pump-gas-furnace-planning/',link:'Read the planning guide'},
 {id:'fireplaces',title:'Fireplaces',label:'WARMTH AT HOME',image:'first-frost-fireplace.jpg',copy:'Maintenance, repair assessment and useful details to have ready before a service visit.',href:'/first-frost-vancouver-fireplace-maintenance-booking/',link:'Plan fireplace service'},
 {id:'outdoor-gas',title:'Outdoor gas',label:'BBQS & PATIO HEAT',image:'gas-services-bbq-v1.webp',copy:'Gas outlet boxes, barbecue connections and heating for more time outdoors.',href:'/extend-patio-season-gas-heater/',link:'Explore outdoor heating'},
 {id:'underground-gas-lines',title:'Underground gas lines',label:'THE CONNECTION BELOW',image:'gas-services-underground-v1.webp',copy:'Route, capacity, site access and excavation coordination before the ground opens.',href:'/gas-lines-vancouver/',link:'Plan your gas line'},
];
export function EquipmentBands(){return <section id="services" className="equipment-bands" aria-labelledby="equipment-bands-title">
 <div className="equipment-bands-heading"><p>GASFITTER.CA / EQUIPMENT & GAS WORK</p><h2 id="equipment-bands-title">Comfort. One system at a time.</h2></div>
 {equipment.map((item,index)=><article className="equipment-band" id={item.id} key={item.id} aria-labelledby={item.id+'-title'}>
  <img className="equipment-band-image" src={'/images/'+item.image} alt="" loading="lazy" width="1280" height="720"/>
  <div className="equipment-band-inner"><span className="equipment-band-number">{String(index+1).padStart(2,'0')}</span><div className="equipment-band-copy"><p className="equipment-band-label">{item.label}</p><h3 id={item.id+'-title'}>{item.title}</h3><p className="equipment-band-description">{item.copy}</p></div><a href={item.href}>{item.link}<ArrowUpRight size={20} aria-hidden="true"/></a></div>
 </article>)}
 <p className="equipment-bands-credit">Equipment imagery includes illustrative concepts. Confirm service scope, contractor availability and equipment suitability directly.</p>
 </section>;}
