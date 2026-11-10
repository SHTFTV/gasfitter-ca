export function analyse(nodes){
 const byId=new Map(nodes.map(n=>[n.id,n]));const errors=[];const paths=[];
 const valid=v=>v!==''&&v!==null&&Number.isFinite(Number(v))&&Number(v)>0;
 for(const n of nodes.filter(n=>!['meter','junction','regulator'].includes(n.type))){let cur=n,total=0,complete=true,seen=new Set(),ids=[];
  while(cur&&cur.type!=='meter'){
   if(seen.has(cur.id)){errors.push('A loop was found in the sketch.');complete=false;break;}seen.add(cur.id);ids.push(cur.id);
   if(!valid(cur.length))complete=false;else total+=Number(cur.length);
   if(cur.rise!==''&&cur.rise!=null){if(!Number.isFinite(Number(cur.rise))||Number(cur.rise)<0)complete=false;else total+=Number(cur.rise);}
   cur=byId.get(cur.parent);
  }
  if(!cur){complete=false;errors.push('An appliance is not connected to the meter.');}
  paths.push({id:n.id,label:n.label,ids,length:total,complete});
 }
 const appliances=nodes.filter(n=>!['meter','junction','regulator'].includes(n.type));
 const unknownLoads=appliances.filter(n=>!valid(n.btu)).length;
 const knownLoad=appliances.reduce((sum,n)=>sum+(valid(n.btu)?Number(n.btu):0),0);
 const incomplete=paths.filter(p=>!p.complete).length;
 const longest=paths.length&&!incomplete&&!errors.length?paths.reduce((a,b)=>a.length>=b.length?a:b):null;
 const downstream=Object.fromEntries(nodes.filter(n=>n.type!=='meter').map(n=>{const served=paths.filter(p=>p.ids.includes(n.id)).map(p=>byId.get(p.id));return[n.id,{load:served.reduce((s,a)=>s+(valid(a.btu)?Number(a.btu):0),0),unknown:served.filter(a=>!valid(a.btu)).length}]}));
 return {paths,longest,knownLoad,unknownLoads,incomplete,errors:[...new Set(errors)],downstream,regulators:nodes.some(n=>n.type==='regulator')};
}
export function report(nodes,city,notes){const a=analyse(nodes);return ['GASFITTER.CA — GAS PROJECT PLANNING SKETCH','Not an installation design or pipe-size recommendation.','City / area: '+city,'Notes: '+notes,'','Known appliance input: '+a.knownLoad.toLocaleString()+' BTU/h; unknown inputs: '+a.unknownLoads,'Longest entered meter-to-appliance route: '+(a.longest?a.longest.length.toFixed(1)+' ft to '+a.longest.label:'Incomplete — enter all connected route measurements'),a.regulators?'Regulator shown: pressure zones and sizing origins need professional review.':'Supply pressure and regulator arrangement need professional confirmation.','Lengths are user-entered; drawing positions do not determine distance. Fitting allowances are not calculated.','','APPLIANCES & ROUTE SECTIONS',...nodes.filter(n=>n.type!=='meter').map(n=>`${n.label} (${n.type}) | from ${nodes.find(p=>p.id===n.parent)?.label||'UNCONNECTED'} | horizontal/other route ${n.length||'unknown'} ft + vertical ${n.rise||0} ft | material ${n.material||'unknown'} | existing diameter ${n.diameter||'unknown'} | appliance input ${n.btu||'not provided'} BTU/h | known downstream input ${a.downstream[n.id].load} BTU/h (${a.downstream[n.id].unknown} unknown)`),'','ROUTES',...a.paths.map(p=>p.label+': '+(p.complete?p.length.toFixed(1)+' ft':'incomplete')),'','Confirm appliance inputs, pressure, gas type, pipe product, actual route, fitting treatment, applicable sizing method and permitted scope with a qualified local gas contractor.','Gasfitter.ca — independent national planning resource','Contact: colin@gasfitter.ca'].join('\n');}
