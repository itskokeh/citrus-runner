import { useBedrockPassport, LoginPanel } from '@bedrock_org/passport';
import '@bedrock_org/passport/dist/style.css';
import '../index.css';
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
    window.location.href = '/'; // Redirect to home after logout
  };

  if (gameStarted) {
    return <div>Game is running...</div>;
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      {!isLoggedIn
        ? (
          <LoginPanel
            title='Sign in to Endless Runner'
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
            titleClass='text-xl font-bold'
            logoClass='ml-2 md:h-8 h-6'
            panelClass='container p-2 md:p-8 rounded-2xl max-w-[480px] bg-white shadow-lg'
            buttonClass='hover:border-orange-500'
            separatorTextClass='bg-orange-900 text-gray-500'
            separatorClass='bg-orange-900'
            linkRowClass='justify-center'
            headerClass='justify-center'
          />
          )
        : (
          <div className='text-center'>
            <h1 className='text-2xl font-bold mb-4'>
              Welcome, {user?.displayName || user?.name || 'User'}!
            </h1>
            <p className='mb-4'>Ready to play Endless Runner?</p>
            <button
              onClick={handleStartGame}
              className='bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600'
            >
              Start Game
            </button>
            <button
              onClick={handleLogout}
              className='ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600'
            >
              Log Out
            </button>
          </div>
          )}
    </div>
  );
}

export default Home;
