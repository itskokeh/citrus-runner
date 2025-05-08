import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePassport } from '@bedrockstreaming/passport-react';

export default function AuthCallback () {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleRedirectCallback } = usePassport();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        await handleRedirectCallback(location.search);
        navigate('/'); // Redirect to home or game page
      } catch (err) {
        console.error('Auth callback failed:', err);
      }
    };

    handleAuth();
  }, [location.search, handleRedirectCallback, navigate]);

  return <p>Logging you in...</p>;
}
