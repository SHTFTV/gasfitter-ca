import assert from 'node:assert/strict';import{proposeClaim,proposeFinish}from'./publisher-lease.mjs';
const head='a'.repeat(40),at=Date.parse('2026-11-13T17:00:00Z');const state={site:'gasfitter.ca',lease:null,completedDates:[],history:[],failures:[]};const q={published:[],queue:[{order:1,status:'published',neighbourhood:'Grandview-Woodland',appliance:'natural-gas-bbq'},{order:2,neighbourhood:'Grandview-Woodland',appliance:'gas-dryer'},{order:3,neighbourhood:'Dunbar',appliance:'outdoor-kitchen'},{order:4,neighbourhood:'Fairview',appliance:'gas-range'},{order:5,neighbourhood:'Marpole',appliance:'gas-dryer'}]};let a=proposeClaim(state,q,{jobId:'qa',date:'2026-11-13',expectedHead:head,now:at});assert.equal(a.item.order,4);assert.throws(()=>proposeClaim(a.state,q,{jobId:'other',date:'2026-11-13',expectedHead:head,now:at}),/ACTIVE/);assert.throws(()=>proposeFinish(a.state,{jobId:'qa',nonce:'foreign',result:'published',proofRef:'test',now:at}),/FOREIGN/);const failed=proposeFinish(a.state,{jobId:'qa',nonce:a.state.lease.nonce,result:'failed',proofRef:'synthetic-source-failure',now:at});const b=proposeClaim(failed,q,{jobId:'next',date:'2026-11-13',expectedHead:head,now:at});assert.equal(b.item.order,5);const done=proposeFinish(b.state,{jobId:'next',nonce:b.state.lease.nonce,result:'published',proofRef:'synthetic-test-only',now:at});assert.equal(proposeClaim(done,q,{jobId:'dup',date:'2026-11-13',expectedHead:head,now:at}).mutation,false);assert.throws(()=>proposeClaim(a.state,q,{jobId:'expired',date:'2026-11-13',expectedHead:head,now:at+31*60000}),/RECONCILIATION/);console.log('Lease regressions passed: fencing, family rotation, item isolation/backoff, daily dedup and expired-lease reconciliation. Synthetic local test; not native publication proof.');

const {proposeReconcileExpired}=await import('./publisher-lease.mjs');
const now=at+31*60000;
const opts={owner:a.state.lease.owner,jobId:'qa',nonce:a.state.lease.nonce,expectedHead:head,now,evidence:{sourceHead:head,writerStopped:true,proofRef:'test-only',slug:'example',publication:'absent',checkedAt:new Date(now).toISOString(),sourceChecked:true,liveChecked:true}};
assert.throws(()=>proposeReconcileExpired(a.state,{...opts,nonce:'other'}),/FOREIGN/);
assert.throws(()=>proposeReconcileExpired(a.state,{...opts,now:at}),/NOT_EXPIRED/);
assert.throws(()=>proposeReconcileExpired(a.state,{...opts,evidence:{...opts.evidence,liveChecked:false}}),/FRESH/);
assert.throws(()=>proposeReconcileExpired(a.state,{...opts,evidence:{...opts.evidence,sourceHead:'b'.repeat(40)}}),/EVIDENCE/);
assert.throws(()=>proposeReconcileExpired(a.state,{...opts,now:now+6*60000}),/FRESH/);
const recovered=proposeReconcileExpired(a.state,opts);
assert.equal(recovered.lease,null);assert.equal(recovered.completedDates.length,0);assert.equal(recovered.history[0].nonce,a.state.lease.nonce);
assert.equal(proposeClaim(recovered,q,{jobId:'new',date:'2026-11-14',expectedHead:head,now}).mutation,true);
assert.throws(()=>proposeFinish(recovered,{jobId:'qa',nonce:a.state.lease.nonce,result:'published',proofRef:'test',now}),/FOREIGN/);
console.log('Expired recovery: identity, expiry, fresh live/source proof, CAS head, retained history, and old-writer fencing passed.');

const unordered={published:[],queue:[{order:1,status:'published',date:'2026-11-25',neighbourhood:'Oakridge',appliance:'gas-dryer'},{order:2,status:'pending',neighbourhood:'Grandview',appliance:'gas-dryer'},{order:3,status:'pending',neighbourhood:'Dunbar',appliance:'outdoor-kitchen'},{order:31,status:'published',date:'2026-11-12',neighbourhood:'Grandview',appliance:'natural-gas-bbq'}]};
assert.equal(proposeClaim(state,unordered,{jobId:'chronological',date:'2026-11-26',expectedHead:head,now:at}).item.order,3);
console.log('Chronological latest publication regression passed despite older extra post at queue end.');
