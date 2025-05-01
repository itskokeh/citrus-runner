function isLandscape () {
  return window.innerWidth > window.innerHeight;
}

function loadGame () {
  const script = document.createElement('script');
  script.src = './src/main.js';
  document.body.appendChild(script);
}

function checkOrientation () {
  if (isLandscape()) {
    document.getElementById('rotate-screen').style.display = 'none';
    loadGame();
  } else {
    document.getElementById('rotate-screen').style.display = 'block';
  }
}

checkOrientation();

window.addEventListener('resize', () => {
  if (!document.querySelector('script[src="./src/main.js"]')) {
    checkOrientation();
  }
});
