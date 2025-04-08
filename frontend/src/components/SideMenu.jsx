'use client';

import React, { useState } from 'react';
import { FaHome, FaCog, FaBars, FaChevronLeft, FaBook, FaUsers } from 'react-icons/fa';
import { FaTents } from "react-icons/fa6";

import SideMenuItem from './SideMenuItem';

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FaHome />, label: 'Home', href: '/admin' },
    { icon: <FaUsers />, label: 'Users', href: '/admin/users' },
    { icon: <FaTents />, label: 'Campgrounds', href: '/admin/campgrounds' },
    { icon: <FaBook />, label: 'Bookings', href: '/admin/bookings' },
  ];

  return (
    <div className={`fixed top-50 left-0 h-screen bg-gray-800 text-white z-20 transition-all duration-300 ${isOpen ? 'w-48' : 'w-16'} flex flex-col`}>
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="text-xl hover:text-gray-300 focus:outline-none"
        >
          {isOpen ? <FaChevronLeft /> : <FaBars />}
        </button>
        {isOpen && <span className="text-sm font-semibold">Admin Menu</span>}
      </div>

      {/* Menu Items */}
      <ul className="flex-1">
        {menuItems.map((item, index) => (
          <SideMenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isOpen={isOpen}
          />
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
