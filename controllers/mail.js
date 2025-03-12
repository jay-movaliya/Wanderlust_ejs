const nodemailer = require("nodemailer");

// Configure the transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Correct SMTP host for Gmail
    port: 465, // Use 465 for SSL or 587 for TLS
    secure: true, // true for SSL (port 465), false for TLS (port 587)
    auth: {
        user: "jaymovaliya72@gmail.com", // Your email address
        pass: "enxj qrtr rqja dbnx", // Your app password (not your regular password)
    },
});

// Define a reusable sendMail function
const sendMail = async (to, subject, message) => {
    try {
        const info = await transporter.sendMail({
            from: '"Wanderlust App" <jaymovaliya72@gmail.com>', // Sender info
            to: to, // Recipient email
            subject: subject, // Email subject
            html: message, // HTML body
        });

        console.log("Email sent successfully:", info.response);
        return { success: true, message: "Email sent successfully!" };
    } catch (err) {
        console.error("Error sending email:", err.message);
        return { success: false, message: "Failed to send email.", error: err.message };
    }
};

const sendOtpEmail = async (email, otp) => {
    try {
        const emailBody = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
            <table align="center" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                    <td align="center" style="background-color: #11288b; padding: 20px;">
                        <h2 style="color: #fff;">Wanderlust</h2>
                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <table width="600px" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 30px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                            <tr>
                                <td align="center" style="font-size: 20px; font-weight: bold;">Verify Your Email Address</td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 20px 0; font-size: 16px;">Use the following OTP to verify your email:</td>
                            </tr>
                            <tr>
                                <td align="center" style="font-size: 24px; font-weight: bold; color: #11288b;">${otp}</td>
                            </tr>
                            <tr>
                                <td align="center" style="padding: 20px 0; font-size: 14px; color: #666;">This OTP is valid for 5 minutes.</td>
                            </tr>
                            <tr>
                                <td align="center" style="padding-top: 20px; font-size: 12px; color: #999;">If you didn’t request this, you can ignore this email.</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>`;

        // Send email using your sendMail function
        await sendMail(email, "Your OTP for Wanderlust Signup", emailBody);
        
        console.log('OTP sent to email:', email);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};


// Export the sendMail function
module.exports = {
    sendOtpEmail
};
