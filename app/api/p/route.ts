// app/api/broadcast/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    const AUDIENCE_ID = 'f6dbc7b2-0090-4d68-8510-b2250d6386d1';

    const { data, error } = await resend.broadcasts.create({
      audienceId: AUDIENCE_ID,
      from: 'Metro Meet <newsletter@metromeet.mivwordhouse.com>',
      subject: 'Money Matters - MetroMeet 4th Edition',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Money Matters - MetroMeet Invite</title>
          <style type="text/css">
              body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
              table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
              img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
              table { border-collapse: collapse !important; }
              body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #0b1424; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
              
              .btn-cta:hover {
                  background-color: #ffd700 !important;
                  transform: translateY(-2px);
                  box-shadow: 0 4px 15px rgba(250, 204, 21, 0.4) !important;
              }

              a[x-apple-data-detectors] {
                  color: inherit !important;
                  text-decoration: none !important;
                  font-size: inherit !important;
                  font-family: inherit !important;
                  font-weight: inherit !important;
                  line-height: inherit !important;
              }

              @media screen and (max-width: 600px) {
                  .mobile-padding { padding: 16px !important; }
                  .mobile-header-text { font-size: 28px !important; line-height: 36px !important; }
                  .mobile-card-stack { display: block !important; width: 100% !important; padding-bottom: 12px !important; }
                  .mobile-center { text-align: center !important; }
              }
          </style>
        </head>
        <body>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #050b14; table-layout: fixed;">
              <tbody><tr>
                  <td align="center" style="padding: 20px 0;">
                      
                      <span style="display: none; max-height: 0px; overflow: hidden;">
                          Join us for the highly anticipated fourth edition of MetroMeet this Saturday, June 13, 2026. Come build wisdom and grow wealth!
                      </span>
                      
                      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px; background-color: #0a1120; border-radius: 20px; border: 1px solid #1e293b; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
                          
                          <tbody><tr>
                              <td align="center" style="background-color: #040912; padding: 30px 20px 20px 20px; border-bottom: 1px solid #111a2e;">
                                  <img src="https://metromeet.mivwordhouse.com/_next/image?url=%2FmetroMeetLogo%2FdarkBackground.png&w=1920&q=75" alt="MetroMeet Logo" width="210" style="display: block; max-width: 210px; height: auto;" onerror="this.onerror=null; this.src='https://placehold.co/210x60/0a1120/ffffff?text=METROMEET';">
                              </td>
                          </tr>

                          <tr>
                              <td style="padding: 40px 40px 20px 40px; background-color: #0a1120;" class="mobile-padding">
                                  <p style="margin: 0; font-size: 16px; font-weight: 500; color: #38bdf8; text-transform: uppercase; letter-spacing: 2px;">Greetings Future Wealth Builders,</p>
                                  <h1 style="margin: 10px 0 20px 0; font-family: 'Playfair Display', Georgia, serif; font-size: 34px; line-height: 44px; color: #ffffff; font-weight: 700;" class="mobile-header-text">
                                      The 4th Edition of <span style="color: #facc15;">MetroMeet is here!</span>
                                  </h1>
                                  <p style="margin: 0; font-size: 15px; line-height: 26px; color: #94a3b8; font-weight: 400;">
                                      Something great is happening this <strong style="color: #ffffff;">Saturday, June 13, 2026!</strong> You are cordially invited to step into the landmark fourth edition of our life-shifting masterclass designed to revolutionize your financial journey. It’s time to build deep wisdom, discover key wealth creation mechanisms, and master assets to anchor your decisions on sound guidance.
                                  </p>
                              </td>
                          </tr>

                          <tr>
                              <td align="center" style="padding: 10px 30px 30px 30px;" class="mobile-padding">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0e1726; border-radius: 16px; border: 1px solid #1e293b; overflow: hidden;">
                                      <tbody><tr>
                                          <td align="center">
                                              <a href="https://metromeet.mivwordhouse.com/" target="_blank" style="text-decoration: none;">
                                                  <img src="https://metromeet.mivwordhouse.com/_next/image?url=%2Fflyer%2FIMG-20260531-WA0000.jpg&w=640&q=75" alt="Money Matters Flyer Featuring Femi Sobayo" width="100%" style="display: block; width: 100%; height: auto;">
                                              </a>
                                          </td>
                                      </tr>
                                  </tbody></table>
                              </td>
                          </tr>

                          <tr>
                              <td style="padding: 10px 40px 30px 40px; background-color: #0b1424;" class="mobile-padding">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0e1726; border-radius: 16px; border-left: 5px solid #facc15;">
                                      <tbody><tr>
                                          <td style="padding: 25px 30px;">
                                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                  <tbody><tr>
                                                      <td style="padding-bottom: 10px;">
                                                          <p style="margin: 0; font-size: 11px; font-weight: 700; color: #facc15; text-transform: uppercase;">distinguished keynote speaker</p>
                                                          <h3 style="margin: 4px 0 0 0; font-size: 22px; font-weight: 800; color: #ffffff;">FEMI SOBAYO</h3>
                                                          <p style="margin: 2px 0 0 0; font-size: 13px; color: #38bdf8; font-weight: 600;">Finance Director, Eastcastle Infrastructure</p>
                                                          <p style="margin: 2px 0 0 0; font-size: 12px; color: #94a3b8;">Former CFO, Lagos Chamber of Commerce & Industry</p>
                                                      </td>
                                                  </tr>
                                                  <tr>
                                                      <td style="padding-top: 10px; border-top: 1px solid #1e293b;">
                                                          <p style="margin: 0; font-size: 13.5px; line-height: 22px; color: #cbd5e1; font-style: italic;">
                                                              "Femi is a distinguished finance, strategy, and business intelligence leader with over 15 years of cross-functional experience steering financial governance, capital models, and portfolio valuation across high-impact global sectors including Banking, FMCG, Pharmaceuticals, Engineering, and NGOs."
                                                          </p>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          </td>
                                      </tr>
                                  </tbody></table>
                              </td>
                          </tr>

                          <tr>
                              <td align="center" style="padding: 20px 40px 40px 40px; background-color: #0a1120; border-top: 1px solid #111a2e;" class="mobile-padding">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                                      <tbody><tr>
                                          <td class="mobile-card-stack" width="50%" align="center" style="background-color: #0f1c30; border-radius: 12px; padding: 15px; border: 1px solid #1e3a8a;">
                                              <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">DATE & TIME</p>
                                              <p style="margin: 0; font-size: 15px; font-weight: bold; color: #ffffff;">Sat, June 13, 2026</p>
                                              <p style="margin: 5px 0 0 0; font-size: 13px; color: #38bdf8; font-weight: bold;">
                                                  12:30 PM Icebreaker <br>
                                                  1:00 PM Main Event
                                              </p>
                                          </td>
                                          <td class="mobile-card-stack" width="4%">&nbsp;</td>
                                          <td class="mobile-card-stack" width="46%" align="center" style="background-color: #0f1c30; border-radius: 12px; padding: 15px; border: 1px solid #1e3a8a;">
                                              <p style="margin: 0 0 5px 0; font-size: 12px; font-weight: bold; color: #94a3b8; text-transform: uppercase;">PARTICIPATION</p>
                                              <p style="margin: 0; font-size: 15px; font-weight: bold; color: #facc15;">100% FREE</p>
                                              <p style="margin: 5px 0 0 0; font-size: 12px; color: #e2e8f0; line-height: 16px;">
                                                  Registration is Compulsory
                                              </p>
                                          </td>
                                      </tr>
                                  </tbody></table>

                                  <table border="0" cellpadding="0" cellspacing="0">
                                      <tbody><tr>
                                          <td align="center" style="background-color: #facc15; border-radius: 12px;">
                                              <a href="https://metromeet.mivwordhouse.com/" target="_blank" class="btn-cta" style="display: inline-block; padding: 18px 45px; font-size: 16px; font-weight: 800; color: #020617; text-decoration: none; border-radius: 12px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease;">
                                                  RESERVE YOUR FREE SEAT NOW
                                              </a>
                                          </td>
                                      </tr>
                                  </tbody></table>
                                  
                                  <p style="margin: 15px 0 0 0; font-size: 12px; color: #64748b;">
                                      Secure registration takes less than 30 seconds at <a href="https://metromeet.mivwordhouse.com/" style="color: #38bdf8; text-decoration: underline;">metromeet.mivwordhouse.com</a>
                                  </p>
                              </td>
                          </tr>

                          <tr>
                              <td style="padding: 30px 40px; background-color: #070d1a; border-top: 1px solid #111a2e;" class="mobile-padding">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tbody><tr>
                                          <td>
                                              <h4 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #ffffff; text-transform: uppercase; letter-spacing: 1px;">
                                                  EVENT VENUE
                                              </h4>
                                              <p style="margin: 0 0 15px 0; font-size: 14px; line-height: 22px; color: #cbd5e1;">
                                                  MIV Word House, Behind Accord Building, Obadeyi Estate Samonda Ibadan
                                              </p>
                                              <table border="0" cellpadding="0" cellspacing="0">
                                                  <tbody><tr>
                                                      <td align="center" style="background-color: #1e293b; border-radius: 8px; border: 1px solid #334155;">
                                                          <a href="https://maps.app.goo.gl/MJe1koBr8oQLuieE6?g_st=aw" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 12px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px;">
                                                              📍 Open Google Maps Directions
                                                          </a>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          </td>
                                      </tr>
                                  </tbody></table>
                              </td>
                          </tr>

                          <tr>
                              <td style="padding: 40px; background-color: #040912; text-align: center;" class="mobile-padding">
                                  <p style="margin: 0 0 20px 0; font-size: 13px; line-height: 20px; color: #94a3b8;">
                                      Have questions? We are always here to support you:<br>
                                      💬 WhatsApp: <a href="https://wa.me/2348133027209" style="color: #facc15; font-weight: bold; text-decoration: none;">08133027209</a> &nbsp;•&nbsp; 📞 Call / SMS: <a href="tel:09066484623" style="color: #facc15; font-weight: bold; text-decoration: none;">09066484623</a>
                                  </p>

                                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                      <tbody><tr>
                                          <td align="center" style="padding-bottom: 25px;">
                                              <table border="0" cellpadding="0" cellspacing="0">
                                                  <tbody><tr>
                                                      <td style="padding: 0 8px;">
                                                          <a href="https://metromeet.mivwordhouse.com/" target="_blank" style="text-decoration: none;">
                                                              <span style="display: inline-block; width: 32px; height: 32px; border-radius: 50%; background-color: #1e293b; color: #ffffff; line-height: 32px; font-size: 14px; font-weight: bold;">W</span>
                                                          </a>
                                                      </td>
                                                      <td style="padding: 0 8px;">
                                                          <a href="https://maps.app.goo.gl/MJe1koBr8oQLuieE6?g_st=aw" target="_blank" style="text-decoration: none;">
                                                              <span style="display: inline-block; width: 32px; height: 32px; border-radius: 50%; background-color: #1e293b; color: #ffffff; line-height: 32px; font-size: 14px; font-weight: bold;">M</span>
                                                          </a>
                                                      </td>
                                                  </tr>
                                              </tbody></table>
                                          </td>
                                      </tr>
                                  </tbody></table>

                                  <p style="margin: 0 0 10px 0; font-size: 11px; color: #475569; line-height: 18px;">
                                      © 2026 Metro Meet . All Rights Reserved.
                                  </p>

                                  <p style="margin: 0; font-size: 11px; color: #475569;">
                                      No longer want to receive these invites? 
                                      <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #38bdf8; text-decoration: underline;">Unsubscribe here</a>.
                                  </p>
                              </td>
                          </tr>

                      </tbody></table>
                  </td>
              </tr>
          </tbody></table>
        </body>
        </html>
      `,
    });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, broadcastId: data?.id }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}