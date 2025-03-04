// app/api/users/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

// GET all users
export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM users');
    const users = stmt.all();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// CREATE user
export async function POST(request: Request) {
  const data = await request.json();
  
  try {
    const stmt = db.prepare(`
      INSERT INTO users (name, tel_no, email, address, city_code, login_id, password)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      data.name,
      data.tel_no,
      data.email,
      data.address,
      data.city_code,
      data.login_id,
      data.password
    );
    
    return NextResponse.json({ id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}