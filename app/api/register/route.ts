import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Registration from '@/models/Registration';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, church, address, whatsapp, email } = body;

    // Validate inputs
    if (!firstName || !lastName || !church || !address || !whatsapp || !email) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Check if already registered
    const existingRegistration = await Registration.findOne({ email: email.toLowerCase() });
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'This email is already registered for Metro Meet 4.0.' },
        { status: 400 }
      );
    }

    // Create registration
    const newRegistration = await Registration.create({
      firstName,
      lastName,
      church,
      address,
      whatsapp,
      email,
    });

    // Send visual stunning confirmation email via Resend
    let emailSent = false;
    let emailError = null;

    try {
      const { data: emailData, error: sendError } = await resend.emails.send({
        from: 'Metro Meet <contact@mivwordhouse.com>', // In production, replace with verified domain e.g., info@metromeet.org
        to: [email],
        subject: '🎉 Metro Meet 4.0 Registration Confirmed – Money Matters!',
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 40px 20px; text-align: center;">
            <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid #f59e0b; border-radius: 16px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              
              <!-- Header -->
              <h1 style="color: #f59e0b; margin-bottom: 5px; font-size: 28px; letter-spacing: 1px;">METRO MEET 4.0</h1>
              <p style="color: #94a3b8; font-size: 16px; margin-top: 0; text-transform: uppercase; font-weight: bold;">Money Matters</p>
              
              <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;">
              
              <!-- Welcome -->
              <h2 style="color: #ffffff; font-size: 22px;">Hi ${firstName}, you are officially registered!</h2>
              <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; text-align: left;">
                Thank you for registering for the 4th Edition of Metro Meet, proudly organized by <strong>MIV Word House</strong>. 
                Get ready for a transformative session on understanding, growing, and leveraging your financial resources!
              </p>
              
              <!-- Details Card -->
              <div style="background: rgba(245, 158, 11, 0.05); border-left: 4px solid #f59e0b; border-radius: 8px; padding: 20px; text-align: left; margin: 25px 0;">
                <p style="margin: 5px 0; color: #f59e0b; font-weight: bold; font-size: 15px;">🗓️ Saturday, 13th of June 2026</p>
                <p style="margin: 5px 0; color: #ffffff; font-weight: bold; font-size: 15px;">⏰ 10:00 AM Prompt</p>
                <p style="margin: 5px 0; color: #cbd5e1; font-size: 15px;">📍 Behind Accord Building, Obadeyi Estate Samonda Ibadan</p>
                <p style="margin: 5px 0; color: #cbd5e1; font-size: 15px;">🎤 Guest Speaker: <strong>Femi Sobayo</strong> (Finance Director at Eastcastle Infrastructure)</p>
              </div>

              <!-- Message from focus -->
              <p style="color: #94a3b8; font-style: italic; line-height: 1.6; font-size: 14px; margin: 20px 0;">
                "What if the way you think about money is the very thing determining your future wealth? Come learn how to grow your resources and create lasting financial freedom."
              </p>
              
              <div style="margin: 30px 0;">
                <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}" style="background-color: #f59e0b; color: #0f172a; text-decoration: none; padding: 12px 30px; font-weight: bold; border-radius: 9999px; font-size: 16px; display: inline-block; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);">
                  Visit Website & Map Directions
                </a>
              </div>

              <!-- Footer -->
              <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;">
              <p style="color: #64748b; font-size: 12px; line-height: 1.4;">
                MIV Word House &copy; 2026. All rights reserved.<br>
                For inquiries, please call or WhatsApp: <a href="tel:+234906648462346" style="color: #f59e0b; text-decoration: none;">0906648462346</a>
              </p>
            </div>
          </div>
        `
      });
      if (sendError) {
        emailError = sendError.message;
      } else {
        emailSent = !!emailData?.id;
      }
    } catch (err: any) {
      emailError = err.message || err;
      console.error('Error sending registration email via Resend:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Registration successful!',
      data: newRegistration,
      emailSent,
      emailError
    });
  } catch (error: any) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during registration.' },
      { status: 500 }
    );
  }
}
