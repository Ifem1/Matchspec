import {createClient} from 'genlayer-js';
import {studionet} from 'genlayer-js/chains';
import {TransactionStatus} from 'genlayer-js/types';
const address=process.env.NEXT_PUBLIC_MATCHSPEC_CONTRACT as `0x${string}`;
type CalldataEncodable = null | boolean | number | bigint | string | Uint8Array | CalldataEncodable[] | {[key:string]: CalldataEncodable};
type InjectedProvider={request:(args:{method:string;params?:unknown[]})=>Promise<unknown>};
function injectedProvider(){if(typeof window==='undefined')throw new Error('Injected wallet is required in the browser.');const provider=(window as Window & {ethereum?:InjectedProvider}).ethereum;if(!provider)throw new Error('An injected EIP-1193 wallet is required.');return provider;}
export function matchspecClient(account?:`0x${string}`){return createClient({chain:studionet,endpoint:process.env.NEXT_PUBLIC_GENLAYER_RPC,account,provider:injectedProvider() as never});}
export async function readMatchspec(account:`0x${string}`,functionName:string,args:CalldataEncodable[]=[]){if(!address)throw new Error('NEXT_PUBLIC_MATCHSPEC_CONTRACT is not configured.');return matchspecClient(account).readContract({address,functionName,args,jsonSafeReturn:true});}
export async function writeMatchspec(account:`0x${string}`,functionName:string,args:CalldataEncodable[]=[]){if(!address)throw new Error('NEXT_PUBLIC_MATCHSPEC_CONTRACT is not configured.');const client=matchspecClient(account);const hash=await client.writeContract({address,functionName,args,value:BigInt(0)});const receipt=await client.waitForTransactionReceipt({hash,status:TransactionStatus.FINALIZED});return {hash,receipt};}
