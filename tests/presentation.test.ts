import {describe,expect,it} from 'vitest';
import {displayValue,resultLabel,evidenceLabel,dimensionLabel} from '../lib/presentation';
describe('presentation normalization',()=>{
 it('removes SDK-safe string prefixes without mutating values',()=>{expect(displayValue('str:9530')).toBe('9530');expect(displayValue('9530')).toBe('9530');});
 it('humanizes result and evidence states',()=>{expect(resultLabel('UNKNOWN')).toBe('Not enough evidence');expect(resultLabel('INCOMPATIBLE')).toBe('Not compatible');expect(evidenceLabel('INSUFFICIENT')).toBe('Not enough evidence');expect(dimensionLabel('NOT_ASSESSED')).toBe('Not checked');});
});
