// Vercel Serverless Function: Secure Contact Form Dispatcher
// Includes: Strict CORS origin validation, in-memory rate limiting, bot honeypot detection,
// input sanitization against XSS & SMTP/HTTP header injection, and information leakage prevention.

// In-memory sliding-window rate limiter (per warm container instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up old rate limit entries every 15 minutes to avoid memory accumulation
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.startTime > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 15 * 60 * 1000);

const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/anubhav-profile-website\.vercel\.app$/,
  /^https:\/\/anubhav-profile-website(-[a-z0-9-]+)?\.vercel\.app$/,
  /^https:\/\/.*-anubhavagarwal20s-projects\.vercel\.app$/,
  /^http:\/\/localhost:(3000|5173|4173)$/,
  /^http:\/\/127\.0\.0\.1:(3000|5173|4173)$/,
];

function isOriginAllowed(origin) {
  if (!origin) return false;
  
  // Custom env override
  if (process.env.ALLOWED_ORIGINS) {
    const customList = process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    if (customList.includes(origin)) return true;
  }

  return ALLOWED_ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}

function sanitizeText(input, maxLen = 1000, allowNewlines = false) {
  if (typeof input !== 'string') return '';
  let cleaned = input.trim();
  // Strip HTML / script / iframe tags to neutralize stored XSS payloads
  cleaned = cleaned.replace(/<[^>]*>?/gm, '');
  // Prevent SMTP / HTTP header injection in single-line fields
  if (!allowNewlines) {
    cleaned = cleaned.replace(/[\r\n\t]/g, ' ');
  }
  // Remove control characters except standard line breaks
  cleaned = cleaned.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  return cleaned.slice(0, maxLen);
}

function checkRateLimit(clientIp) {
  const now = Date.now();
  const entry = rateLimitMap.get(clientIp);

  if (!entry) {
    rateLimitMap.set(clientIp, { count: 1, startTime: now });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, startTime: now });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - entry.count };
}

export default async function handler(req, res) {
  // Security response headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const origin = req.headers.origin;
  const isAllowed = isOriginAllowed(origin);

  if (origin && isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Direct or same-origin request
    res.setHeader('Access-Control-Allow-Origin', 'https://anubhav-profile-website.vercel.app');
  } else {
    // Unauthorized foreign cross-site origin
    res.setHeader('Access-Control-Allow-Origin', 'null');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS
  if (req.method === 'OPTIONS') {
    if (origin && !isAllowed) {
      return res.status(403).end();
    }
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  if (origin && !isAllowed) {
    return res.status(403).json({ success: false, message: 'Access denied: origin not allowed.' });
  }

  // Rate limiting check by IP
  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  const rateCheck = checkRateLimit(clientIp);
  res.setHeader('X-RateLimit-Limit', MAX_REQUESTS_PER_WINDOW.toString());
  res.setHeader('X-RateLimit-Remaining', rateCheck.remaining.toString());

  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', '600');
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a few minutes before submitting another inquiry.',
    });
  }

  const body = req.body || {};

  // Honeypot bot protection: if hidden bot trap field is populated, silently drop
  if (body._hp_check || body.website_hp || body.company_title) {
    // Return fake success to confuse spam bots without dispatching email
    return res.status(200).json({
      success: true,
      message: 'Inquiry received.',
    });
  }

  // Deep input sanitization
  const rawName = body.name;
  const rawEmail = body.email;
  const rawService = body.service;
  const rawBudget = body.budget;
  const rawMessage = body.message;

  if (!rawName || !rawEmail || !rawMessage) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required fields.',
    });
  }

  const name = sanitizeText(rawName, 100, false);
  const email = sanitizeText(rawEmail, 120, false);
  const service = sanitizeText(rawService || 'SEO & Digital Marketing', 100, false);
  const budget = sanitizeText(rawBudget || 'Flexible', 50, false);
  const message = sanitizeText(rawMessage, 3000, true);

  if (name.length < 2) {
    return res.status(400).json({ success: false, message: 'Please provide a valid name.' });
  }

  // Strict email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
  }

  if (message.length < 5) {
    return res.status(400).json({ success: false, message: 'Please provide a descriptive message.' });
  }

  // Destination inbox (configurable via Vercel Environment Variables)
  const recipientEmail = process.env.CONTACT_RECEIVER_EMAIL || 'anubhavagarwal2020@gmail.com';

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second safety timeout

    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://anubhav-profile-website.vercel.app',
        Referer: 'https://anubhav-profile-website.vercel.app/',
      },
      body: JSON.stringify({
        _subject: `New Portfolio Inquiry from ${name} (${service})`,
        Name: name,
        Email: email,
        Service: service,
        Budget_or_Scope: budget,
        Project_Message: message,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Upstream dispatch responded with status ${response.status}`);
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry successfully delivered to inbox.',
    });
  } catch {
    // Avoid leaking internal error objects / stack traces to callers
    return res.status(500).json({
      success: false,
      message: 'Failed to dispatch inquiry. Please try again or reach out directly via email.',
    });
  }
}
