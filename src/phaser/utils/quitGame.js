export default function quitGame () {
  const game = document.getElementById('game-container');
  const root = document.getElementById('root');

  game.style.display = 'none';
  root.style.display = 'block';
}
