const API = 'http://localhost:5000/api';
let token = '';

function signup() {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  fetch('http://localhost:5000/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  .then(async res => {
    const data = await res.json();
    document.getElementById('signup-message').textContent = data.message;
    document.getElementById('signup-message').style.color = res.ok ? 'green' : 'red';
  })
  .catch(err => {
    document.getElementById('signup-message').textContent = 'Signup failed';
    document.getElementById('signup-message').style.color = 'red';
  });
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(async res => {
    const data = await res.json();
    document.getElementById('login-message').textContent = data.message;
    document.getElementById('login-message').style.color = res.ok ? 'green' : 'red';
    if (res.ok) {
      localStorage.setItem('token', data.token);
    }
  })
  .catch(err => {
    document.getElementById('login-message').textContent = 'Login failed';
    document.getElementById('login-message').style.color = 'red';
  });
}

function getDashboard() {
  const token = localStorage.getItem('token');

  fetch('http://localhost:5000/dashboard', {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(async res => {
    const data = await res.json();
    document.getElementById('dashboard-response').textContent = data.message || data.error;
    document.getElementById('dashboard-response').style.color = res.ok ? 'green' : 'red';
  })
  .catch(err => {
    document.getElementById('dashboard-response').textContent = 'Request failed';
    document.getElementById('dashboard-response').style.color = 'red';
  });
}
  
