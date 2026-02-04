export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { formData, userType } = req.body;

    // Validate required fields
    if (!formData.email || !formData.phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create email content
    let emailContent = `New ${userType} waitlist submission:\n\n`;
    
    // Add form data
    Object.entries(formData).forEach(([key, value]) => {
      const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      emailContent += `${formattedKey}: ${value}\n`;
    });
    
    emailContent += `\nSubmitted at: ${new Date().toLocaleString()}`;
    emailContent += `\nUser Type: ${userType}`;

    // Import nodemailer
    const nodemailer = require('nodemailer');

    // Create transporter (Gmail - easier alternative)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER || 'your-gmail@gmail.com',
        pass: process.env.GMAIL_PASS || 'your-app-password',
      },
    });

    // Microsoft 365 (if you can enable SMTP auth):
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'your-email@company.com',
        pass: process.env.SMTP_PASS || 'your-app-password',
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });
    */

    // Email options
    const mailOptions = {
      from: `"Rine Waitlist" <${process.env.GMAIL_USER || 'your-gmail@gmail.com'}>`,
      to: 'adetoun@gabrinesolutions.com',
      subject: `New ${userType} waitlist submission`,
      text: emailContent,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully to obafemisope438@gmail.com');

    res.status(200).json({ 
      message: 'Form submitted successfully',
      received: {
        email: formData.email,
        userType: userType,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
}
