// app/checkout/page.tsx
'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import dynamic from 'next/dynamic';

// Toronto locations data
const TORONTO_LOCATIONS = [
  {
    name: "CN Tower",
    coords: [43.6426, -79.3871] as [number, number]
  },
  {
    name: "Union Station",
    coords: [43.6454, -79.3806] as [number, number]
  },
  {
    name: "Toronto Pearson Airport",
    coords: [43.6777, -79.6248] as [number, number]
  },
  {
    name: "Scarborough Town Centre",
    coords: [43.7764, -79.2568] as [number, number]
  },
  {
    name: "Yorkdale Shopping Centre",
    coords: [43.7253, -79.4489] as [number, number]
  }
];

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

export default function CheckoutPage() {
  const [pickupIndex, setPickupIndex] = useState(0);
  const [deliveryIndex, setDeliveryIndex] = useState(1);
  
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const distance = calculateDistance(
    TORONTO_LOCATIONS[pickupIndex].coords[0],
    TORONTO_LOCATIONS[pickupIndex].coords[1],
    TORONTO_LOCATIONS[deliveryIndex].coords[0],
    TORONTO_LOCATIONS[deliveryIndex].coords[1]
  );
  
  const deliveryTime = Math.round(distance * 12); // 12 minutes per km

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="text-xl font-semibold text-white pb-4 border-b border-gray-800">
            Order Summary
          </CardHeader>
          <CardContent className="pt-4 space-y-6">
            <div className="flex gap-4 items-center border-b border-gray-800 pb-4">
              <div className="flex-1">
                <h3 className="font-medium text-white">Wireless Headphones</h3>
                <p className="text-sm text-gray-400">Premium noise-canceling</p>
                <p className="text-emerald-500 font-medium mt-1">$299.00</p>
              </div>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>$299.00</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>
              <span>$9.99</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Tax (13%)</span>
              <span>$38.87</span>
            </div>
            <div className="flex justify-between text-white font-semibold pt-4 border-t border-gray-800">
              <span>Total</span>
              <span className="text-emerald-500">$347.86</span>
            </div>
          </CardContent>
        </Card>
        {/* Shipping Map */}
        <Card className="bg-gray-900 border-gray-800 md:col-span-2 h-[600px]">
          <CardHeader className="text-xl font-semibold text-white pb-4 border-b border-gray-800">
            Shipping Details
          </CardHeader>
          <CardContent className="pt-4 space-y-4 h-full">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Pickup Location</label>
                <select
                  value={pickupIndex}
                  onChange={(e) => setPickupIndex(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                >
                  {TORONTO_LOCATIONS.map((location, index) => (
                    <option key={index} value={index}>{location.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-300 mb-2 block">Delivery Address</label>
                <select
                  value={deliveryIndex}
                  onChange={(e) => setDeliveryIndex(Number(e.target.value))}
                  className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent appearance-none"
                >
                  {TORONTO_LOCATIONS.map((location, index) => (
                    <option key={index} value={index}>{location.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="h-[400px] relative rounded-lg overflow-hidden">
              {typeof window !== 'undefined' && (
                <Map
                  center={TORONTO_LOCATIONS[pickupIndex].coords}
                  zoom={12}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={TORONTO_LOCATIONS[pickupIndex].coords}>
                    <Popup className="text-black">
                      Pickup: {TORONTO_LOCATIONS[pickupIndex].name}
                    </Popup>
                  </Marker>
                  <Marker position={TORONTO_LOCATIONS[deliveryIndex].coords}>
                    <Popup className="text-black">
                      Delivery: {TORONTO_LOCATIONS[deliveryIndex].name}
                    </Popup>
                  </Marker>
                </Map>
              )}
              <div className="absolute bottom-4 left-4 bg-gray-900/80 p-4 rounded-lg">
                <div className="text-sm text-gray-300">
                  <p>Distance: {distance.toFixed(1)} km</p>
                  <p>Est. Delivery Time: {deliveryTime} minutes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details (unchanged from previous example) */}
      </div>
    </div>
  );
}