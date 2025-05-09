import { useBedrockPassport } from '@bedrock_org/passport';
import { useEffect } from 'react';

function AuthCallback () {
  const { loginCallback } = useBedrockPassport();

  useEffect(() => {
    const login = async (token, refreshToken) => {
      const success = await loginCallback(token, refreshToken);
      if (success) {
        window.location.href = '/'; // Redirect to home or game lobby
      } else {
        console.error('Login callback failed');
      }
    };

    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');

    if (token && refreshToken) {
      login(token, refreshToken);
    } else {
      console.error('Missing token or refreshToken');
    }
  }, [loginCallback]);

  return <div>Signing in...</div>;
}

export default AuthCallback;
