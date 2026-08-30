import {createClient} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {TransactionStatus} from 'genlayer-js/types';
const address=process.env.NEXT_PUBLIC_MATCHSPEC_CONTRACT as `0x${string}`;
export function matchspecClient(account?:`0x${string}`){return createClient({chain:studionet,account});}
export async function readMatchspec(account:`0x${string}`,functionName:string,args:unknown[]=[]){if(!address)throw new Error('NEXT_PUBLIC_MATCHSPEC_CONTRACT is not configured.');return matchspecClient(account).readContract({address,functionName,args,jsonSafeReturn:true});}
export async function writeMatchspec(account:`0x${string}`,functionName:string,args:unknown[]=[]){if(!address)throw new Error('NEXT_PUBLIC_MATCHSPEC_CONTRACT is not configured.');const client=matchspecClient(account);const hash=await client.writeContract({address,functionName,args,value:BigInt(0)});const receipt=await client.waitForTransactionReceipt({hash,status:TransactionStatus.FINALIZED});return {hash,receipt};}
