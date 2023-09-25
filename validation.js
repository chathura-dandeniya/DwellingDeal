// registration.js
document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Validate data (e.g., check email format, password strength)
  
    // Send data to the server for registration
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
  
    // Handle the server's response (e.g., display success or error message)
  });
  