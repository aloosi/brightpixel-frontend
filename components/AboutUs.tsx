"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const teamMembers = [
  {
    name: "John Doe",
    role: "Founder & CEO",
    email: "john@example.com",
    imageUrl: "/team/john.jpg",
    bio: "John has 10+ years in the tech industry and loves building innovative solutions.",
  },
  {
    name: "Jane Smith",
    role: "Lead Developer",
    email: "jane@example.com",
    imageUrl: "/team/jane.jpg",
    bio: "Jane is passionate about frontend development and creating seamless user experiences.",
  },
];

export default function AboutUs({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50">
      <div className="bg-black text-white p-6 rounded-xl shadow-lg w-11/12 max-w-2xl border border-gray-700">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold text-gray-200">About Us</h2>
          <button onClick={onClose} className="hover:text-gray-400 transition">
            <X size={24} />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-center mt-4">
          We are a passionate team dedicated to delivering high-quality monitors to customers worldwide.
        </p>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={64}
                height={64}
                className="rounded-full object-cover border-2 border-gray-600"
              />
              <div>
                <h3 className="font-semibold text-lg text-white">{member.name}</h3>
                <p className="text-sm text-gray-400">{member.role}</p>
                <p className="text-xs text-gray-500">{member.email}</p>
                <p className="text-xs text-gray-400 mt-2">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200 border border-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
