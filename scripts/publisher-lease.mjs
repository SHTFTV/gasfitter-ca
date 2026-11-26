import {randomUUID} from 'node:crypto';
export const owner='codex:publish-daily-vancouver-gas-guide';
export function applianceFamily(x){return ({'gas-range':'gas-stove','commercial-range':'gas-stove','outdoor-kitchen':'natural-gas-bbq'})[x]||x;}
export function proposeClaim(state,queue,{jobId,date,expectedHead,now=Date.now()}){
 if(state.site!=='gasfitter.ca'||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^[a-f0-9]{40}$/.test(expectedHead))throw Error('INVALID_LEASE_SCOPE');
 if(state.completedDates.includes(date)||queue.published.some(x=>x.date===date))return {outcome:'already-published',state,mutation:false};
 if(state.lease){if(Date.parse(state.lease.expiresAt)>now)throw Error('ACTIVE_SOLE_WRITER_LEASE');throw Error('EXPIRED_LEASE_REQUIRES_CANONICAL_RECONCILIATION');}
 const prior=queue.queue.filter(x=>x.status==='published').map((item,index)=>({item,index})).sort((a,b)=>(a.item.date||'').localeCompare(b.item.date||'')||a.index-b.index).at(-1)?.item;const failures=state.failures||[];
 const item=queue.queue.find(x=>x.status!=='published'&&x.neighbourhood!==prior?.neighbourhood&&applianceFamily(x.appliance)!==applianceFamily(prior?.appliance)&&!failures.some(f=>f.order===x.order&&(f.attempts>=3||Date.parse(f.nextAttemptAt)>now)));
 if(!item)return {outcome:'no-eligible-topic',state,mutation:false};
 const lease={owner,jobId,nonce:randomUUID(),order:item.order,date,expectedHead,claimedAt:new Date(now).toISOString(),expiresAt:new Date(now+30*60000).toISOString()};return {outcome:'claimed',item,mutation:true,state:{...state,lease}};
}
export function proposeFinish(state,{nonce,jobId,result,proofRef,now=Date.now()}){
 const l=state.lease;if(!l||l.owner!==owner||l.nonce!==nonce||l.jobId!==jobId||Date.parse(l.expiresAt)<=now)throw Error('STALE_OR_FOREIGN_WRITER');if(!['published','failed'].includes(result)||!proofRef)throw Error('VERIFIED_RESULT_REFERENCE_REQUIRED');
 const next=structuredClone(state);next.lease=null;next.history.push({jobId,order:l.order,date:l.date,result,proofRef,finishedAt:new Date(now).toISOString()});if(result==='published')next.completedDates=[...new Set([...next.completedDates,l.date])];else{let f=next.failures.find(x=>x.order===l.order);if(!f){f={order:l.order,attempts:0};next.failures.push(f);}f.attempts++;f.nextAttemptAt=new Date(now+Math.min(60,2**f.attempts)*60000).toISOString();f.reasonRef=proofRef;}return next;
}

// Explicit reconciliation, never an expiry-based takeover. Caller commits with
// expectedHead CAS and retains the old lease and checked source/live evidence.
export function proposeReconcileExpired(state,{owner:caller,jobId,nonce,expectedHead,evidence,now=Date.now()}){
 const l=state.lease;
 if(state.site!=='gasfitter.ca'||!l||caller!==owner||l.owner!==caller||l.jobId!==jobId||l.nonce!==nonce)throw Error('STALE_OR_FOREIGN_WRITER');
 if(!Number.isFinite(Date.parse(l.expiresAt))||Date.parse(l.expiresAt)>now)throw Error('LEASE_NOT_EXPIRED');
 if(!/^[a-f0-9]{40}$/.test(expectedHead)||evidence?.sourceHead!==expectedHead||!evidence.writerStopped||!evidence.proofRef||!evidence.slug||!['absent','published'].includes(evidence.publication))throw Error('RECONCILIATION_EVIDENCE_REQUIRED');
 const checked=Date.parse(evidence.checkedAt);
 if(!Number.isFinite(checked)||checked>now||now-checked>5*60000||!evidence.sourceChecked||!evidence.liveChecked)throw Error('FRESH_SOURCE_AND_LIVE_CHECK_REQUIRED');
 if(evidence.publication==='published'&&(!evidence.date||!evidence.canonicalVerified))throw Error('VERIFIED_PUBLICATION_REQUIRED');
 const next=structuredClone(state);next.lease=null;
 next.history.push({...l,result:'reconciled-'+evidence.publication,finishedAt:new Date(now).toISOString(),proofRef:evidence.proofRef,evidence});
 if(evidence.publication==='published')next.completedDates=[...new Set([...next.completedDates,evidence.date])];
 return next;
}
