import './globals.css';
import Link from 'next/link'; import WalletButton from '../components/WalletButton';
export const metadata={title:'MATCHSPEC — Compatibility Registry',description:'Technical compatibility records'};
export default function Layout({children}:{children:React.ReactNode}){return <html><body><header className="top"><Link href="/" className="brand">MATCHSPEC</Link><nav><Link href="/">Pairs</Link><Link href="/items">Items</Link><Link href="/pairs/new">New Check</Link><Link href="/about">About</Link></nav><span className="network">STUDIONET / 61999</span><WalletButton/></header><main>{children}</main></body></html>}
