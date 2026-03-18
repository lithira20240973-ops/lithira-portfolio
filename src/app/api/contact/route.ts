import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend dynamically
export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_dummy') {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is missing. Please add it to your .env.local file. Get one at resend.com' },
        { status: 401 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Determine the verified FROM email address (defaults to onboarding@resend.dev if not set)
    // NOTE: Sending an auto-reply to an arbitrary user email REQUIRES a verified custom domain on Resend.
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    // The owner's email address where inquiries should go
    const ownerEmail = 'lithiratk@gmail.com';

    // 1. Send the primary email TO YOU (Lithira) with the message content
    const dataPrimary = await resend.emails.send({
      from: `Contact Terminal <${fromEmail}>`,
      to: [ownerEmail],
      replyTo: email,
      subject: `New Transmission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (dataPrimary.error) {
       console.error("Resend Error:", dataPrimary.error);
       return NextResponse.json({ error: dataPrimary.error?.message || "Failed to send email via Resend API" }, { status: 400 });
    }

    // 2. Send the auto-reply email TO THE SENDER
    // This will only work if the Resend account has a verified domain, otherwise it silently fails or returns an error.
    try {
      await resend.emails.send({
        from: `Lithira Kalubowila <${fromEmail}>`,
        to: [email],
        subject: `Transmission Received - Lithira Kalubowila`,
        text: `Hello ${name},\n\nYour transmission has been successfully received by my terminal.\n\nI have received your message:\n"${message}"\n\nI will review it and get back to you shortly.\n\nBest regards,\nLithira Kalubowila\nWeb Developer & Creative Media`,
      });
    } catch (e) {
      // We don't fail the whole request if the auto-reply fails (e.g., due to unverified domain on free tier).
      console.warn("Auto-reply to sender failed. Ensure you have a verified custom domain on Resend.", e);
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
