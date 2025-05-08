import { useEffect } from 'react';
import { useBedrockPassport } from '@bedrock_org/passport';

function AuthCallback () {
  const { loginCallback } = useBedrockPassport();

  useEffect(() => {
    const login = async (token, refreshToken) => {
      const success = await loginCallback(token, refreshToken);
      if (success) {
        // Redirect to the game
        window.location.href = '/';
      }
    };

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (token && refreshToken) {
      login(token, refreshToken);
    }
  }, [loginCallback]);

  return <div className='auth-callback'>Signing in...</div>;
}

export default AuthCallback;
