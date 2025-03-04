"use client";

import { useState } from "react";
import AboutUs from "@/components/AboutUs";

export default function AboutPage() {
  const [showModal, setShowModal] = useState(true);

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <AboutUs isOpen={showModal} onClose={() => setShowModal(false)} />
    </main>
  );
}
