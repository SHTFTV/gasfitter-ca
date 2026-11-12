import {randomUUID} from 'node:crypto';
export const owner='codex:publish-daily-vancouver-gas-guide';
export function applianceFamily(x){return ({'gas-range':'gas-stove','commercial-range':'gas-stove','outdoor-kitchen':'natural-gas-bbq'})[x]||x;}
export function proposeClaim(state,queue,{jobId,date,expectedHead,now=Date.now()}){
 if(state.site!=='gasfitter.ca'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^[a-f0-9]{40}$/.test(expectedHead))throw Error('INVALID_LEASE_SCOPE');
 if(state.completedDates.includes(date)||queue.published.some(x=>x.date===date))return {outcome:'already-published',state,mutation:false};
 if(state.lease){if(Date.parse(state.lease.expiresAt)>now)throw Error('ACTIVE_SOLE_WRITER_LEASE');throw Error('EXPIRED_LEASE_REQUIRES_CANONICAL_RECONCILIATION');}
 const prior=queue.queue.filter(x=>x.status==='published').at(-1);const failures=state.failures||[];
 const item=queue.queue.find(x=>x.status!=='published'&&x.neighbourhood!==prior?.neighbourhood&&applianceFamily(x.appliance)!==applianceFamily(prior?.appliance)&&!failures.some(f=>f.order===x.order&&(f.attempts>=3||Date.parse(f.nextAttemptAt)>now)));
 if(!item)return {outcome:'no-eligible-topic',state,mutation:false};
 const lease={owner,jobId,nonce:randomUUID(),order:item.order,date,expectedHead,claimedAt:new Date(now).toISOString(),expiresAt:new Date(now+30*60000).toISOString()};return {outcome:'claimed',item,mutation:true,state:{...state,lease}};
}
export function proposeFinish(state,{nonce,jobId,result,proofRef,now=Date.now()}){
 const l=state.lease;if(!l||l.owner!==owner||l.nonce!==nonce||l.jobId!==jobId||Date.parse(l.expiresAt)<=now)throw Error('STALE_OR_FOREIGN_WRITER');if(!['published','failed'].includes(result)||!proofRef)throw Error('VERIFIED_RESULT_REFERENCE_REQUIRED');
 const next=structuredClone(state);next.lease=null;next.history.push({jobId,order:l.order,date:l.date,result,proofRef,finishedAt:new Date(now).toISOString()});if(result==='published')next.completedDates=[...new Set([...next.completedDates,l.date])];else{let f=next.failures.find(x=>x.order===l.order);if(!f){f={order:l.order,attempts:0};next.failures.push(f);}f.attempts++;f.nextAttemptAt=new Date(now+Math.min(60,2**f.attempts)*60000).toISOString();f.reasonRef=proofRef;}return next;
}
