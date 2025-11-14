// Step 1: Import the necessary library
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Fix for using 'import' with console.log in some environments (optional but good practice)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// --- 🗝️ YOUR SAVED AUTHENTICATION LOGIC ---

// The secret key you provided. This is the super-secret ingredient!
const JWT_SECRET_KEY =
  "0WKR/oUsrl/6qXgmINgDS6wL0pZ/WIHK0dG+JyHFKUh/w1F9A1a5EvXuemFt5ROhOlXPplojtr54iZ8x4Q4yMg==";

const ACCESS_AUTH_EXPIRES = "10m";
const REFRESH_AUTH_EXPIRES = "7d";
const AUTHENTICATION_EXPIRES = "5m";

export const AccessSign = ({ id, role, tenant }) => {
  const payload = {
    sub: id,
    role: role,
    ref: tenant,
  };
  const options = {
    expiresIn: ACCESS_AUTH_EXPIRES,
    algorithm: "HS256",
  };
  return jwt.sign(payload, JWT_SECRET_KEY, options);
};
export const RefreshAccessSign = ({ id, role }) => {
  const payload = {
    sub: id,
    role: role,
  };
  const options = {
    expiresIn: REFRESH_AUTH_EXPIRES,
    algorithm: "HS256",
  };
  return jwt.sign(payload, JWT_SECRET_KEY, options);
};
export const VerifyAccessSign = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

export const AuthenticationAccessSign = ({ id, role, tenant }) => {
  const payload = {
    sub: id,
    role: role,
    ref: tenant,
    tar: "Linking",
  };
  const options = {
    expiresIn: AUTHENTICATION_EXPIRES,
    algorithm: "HS256",
  };
  return jwt.sign(payload, JWT_SECRET_KEY, options);
};

// --- 🧪 RUNNING THE ISOLATED TEST ---

// 2. The User Data provided by you. This is the 'ID card' data.
const USER_DATA = {
  _id: { $oid: "691672a8667fabb914628544" },
  first_name: "Gibson",
  surname: "Mensah",
  email: "mr.mensahgibson@gmail.com",
  platform_role: "SuperAdmin-SystemUser",
  associated_rootuser_id: { $oid: "69162a83f55dbd4e674b2dd9" },
};

function runTest() {
  console.log("--- Token Generation and Verification Test ---");

  // 3. Prepare the data to put into the token (the payload)
  // We map your user data fields to the fields your AccessSign function expects:
  const tokenPayloadData = {
    // The unique user ID ('sub' in the token)
    id: USER_DATA._id.$oid,
    // The user's role
    role: USER_DATA.platform_role,
    // We will use the 'associated_rootuser_id' as the 'tenant'/'ref'
    // This is often used in distributed systems to scope access!
    tenant: USER_DATA.associated_rootuser_id.$oid,
  };

  console.log(`\n** Input User ID (sub): ${tokenPayloadData.id}`);
  console.log(`** Input Role: ${tokenPayloadData.role}`);
  console.log(`** Input Tenant (ref): ${tokenPayloadData.tenant}`);

  // --- A. CREATE THE TOKEN ---
  console.log("\n[A] ⚙️ Attempting to sign the token...");

  const validToken = AccessSign(tokenPayloadData);

  console.log("\n🥳 Token Successfully Created!");
  console.log("-> Your Valid Token (JWT):");
  console.log(validToken);
  const refreshToken = RefreshAccessSign(tokenPayloadData);

  console.log("\n🥳 Token Successfully Created!");
  console.log("-> Your Valid Refresh Token (JWT):");
  console.log(refreshToken);

  // --- B. VERIFY THE TOKEN ---
  console.log("\n[B] 🔎 Attempting to verify the token...");

  try {
    const decodedPayload = VerifyAccessSign(validToken);
    const decodedId = VerifyAccessSign(refreshToken);

    console.log("\n✅ Verification Successful! The token is valid.");
    console.log("-> Decoded Payload (The secret data unlocked):");

    // This is the clean data that your backend will receive!
    const cleanPayload = {
      sub: decodedPayload.sub,
      role: decodedPayload.role,
      ref: null,
      iat: new Date(decodedPayload.iat * 1000).toLocaleString(), // 'iat' is Issued At Time
      exp: new Date(decodedPayload.exp * 1000).toLocaleString(), // 'exp' is Expiration Time
      // The 'iat' and 'exp' are standard properties added by jwt.sign!
    };
    console.table(cleanPayload);
    
    console.log(decodedId);

    // A final check to make sure the ID we put in is the one we got out.
    if (cleanPayload.sub === tokenPayloadData.id) {
      console.log("🎉 Critical check passed: The subject ID is correct!");
    } else {
      console.log("⚠️ WARNING: Subject ID mismatch!");
    }
  } catch (error) {
    console.log("\n❌ Verification Failed!");
    console.error("Error Type:", error.name);
    console.error("Error Message:", error.message);
  }
}

// Run the main test function
runTest();
