import React from 'react';
import { createRoot } from 'react-dom/client';
import { Flame, MapPin, ShieldCheck, Wrench, Phone, Mail, ArrowRight } from 'lucide-react';
import './styles.css';

const services = [
  ['Gas line installation', 'Planning, sizing and routing information for renovations, additions and new appliances.'],
  ['Fireplace service', 'Maintenance, troubleshooting and replacement planning for gas fireplaces.'],
  ['Appliance connections', 'Safe connection planning for ranges, dryers, barbecues and patio equipment/'],
  ['Shut-off & decommissioning', 'Guidance for capping, removing or relocating gas appliances and piping.'],
];

export const posts = [
  ['moving-or-replacing-a-gas-appliance-during-a-renovation-planning-checklist','Moving or Replacing a Gas Appliance During a Renovation'],
  ['carbon-monoxide-alarms-and-gas-appliances-a-practical-homeowner-checklist','Carbon Monoxide Alarms and Gas Appliances'],
  ['gas-appliance-venting-what-homeowners-should-understand-before-renovating','Gas Appliance Venting Before Renovating'],
  ['adding-a-gas-appliance-how-to-plan-gas-line-capacity-safely','Planning Gas-Line Capacity Safely'],
  ['gas-fireplace-maintenance-strata-bc','Gas Fireplaces in BC Strata Buildings'],
  ['gas-fireplace-maintenance-faq','Gas Fireplace Maintenance'],
  ['underground-gas-lines-guide-metro-vancouver','Underground Gas Lines: A Homeownerâs Guide'],
  ['gas-line-installation-guide-lower-mainland','Gas Line Installation in the Lower Mainland'],
  ['gas-line-shut-off-capping-decommissioning-services-in-vancouver-bc','Gas-Line Shut-Off, Capping and Decommissioning'],
  ['gas-fireplace-repair-vancouver','Gas Fireplace Repair Vancouver'],
  ['fireplace-service-vancouver','Fireplace Service Vancouver'],
  ['underground-gas-lines-vancouver','Underground Gas Lines Vancouver'],
  ['east-van','Gas Fitting in East Vancouver'],
];

export const cities:[string,string][] = [
  ['scarborough','Scarborough'],['100-mile-house','100 Mile House'],['abbotsford','Abbotsford'],['ajax','Ajax'],['aldergrove','Aldergrove'],['aurora','Aurora'],['barrie','Barrie'],['belleville','Belleville'],['brampton','Brampton'],['britishcolumbia','British Columbia'],['burnaby','Burnaby'],['calgary','Calgary'],['cambridge','Cambridge'],['campbell-river','Campbell River'],['charlottetown','Charlottetown'],['chilliwack','Chilliwack'],['coquitlam','Coquitlam'],['cornwall','Cornwall'],['courtenay','Courtenay'],['duncan','Duncan'],['edmonton','Edmonton'],['esquimalt','Esquimalt'],['etobicoke','Etobicoke'],['fredericton','Fredericton'],['gibsons','Gibsons'],['guelph','Guelph'],['halifax','Halifax'],['hamilton','Hamilton'],['kamloops','Kamloops'],['kelowna','Kelowna'],['kingston','Kingston'],['kitchener','Kitchener'],['langford','Langford'],['langley','Langley'],['lethbridge','Lethbridge'],['london','London'],['maple-ridge','Maple Ridge'],['maritimes','The Maritimes'],['markham','Markham'],['mission','Mission'],['mississauga','Mississauga'],['moncton','Moncton'],['muskoka','Muskoka'],['nanaimo','Nanaimo'],['new-westminster','New Westminster'],['niagara-falls','Niagara Falls'],['north-bay','North Bay'],['north-delta','North Delta'],['north-vancouver','North Vancouver'],['north-york','North York'],['ontario','Ontario'],['oshawa-ontario','Oshawa'],['ottawa','Ottawa'],['parksville','Parksville'],['peterborough','Peterborough'],['pickering','Pickering'],['pitt-meadows','Pitt Meadows'],['port-alberni','Port Alberni'],['port-moody','Port Moody'],['prince-george','Prince George'],['quesnel','Quesnel'],['red-deer','Red Deer'],['renfrew-county','Renfrew County'],['richmond','Richmond'],['richmond-hill','Richmond Hill'],['saanich','Saanich'],['saint-john','Saint John'],['sarnia','Sarnia'],['sault-ste-marie','Sault Ste. Marie'],['squamish','Squamish'],['st-catharines','St. Catharines'],['sudbury','Sudbury'],['surrey','Surrey'],['timmins','Timmins'],['toronto','Toronto'],['tsawwassen','Tsawwassen'],['vancouver','Vancouver'],['vaughn','Vaughn'],['vernon','Vernon'],['victoria','Victoria'],['waterloo','Waterloo'],['west-vancouver','West Vancouver'],['whitby','Whitby'],['williams-lake','Williams Lake'],['windsor','Windsor'],['winnipeg','Winnipeg']
];

