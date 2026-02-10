/**
 * KESHAVA ELITE - JWT UTILITIES
 * ---------------------------------------------------------
 * Simulated JWT logic for frontend session state.
 * Standard format: [Header].[Payload].[Signature]
 */

/**
 * Generates a mock JWT token from a payload object.
 * @param payload - The user data to be encoded in the token.
 * @returns A base64-encoded string representing the JWT.
 */
export const simulateJWT = (payload: any): string => {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const encodedHeader = btoa(JSON.stringify(header));
  
  const payloadWithMeta = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24-hour expiry
  };
  
  const encodedPayload = btoa(JSON.stringify(payloadWithMeta));
  
  // Simulated signature using a static secret key
  const signature = btoa("keshava-elite-secure-auth-2024");
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

/**
 * Decodes a mock JWT token and validates its structure and expiration.
 * @param token - The JWT string to decode.
 * @returns The decoded payload object or null if invalid/expired.
 */
export const decodeJWT = (token: string): any | null => {
  if (!token) return null;
  
  try {
    const parts = token.split('.');
    if (parts.length !== 3) {
      console.warn("Keshava Security Hub: Invalid JWT structure detected.");
      return null;
    }
    
    const payloadPart = parts[1];
    const decodedPayload = JSON.parse(atob(payloadPart));
    
    // Validate expiration (exp is in seconds)
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedPayload.exp && decodedPayload.exp < currentTime) {
      console.warn("Keshava Security Hub: JWT session has expired.");
      return null;
    }
    
    return decodedPayload;
  } catch (error) {
    console.error("Keshava Security Hub: JWT Decode Failure:", error);
    return null;
  }
};