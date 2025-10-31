import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log('🔍 Environment Check:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '✅ Set (hidden)' : '❌ NOT SET');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Email Configuration Error:', error.message);
  } else {
    console.log('✅ Email server is ready!');
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, comments } = req.body;

  if (!name || !email || !phone || !comments) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Email to company
  const companyMailOptions = {
    from: process.env.EMAIL_USER,
    to: 'info@MastermindWeb.in',
    subject: `New Contact Form Submission - ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #0a0a0a;">
        <div style="max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 45px 35px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; filter: blur(60px);"></div>
            <h1 style="margin: 0; font-size: 36px; font-weight: 900; letter-spacing: -2px; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
              💬 NEW CONTACT INQUIRY
            </h1>
            <p style="margin: 12px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.95); letter-spacing: 0.5px;">
              MasterMind Web Developers • Contact Portal
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 45px 35px;">
            
            <!-- Contact Badge -->
            <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05)); border: 2px solid #EF4444; border-radius: 20px; padding: 25px; text-align: center; margin-bottom: 35px; box-shadow: 0 8px 25px rgba(239, 68, 68, 0.2);">
              <p style="margin: 0 0 8px 0; font-size: 11px; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 3px; font-weight: 800;">CONTACT FORM SUBMISSION</p>
              <h2 style="margin: 0; color: #EF4444; font-size: 28px; font-weight: 900; letter-spacing: -1px;">Message from ${name}</h2>
            </div>

            <!-- Personal Information -->
            <div style="background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
              <h3 style="color: #EF4444; margin: 0 0 25px 0; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 28px;">👤</span> Contact Information
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Full Name:</strong>
                  </td>
                  <td style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.8); font-size: 15px; text-align: right;">
                    ${name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Email:</strong>
                  </td>
                  <td style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: right;">
                    <a href="mailto:${email}" style="color: #EF4444; text-decoration: none; font-weight: 700; font-size: 15px;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px 0;">
                    <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Phone:</strong>
                  </td>
                  <td style="padding: 15px 0; text-align: right;">
                    <a href="tel:${phone}" style="color: #EF4444; text-decoration: none; font-weight: 700; font-size: 15px;">${phone}</a>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Message -->
            <div style="background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
              <h3 style="color: #EF4444; margin: 0 0 20px 0; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 28px;">✉️</span> Message
              </h3>
              <div style="background: rgba(255, 255, 255, 0.04); border-left: 4px solid #EF4444; border-radius: 12px; padding: 25px; line-height: 1.8; color: rgba(255, 255, 255, 0.85); font-size: 15px; word-wrap: break-word;">
                ${comments.replace(/\n/g, '<br>')}
              </div>
            </div>

            <!-- Timestamp -->
            <div style="background: rgba(255, 255, 255, 0.04); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.08); padding: 20px; text-align: center;">
              <p style="margin: 0; color: rgba(255, 255, 255, 0.6); font-size: 14px;">
                📅 Received on: <strong style="color: rgba(255, 255, 255, 0.8);">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</strong>
              </p>
            </div>

          </div>

          <!-- Footer -->
          <div style="padding: 35px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.3);">
            <p style="margin: 0 0 12px 0; color: #EF4444; font-size: 18px; font-weight: 900; letter-spacing: -0.5px;">
              MasterMind Web Developers
            </p>
            <p style="margin: 0 0 6px 0; color: rgba(255, 255, 255, 0.5); font-size: 13px; font-weight: 600;">
              Building the future of digital marketing
            </p>
            <p style="margin: 0; color: rgba(255, 255, 255, 0.35); font-size: 12px; letter-spacing: 0.5px;">
              Pune, India
            </p>
          </div>

        </div>
      </body>
      </html>
    `
  };

  // Email to user (confirmation)
  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'We Received Your Message - MasterMind Web Developers',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #0a0a0a;">
        <div style="max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 55px 35px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -80px; right: -80px; width: 250px; height: 250px; background: rgba(255,255,255,0.1); border-radius: 50%; filter: blur(80px);"></div>
            <h1 style="margin: 0; font-size: 38px; font-weight: 900; letter-spacing: -2px; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
              Message Received! 🎉
            </h1>
            <p style="margin: 18px 0 0 0; font-size: 17px; color: rgba(255, 255, 255, 0.95); letter-spacing: 0.3px;">
              Thank you for reaching out to us
            </p>
          </div>

          <!-- Content -->
          <div style="padding: 45px 35px;">
            
            <!-- Greeting -->
            <div style="text-align: center; margin-bottom: 35px;">
              <h2 style="margin: 0 0 18px 0; font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: -1px;">
                Hi ${name}! 👋
              </h2>
              <p style="margin: 0; font-size: 16px; line-height: 1.7; color: rgba(255, 255, 255, 0.75);">
                We've successfully received your message and will get back to you soon.
              </p>
            </div>

            <!-- Summary -->
            <div style="background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
              <h3 style="color: #EF4444; margin: 0 0 25px 0; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 28px;">📋</span> Your Message Summary
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Name:</strong>
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: right;">
                    <span style="color: rgba(255, 255, 255, 0.8); font-size: 15px;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Email:</strong>
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: right;">
                    <a href="mailto:${email}" style="color: #EF4444; text-decoration: none; font-weight: 700; font-size: 15px;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                    <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Phone:</strong>
                  </td>
                  <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: right;">
                    <a href="tel:${phone}" style="color: #EF4444; text-decoration: none; font-weight: 700; font-size: 15px;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 0;">
                    <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Submitted:</strong>
                  </td>
                  <td style="padding: 14px 0; color: rgba(255, 255, 255, 0.75); font-size: 14px; text-align: right;">
                    ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </td>
                </tr>
              </table>
            </div>

            <!-- What's Next -->
            <div style="background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
              <h3 style="color: #EF4444; margin: 0 0 25px 0; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 28px;">🚀</span> What Happens Next?
              </h3>
              <ul style="margin: 0; padding-left: 24px; line-height: 1.9; color: rgba(255, 255, 255, 0.75); font-size: 15px;">
                <li style="margin-bottom: 12px;">Our team will review your message carefully</li>
                <li style="margin-bottom: 12px;">We'll respond within <strong style="color: #EF4444;">24-48 hours</strong></li>
                <li style="margin-bottom: 12px;">Check your email regularly for our response</li>
                <li>Feel free to reach out anytime with questions</li>
              </ul>
            </div>

            <!-- Success Badge -->
            <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.05)); border: 2px solid #22C55E; border-radius: 20px; padding: 25px; text-align: center; margin-bottom: 30px; box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);">
              <p style="margin: 0; color: #22C55E; font-weight: 900; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 12px;">
                <span style="font-size: 24px;">✅</span> Your message has been successfully submitted!
              </p>
            </div>

            <!-- Contact Info -->
            <div style="text-align: center; padding: 28px; background: rgba(255, 255, 255, 0.04); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.08);">
              <p style="margin: 0 0 18px 0; color: rgba(255, 255, 255, 0.6); font-size: 14px; font-weight: 600;">
                Need something urgent?
              </p>
              <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;">
                <a href="mailto:info@mastermindweb.in" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(239, 68, 68, 0.1); color: #EF4444; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 14px; border: 1px solid rgba(239, 68, 68, 0.3);">
                  <span style="font-size: 18px;">📧</span> info@mastermindweb.in
                </a>
                <a href="tel:7385855808" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(239, 68, 68, 0.1); color: #EF4444; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 14px; border: 1px solid rgba(239, 68, 68, 0.3);">
                  <span style="font-size: 18px;">📞</span> 73858 55808
                </a>
              </div>
            </div>

          </div>

          <!-- Footer -->
          <div style="padding: 38px 35px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.3);">
            <p style="margin: 0 0 12px 0; color: #EF4444; font-size: 20px; font-weight: 900; letter-spacing: -0.5px;">
              MasterMind Web Developers
            </p>
            <p style="margin: 0 0 6px 0; color: rgba(255, 255, 255, 0.5); font-size: 14px; font-weight: 600;">
              Building the future of digital marketing
            </p>
            <p style="margin: 0; color: rgba(255, 255, 255, 0.35); font-size: 12px; letter-spacing: 0.5px;">
              Pune, India
            </p>
          </div>

        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(companyMailOptions);
    console.log('✅ Company contact email SENT');
    
    await transporter.sendMail(userMailOptions);
    console.log('✅ User contact confirmation email SENT');
    
    res.json({ success: true, message: 'Message sent successfully! Check your email for confirmation.' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
});

