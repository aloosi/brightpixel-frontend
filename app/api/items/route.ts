// app/api/items/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM items');
    const items = stmt.all();
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const stmt = db.prepare(`
      INSERT INTO items (item_name, price, made_in, department_code)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      data.item_name,
      data.price,
      data.made_in,
      data.department_code
    );
    
    return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}