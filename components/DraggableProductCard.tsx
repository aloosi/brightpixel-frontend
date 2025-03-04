"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/products";

export default function DraggableProductCard({ product }: { product: Product }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: product.id,
    data: { product },
  });

  // We only show transform in case user wants the item to move in place (some prefer 0).
  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.0 : 1, // Hide original while dragging overlay
    touchAction: "none", // Prevents scrolling on mobile
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ProductCard product={product} />
    </div>
  );
}
