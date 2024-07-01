import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export async function sendVerificationEmail(to: string, token: string, name: string) {
    const verificationLink = `${process.env.NEXTAUTH_URL}/verify-email`;

    const userName = name;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Verify Your Email Address',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Verification</title>
            <style>
                body {
                    font-family: Nunito, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }
                .header {
                    background-color: #4CAF50;
                    color: white;
                    text-align: center;
                    padding: 10px;
                }
                .content {
                    background-color: white;
                    padding: 20px;
                    border-radius: 5px;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #4CAF50;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 0.8em;
                    color: #666;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Verification</h1>
                </div>
               <div class="content">
                    <h2>Hello ${userName},</h2>
                    <p>Thank you for signing up! To complete your registration and ensure the security of your account, please verify your email address by clicking the button below:</p>
                    <a href="${verificationLink}" class="button">Verify Email Address</a>
                    <p>If you didn't create an account with us, please disregard this email.</p>
                    <p>If you're having trouble clicking the button, copy and paste the following link into your web browser:</p>
                </div>
                <div class="footer">
                    <p>This is an automated message, please do not reply to this email.</p>
                    <p>&copy; ${new Date().getFullYear()} iRENT Services. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `,
    });
}
