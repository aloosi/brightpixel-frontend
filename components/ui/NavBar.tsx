// components/nav-bar.tsx
'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/lib/stores/cart-store';

export function NavBar() {
  const { cart } = useCartStore();

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const product = JSON.parse(e.dataTransfer.getData('application/json'));
    useCartStore.getState().addToCart(product);
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                "text-xl font-bold px-2 hover:bg-gray-800 text-white"
              )}
            >
              OSP
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/services"
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                Services
              </Link>
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
              >
                About
              </Link>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'outline' }),
               "text-xl font-bold px-2 hover:bg-gray-800 text-white"
              )}
            >
              Login
            </Link>
            
            <div 
              className="relative"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Link
                href="/checkout"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'icon' }),
                "text-xl font-bold px-2 hover:bg-gray-800 text-white"
                )}
              >
                🛒
                <span className="sr-only">Cart</span>
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-xs">
                  {cart.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}