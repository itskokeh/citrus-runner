import { useBedrockPassport, LoginPanel } from '@bedrock_org/passport';
import './Home.css';
import { useState } from 'react';

function Home () {
  const { isLoggedIn, signOut, user } = useBedrockPassport();
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
    // Hide React app for Phaser game
    const reactRoot = document.getElementById('root');
    if (reactRoot) {
      reactRoot.style.display = 'none';
    }
    // Initialize or show your Phaser game here
    // e.g., initializePhaserGame();
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  if (gameStarted) {
    return <div>Game is running...</div>;
  }

  return (
    <div className='auth-container'>
      {!isLoggedIn
        ? (
          <LoginPanel
            buttonClass='login-button'
            headerClass='login-panel-header'
            title='Sign in to play Zero-G Hopper'
            logo='/orange-web3-logo-v2a-20241018.svg'
            logoClass='login-panel-logo'
            panelClass='login-panel'
            walletButtonText='Connect Wallet'
            separatorText='OR'
            separatorTextClass='separator-text'
            separatorClass='separator'
            features={{
              enableWalletConnect: false,
              enableAppleLogin: true,
              enableGoogleLogin: true,
              enableEmailLogin: true,
            }}
          />
          )
        : (
          <div className='logged-in-container'>
            <h1 className='logged-in-title'>
              Welcome, {user?.displayName || user?.name || 'User'}!
            </h1>
            <p className='logged-in-text'>Ready to play Endless Runner?</p>
            <button
              onClick={handleStartGame}
              className='primary-button'
            >
              Start Game
            </button>
            <button
              onClick={handleLogout}
              className='secondary-button'
            >
              Log Out
            </button>
          </div>
          )}
    </div>
  );
}

export default Home;
