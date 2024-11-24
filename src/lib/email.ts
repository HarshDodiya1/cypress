import nodemailer from "nodemailer";
import { config } from "../../config";

const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: parseInt(config.SMTP_PORT || "587"),
  secure: config.SMTP_SECURE === "true",
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASSWORD,
  },
});

export async function sendVerificationEmail(
  to: string,
  verificationLink: string
) {
  await transporter.sendMail({
    from: config.SMTP_FROM,
    to,
    subject: "Verify your email",
    html: `
      <h1>Email Verification</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">Verify Email</a>
    `,
  });
}
