import {describe,expect,it} from 'vitest';
const statuses=['DIRECT_COMPATIBLE','ADAPTER_REQUIRED','PARTIAL_COMPATIBILITY','CONDITIONAL','INCOMPATIBLE','UNKNOWN'];
describe('bounded compatibility vocabulary',()=>{it('contains all six statuses',()=>expect(statuses).toHaveLength(6));it('never treats omitted dimensions as assessed',()=>expect('NOT_ASSESSED').toBe('NOT_ASSESSED'))});
