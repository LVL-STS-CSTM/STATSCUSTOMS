
interface Env {
  STATSCUSTOMSDATA: any;
  ADMIN_SECRET: string;
}

const SECURITY_HEADERS = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Type': 'application/json'
};

const getAuthToken = (req: Request) => {
  const authHeader = req.headers.get('Authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
};

// Reuse the JWT verification logic from other endpoints to ensure compatibility with login
async function verifyToken(token: string, secret: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const [header, payload, signature] = parts;
    const message = `${header}.${payload}`;
    const encoder = new TextEncoder();
    
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    const sigArray = Uint8Array.from(atob(signature.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
    return await crypto.subtle.verify("HMAC", key, sigArray, encoder.encode(message));
  } catch {
    return false;
  }
}

export const onRequestPost = async (context: { env: Env; request: Request }) => {
  const { env, request } = context;
  const token = getAuthToken(request);
  // Must match the fallback secret used in login.ts if env var is missing
  const secret = env.ADMIN_SECRET || "fallback_internal_secret_level_customs";

  if (!token || !(await verifyToken(token, secret))) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { 
        status: 401,
        headers: SECURITY_HEADERS
    });
  }

  try {
    const { username, password } = await request.json() as any;

    if (!username || !password || password.length < 8) {
      return new Response(JSON.stringify({ message: 'Invalid payload constraints.' }), { 
        status: 400,
        headers: SECURITY_HEADERS
      });
    }

    // Persist new credentials to KV
    await env.STATSCUSTOMSDATA.put('credential', JSON.stringify({ username, password }));
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: SECURITY_HEADERS,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: 'Internal update failure' }), {
      status: 500,
      headers: SECURITY_HEADERS,
    });
  }
};
