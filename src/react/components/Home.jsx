import { useBedrockPassport, LoginPanel } from '@bedrock_org/passport';
import requestLandscapeAndLoadgame from '../utils/requestLandscapeAndLoadgame';
import './Home.css';
import { useState } from 'react';

export default function Home () {
  const { isLoggedIn, signOut, user } = useBedrockPassport();
  // eslint-disable-next-line no-unused-vars
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = async () => {
    setGameStarted(true);
    await requestLandscapeAndLoadgame();
  };

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <div className='overlay'>
      <div className='auth-container'>
        {!isLoggedIn
          ? (
            <LoginPanel
              buttonClass='login-button'
              headerClass='login-panel-header'
              title='Sign in to play Citrus Runner'
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
              <p className='logged-in-text'>Ready to play Citrus Runner?</p>
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
    </div>
  );
}
