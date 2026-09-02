import './globals.css';
import Link from 'next/link'; import WalletButton from '../components/WalletButton'; import {WalletProvider} from '../components/WalletProvider';
export const metadata={title:'MATCHSPEC — Compatibility Registry',description:'Technical compatibility records'};
export default function Layout({children}:{children:React.ReactNode}){return <html><body><WalletProvider><header className="top"><Link href="/" className="brand">MATCHSPEC</Link><nav><Link href="/pairs">Registry</Link><Link href="/items">Components</Link><Link href="/pairs/new">New Check</Link><Link href="/about">Method</Link></nav><WalletButton/></header><main>{children}</main></WalletProvider></body></html>}
