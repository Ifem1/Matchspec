'use client';
import {createContext,useContext,useEffect,useState} from 'react';
import {connectWallet,Eip1193,STUDIONET} from '../lib/wallet';
type Wallet={address:string;chainId:string;error:string;connect:()=>Promise<void>};
const Context=createContext<Wallet>({address:'',chainId:'',error:'',connect:async()=>{}});
export function WalletProvider({children}:{children:React.ReactNode}){const [address,setAddress]=useState('');const [chainId,setChainId]=useState('');const [error,setError]=useState('');const connect=async()=>{try{const a=await connectWallet();setAddress(a);const p=(window as Window & {ethereum?:Eip1193}).ethereum;setChainId(String(await p?.request({method:'eth_chainId'})));setError('')}catch(e){setError(e instanceof Error?e.message:'Wallet connection failed')}};useEffect(()=>{const p=(window as Window & {ethereum?:Eip1193}).ethereum;if(p) void p.request({method:'eth_chainId'}).then(x=>setChainId(String(x)));},[]);return <Context.Provider value={{address,chainId,error,connect}}>{children}</Context.Provider>}
export const useWallet=()=>useContext(Context);
export const isStudionet=(id:string)=>id===STUDIONET.chainId;
