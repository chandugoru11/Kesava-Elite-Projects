
/**
 * Simulated JWT Utility for Frontend Authentication
 * Follows the standard: Header.Payload.Signature
 */

export const simulateJWT = (payload: any): string => {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24h expiry
  }));
  
  // Simulated signature using a mock secret
  const signature = btoa("keshava-elite-secure-secret-2024");
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

export const decodeJWT = (token: string): any | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    
    // Check expiry
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    
    return payload;
  } catch (e) {
    console.error("JWT Decode Failed", e);
    return null;
  }
};
