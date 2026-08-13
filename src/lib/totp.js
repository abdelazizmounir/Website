import QRCode from 'qrcode';

export const ADMIN_TOTP_SECRET = 'AMGREENARTPEPSECRETKEYFORMANAGER';
export const ADMIN_EMAIL = 'amgreenart@gmail.com';
export const ISSUER = 'AMGreenArt';

// Helper: Base32 decode
function base32Decode(base32) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  let value = 0;

  const cleaned = base32.toUpperCase().replace(/=+$/, '').replace(/\s+/g, '');
  
  const bytes = [];
  for (let i = 0; i < cleaned.length; i++) {
    const val = alphabet.indexOf(cleaned.charAt(i));
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }

  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substr(i, 8), 2));
  }

  return new Uint8Array(bytes);
}

// Generate RFC 6238 TOTP 6-digit code for a given time step counter
async function generateTOTP(secretBase32, timeStep) {
  const keyBytes = base32Decode(secretBase32);

  // Convert time step counter to 8-byte big-endian buffer
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, BigInt(timeStep), false);

  // Import HMAC-SHA1 key
  const cryptoKey = await window.crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'HMAC', hash: { name: 'SHA-1' } },
    false,
    ['sign']
  );

  // Sign time step counter
  const signature = await window.crypto.subtle.sign('HMAC', cryptoKey, buffer);
  const hmac = new Uint8Array(signature);

  // Dynamic truncation
  const offset = hmac[hmac.length - 1] & 0x0f;
  const binary =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff);

  const otp = (binary % 1000000).toString().padStart(6, '0');
  return otp;
}

// Generate otpauth URL for Google Authenticator app
export const getOtpAuthUrl = () => {
  return `otpauth://totp/${encodeURIComponent(ISSUER)}:${encodeURIComponent(ADMIN_EMAIL)}?secret=${ADMIN_TOTP_SECRET}&issuer=${encodeURIComponent(ISSUER)}`;
};

// Generate Data URL for QR Code image
export const generateQRCodeDataUrl = async () => {
  try {
    const otpauth = getOtpAuthUrl();
    const qrDataUrl = await QRCode.toDataURL(otpauth, {
      margin: 2,
      width: 250,
      color: {
        dark: '#1B4D2E',
        light: '#FFFFFF'
      }
    });
    return qrDataUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    return null;
  }
};

// Synchronous/Async verification with window tolerance (30 seconds before and after)
export const verifyTOTPCode = async (token) => {
  if (!token) return false;
  const cleanToken = token.trim().replace(/\s+/g, '');
  if (cleanToken.length !== 6) return false;

  const currentStep = Math.floor(Date.now() / 1000 / 30);

  // Check window tolerance: current, past (-1), and future (+1)
  for (let offset = -1; offset <= 1; offset++) {
    try {
      const validCode = await generateTOTP(ADMIN_TOTP_SECRET, currentStep + offset);
      if (validCode === cleanToken) {
        return true;
      }
    } catch (err) {
      console.error('TOTP calculation error:', err);
    }
  }

  return false;
};
