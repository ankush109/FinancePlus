const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ankush003.work@gmail.com",
    pass: "wpps xtuo pbpb xoxb",
  },
});

export async function sendResetEmail(email:string, token:string) {
  const resetLink = `http://localhost:3000/profile/reset-password/${token}`;

  await transporter.sendMail({
    from: 'ankush003.work@gmail.com',
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click the link below to reset your password:</p>
           <a href="${resetLink}">Reset Password</a>`,
  });
}

