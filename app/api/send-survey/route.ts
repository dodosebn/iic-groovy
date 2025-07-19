export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/store/lib/supabase'; 
import nodemailer from 'nodemailer';

const formatField = (field: any): string => {
  if (field === undefined || field === null) return 'Not specified';
  if (Array.isArray(field)) return field.join(', ');
  return String(field);
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[Request Received]', body);

    const { fullName, currentRole } = body;
    if (!fullName || !currentRole) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { GMAIL_USER, GMAIL_PASS } = process.env;
    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('[ENV ERROR] Missing Gmail credentials.');
      return NextResponse.json(
        { success: false, message: 'Missing email credentials' },
        { status: 500 }
      );
    }

    // Insert into Supabase
    const { error: dbError } = await supabase.from('survey1').insert([
      {
        full_name: body.fullName,
        current_role: body.currentRole,
        location_city: body.location?.city,
        willing_to_relocate: body.location?.willingToRelocate,
        work_environment: body.workPreferences?.environment,
        communication: body.workPreferences?.communication,
        schedule: body.workPreferences?.schedule,
        dream_job: body.careerGoals?.dreamJob,
        motivation: body.careerGoals?.motivation,
        open_to_internship: body.careerGoals?.openToInternship,
        benefits: body.expectations?.benefits,
        salary_range: body.expectations?.salaryRange,
        education_status: body.educationStatus,
        employment_status: body.employmentStatus,
        contact_method: body.contactInfo?.method,
        contact_details: body.contactInfo?.details,
        additional_comments: body.additionalComments,
      },
    ]);

    if (dbError) {
      console.error('[SUPABASE ERROR]', dbError);
      return NextResponse.json(
        { success: false, message: 'Database error', error: dbError.message },
        { status: 500 }
      );
    }

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });
    const mailContent = `
    <html>
    <head>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        h1 {
          color: #2c3e50;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .section {
          margin-bottom: 25px;
          padding: 15px;
          background-color: white;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .section-title {
          color: #3498db;
          margin-top: 0;
          margin-bottom: 15px;
          font-size: 18px;
        }
        .field {
          margin-bottom: 10px;
          display: flex;
        }
        .field-label {
          font-weight: bold;
          min-width: 180px;
          color: #2c3e50;
        }
        .field-value {
          flex: 1;
        }
        .highlight {
          background-color: #f8f4e5;
          padding: 2px 5px;
          border-radius: 3px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Survey Submission</h1>
        
        <div class="section">
          <h2 class="section-title">Basic Information</h2>
          <div class="field">
            <div class="field-label">Full Name:</div>
            <div class="field-value">${formatField(body.fullName)}</div>
          </div>
          <div class="field">
            <div class="field-label">Current Role:</div>
            <div class="field-value">${formatField(body.currentRole)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Location Information</h2>
          <div class="field">
            <div class="field-label">City:</div>
            <div class="field-value">${formatField(body.location?.city)}</div>
          </div>
          <div class="field">
            <div class="field-label">Willing to Relocate:</div>
            <div class="field-value">${formatField(body.location?.willingToRelocate)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Work Preferences</h2>
          <div class="field">
            <div class="field-label">Work Environment:</div>
            <div class="field-value">${formatField(body.workPreferences?.environment)}</div>
          </div>
          <div class="field">
            <div class="field-label">Communication Methods:</div>
            <div class="field-value">${formatField(body.workPreferences?.communication)}</div>
          </div>
          <div class="field">
            <div class="field-label">Weekend Work:</div>
            <div class="field-value">${formatField(body.workPreferences?.schedule)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Career Goals</h2>
          <div class="field">
            <div class="field-label">Dream Job:</div>
            <div class="field-value highlight">${formatField(body.careerGoals?.dreamJob)}</div>
          </div>
          <div class="field">
            <div class="field-label">Motivation:</div>
            <div class="field-value highlight">${formatField(body.careerGoals?.motivation)}</div>
          </div>
          <div class="field">
            <div class="field-label">Open to Internship:</div>
            <div class="field-value">${formatField(body.careerGoals?.openToInternship)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Expectations</h2>
          <div class="field">
            <div class="field-label">Benefits:</div>
            <div class="field-value">${formatField(body.expectations?.benefits)}</div>
          </div>
          <div class="field">
            <div class="field-label">Salary Range:</div>
            <div class="field-value highlight">${formatField(body.expectations?.salaryRange)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Status Information</h2>
          <div class="field">
            <div class="field-label">Education Status:</div>
            <div class="field-value">${formatField(body.educationStatus)}</div>
          </div>
          <div class="field">
            <div class="field-label">Employment Status:</div>
            <div class="field-value">${formatField(body.employmentStatus)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Contact Information</h2>
          <div class="field">
            <div class="field-label">Contact Method:</div>
            <div class="field-value">${formatField(body.contactInfo?.method)}</div>
          </div>
          <div class="field">
            <div class="field-label">Contact Details:</div>
            <div class="field-value highlight">${formatField(body.contactInfo?.details)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Additional Information</h2>
          <div class="field">
            <div class="field-value">${formatField(body.additionalComments) || 'No additional comments provided'}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
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
        message: 'Failed to process survey',
        error: error?.message || 'Unknown error',
        ...(process.env.NODE_ENV === 'development' ? { stack: error?.stack } : {})
      },
      { status: 500 }
    );
  }
}