import nodemailer from 'nodemailer';
import getCurrentUser from '../actions/getCurrentUser';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export async function sendVerificationEmail(to: string, token: string) {

    const verificationLink = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}`;
    const currentUser = await getCurrentUser()

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Verify your email address',
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Hi, ${currentUser?.name}</h2>
            <p style="color: #666;">Thank you for creating an account with us.</p>
            <p style="color: #666;">Kindly verify your email address to complete your registration.</p>
            <div style="text-align: center; margin-top: 30px;">
                <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 14px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 4px; font-size: 16px;">
                    Verify Your Email
                </a>
            </div>
            <p style="color: #999; margin-top: 30px; font-size: 12px;">If you didn't create an account, please ignore this email.</p>
        </div>
    `,
    });
}