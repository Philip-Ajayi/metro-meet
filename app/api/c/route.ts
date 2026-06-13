// app/api/audiences/count/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const AUDIENCE_ID = 'f6dbc7b2-0090-4d68-8510-b2250d6386d1';

    // Fetch the contacts specifically belonging to this audience
    const response = await resend.contacts.list({
      audienceId: AUDIENCE_ID,
    });

    // If no data comes back, default to 0
    const contactsArray = response.data?.data || [];
    const totalContacts = contactsArray.length;

    return NextResponse.json({
      audienceId: AUDIENCE_ID,
      totalContacts: totalContacts,
      // Optional: This shows you a preview of the actual contact objects
      contactsPreview: contactsArray 
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch contact count' },
      { status: 500 }
    );
  }
}