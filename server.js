import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// FIX: Explicitly set the allowed origin for CORS
app.use(cors({
  origin: 'http://localhost:5173' 
}));
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, comments } = req.body;

  if (!name || !email || !phone || !comments) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'info@MastermindWeb.in',
    subject: `New Contact Form - ${name}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong></p>
      <p>${comments}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
