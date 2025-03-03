// lib/products.ts
export type Product = {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    screenSize: number;
    screenSizeGroup: string;
    brand: string;
};

export const products: Product[] = [ 
    {
    id: "1",
    name: "Apple Studio Display",
    description: "Apple Studio 5k Display",
    price: 1199.99,
    imageUrl: "/images/applestudiodisplay.jpg",
    category: "Apple Monitors",
    screenSize: 27,
    screenSizeGroup: "25 - 29 Inch",
    brand: "Apple",
    },
    {
        id: "2",
        name: "Samsung Odyssey G9",
        description: "Ultrawide Samsung Gaming Monitor",
        price: 1299.99,
        imageUrl: "/images/odyssey-g9.jpg",
        category: "Gaming Monitors",
        screenSize:49,
        screenSizeGroup: "35 Inch and Larger",
        brand: "Samsung",
      },
      {
        id: "3",
        name: "LG OLED 32",
        description: "LG OLED Monitor",
        price: 1099.99,
        imageUrl: "/images/lg-ultragear-oled-32.jpg",
        category: "OLED Monitors",
        screenSize: 32,
        screenSizeGroup: "30 - 34 Inch",
        brand: "LG",
      },
];
