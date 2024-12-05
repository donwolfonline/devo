import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import nodemailer from 'nodemailer';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'SUPER_ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { subject, html, recipients } = await req.json();

    // Get email settings from database
    const { db } = await connectToDatabase();
    const settings = await db.collection('systemSettings').findOne({});

    if (!settings?.email) {
      return NextResponse.json(
        { error: 'Email settings not configured' },
        { status: 400 }
      );
    }

    const {
      smtpServer,
      smtpPort,
      smtpEncryption,
      senderEmail,
      senderName,
      smtpUsername,
      smtpPassword,
      emailAuthentication
    } = settings.email;

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpServer,
      port: parseInt(smtpPort),
      secure: smtpEncryption === 'ssl',
      auth: emailAuthentication ? {
        user: smtpUsername,
        pass: smtpPassword
      } : undefined
    });

    // Send email
    await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: recipients.join(', '),
      subject,
      html
    });

    // Log email sent
    await db.collection('emailLogs').insertOne({
      timestamp: new Date(),
      subject,
      recipients,
      status: 'sent'
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
