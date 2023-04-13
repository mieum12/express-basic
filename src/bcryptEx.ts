import bcrypt from "bcrypt";

async function hashPassword(password: string) {
  //넣은 비번 암호화
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

async function comparePassword(password: string) {
  const isMatched = await bcrypt.compare(
    password,
    "$2b$10$SOomUbeDdeaKHobF40/ADeVAcSTZE/5LHCKtJJ8cnEHb7XfX9Yx0y"
  );
  console.log(isMatched);
}

async function main() {
  const hashedPassword = await hashPassword("123123");
  console.log(hashedPassword);
  comparePassword("123123");
}

main();
