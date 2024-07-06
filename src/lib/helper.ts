import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
const publicKeyPath = path.join(__dirname, "../../public_key.pem");
const publicKey = fs.readFileSync(publicKeyPath, "utf8");
const privateKeyPath = path.join(__dirname, "../../private_key.pem");
const privateKey = fs.readFileSync(privateKeyPath, "utf8");
import sgMail from "@sendgrid/mail";
import axios from "axios";
import { checkToken } from "../services/jwt.service";
import prisma from "../utils/prismaInstance";
import { CustomError } from "../helpers/CustomError";
import { generateRandomString } from "../utils/helper";
export function generateJWT(data: any): string {
  return jwt.sign(data, privateKey, { algorithm: "RS256" });
}

export const sendMailUsingSendGrid = async (to, subject, html) => {
  const from = process.env.SENDGRID_EMAIL;
  const msg = {
    from,
    to,
    subject,
    html,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error.toString());
  }
};

export function getDecodedToken(token) {
  return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
}
export const sendMessageToTelegram = async (text, chatId?) => {
  chatId = chatId ?? process.env.TELEGRAM_GROUP_ID;
  const botToken = process.env.NOTIFICATION_BOT_TOKEN;
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    await axios.post(apiUrl, {
      chat_id: chatId,
      text,
    });
    console.log("Telegram message sent to:", chatId);
  } catch (error) {
    console.error(
      `Error sending Telegram message to ${chatId}: ${error.message}`
    );
  }
};

export const getSessionFromReq = async (req) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return null;
    }
    const decodedToken: any = checkToken(token);
    if (!decodedToken) {
      return null;
    }
    const session: any = await prisma.sessions.findFirst({
      where: {
        id: decodedToken?.session_id,
        isExpired: false,
      },
      include: {
        user: {
          include: {
            subscription: {
              include: {
                plans: true,
              },
            },
          },
        },
      },
    });
    return session;
  } catch (e) {
    return null;
  }
};
