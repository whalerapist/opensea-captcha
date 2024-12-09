export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
  
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({ success: false, message: 'Token missing' });
    }
  
    const secret = process.env.HCAPTCHA_SECRET;
  
    try {
      const response = await fetch('https://hcaptcha.com/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `response=${token}&secret=${secret}`
      });
  
      const data = await response.json();
  
      if (data.success) {
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ success: false, message: 'Invalid captcha' });
      }
    } catch (error) {
      console.error('Error validating hCaptcha:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
  