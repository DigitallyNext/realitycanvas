import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Create transporter using GoDaddy SMTP
    const transporter = nodemailer.createTransport({
      host: 'smtpout.secureserver.net',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GODADDY_EMAIL_USER,
        pass: process.env.GODADDY_EMAIL_PASS,
      },
    });

    // Email content for notification to sales team
    const mailOptions = {
      from: process.env.GODADDY_EMAIL_USER,
      to: 'sales@realtycanvas.in',
      subject: '🔔 New Newsletter Subscription - RealtyCanvas',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Newsletter Subscription</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; font-size: 28px;">📧 New Newsletter Subscription</h1>
            <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Someone just subscribed to your newsletter!</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #1f2937; margin-top: 0;">📋 Subscription Details</h2>
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0;"><strong>Email Address:</strong> ${email}</p>
              <p style="margin: 10px 0 0 0;"><strong>Subscription Date:</strong> ${new Date().toLocaleString()}</p>
              <p style="margin: 10px 0 0 0;"><strong>Source:</strong> RealtyCanvas Website Newsletter</p>
            </div>
          </div>
          
          <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #0277bd; margin-top: 0;">📈 Next Steps</h3>
            <ul style="color: #01579b; padding-left: 20px;">
              <li>Add this email to your newsletter mailing list</li>
              <li>Send a welcome email with property updates</li>
              <li>Include them in your weekly property digest</li>
              <li>Consider sending exclusive deals and offers</li>
            </ul>
          </div>
          
          <div style="text-align: center; padding: 20px; background: #f1f5f9; border-radius: 8px;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">This notification was sent from RealtyCanvas Newsletter System</p>
            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 12px;">Timestamp: ${new Date().toISOString()}</p>
          </div>
        </body>
        </html>
      `,
      text: `
        New Newsletter Subscription - RealtyCanvas
        
        Subscription Details:
        Email Address: ${email}
        Subscription Date: ${new Date().toLocaleString()}
        Source: RealtyCanvas Website Newsletter
        
        Next Steps:
        - Add this email to your newsletter mailing list
        - Send a welcome email with property updates
        - Include them in your weekly property digest
        - Consider sending exclusive deals and offers
        
        This notification was sent from RealtyCanvas Newsletter System
        Timestamp: ${new Date().toISOString()}
      `
    };

    // Send email notification
    await transporter.sendMail(mailOptions);

    console.log(`Newsletter subscription received from: ${email}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter' 
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ 
      error: 'Failed to process newsletter subscription' 
    }, { status: 500 });
  }
}