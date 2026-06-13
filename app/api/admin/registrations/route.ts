import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Registration from '@/models/Registration';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';

    await dbConnect();

    let query = {};
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query = {
        $or: [
          { firstName: searchRegex },
          { lastName: searchRegex },
          { email: searchRegex },
          { church: searchRegex },
          { address: searchRegex },
        ],
      };
    }

    const registrations = await Registration.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: registrations });
  } catch (error: any) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ error: 'Failed to fetch registrations' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, attended } = body;

    if (!id) {
      return NextResponse.json({ error: 'Registration ID is required' }, { status: 400 });
    }

    await dbConnect();

    const updated = await Registration.findByIdAndUpdate(
      id,
      { attended },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: 'Registration not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('Error updating registration status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
