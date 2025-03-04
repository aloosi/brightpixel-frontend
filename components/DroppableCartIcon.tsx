"use client";

import { useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";

interface DroppableCartIconProps {
  onClick: () => void;
  children?: ReactNode;
  className?: string;
}

export default function DroppableCartIcon({
  onClick,
  children,
  className,
}: DroppableCartIconProps) {
  const { setNodeRef, isOver } = useDroppable({ id: "cart-icon" });

  return (
    <button
      ref={setNodeRef}
      onClick={onClick}
      className={className}
      style={{
        backgroundColor: isOver ? "rgba(100,100,100,0.3)" : "transparent",
        borderRadius: "4px",
      }}
    >
      {children}
    </button>
  );
}
