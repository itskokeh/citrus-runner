import { useEffect } from 'react';
import { useBedrockPassport, LoginPanel } from '@bedrock_org/passport';

export default function AuthCallback () {
  const { loginCallback } = useBedrockPassport();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (token && refreshToken) {
      loginCallback(token, refreshToken).then((success) => {
        if (success) {
          window.location.href = '/';
        }
      });
    }
  }, [loginCallback]);

  return (
    <div>
      Signing in...
      <LoginPanel
        title='Sign in to'
        logo='https://irp.cdn-website.com/e81c109a/dms3rep/multi/orange-web3-logo-v2a-20241018.svg'
        logoAlt='Orange Web3'
        walletButtonText='Connect Wallet'
        showConnectWallet={false}
        separatorText='OR'
        features={{
          enableWalletConnect: true,
          enableAppleLogin: true,
          enableGoogleLogin: true,
          enableEmailLogin: true,
        }}
        titleClass='text-xl font-bold'
        logoClass='ml-2 md:h-8 h-6'
        panelClass='container p-2 md:p-8 rounded-2xl max-w-[480px]'
        buttonClass='hover:border-orange-500'
        separatorTextClass='bg-orange-900 text-gray-500'
        separatorClass='bg-orange-900'
        linkRowClass='justify-center'
        headerClass='justify-center'
      />
    </div>
  );
}
