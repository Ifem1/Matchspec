'use client';
import Link from 'next/link'; import {usePathname} from 'next/navigation';
export default function Navigation(){const path=usePathname();return <nav>{[['/pairs','Compatibility'],['/items','Components'],['/pairs/new','Check Compatibility'],['/about','How It Works']].map(([href,label])=><Link key={href} href={href} className={path===href||path.startsWith(href+'/')?'active':''}>{label}</Link>)}</nav>}
