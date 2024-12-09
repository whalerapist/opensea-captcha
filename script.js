document.getElementById('captcha-form').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const token = hcaptcha.getResponse();
  
    if (!token) {
      alert('Please complete the captcha.');
      return;
    }
  
    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
  
      const data = await response.json();
  
      if (data.success) {
        window.location.href = 'https://opensea.io';
      } else {
        alert('Captcha validation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });
  