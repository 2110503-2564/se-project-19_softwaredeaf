'use client';

import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaStar, FaTrash, FaEdit } from 'react-icons/fa';
import { CampgroundItemAdmin } from '../../interfaces';
import Image from 'next/image';

const CampgroundAdminCard = ({ campground }: { campground: CampgroundItemAdmin }) => {
  const handleEdit = () => {
    alert(`Editing: ${campground.name}`);
    // Example: router.push(`/admin/campgrounds/edit/${campground.id}`);
  };

  const handleDelete = () => {
    const confirmed = confirm(`Are you sure you want to delete "${campground.name}"?`);
    if (confirmed) {
      alert(`Deleted: ${campground.name}`);
      // TODO: Call your API to delete it
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-md border border-gray-200 relative">
      
      <div className="relative w-full h-48">
        <Image
          src={campground.picture}
          alt={campground.name}
          fill
          className="object-cover rounded-t-2xl"
        />
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{campground.name}</h2>

        <div className="flex items-center text-gray-600 text-sm">
          <FaMapMarkerAlt className="mr-2 text-gray-500" />
          {campground.address}
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <FaPhone className="mr-2 text-gray-500" />
          {campground.tel}
        </div>

        <div className="flex items-center text-yellow-500 text-sm mt-2">
          <FaStar className="mr-1" />
          <span className="font-semibold">{campground.avgRating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1">
            ({campground.ratings.length} ratings)
          </span>
        </div>

        <div className="text-xs text-gray-400">
          Created on {new Date(campground.createdAt).toLocaleDateString()}
        </div>

        <div className="pt-3 flex gap-3">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-100"
          >
            <FaEdit />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 border border-red-600 rounded hover:bg-red-100"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampgroundAdminCard;
