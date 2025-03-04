"use client";

import { useCart } from "@/components/cart/CartContext";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CartSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-black text-white p-6 shadow-lg z-50 border-l border-gray-700">
      {/* Cart Header */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-4">
        <h2 className="text-lg font-bold text-white">My Cart</h2>
        <button onClick={onClose}>
          <X size={24} className="hover:text-gray-400 transition" />
        </button>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <p className="text-gray-400 mt-4">Your cart is empty.</p>
      ) : (
        <div className="mt-4 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-gray-700 pb-2">
              <div className="flex items-center space-x-4">
                {/* Product Image */}
                <Image src={item.imageUrl} alt={item.name} width={50} height={50} className="rounded-md" />
                <div>
                  <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                  <p className="text-xs text-gray-400">${item.price.toFixed(2)}</p>
                </div>
              </div>

              {/* Quantity Selector & Remove */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  -
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  +
                </button>
                <button onClick={() => removeFromCart(item.id)} className="text-gray-400 text-xs hover:text-gray-600">
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtotal Section */}
      {cart.length > 0 && (
        <div className="mt-6 border-t border-gray-700 pt-4">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Subtotal</span>
            <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-gray-600">Taxes calculated at checkout</p>
          <p className="text-xs text-gray-600">Shipping: <span className="text-gray-400">FREE</span></p>

          {/* Buttons */}
          <button className="mt-4 w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-semibold text-white">
            <Link href="/checkout"> Proceed to Checkout </Link>
          </button>
          <button onClick={clearCart} className="mt-2 w-full bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white">
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}