app.post('/api/apply', upload.single('resume'), async (req, res) => {
  console.log('\n📥 NEW APPLICATION RECEIVED');
  console.log('Name:', req.body.name);
  console.log('Email:', req.body.email);
  console.log('Role:', req.body.role);
  console.log('File:', req.file ? req.file.originalname : 'NO FILE');

  try {
    const { name, email, phone, role, portfolio, learning1, learning2, learning3 } = req.body;

    if (!name || !email || !phone || !role || !learning1 || !learning2 || !learning3) {
      console.log('❌ Validation failed');
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    if (!req.file) {
      console.log('❌ No resume file');
      return res.status(400).json({ success: false, message: 'Resume PDF is required' });
    }

    console.log('✅ Validation passed');

    const companyMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'info@MastermindWeb.in',
      subject: `${role} - ${name} - Pune (Ready to Adapt AI)`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #0a0a0a;">
          <div style="max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 45px 35px; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%; filter: blur(60px);"></div>
              <h1 style="margin: 0; font-size: 36px; font-weight: 900; letter-spacing: -2px; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                🎯 NEW APPLICATION
              </h1>
              <p style="margin: 12px 0 0 0; font-size: 16px; color: rgba(255, 255, 255, 0.95); letter-spacing: 0.5px;">
                MasterMind Web Developers • Career Portal
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 45px 35px;">
              
              <!-- Position Badge -->
              <div style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05)); border: 2px solid #EF4444; border-radius: 20px; padding: 25px; text-align: center; margin-bottom: 35px; box-shadow: 0 8px 25px rgba(239, 68, 68, 0.2);">
                <p style="margin: 0 0 8px 0; font-size: 11px; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 3px; font-weight: 800;">POSITION APPLIED FOR</p>
                <h2 style="margin: 0; color: #EF4444; font-size: 28px; font-weight: 900; letter-spacing: -1px;">${role}</h2>
              </div>

              <!-- Personal Information -->
              <div style="background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                <h3 style="color: #EF4444; margin: 0 0 25px 0; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 28px;">👤</span> Personal Information
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Full Name:</strong>
                    </td>
                    <td style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); color: rgba(255, 255, 255, 0.8); font-size: 15px; text-align: right;">
                      ${name}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Email:</strong>
                    </td>
                    <td style="padding: 15px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: right;">
                      <a href="mailto:${email}" style="color: #EF4444; text-decoration: none; font-weight: 700; font-size: 15px;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 15px 0;">
                      <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Phone:</strong>
                    </td>
                    <td style="padding: 15px 0; text-align: right;">
                      <a href="tel:${phone}" style="color: #EF4444; text-decoration: none; font-weight: 700; font-size: 15px;">${phone}</a>
                    </td>
                  </tr>
                </table>
              </div>

              ${portfolio ? `
              <!-- Portfolio -->
              <div style="background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                <h3 style="color: #EF4444; margin: 0 0 20px 0; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 28px;">💼</span> Portfolio & Work
                </h3>
                <a href="${portfolio}" style="display: inline-block; background: linear-gradient(135deg, #EF4444, #DC2626); color: #fff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 15px; box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4); transition: all 0.3s ease;">
                  🔗 View Portfolio
                </a>
              </div>
              ` : ''}

              <!-- Recent Learnings -->
              <div style="background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                <h3 style="color: #EF4444; margin: 0 0 25px 0; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 28px;">📚</span> 3 Recent Learnings (Last 90 Days)
                </h3>
                
                <div style="margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #EF4444, #DC2626); color: #fff; padding: 10px 20px; border-radius: 10px; display: inline-block; font-size: 11px; font-weight: 900; margin-bottom: 12px; letter-spacing: 2px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);">
                    LEARNING 1
                  </div>
                  <p style="margin: 0; padding: 20px; background: rgba(255, 255, 255, 0.04); border-left: 4px solid #EF4444; border-radius: 12px; line-height: 1.7; color: rgba(255, 255, 255, 0.85); font-size: 15px;">
                    ${learning1}
                  </p>
                </div>

                <div style="margin-bottom: 20px;">
                  <div style="background: linear-gradient(135deg, #EF4444, #DC2626); color: #fff; padding: 10px 20px; border-radius: 10px; display: inline-block; font-size: 11px; font-weight: 900; margin-bottom: 12px; letter-spacing: 2px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);">
                    LEARNING 2
                  </div>
                  <p style="margin: 0; padding: 20px; background: rgba(255, 255, 255, 0.04); border-left: 4px solid #EF4444; border-radius: 12px; line-height: 1.7; color: rgba(255, 255, 255, 0.85); font-size: 15px;">
                    ${learning2}
                  </p>
                </div>

                <div>
                  <div style="background: linear-gradient(135deg, #EF4444, #DC2626); color: #fff; padding: 10px 20px; border-radius: 10px; display: inline-block; font-size: 11px; font-weight: 900; margin-bottom: 12px; letter-spacing: 2px; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);">
                    LEARNING 3
                  </div>
                  <p style="margin: 0; padding: 20px; background: rgba(255, 255, 255, 0.04); border-left: 4px solid #EF4444; border-radius: 12px; line-height: 1.7; color: rgba(255, 255, 255, 0.85); font-size: 15px;">
                    ${learning3}
                  </p>
                </div>
              </div>

              <!-- Resume Notice -->
              <div style="background: linear-gradient(135deg, rgba(255, 193, 7, 0.2), rgba(255, 193, 7, 0.05)); border: 2px solid #FFC107; border-radius: 20px; padding: 25px; text-align: center; box-shadow: 0 6px 20px rgba(255, 193, 7, 0.3);">
                <p style="margin: 0; color: #FFC107; font-weight: 900; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 12px;">
                  <span style="font-size: 24px;">📎</span> Resume PDF Attached
                </p>
              </div>

            </div>

            <!-- Footer -->
            <div style="padding: 35px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.3);">
              <p style="margin: 0 0 12px 0; color: rgba(255, 255, 255, 0.5); font-size: 13px;">
                📅 Application received on: <strong style="color: rgba(255, 255, 255, 0.8);">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</strong>
              </p>
              <p style="margin: 0; color: rgba(255, 255, 255, 0.35); font-size: 12px; letter-spacing: 0.5px;">
                MasterMind Web Developers • Pune, India
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
      attachments: [{
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: 'application/pdf'
      }]
    };

    const applicantMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Application Received - ${role} Position at MasterMind Web Developers`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #0a0a0a;">
          <div style="max-width: 650px; margin: 0 auto; background: linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%); padding: 55px 35px; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: -80px; right: -80px; width: 250px; height: 250px; background: rgba(255,255,255,0.1); border-radius: 50%; filter: blur(80px);"></div>
              <h1 style="margin: 0; font-size: 38px; font-weight: 900; letter-spacing: -2px; color: #ffffff; text-shadow: 0 2px 10px rgba(0,0,0,0.2);">
                Application Received!
              </h1>
              <p style="margin: 18px 0 0 0; font-size: 17px; color: rgba(255, 255, 255, 0.95); letter-spacing: 0.3px;">
                Thank you for applying to MasterMind Web Developers
              </p>
            </div>

            <!-- Content -->
            <div style="padding: 45px 35px;">
              
              <!-- Greeting -->
              <div style="text-align: center; margin-bottom: 35px;">
                <h2 style="margin: 0 0 18px 0; font-size: 28px; font-weight: 900; color: #ffffff; letter-spacing: -1px;">
                  Hi ${name}! 👋
                </h2>
                <p style="margin: 0; font-size: 16px; line-height: 1.7; color: rgba(255, 255, 255, 0.75);">
                  We've successfully received your application for the<br>
                  <strong style="color: #EF4444; font-size: 18px;">${role}</strong> position.
                </p>
              </div>

              <!-- Application Summary -->
              <div style="background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                <h3 style="color: #EF4444; margin: 0 0 25px 0; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 28px;">📋</span> Your Application Summary
                </h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Position:</strong>
                    </td>
                    <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: right;">
                      <span style="color: #EF4444; font-weight: 800; font-size: 15px;">${role}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Email:</strong>
                    </td>
                    <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: right;">
                      <a href="mailto:${email}" style="color: #EF4444; text-decoration: none; font-weight: 700; font-size: 15px;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
                      <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Phone:</strong>
                    </td>
                    <td style="padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.08); text-align: right;">
                      <a href="tel:${phone}" style="color: #EF4444; text-decoration: none; font-weight: 700; font-size: 15px;">${phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 14px 0;">
                      <strong style="color: rgba(255, 255, 255, 0.95); font-size: 15px;">Submitted:</strong>
                    </td>
                    <td style="padding: 14px 0; color: rgba(255, 255, 255, 0.75); font-size: 14px; text-align: right;">
                      ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- What's Next -->
              <div style="background: rgba(255, 255, 255, 0.06); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 30px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">
                <h3 style="color: #EF4444; margin: 0 0 25px 0; font-size: 20px; font-weight: 900; display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 28px;">🚀</span> What Happens Next?
                </h3>
                <ul style="margin: 0; padding-left: 24px; line-height: 1.9; color: rgba(255, 255, 255, 0.75); font-size: 15px;">
                  <li style="margin-bottom: 12px;">Our team will carefully review your application and resume</li>
                  <li style="margin-bottom: 12px;">If your profile matches our requirements, we'll reach out within <strong style="color: #EF4444;">5-7 business days</strong></li>
                  <li style="margin-bottom: 12px;">Shortlisted candidates will be contacted via email or phone</li>
                  <li>Make sure to check your email regularly (including spam folder)</li>
                </ul>
              </div>

              <!-- Success Badge -->
              <div style="background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.05)); border: 2px solid #22C55E; border-radius: 20px; padding: 25px; text-align: center; margin-bottom: 30px; box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);">
                <p style="margin: 0; color: #22C55E; font-weight: 900; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 12px;">
                  <span style="font-size: 24px;">✅</span> Your application has been successfully submitted!
                </p>
              </div>

              <!-- Contact Info -->
              <div style="text-align: center; padding: 28px; background: rgba(255, 255, 255, 0.04); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.08);">
                <p style="margin: 0 0 18px 0; color: rgba(255, 255, 255, 0.6); font-size: 14px; font-weight: 600;">
                  Have questions? Feel free to reach out:
                </p>
                <div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;">
                  <a href="mailto:info@mastermindweb.in" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(239, 68, 68, 0.1); color: #EF4444; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 14px; border: 1px solid rgba(239, 68, 68, 0.3);">
                    <span style="font-size: 18px;">📧</span> info@mastermindweb.in
                  </a>
                  <a href="tel:7385855808" style="display: inline-flex; align-items: center; gap: 8px; background: rgba(239, 68, 68, 0.1); color: #EF4444; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 14px; border: 1px solid rgba(239, 68, 68, 0.3);">
                    <span style="font-size: 18px;">📞</span> 73858 55808
                  </a>
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="padding: 38px 35px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.08); background: rgba(0, 0, 0, 0.3);">
              <p style="margin: 0 0 12px 0; color: #EF4444; font-size: 20px; font-weight: 900; letter-spacing: -0.5px;">
                MasterMind Web Developers
              </p>
              <p style="margin: 0 0 6px 0; color: rgba(255, 255, 255, 0.5); font-size: 14px; font-weight: 600;">
                Building the future of digital marketing
              </p>
              <p style="margin: 0; color: rgba(255, 255, 255, 0.35); font-size: 12px; letter-spacing: 0.5px;">
                Pune, India
              </p>
            </div>

          </div>
        </body>
        </html>
      `
    };

    console.log('📤 Sending company email...');
    try {
      const companyResult = await transporter.sendMail(companyMailOptions);
      console.log('✅ Company email SENT!', companyResult.messageId);
    } catch (companyError) {
      console.error('❌ COMPANY EMAIL FAILED:', companyError.message);
      throw new Error(`Company email failed: ${companyError.message}`);
    }

    console.log('📤 Sending applicant email...');
    try {
      const applicantResult = await transporter.sendMail(applicantMailOptions);
      console.log('✅ Applicant email SENT!', applicantResult.messageId);
    } catch (applicantError) {
      console.error('⚠️ APPLICANT EMAIL FAILED:', applicantError.message);
    }

    console.log('✅ APPLICATION COMPLETE\n');

    res.json({
      success: true,
      message: 'Application submitted successfully! Check your email for confirmation.'
    });

  } catch (error) {
    console.error('❌ APPLICATION ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit application. Please try again.'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!', emailConfigured: !!process.env.EMAIL_USER });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email: ${process.env.EMAIL_USER || '❌ NOT CONFIGURED'}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health\n`);
});
