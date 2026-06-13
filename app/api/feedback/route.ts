import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Feedback from '@/models/Feedback';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, rating, anonymous } = body;

    if (!message) {
      return NextResponse.json({ error: 'Feedback message is required' }, { status: 400 });
    }

    await dbConnect();

    const newFeedback = await Feedback.create({
      name: anonymous ? undefined : name,
      email: anonymous ? undefined : email,
      message,
      rating,
      anonymous,
    });

    return NextResponse.json({ success: true, data: newFeedback });
  } catch (error: any) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: feedbacks });
  } catch (error: any) {
    console.error('Error retrieving feedbacks:', error);
    return NextResponse.json({ error: 'Failed to retrieve feedback' }, { status: 500 });
  }
}
