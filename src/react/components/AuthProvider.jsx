import { BedrockPassportProvider } from '@bedrock_org/passport';

const Provider = ({ children }) => {
  return (
    <BedrockPassportProvider
      baseUrl='https://api.bedrockpassport.com'
      authCallbackUrl='https://hopper.kokeh.dev/auth/callback'
      tenantId='orange-lnzb7mm3wy'
      subscriptionKey='ee85e16ceba64e279a1811582221b1ff'
    >
      {children}
    </BedrockPassportProvider>
  );
};

export default Provider;
