"use client";

import { useEffect } from "react";
import Image from "next/image";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="bg-black text-white p-6 rounded-xl shadow-lg w-11/12 max-w-2xl border-2 border-gray-400">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-200">About Us</h2>
        <p className="text-gray-400 text-center mb-6">
          We are a passionate team dedicated to delivering high-quality monitors to customers worldwide.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
              <Image src={member.imageUrl} alt={member.name} width={64} height={64} className="rounded-full object-cover border-2 border-gray-500" />
              <div >
                <h3 className="font-semibold text-lg text-black">{member.name}</h3>
                <p className="text-sm text-gray-900">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="mt-6 w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold px-4 py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
}
