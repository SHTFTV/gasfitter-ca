import React from 'react';

export function planningPoints(subject:string):[string,string,string] {
 if(/quot|contractor|hire/i.test(subject))return ['Written scope','Contractor credentials','Exclusions & records'];
 if(/alarm|carbon monoxide/i.test(subject))return ['Alarm instructions','Emergency response','Professional follow-up'];
 if(/handover|record/i.test(subject))return ['Equipment details','Completion documents','Maintenance record'];
 if(/vent/i.test(subject))return ['Equipment instructions','Venting assessment','Clearances & access'];
 if(/fireplace|maintenance|repair/i.test(subject))return ['Equipment & history','Service assessment','Findings & next steps'];
 if(/underground|gas line|capacity/i.test(subject))return ['Equipment demand','Route & site constraints','Qualified assessment'];
 return ['Your project brief','Local requirements','Qualified assessment'];
}

export function PlanningVisual({subject,local=false}:{subject:string,local?:boolean}) {
 const points=planningPoints(subject);
 return <figure className="planning-visual"><svg viewBox="0 0 1100 380" role="img" aria-label={`${subject.replace(/[.!?]$/,'')}: ${points.join(', ')}`}>
  <rect width="1100" height="380" rx="18" fill="#102a43"/>
  <path d="M100 240H1000M160 110H940" stroke="#c9dfdf" strokeOpacity=".14" strokeWidth="2"/>
  <text x="48" y="55" fill="#ffbd7b" fontFamily="Arial,sans-serif" fontSize="17" letterSpacing="3">GAS FITTER CANADA · PLANNING REFERENCE</text>
  {points.map((point,i)=><g key={point} transform={`translate(${50+i*350},100)`}><rect width="300" height="205" rx="13" fill={i===1?'#174b58':'#193b50'} stroke="#ffffff22"/><circle cx="38" cy="42" r="20" fill="#ffbd7b"/><text x="38" y="49" textAnchor="middle" fill="#102a43" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="700">{i+1}</text><path d={i===0?'M35 85h54v65H35z M46 101h31 M46 115h31 M46 129h22':i===1?'M30 137h74M39 137V98l28-22 28 22v39 M57 137v-24h20v24':'M35 112l17 18 37-40 M34 153h57'} fill="none" stroke="#ffbd7b" strokeWidth="4" strokeLinejoin="round"/><text x="24" y="182" fill="#fff" fontFamily="Arial,sans-serif" fontSize="19">{point}</text></g>)}
  <text x="48" y="348" fill="#c9dfdf" fontFamily="Arial,sans-serif" fontSize="15">Plan the conversation. Confirm the work with a qualified professional.</text>
 </svg><ol className="planning-mobile">{points.map((point,i)=><li key={point}><span>{i+1}</span><strong>{point}</strong></li>)}</ol><figcaption>{local?`${subject}: a project brief, local requirements and a qualified assessment belong in the same plan. This is a reference diagram, not a photograph of a local project or proof of contractor availability.`:`${subject.replace(/[.!?]$/,'')}: ${points.join(', ').toLowerCase()} are separate parts of the planning conversation.`} Diagram: Gasfitter.ca editorial.</figcaption></figure>;
}
