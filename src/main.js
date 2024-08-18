// main.js

// Import any required JavaScript modules or libraries
// import './styles.css'; // Importing a CSS file (if you're using CSS)

// Example: A simple DOM manipulation
document.addEventListener('DOMContentLoaded', () => {
  const mainContent = document.querySelector('main');
  if (mainContent) {
    mainContent.innerHTML = '<p>This content was injected by JavaScript.</p>';
  }
});

// Example: A simple console log
console.log('Webpack and HTML Webpack Plugin setup is working!');
