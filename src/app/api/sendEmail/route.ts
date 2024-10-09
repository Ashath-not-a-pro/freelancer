// app/api/sendEmail/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { subject, description, email } = await request.json();

  try {
    // Configure Nodemailer transport (use your credentials here)
    let transporter = nodemailer.createTransport({
      service: 'gmail', // or another SMTP service
      auth: {
        user: "testmailer770@gmail.com",
        pass: "Ashath-2003",
      },
    });

    // Send email
    await transporter.sendMail({
      from: "testmailer770@gmail.com",
      to: "ashath34@gmail.com",
      subject: subject,
      text: description,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
