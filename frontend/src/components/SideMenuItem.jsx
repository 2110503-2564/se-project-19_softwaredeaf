'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideMenuItem = ({ icon, label, href, isOpen }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="relative group">
      <Link href={href}>
        <div
          className={`flex items-center gap-4 p-4 cursor-pointer transition-colors duration-200 
            ${isActive ? 'bg-gray-700 font-semibold' : 'hover:bg-gray-700'}`}
        >
          <div className="text-lg">{icon}</div>
          {isOpen && <span className="whitespace-nowrap">{label}</span>}
        </div>
      </Link>

      {/* Tooltip */}
      {!isOpen && (
        <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-gray-700 px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
          {label}
        </span>
      )}
    </li>
  );
};

export default SideMenuItem;
