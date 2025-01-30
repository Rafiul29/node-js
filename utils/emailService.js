const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "raficse00@gmail.com",
    pass: "mopnpwogwgzlbfzy",
  },
});

const sendVerificationEmail = async (name, email, code) => {
  const mailOptions = {
    from: "raficse00@gmail.com",
    to: email,
    subject: "OTP Verification",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <title>OTP Verification</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .container { text-align: center; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
            .otp { font-size: 24px; font-weight: bold; color: #333; }
            .footer { margin-top: 20px; font-size: 12px; color: #888; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Hi ${name},</h2>
          <p>Use the following one-time password (OTP) to complete your verification:</p>
          <p class="otp">${code}</p>
          <p>This OTP will be valid for <b>2 minutes</b>.</p>
          <p class="footer">If you didn't request this, please ignore this email.</p>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const res = await transporter.sendMail(mailOptions);

  } catch (error) {
    console.error("Error sending email:", error);

   
    console.error("Error Response:", error.response);

    if (error.response.includes("Invalid recipient")) {
      throw new Error(
        "Email address not found. Please check the email address and try again."
      );
    } else if (error.response.includes("authentication failed")) {
      throw new Error(
        "Authentication failed. Please check your email credentials and try again."
      );
    } else if (error.response.includes("Service unavailable")) {
      throw new Error("Service unavailable. Please try again later.");
    } else {
      throw new Error("Email could not be sent. Please try again later.");
    }
  }
};

module.exports = { sendVerificationEmail };
