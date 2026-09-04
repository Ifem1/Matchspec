import * as genlayer from 'genlayer-js';
import {createClient} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {TransactionStatus} from 'genlayer-js/types';
const address=process.env.NEXT_PUBLIC_MATCHSPEC_CONTRACT as `0x${string}`;
type CalldataEncodable = null | boolean | number | bigint | string | Uint8Array | CalldataEncodable[] | {[key:string]: CalldataEncodable};
type InjectedProvider={request:(args:{method:string;params?:unknown[]})=>Promise<unknown>};
function injectedProvider(){if(typeof window==='undefined')throw new Error('Injected wallet is required in the browser.');const provider=(window as Window & {ethereum?:InjectedProvider}).ethereum;if(!provider)throw new Error('An injected EIP-1193 wallet is required.');return provider;}
function baseClient(){return createClient({chain:studionet,endpoint:process.env.NEXT_PUBLIC_GENLAYER_RPC});}
export function matchspecClient(account?:`0x${string}`){return createClient({chain:studionet,endpoint:process.env.NEXT_PUBLIC_GENLAYER_RPC,account,provider:injectedProvider() as never});}
export function isAcceptedReceipt(receipt:unknown){
  const sdkSuccess=(genlayer as unknown as {isSuccessful?: (value:unknown)=>boolean}).isSuccessful;
  if(sdkSuccess)return sdkSuccess(receipt);
  const r=receipt as {statusName?:unknown;resultName?:unknown;txExecutionResultName?:unknown}|null;
  return !!r && (r.statusName==='ACCEPTED' || r.statusName==='FINALIZED') && r.resultName==='MAJORITY_AGREE' && r.txExecutionResultName==='FINISHED_WITH_RETURN';
}
export class MatchspecTransactionError extends Error{constructor(message:string,readonly hash:string){super(message);this.name='MatchspecTransactionError';}}
export async function readMatchspec(functionName:string,args:CalldataEncodable[]=[]){if(!address)throw new Error('NEXT_PUBLIC_MATCHSPEC_CONTRACT is not configured.');return baseClient().readContract({address,functionName,args,jsonSafeReturn:true});}
export async function writeMatchspec(account:`0x${string}`,functionName:string,args:CalldataEncodable[]=[]){if(!address)throw new Error('NEXT_PUBLIC_MATCHSPEC_CONTRACT is not configured.');const client=matchspecClient(account);const hash=await client.writeContract({address,functionName,args,value:BigInt(0)});const waitOptions=functionName==='assess_compatibility'?{hash,status:TransactionStatus.FINALIZED,interval:5_000,retries:240}:{hash,status:TransactionStatus.FINALIZED};let receipt:unknown;try{receipt=await client.waitForTransactionReceipt(waitOptions)}catch(e){throw new MatchspecTransactionError(e instanceof Error?e.message:'Transaction status could not be retrieved.',hash)}if(!isAcceptedReceipt(receipt)){const r=receipt as {statusName?:string;resultName?:string;txExecutionResultName?:string};if(r.resultName==='UNDETERMINED'||r.statusName==='UNDETERMINED')throw new MatchspecTransactionError('Consensus did not converge.',hash);if(r.txExecutionResultName==='FINISHED_WITH_ERROR')throw new MatchspecTransactionError('Execution reverted.',hash);throw new MatchspecTransactionError('Transaction was not accepted.',hash);}return {hash,receipt};}
