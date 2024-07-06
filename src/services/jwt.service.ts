
import { verify, sign } from "jsonwebtoken";
import path from "path";
import fs from "fs";
const publicKeyPath = path.join(__dirname, "../../public_key.pem")
const publicKey = fs.readFileSync(publicKeyPath, 'utf8')
const privateKeyPath = path.join(__dirname, "../../private_key.pem")
const privateKey = fs.readFileSync(privateKeyPath, 'utf8')

export function generateToken(data: any) {
  return sign(data, privateKey, {algorithm: 'RS256'});
}

export function generateRefreshToken(data: any) {
  return sign(data, privateKey, {algorithm: 'RS256'});
}

export function checkToken(data: any) {
  try {
    return verify(data, publicKey, {algorithms: ['RS256']});
  } catch (e) {
    return false;
  }
}