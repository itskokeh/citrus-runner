import { useState, useEffect } from 'react';
import { BedrockPassportProvider, useBedrockPassport, LoginPanel } from '@bedrock_org/passport';
import '@bedrock_org/passport/dist/style.css';
import './App.css';

// Wrap your main app with the Bedrock provider
function AppWrapper () {
  return (
    <BedrockPassportProvider
      baseUrl='https://api.bedrockpassport.com'
      authCallbackUrl='https://endless-runner-steel.vercel.app/auth/callback'
      tenantId='orange-lnzb7mm3wy' // Replace with your actual tenant ID
      subscriptionKey='ee85e16ceba64e279a1811582221b1ff'
    >
      <App />
    </BedrockPassportProvider>
  );
}

function App () {
  const [isLandscape, setIsLandscape] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { isLoggedIn } = useBedrockPassport();

  useEffect(() => {
    // Check if device is mobile
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }, []);

  const requestLandscape = async () => {
    try {
      // Always try fullscreen first
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen().catch(e => console.log('Fullscreen not supported:', e));
      }

      // Only try to lock orientation on mobile devices
      if (isMobile && screen.orientation?.lock) {
        await screen.orientation.lock('landscape').catch(e => console.log('Orientation lock not supported:', e));
      }

      setIsLandscape(true);
      await loadGame();
    } catch (err) {
      console.warn('Game startup failed:', err);
      // Fallback - just load the game anyway
      setIsLandscape(true);
      await loadGame();
    }
  };

  const returnToPortrait = async () => {
    try {
      if (isMobile && screen.orientation?.unlock) {
        await screen.orientation.unlock();
      }
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsLandscape(false);
    } catch (err) {
      console.warn('Error returning to portrait:', err);
    }
  };

  // Show login panel if not logged in
  if (!isLoggedIn) {
    return (
      <div className='auth-container'>
        <LoginPanel
          title='Sign in to play'
          logo='https://irp.cdn-website.com/e81c109a/dms3rep/multi/orange-web3-logo-v2a-20241018.svg'
          logoAlt='Orange Web3'
          walletButtonText='Connect Wallet'
          showConnectWallet={false}
          separatorText='OR'
          features={{
            enableWalletConnect: false,
            enableAppleLogin: true,
            enableGoogleLogin: true,
            enableEmailLogin: false,
          }}
          panelClass='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'
          buttonClass='hover:border-orange-500'
        />
      </div>
    );
  }

  return (
    <div className='game-container'>
      {!isLandscape
        ? (
          <div className='landscape-prompt'>
            <button onClick={requestLandscape}>Enter Game</button>
            {isMobile && <p>Please play in landscape mode for best experience</p>}
          </div>
          )
        : (
          <div className='game-controls'>
            <button onClick={returnToPortrait}>Exit to Home</button>
          </div>
          )}
    </div>
  );
}

async function loadGame () {
  try {
    const { default: initGame } = await import('../phaser/main.js');
    initGame();
    document.getElementById('root').style.display = 'none';
  } catch (err) {
    console.error('Failed to load game:', err);
  }
}

export default AppWrapper;
