import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, whatsapp } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    let emailSent = false;
    let emailError = null;

    try {
      // Replace lines 49-53 with this:
      const { data: emailData, error: sendError } = await resend.emails.send({
        from: 'Metro Meet <contact@noreply.mivwordhouse.com>', 
        to: ['ajayiphilipg@gmail.com'],
        subject: `📩 New Metro Meet Inquiry: ${subject || 'General Inquiry'}`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 40px 20px;">
            <div style="max-width: 600px; margin: 0 auto; background: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              <h2 style="color: #f59e0b; border-bottom: 2px solid #334155; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
              
              <div style="margin: 20px 0;">
                <p style="margin: 8px 0; font-size: 15px;"><strong style="color: #94a3b8;">From:</strong> ${name}</p>
                <p style="margin: 8px 0; font-size: 15px;"><strong style="color: #94a3b8;">Email:</strong> <a href="mailto:${email}" style="color: #f59e0b; text-decoration: none;">${email}</a></p>
                ${whatsapp ? `<p style="margin: 8px 0; font-size: 15px;"><strong style="color: #94a3b8;">WhatsApp/Phone:</strong> <a href="tel:${whatsapp}" style="color: #f59e0b; text-decoration: none;">${whatsapp}</a></p>` : ''}
                <p style="margin: 8px 0; font-size: 15px;"><strong style="color: #94a3b8;">Subject:</strong> ${subject || 'No Subject Specified'}</p>
              </div>
              
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 25px 0;">
                <p style="margin: 0 0 10px 0; color: #94a3b8; font-weight: bold; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Message:</p>
                <p style="margin: 0; color: #cbd5e1; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
              
              <p style="color: #64748b; font-size: 12px; margin-top: 30px; text-align: center; border-top: 1px solid #334155; padding-top: 15px;">
                This inquiry was submitted dynamically via the Metro Meet 4.0 Contact Portal.
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
      console.error('Error forwarding contact message via Resend:', err);
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully.',
      emailSent,
      emailError
    });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while sending your message.' },
      { status: 500 }
    );
  }
}
