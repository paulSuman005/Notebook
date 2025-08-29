import crypto from "crypto";

export const generateOTP = (length: number = 6): string => {
  console.log("length: ",length);
  const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, "0");
  console.log("otp: ",otp);
  return otp;
};

