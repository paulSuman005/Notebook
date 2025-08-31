export const generateOTPMessage = (name: string, otp: string) => {
  return {
    subject: "NoteBook - Verify Your OTP",
    html: `
      <div style="font-family: Arial, sans-serif; color: #232323; line-height: 1.6;">
        <div style="max-width: 600px; margin: auto; border: 1px solid #333333; border-radius: 8px; padding: 20px; background-color: #FFFFFF;">
          <h2 style="color: #232323;">Hello ${name},</h2>
          <p style="color: #969696; font-size: 16px;">
            Thank you for signing up on <strong>NoteBook</strong>. To complete your registration, please verify your email address using the OTP below:
          </p>
          <div style="margin: 20px 0; text-align: center;">
            <span style="
              display: inline-block;
              padding: 15px 25px;
              font-size: 20px;
              font-weight: bold;
              color: #FFFFFF;
              background-color: #367AFF;
              border-radius: 6px;
              letter-spacing: 4px;
            ">
              ${otp}
            </span>
          </div>
          <p style="color: #969696; font-size: 14px;">
            This OTP is valid for 15 minutes. Please do not share it with anyone. If you did not request this, please ignore this email.
          </p>
          <p style="color: #232323; font-size: 16px;">Best regards,<br />The NoteBook Team</p>
        </div>
      </div>
    `,
  };
};
