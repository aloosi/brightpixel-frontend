// app/checkout/page.tsx
'use client';

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/stores/cart-store";
import Image from "next/image";
import { Notification } from "@/components/ui/notification";

export default function CheckoutPage() {
  const { cart, clearCart, notification, notificationMessage } = useCartStore();
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = 9.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Notification 
        message={notificationMessage} 
        show={notification} 
        onClose={() => useCartStore.setState({ notification: false })}
      />
      
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-xl font-semibold text-white pb-4 border-b border-gray-800">
            Order Summary
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex gap-4 items-center border-b border-gray-800 pb-4 last:border-0"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md w-20 h-20 object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-white">{item.name}</h3>
                  <p className="text-sm text-gray-400 line-clamp-1">{item.description}</p>
                  <p className="text-emerald-500 font-medium mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-xl font-semibold text-white pb-4 border-b border-gray-800">
            Payment Details
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="space-y-6">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-semibold pt-4 border-t border-gray-800">
                <span>Total</span>
                <span className="text-emerald-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Card Number</label>
                <input
                  type="text"
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="4242 4242 4242 4242"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Expiry Date</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">CVC</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-6">
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-5 text-base"
              onClick={() => {
                clearCart();
                useCartStore.getState().showNotification("Payment successful! Your order is confirmed.");
              }}
            >
              Complete Purchase
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}