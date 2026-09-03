'use client';
import {useWallet,isStudionet} from './WalletProvider';
export default function WalletButton(){const {address,chainId,error,connect,switchToStudionet}=useWallet();return <div><button onClick={()=>void connect()}>{address?`${address.slice(0,6)}…${address.slice(-4)}`:'CONNECT WALLET'}</button>{address&&!isStudionet(chainId)&&<><p role="alert" className="mono">WRONG NETWORK — SWITCH TO STUDIONET</p><button onClick={()=>void switchToStudionet()}>SWITCH TO STUDIONET</button></>}{error&&<p role="alert" className="mono">{error}</p>}</div>}
