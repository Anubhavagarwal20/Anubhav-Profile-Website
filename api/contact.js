export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, service, budget, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  try {
    const response = await fetch('https://formsubmit.co/ajax/anubhavagarwal2020@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://anubhavagarwal.tech',
        Referer: 'https://anubhavagarwal.tech/',
      },
      body: JSON.stringify({
        _subject: `New Portfolio Inquiry from ${name} (${service || 'General'})`,
        Name: name,
        Email: email,
        Service: service || 'SEO & Digital Marketing',
        Budget_or_Scope: budget || 'Flexible',
        Project_Message: message,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const data = await response.json().catch(() => ({}));

    return res.status(200).json({
      success: true,
      message: data.message || 'Inquiry successfully delivered to inbox.',
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Server dispatch error';
    return res.status(500).json({
      success: false,
      message: errorMsg,
    });
  }
}
