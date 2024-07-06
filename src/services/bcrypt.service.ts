import bcrypt from "bcrypt";

export async function generateHash(password: string) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export async function compareHash(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}