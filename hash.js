// hash.js
import bcrypt from "bcrypt";

async function run() {
  const password = "crtgo"; // replace with your password
  const hash = await bcrypt.hash(password, 12);
  console.log(hash);
}

run();
