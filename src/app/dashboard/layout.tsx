"use client";
import Link from "next/link";
import { ReactNode } from "react";

// Menu items with icons
const menuItems = [
{ name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
{ name: "Order", path: "/dashboard/ordertable", icon: OrderIcon },
{ name: "Statistic", path: "#", icon: StatisticIcon },
{ name: "Product", path: "#", icon: ProductIcon },
 { name: "Stock", path: "#", icon: StockIcon },
 { name: "Offer", path: "#", icon: OfferIcon },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
 return (
 <div className="flex min-h-screen bg-gray-50">
 {/* Sidebar */}
 <aside className="relative w-80 bg-blue-600 text-black flex flex-col justify-between overflow-visible">
<div className="relative z-10">
<div className="p-8 pb-12">
<h1 className="text-2xl font-bold tracking-wide mt-14">eProduct</h1>
</div>

 <nav className="space-y-1 relative">
 {menuItems.map((item) => (
 <div key={item.name} className="relative group">
{/* Hover background effect */}
 <div className="absolute inset-0 -right-6 w-[calc(100%+32px)] bg-white/90 rounded-l-full scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none"></div>

 <Link
 href={item.path}
 className="relative flex items-center gap-12 mt-12 py-3 px-6 w-full z-10"
 >
 <span className="w-5 h-5 flex items-center justify-center">
 {item.icon()}
 </span>
 <span className="text-lg">{item.name}</span>
</Link>
 </div>))}
 </nav>
</div>

{/* Footer */}
<div className="relative z-10 p-8 pt-0 text-black">
 <div className="flex space-x-4 text-sm">
 <a href="#" className="hover:underline">Facebook</a>
 <a href="#" className="hover:underline">Twitter</a>
 <a href="#" className="hover:underline">Google</a>
 </div>
 </div>
 </aside>

 {/* Main content */}
 <main className="flex-1 p-8">{children}</main>
 </div>
 );
}

// ICONS
function DashboardIcon() {
return (
 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
</svg> );
}

function OrderIcon() { return (
 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
 <path
fillRule="evenodd"
d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 18a3 3 0 100-6 3 3 0 000 6z"
clipRule="evenodd"
 />
 </svg>
 );
}

function StatisticIcon() {return (
 <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
 <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
</svg>
 );
}

function ProductIcon() {
return ( <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
 <path
 fillRule="evenodd"
  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
 clipRule="evenodd"
 />
  </svg>
 );
}

function StockIcon() {
 return <DashboardIcon />;
}

function OfferIcon() {
 return ( <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
<path
 fillRule="evenodd"
 d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 010 2h-1a1 1 0 110-2h1zm0 10a1 1 0 010 2h-1a1 1 0 110-2h1z"
 clipRule="evenodd"
 />
</svg>
 );
}