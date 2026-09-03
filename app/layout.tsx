import './globals.css';
import Link from 'next/link'; import WalletButton from '../components/WalletButton'; import Navigation from '../components/Navigation'; import {WalletProvider} from '../components/WalletProvider';
export const metadata={title:'MATCHSPEC — Compatibility Registry',description:'Technical compatibility records'};
export default function Layout({children}:{children:React.ReactNode}){return <html><body><WalletProvider><header className="top"><Link href="/" className="brand">MATCHSPEC</Link><Navigation/><WalletButton/></header><main>{children}</main></WalletProvider></body></html>}
