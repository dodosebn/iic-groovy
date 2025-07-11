// app/api/send-survey/route.ts
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Helper function to safely format array or single values
const formatField = (field: any): string => {
  if (field === undefined || field === null) return 'Not specified';
  if (Array.isArray(field)) return field.join(', ');
  return String(field);
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[Request Received]', body);

    const { GMAIL_USER, GMAIL_PASS } = process.env;
    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('[ENV ERROR] Missing Gmail credentials.');
      return NextResponse.json(
        { success: false, message: 'Missing email credentials' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    const mailContent = `
      <h2>New Survey Submission</h2>
      <p><strong>Full Name:</strong> ${formatField(body.fullName)}</p>
      <p><strong>Current Role:</strong> ${formatField(body.currentRole)}</p>
      <p><strong>City:</strong> ${formatField(body.location?.city)}</p>
      <p><strong>Willing to Relocate:</strong> ${formatField(body.location?.willingToRelocate)}</p>
      <p><strong>Work Environment:</strong> ${formatField(body.workPreferences?.environment)}</p>
      <p><strong>Communication Methods:</strong> ${formatField(body.workPreferences?.communication)}</p>
      <p><strong>Weekend Work:</strong> ${formatField(body.workPreferences?.schedule)}</p>
      <p><strong>Dream Job:</strong> ${formatField(body.careerGoals?.dreamJob)}</p>
      <p><strong>Motivation:</strong> ${formatField(body.careerGoals?.motivation)}</p>
      <p><strong>Open to Internship:</strong> ${formatField(body.careerGoals?.openToInternship)}</p>
      <p><strong>Benefits:</strong> ${formatField(body.expectations?.benefits)}</p>
      <p><strong>Salary Range:</strong> ${formatField(body.expectations?.salaryRange)}</p>
      <p><strong>Education Status:</strong> ${formatField(body.educationStatus)}</p>
      <p><strong>Employment Status:</strong> ${formatField(body.employmentStatus)}</p>
      <p><strong>Contact Method:</strong> ${formatField(body.contactInfo?.method)}</p>
      <p><strong>Contact Details:</strong> ${formatField(body.contactInfo?.details)}</p>
      <p><strong>Additional Comments:</strong> ${formatField(body.additionalComments)}</p>
    `;

    const mailOptions = {
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: 'New Career Preferences Survey Response',
      html: mailContent,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('[Email Sent]', result.response);

    return NextResponse.json({ success: true, message: 'Survey submitted successfully!' });
  } catch (error: any) {
    console.error('[SERVER ERROR]', error instanceof Error ? error.stack : error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email', 
        error: error?.message || 'Unknown error',
        // Only include stack in development
        ...(process.env.NODE_ENV === 'development' ? { stack: error?.stack } : {})
      },
      { status: 500 }
    );
  }
}