function Layout({children}:{children:React.ReactNode}) {
  return <><header><a className="brand" href="/"><span><Flame size={22}/></span> GAS FITTER <b>CANADA</b></a><nav><a href="/#services">Services</a><a href="/#locations">Locations</a><a href="/#guides">Guides</a><a href="/#contact">Contact</a></nav></header>{children}<footer><div><strong>Gas Fitter Canada</strong><p>Independent gas-service information and local coverage across Canada.</p></div><div><a href="mailto:colin@gasfitter.ca"><Mail size={16}/> colin@gasfitter.ca</a></div></footer></>;
}

function Home(){return <Layout><main><section className="hero"><div><p className="eyebrow">CANADA-WIDE GAS SERVICE RESOURCE</p><h1>Clear gas-fitting information. Local service coverage.</h1><p className="lede">Plan gas lines, fireplaces, appliances and renovations with practical guidanceâthen connect with the right licensed professional for the work.</p><div className="actions"><a className="primary" href="#contact">Request help <ArrowRight size={18}/></a><a className="secondary" href="#guides">Read the guides</a></div></div><div className="hero-photo"><img src="/images/gas-fireplace-technician.png" alt="Gas technician inspecting a modern residential gas fireplace"/><div className="hero-card"><ShieldCheck size={32}/><div><h2>Safety starts with a licensed professional</h2><p>Plan the right questions before work begins.</p></div></div></div></section><section id="services"><p className="eyebrow">CORE SERVICES</p><h2>Gas work, explained without the guesswork</h2><div className="grid">{services.map(([t,d])=><article key={t}><Wrench/><h3>{t}</h3><p>{d}</p></article>)}</div></section><section id="locations" className="locations"><p className="eyebrow">LOCAL COVERAGE</p><h2>Find gas-fitting information near you</h2><div className="chips">{cities.map(([s,c])=><a href={`/${s}/`} key={s}><MapPin size={14}/>{c}</a>)}</div></section><section id="guides"><p className="eyebrow">LATEST PRACTICAL GUIDES</p><h2>Prepare before you hire</h2><div className="guide-grid">{posts.slice(0,4).map(([s,t])=><a href={`/${s}/`} key={s}><span>GUIDE</span><h3>{t}</h3><p>What property owners should know before booking or renovating.</p><b>Read guide â</b></a>)}</div></section><Contact/></main></Layout>}

function Contact(){return <section id="contact" className="contact"><div><p className="eyebrow">NEED DIRECTION?</p><h2>Tell us what you are planning.</h2><p>Share the city, appliance or gas service involved and the stage of your project.</p></div><a className="primary" href="mailto:colin@gasfitter.ca"><Mail size={18}/> Email Gas Fitter Canada</a></section>}

function City({name}:{name:string}){return <Layout><main><section className="page-hero"><p className="eyebrow"><MapPin size={15}/> LOCAL SERVICE GUIDE</p><h1>Gas Fitter {name}</h1><p className="lede">Planning gas work in {name}? Start with the appliance, expected load, route, ventilation and permit requirementsâthen confirm the work with a qualified local gas fitter.</p></section><section><h2>Common gas projects in {name}</h2><div className="grid">{services.map(([t,d])=><article key={t}><h3>{t}</h3><p>{d}</p></article>)}</div></section><section className="split"><div><h2>Before work begins</h2><ul><li>Confirm licensing and insurance.</li><li>Ask whether a permit and inspection are required.</li><li>Verify gas-line capacity before adding appliances.</li><li>Keep manufacturer clearances and venting requirements in the plan.</li></ul></div><div className="note"><ShieldCheck/><h3>Local rules matter</h3><p>Requirements vary by province, municipality and utility. This page is planning information, not a substitute for an on-site assessment.</p></div></section><Contact/></main></Layout>}

function Guide({title}:{title:string}){return <Layout><main><article className="guide"><p className="eyebrow">HOMEOWNER PLANNING GUIDE</p><h1>{title}</h1><p className="lede">A practical overview for discussing the work with a licensed gas professional.</p><h2>Start with the existing system</h2><p>Identify the appliance, input rating, gas type, existing pipe route, venting and the other connected loads. A qualified professional can then determine whether the system has enough capacity.</p><h2>Plan permits and access early</h2><p>Gas work may require permits, testing and inspection. Renovations can also affect walls, cabinets, finishes and access, so coordinate the gas scope before closing assemblies.</p><h2>Questions worth asking</h2><ul><li>Is the existing line correctly sized for the new load?</li><li>Does the appliance need new venting or combustion air?</li><li>Who obtains the permit and arranges inspection?</li><li>What must remain accessible for service?</li></ul><div className="note"><ShieldCheck/><h3>Do not improvise gas work</h3><p>Use a properly licensed gas contractor and follow the appliance manufacturerâs instructions and local requirements.</p></div></article><Contact/></main></Layout>}

export function App({pathName}:{pathName?:string}={}){const path=(pathName??location.pathname).replace(/^\/+|\/+$/g,''); const city=cities.find(([s])=>s===path); const post=posts.find(([s])=>s===path); if(city)return <City name={city[1]}/>; if(post)return <Guide title={post[1]}/>; return <Home/>}

if (typeof document !== 'undefined') {
  createRoot(document.getElementById('root')!).render(<App/>);
}
