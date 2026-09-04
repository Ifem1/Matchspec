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
export async function readMatchspec(functionName:string,args:CalldataEncodable[]=[]){if(!address)throw new Error('NEXT_PUBLIC_MATCHSPEC_CONTRACT is not configured.');return baseClient().readContract({address,functionName,args,jsonSafeReturn:true});}
export async function writeMatchspec(account:`0x${string}`,functionName:string,args:CalldataEncodable[]=[]){if(!address)throw new Error('NEXT_PUBLIC_MATCHSPEC_CONTRACT is not configured.');const client=matchspecClient(account);const hash=await client.writeContract({address,functionName,args,value:BigInt(0)});const waitOptions=functionName==='assess_compatibility'?{hash,status:TransactionStatus.FINALIZED,interval:5_000,retries:240}:{hash,status:TransactionStatus.FINALIZED};const receipt=await client.waitForTransactionReceipt(waitOptions);if(!isAcceptedReceipt(receipt))throw new Error('Transaction finalized without accepted consensus.');return {hash,receipt};}
