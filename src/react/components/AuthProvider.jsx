import { BedrockPassportProvider } from '@bedrock_org/passport';

const Provider = ({ children }) => {
  return (
    <BedrockPassportProvider
      baseUrl='https://api.bedrockpassport.com'
      authCallbackUrl='https://runner.kokeh.dev/auth/callback'
      tenantId='orange-viepsz08nz'
      subscriptionKey='2edc1f112dbf45f0ad774f2ef4fbb7f9'
    >
      {children}
    </BedrockPassportProvider>
  );
};

export default Provider;
