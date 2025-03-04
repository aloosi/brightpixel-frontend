"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import SignUpView from "./SignUpView";
import LoginView from "./LoginView";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [view, setView] = useState<"login" | "signup">("login");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-lg z-50">
      <div className="bg-black text-white p-6 rounded-xl shadow-lg w-96 border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4">
          <h2 className="text-xl font-bold">{view === "login" ? "Log In" : "Sign Up"}</h2>
          <button onClick={onClose} className="hover:text-gray-400 transition">
            <X size={24} />
          </button>
        </div>

        {/* Toggle between Login & Signup */}
        {view === "login" ? (
          <LoginView switchToSignup={() => setView("signup")} />
        ) : (
          <SignUpView switchToLogin={() => setView("login")} />
        )}
      </div>
    </div>
  );
}
