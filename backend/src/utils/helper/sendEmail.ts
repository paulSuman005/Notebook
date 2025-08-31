import nodemailer from 'nodemailer';

interface SendEmailParams {
    email: string;
    subject: string;
    message: string;
}

const sendEmail = async ({ email, subject, message }: SendEmailParams): Promise<void> => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD
            }
        });

        transporter.verify((error, success) => {
            if (error) {
                console.error('SMTP verification error:', error);
            } else {
                console.log('SMTP connection successful!');
            }
        });

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject,
            html: message
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendEmail;
