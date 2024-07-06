  
import Joi  from "joi";
import crypto from "crypto";

function extendOTPExpiration(currentExpiration: Date): Date {
  const twoMinutesInMs = 5 * 60 * 1000; // convert 2 minutes to milliseconds
  const newExpiration = new Date(currentExpiration.getTime() + twoMinutesInMs);
  return newExpiration;
}

const check_uuid = async (uuidToCheck: string) => {
  const uuidSchema = Joi.string().uuid();
  const result = await uuidSchema.validate(uuidToCheck);

  if (result.error) return false;
  return true;
};

export function generateUniqueFileName(originalFileName: string) {
  // Fayl kengaytmasini ajratib olish
  const extension = originalFileName.split(".").pop();

  // Noyob identifikator yaratish (masalan, MD5 hash)
  const uniqueIdentifier = crypto
    .createHash("md5")
    .update(new Date().toISOString() + Math.random().toString())
    .digest("hex");

  // Noyob fayl nomini qaytarish
  return `${uniqueIdentifier}.${extension}`;
}

export { extendOTPExpiration, check_uuid };