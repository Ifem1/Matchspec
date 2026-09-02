import {describe, expect, it} from 'vitest';
import {isAcceptedReceipt} from '../lib/contract';
const finalized = {statusName: 'FINALIZED', resultName: 'MAJORITY_AGREE', txExecutionResultName: 'FINISHED_WITH_RETURN'};
describe('bounded compatibility vocabulary', () => { it('contains all six statuses', () => expect(['DIRECT_COMPATIBLE','ADAPTER_REQUIRED','PARTIAL_COMPATIBILITY','CONDITIONAL','INCOMPATIBLE','UNKNOWN']).toHaveLength(6)); });
describe('genlayer-js 1.1.8 receipt gate', () => {
  it('accepts finalized majority agreement with a returned execution', () => expect(isAcceptedReceipt(finalized)).toBe(true));
  it('rejects majority disagreement', () => expect(isAcceptedReceipt({...finalized, resultName: 'MAJORITY_DISAGREE'})).toBe(false));
  it('rejects execution errors', () => expect(isAcceptedReceipt({...finalized, txExecutionResultName: 'FINISHED_WITH_ERROR'})).toBe(false));
  it('rejects accepted but non-finalized receipts', () => expect(isAcceptedReceipt({...finalized, statusName: 'ACCEPTED'})).toBe(false));
  it('rejects missing execution result', () => expect(isAcceptedReceipt({...finalized, txExecutionResultName: undefined})).toBe(false));
  it('rejects malformed and legacy snake-case receipts', () => { expect(isAcceptedReceipt(null)).toBe(false); expect(isAcceptedReceipt({status_name: 'ACCEPTED', result_name: 'MAJORITY_AGREE'})).toBe(false); });
  it('does not treat numeric status 5 as finalized success', () => expect(isAcceptedReceipt({status: 5, result: 6})).toBe(false));
});
