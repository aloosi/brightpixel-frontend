import { NextResponse } from "next/server";
import db from "@/lib/db";

// ✅ Fetch all products
export async function GET() {
  try {
    const stmt = db.prepare("SELECT * FROM products");
    const products = stmt.all();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// ✅ Create a new product
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.name || !data.price || !data.category || !data.brand) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO products (name, price, category, brand, description, image_url, stock, screen_size_group)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      data.name,
      data.price,
      data.category,
      data.brand,
      data.description || null, // Optional fields
      data.image_url || null,
      data.stock || 0,
      data.screen_size_group || null
    );

    return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
