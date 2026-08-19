import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

function clean(value: unknown, maxLength = 5_000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = clean(body.name, 120);
    const email = clean(body.email, 254);
    const message = clean(body.message);
    if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Please provide a valid name, email, and message.' }, { status: 400 });

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.CONTACT_RECIPIENT ?? gmailUser;
    if (!gmailUser || !gmailAppPassword || !recipient) {
      console.error('Contact form mail settings are not configured.');
      return NextResponse.json({ error: 'The contact form is temporarily unavailable.' }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: gmailUser, pass: gmailAppPassword } });
    await transporter.sendMail({ from: `Portfolio contact form <${gmailUser}>`, to: recipient, replyTo: email, subject: `Portfolio message from ${name}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unable to send contact form email:', error);
    return NextResponse.json({ error: 'Unable to send your message right now. Please try again later.' }, { status: 500 });
  }
}
