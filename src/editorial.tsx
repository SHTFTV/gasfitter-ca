import React from 'react';
import { bcHeatPumpPosts } from './bc-heat-pump';
import { noHeatPosts } from './no-heat';
import { firstFrostPosts } from './first-frost';
import { planningGuides } from './planning-guides';

export const editorialPosts = [
  {
    slug: 'extend-patio-season-gas-heater',
    title: 'Getting Cold Out? Extend Your Patio Season with the Right Heater',
    description: 'Keep enjoying your outdoor space: compare patio-heater options, plan a gas connection and check clearances, ventilation and strata approvals before buying.',
    date: '2026-10-19',
    image: '/images/patio-heating-guide.svg',
    body: <>
      <figure><img src="/images/patio-heating-guide.svg" alt="Gasfitter.ca illustrated patio-heating planning guide" width="1200" height="630" style={{width:'100%',height:'auto',borderRadius:16}}/><figcaption>Patio heating: plan the space, supply and clearances. Concept illustration, not an installation drawing.</figcaption></figure>
      <p>Getting cold out does not have to mean putting the patio furniture away. A suitable outdoor heater can make a cool evening more comfortable, whether you are sharing dinner, having a coffee or staying outside a little longer. Start with where people sit and how the space is used, then choose equipment suited to that setting.</p>
      <h2>Heat the seating area you actually use</h2>
      <p>Bring the contractor photos, approximate patio dimensions and the location of your table or seating. Include the roof, awnings, walls, screens and nearby doors. Ask how the proposed heater will serve the seating area in typical conditions. A large advertised heat output alone does not establish whether a heater will suit your patio.</p>
      <h2>Portable propane, fixed gas or electric?</h2>
      <p>A portable propane heater offers flexibility where its instructions and the site allow it, but cylinder storage and handling need a plan. A fixed natural-gas heater needs a suitable gas supply and professional installation. An electric radiant heater may also be worth considering; ask a qualified electrical contractor about the circuit and outdoor installation requirements. Compare the complete installation and operating arrangements rather than just the purchase price.</p>
      <h2>An existing barbecue outlet is a starting point, not an answer</h2>
      <p>Do not assume a nearby gas outlet has the capacity or correct connection for another appliance. Give a licensed gas contractor the proposed heater model and the other appliances using the supply. Have them assess capacity, routing, controls and any required changes. Avoid improvised adapters or attempting a fuel conversion yourself.</p>
      <h2>A covered patio needs particular attention</h2>
      <p>Outdoor gas heaters belong outdoors. Adding glazing, screens or temporary walls can change whether a space is suitable. Do not use an outdoor patio heater in a garage or enclosed room. Follow the specific appliance instructions for ventilation, mounting and clearance from furniture, roofing and other combustible materials; there is no single clearance suitable for every heater.</p>
      <p>Technical Safety BC explains the fire and carbon monoxide risks of incorrect patio-heater use in its <a href="https://blog.technicalsafetybc.ca/warming-patio-heaters-what-british-columbians-need-know-stay-safe?hs_amp=true">patio-heater safety guide</a>. Its <a href="https://www.technicalsafetybc.ca/regulatory-resources/regulatory-notices/information-bulletin-gas-fired-heaters-used-indoors">gas-fired heater bulletin</a> addresses covered and partially enclosed spaces. Have the actual setting assessed before choosing equipment.</p>
      <h2>For strata patios and commercial spaces, ask first</h2>
      <p>Check applicable strata bylaws and obtain any necessary written approval before ordering equipment or changing shared building elements. For a restaurant or other business, confirm local patio and fire requirements as well as the installation scope. Ask the contractor which authority handles the address and who arranges required permits. Technical Safety BC’s <a href="https://www.technicalsafetybc.ca/technologies/gas/installation-permits">gas permit guidance</a> is a useful starting point in BC.</p>
      <h2>Get a quote that covers the whole project</h2>
      <ul><li>The selected heater model, fuel and intended position.</li><li>Supply assessment, piping or electrical work and installation.</li><li>Mounting, access and any building repairs outside the heater installation.</li><li>Permit responsibilities, commissioning and operating instructions.</li><li>Maintenance, warranty terms and any exclusions.</li></ul>
      <p>Send your city, patio photos and the heater model you are considering to <a href="mailto:colin@gasfitter.ca?subject=Patio%20heater%20project">Colin at Gasfitter.ca</a> to start the conversation. Confirm the contractor, scope, price and availability directly before booking.</p>
      <p>Next: <a href="/compare-gas-fitting-quotes-bc/">compare gas-fitting quotes</a> and <a href="/gas-work-handover-records-bc/">know which records to keep after installation</a>.</p>
    </>
  },

  ...bcHeatPumpPosts,
  ...noHeatPosts,
  ...firstFrostPosts,
  {
    slug: 'compare-gas-fitting-quotes-bc',
    title: 'How to Compare Gas-Fitting Quotes in BC',
    description: 'A homeowner checklist for comparing contractor credentials, scope, permit responsibilities and exclusions before booking gas work in British Columbia.',
    body: <>
      <p>Two gas-fitting quotes can describe the same appliance and still cover very different jobs. Before choosing a price, give each contractor the same short project brief: your municipality, property type, appliance model if selected, what is changing, and when other renovation work is scheduled. Ask for an assessment where the existing installation needs to be checked.</p>
      <h2>Verify who is accepting the work</h2>
      <p>Ask for the contracting business name and gas contractor licence number. Technical Safety BC’s <a href="https://www.technicalsafetybc.ca/regulatory-resources/licensed-contractor-guide">registry guide</a> explains how to search by name or licence, review the authorized scope, and check an individual’s certification separately. A website badge or a verbal assurance is not the same as checking the current record. If names differ between the quote and registry, have the contractor explain the relationship before agreeing to proceed.</p>
      <h2>Compare the scope line by line</h2>
      <p>Use the following questions as a comparison worksheet. These are planning prompts, not a claim that every project needs every item:</p>
      <ul><li>Is the appliance supplied, installed, or both? Is the exact model identified?</li><li>Does the quote include assessment of existing gas supply and venting, and how are necessary changes priced?</li><li>Who handles electrical work, access openings, patching, disposal and cleanup?</li><li>What assumptions could trigger an additional charge, and must changes be approved in writing?</li><li>What labour and product warranty terms are included, and who handles a service call?</li></ul>
      <h2>Put permit responsibility in writing</h2>
      <p>Ask which authority handles the address, who obtains any required permit, and which completion records you will receive. Technical Safety BC’s <a href="https://www.technicalsafetybc.ca/technologies/gas/installation-permits">gas installation permit page</a> identifies municipalities that administer their own permits. Do not assume a permit process described for one BC city applies everywhere in Canada.</p>
      <h2>Choose a complete, understandable proposal</h2>
      <p>A useful quote separates confirmed work from allowances and unresolved questions. Request clarification when a lower total leaves out work another contractor included. Keep the accepted scope and written changes together so the final invoice can be compared with what you agreed to. Gas-line sizing, testing, connections and appliance commissioning belong with qualified professionals; this worksheet is for choosing and briefing them.</p>
      <p>Next: <a href="/gas-work-handover-records-bc/">the records to request at handover</a>.</p>
    </>
  },
  {
    slug: 'gas-work-handover-records-bc',
    title: 'Gas Work Finished? The Handover Records to Request in BC',
    description: 'Keep a practical record of your gas installation: scope, appliance details, permit information, completion documents and maintenance guidance.',
    body: <>
      <p>When an installation is finished, a tidy job folder helps you understand what was changed and gives the next service contractor a useful starting point. Arrange the handover while booking the work, rather than trying to reconstruct it months later. This checklist is for household recordkeeping, not a homeowner inspection or a certificate of safety.</p>
      <h2>Record the equipment and agreed work</h2>
      <p>Keep the accepted quote, approved changes and final invoice together. Ask the contractor to identify the installed appliance model and serial number, the work completed, and any items outside the agreed scope. Save the manufacturer’s operating and maintenance instructions in a place everyone responsible for the home can find. A concise equipment list is more useful than a folder of unexplained photographs.</p>
      <h2>Ask which completion document applies</h2>
      <p>For work administered by Technical Safety BC, its <a href="https://www.technicalsafetybc.ca/technologies/gas/gas-assessments">gas assessment guidance</a> describes a risk-based process. An accepted declaration may conclude the assessment without a physical or remote inspection and without a Certificate of Inspection; physical and remote inspections produce a certificate. Ask the permit holder which outcome applies and for the corresponding available documentation. An absent site visit does not, by itself, tell you whether the process is complete.</p>
      <p>Some municipalities administer their own gas permits. Confirm the applicable authority using the <a href="https://www.technicalsafetybc.ca/technologies/gas/installation-permits">permit guidance</a>, then ask that authority or your contractor about its records and outstanding requirements. Avoid describing work as “inspected” unless the documentation supports that description.</p>
      <h2>Leave with a clear service plan</h2>
      <ul><li>Who should you contact for an equipment fault or a warranty question?</li><li>What maintenance does the manufacturer specify, and which work requires a professional?</li><li>Are any deficiencies, return visits or documents still outstanding?</li><li>Where are the operating instructions, warranty information and service history stored?</li></ul>
      <p>Ask the contractor to demonstrate normal user controls and explain the manufacturer’s safety instructions. Do not remove covers, alter settings intended for technicians, or perform gas tests to “double-check” the job yourself.</p>
      <h2>Make the folder usable later</h2>
      <p>Name documents by appliance and date. Add each future service invoice and any changes to the installation. For a strata property, coordinate relevant records with the responsible manager rather than assuming everything belongs to the individual owner. If something remains unresolved, record the question and the agreed next action; paperwork should clarify the status, not hide unfinished work.</p>
      <p>Planning the project first? Read <a href="/compare-gas-fitting-quotes-bc/">how to compare gas-fitting quotes</a>.</p>
    </>
  },
  ...planningGuides.map(guide => ({
    slug: guide.slug, title: guide.title, description: guide.description,
    body: <>{guide.sections.map(section => <React.Fragment key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></React.Fragment>)}<h2>Further reading</h2><ul>{guide.sources.map(source => <li key={source.url}><a href={source.url}>{source.label}</a></li>)}</ul><p><a href="/compare-gas-fitting-quotes-bc/">Compare contractor quotes</a> · <a href="/gas-work-handover-records-bc/">Keep your handover records</a></p></>
  }))
];
