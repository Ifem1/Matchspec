import {describe, expect, it} from 'vitest';
import {isAcceptedReceipt,MatchspecTransactionError} from '../lib/contract';
const finalized = {status: 5, statusName: 'ACCEPTED', result: 6, resultName: 'MAJORITY_AGREE', txExecutionResultName: 'FINISHED_WITH_RETURN', txExecutionResult: 'FINISHED_WITH_RETURN'};
describe('bounded compatibility vocabulary', () => { it('contains all six statuses', () => expect(['DIRECT_COMPATIBLE','ADAPTER_REQUIRED','PARTIAL_COMPATIBILITY','CONDITIONAL','INCOMPATIBLE','UNKNOWN']).toHaveLength(6)); });
describe('genlayer-js 1.1.8 receipt gate', () => {
  it('accepts finalized majority agreement with a returned execution', () => expect(isAcceptedReceipt(finalized)).toBe(true));
  it('accepts the actual Studionet accepted receipt shape', () => expect(isAcceptedReceipt({...finalized, status: 5, statusName: 'ACCEPTED'})).toBe(true));
  it('rejects majority disagreement', () => expect(isAcceptedReceipt({...finalized, resultName: 'MAJORITY_DISAGREE'})).toBe(false));
  it('rejects an undetermined receipt without presenting it as success', () => expect(isAcceptedReceipt({status: 9, statusName: 'UNDETERMINED', resultName: 'UNDETERMINED', txExecutionResultName: 'FINISHED_WITH_RETURN'})).toBe(false));
  it('rejects execution errors', () => expect(isAcceptedReceipt({...finalized, txExecutionResultName: 'FINISHED_WITH_ERROR'})).toBe(false));
  it('rejects accepted receipts with execution errors', () => expect(isAcceptedReceipt({...finalized, txExecutionResultName: 'FINISHED_WITH_ERROR'})).toBe(false));
  it('rejects missing execution result', () => expect(isAcceptedReceipt({...finalized, txExecutionResultName: undefined})).toBe(false));
  it('rejects malformed and legacy snake-case receipts', () => { expect(isAcceptedReceipt(null)).toBe(false); expect(isAcceptedReceipt({status_name: 'ACCEPTED', result_name: 'MAJORITY_AGREE'})).toBe(false); });
  it('does not treat numeric status 5 as finalized success', () => expect(isAcceptedReceipt({status: 5, result: 6})).toBe(false));
  it('keeps the submitted hash on a failed transaction error', () => { const e=new MatchspecTransactionError('Consensus did not converge.','0x'+'1'.repeat(64)); expect(e.hash).toHaveLength(66); expect(e.message).toContain('Consensus did not converge'); });
});
