export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
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

    // Map the frontend field names to more readable labels
    const fieldLabels: Record<string, string> = {
      q1: 'Current Role(s)',
      q2: 'Current City',
      q3: 'Willing to Relocate',
      q4: 'Preferred Work Environment(s)',
      q5: 'Dream Job Description',
      q6: 'Open to Internship',
      q7: 'Preferred Communication Method(s)',
      q8: 'Primary Motivation',
      q9: 'Willing to Work Weekends',
      q10: 'Desired Benefits',
      q11: 'Expected Salary Range',
      q12: 'Currently Studying',
      q13: 'Additional Comments',
      q14: 'Preferred Contact Method',
      q15: 'Contact Information',
      q16: 'Currently Employed',
      q17: 'Full Name'
    };

    // Map option values to their display text
    const optionTexts: Record<string, Record<string, string>> = {
      q1: {
        'A': 'Student',
        'B': 'Professional',
        'C': 'Freelancer',
        'D': 'Entrepreneur'
      },
      q4: {
        'A': 'Office',
        'B': 'Remote',
        'C': 'Hybrid',
        'D': 'Flexible'
      },
      q7: {
        'A': 'Email',
        'B': 'Phone',
        'C': 'Messaging Apps',
        'D': 'In-person'
      },
      q10: {
        'A': 'Health Insurance',
        'B': 'Remote Work',
        'C': 'Bonus Pay',
        'D': 'Vacation Time'
      }
    };

    const getDisplayValue = (question: string, value: string | string[]): string => {
      if (Array.isArray(value)) {
        return value.map(v => optionTexts[question]?.[v] || v).join(', ');
      }
      return optionTexts[question]?.[value] || value;
    };

    const mailContent = `
    <!DOCTYPE html>
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
          flex-wrap: wrap;
        }
        .field-label {
          font-weight: bold;
          min-width: 200px;
          color: #2c3e50;
        }
        .field-value {
          flex: 1;
          min-width: 200px;
        }
        .highlight {
          background-color: #f8f4e5;
          padding: 2px 5px;
          border-radius: 3px;
        }
        @media (max-width: 600px) {
          .field-label, .field-value {
            min-width: 100%;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>New Career Survey Submission</h1>
        
        <div class="section">
          <h2 class="section-title">Personal Information</h2>
          <div class="field">
            <div class="field-label">Full Name:</div>
            <div class="field-value">${formatField(body.q17)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Current Status</h2>
          <div class="field">
            <div class="field-label">${fieldLabels.q1}:</div>
            <div class="field-value">${getDisplayValue('q1', body.q1 || [])}</div>
          </div>
          <div class="field">
            <div class="field-label">${fieldLabels.q16}:</div>
            <div class="field-value">${formatField(body.q16)}</div>
          </div>
          <div class="field">
            <div class="field-label">${fieldLabels.q12}:</div>
            <div class="field-value">${formatField(body.q12)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Location Preferences</h2>
          <div class="field">
            <div class="field-label">${fieldLabels.q2}:</div>
            <div class="field-value">${formatField(body.q2)}</div>
          </div>
          <div class="field">
            <div class="field-label">${fieldLabels.q3}:</div>
            <div class="field-value">${formatField(body.q3)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Work Preferences</h2>
          <div class="field">
            <div class="field-label">${fieldLabels.q4}:</div>
            <div class="field-value">${getDisplayValue('q4', body.q4 || [])}</div>
          </div>
          <div class="field">
            <div class="field-label">${fieldLabels.q9}:</div>
            <div class="field-value">${formatField(body.q9)}</div>
          </div>
          <div class="field">
            <div class="field-label">${fieldLabels.q7}:</div>
            <div class="field-value">${getDisplayValue('q7', body.q7 || [])}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Career Goals</h2>
          <div class="field">
            <div class="field-label">${fieldLabels.q5}:</div>
            <div class="field-value highlight">${formatField(body.q5)}</div>
          </div>
          <div class="field">
            <div class="field-label">${fieldLabels.q8}:</div>
            <div class="field-value highlight">${formatField(body.q8)}</div>
          </div>
          <div class="field">
            <div class="field-label">${fieldLabels.q6}:</div>
            <div class="field-value">${formatField(body.q6)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Expectations</h2>
          <div class="field">
            <div class="field-label">${fieldLabels.q10}:</div>
            <div class="field-value">${getDisplayValue('q10', body.q10 || [])}</div>
          </div>
          <div class="field">
            <div class="field-label">${fieldLabels.q11}:</div>
            <div class="field-value highlight">${formatField(body.q11)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Contact Information</h2>
          <div class="field">
            <div class="field-label">${fieldLabels.q14}:</div>
            <div class="field-value">${formatField(body.q14)}</div>
          </div>
          <div class="field">
            <div class="field-label">${fieldLabels.q15}:</div>
            <div class="field-value highlight">${formatField(body.q15)}</div>
          </div>
        </div>
        
        <div class="section">
          <h2 class="section-title">Additional Comments</h2>
          <div class="field">
            <div class="field-value">${formatField(body.q13) || 'No additional comments provided'}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;

    const mailOptions = {
      from: GMAIL_USER,
      to: GMAIL_USER,
      subject: `New Survey Submission from ${body.q17 || 'Anonymous'}`,
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