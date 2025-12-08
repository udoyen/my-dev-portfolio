import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      // 1. SENDER: Must be YOU (because you authenticated with your password)
      from: process.env.GMAIL_USER, 
      
      // 2. RECEIVER: Must be YOU (so it arrives in your inbox)
      to: process.env.GMAIL_USER,   
      
      // 3. THE MAGIC: When you hit "Reply", it goes to the VISITOR
      replyTo: email,               
      
      // 4. SUBJECT: Identifies this as a site message
      subject: `New Message from Portfolio: ${name}`,
      
      // 5. CONTENT: The visitor's actual message
      text: `
        You have a new form submission!
        
        From: ${name} (${email})
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Visitor Name:</strong> ${name}</p>
        <p><strong>Visitor Email:</strong> ${email}</p>
        <div style="background: #f0f0f0; padding: 20px; border-radius: 5px;">
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully!" });

  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}