import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export async function sendVerificationEmail(to: string, name: string, token: string) {
    const userName = name;

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Welcome to iRENT Services!',
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome Email</title>
             <style>
                @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
                body {
                    font-family: 'Nunito', sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background-color: #4CAF50; color: white; text-align: center; padding: 10px;">
                    <h1>Welcome to iRENT Services!</h1>
                </div>
               <div style="background-color: white; padding: 20px; border-radius: 5px;">
                    <h2>Hello ${userName},</h2>
                    <p>Congratulations on creating your account with us!</p>
                    <p>We're excited to have you on board. If you have any questions or need assistance, please don't hesitate to reach out.</p>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 0.8em; color: #666;">
                    <p>This is an automated message, please do not reply to this email.</p>
                    <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
        `,
    });
}
