// app/api/users/[id]/route.ts
import { NextResponse } from 'next/server';
import db from '@/lib/db';

// UPDATE user
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const data = await request.json();
  
  try {
    const stmt = db.prepare(`
      UPDATE users SET
        name = ?,
        tel_no = ?,
        email = ?,
        address = ?,
        city_code = ?,
        login_id = ?,
        password = ?
      WHERE user_id = ?
    `);
    
    const result = stmt.run(
      data.name,
      data.tel_no,
      data.email,
      data.address,
      data.city_code,
      data.login_id,
      data.password,
      params.id
    );
    
    return NextResponse.json({ affected: result.changes });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE user
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const stmt = db.prepare('DELETE FROM users WHERE user_id = ?');
    const result = stmt.run(params.id);
    return NextResponse.json({ affected: result.changes });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}