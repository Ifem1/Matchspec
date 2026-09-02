import {describe,expect,it} from 'vitest';
import {isAcceptedReceipt} from '../lib/contract';
const statuses=['DIRECT_COMPATIBLE','ADAPTER_REQUIRED','PARTIAL_COMPATIBILITY','CONDITIONAL','INCOMPATIBLE','UNKNOWN'];
describe('bounded compatibility vocabulary',()=>{it('contains all six statuses',()=>expect(statuses).toHaveLength(6));it('never treats omitted dimensions as assessed',()=>expect('NOT_ASSESSED').toBe('NOT_ASSESSED'))});
describe('consensus receipt gate',()=>{it('accepts finalized majority agreement',()=>expect(isAcceptedReceipt({status_name:'ACCEPTED',result_name:'MAJORITY_AGREE'})).toBe(true));it('rejects undetermined finality',()=>expect(isAcceptedReceipt({status_name:'UNDETERMINED',result_name:'MAJORITY_DISAGREE'})).toBe(false));it('rejects missing receipt',()=>expect(isAcceptedReceipt(null)).toBe(false));it('accepts protocol numeric success',()=>expect(isAcceptedReceipt({status:5,result:6})).toBe(true));});
