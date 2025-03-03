// components/ProductCard.tsx
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/products";



export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="w-full p-4 shadow-lg">
      <CardHeader>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={300}
          className="rounded-md w-full object-cover"
        />
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-md font-semibold mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        
        
        <Button className="w-full">Add to Cart</Button>
        
      </CardFooter>
    </Card>
  );
}
