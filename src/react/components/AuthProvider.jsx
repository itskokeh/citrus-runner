import { BedrockPassportProvider } from '@bedrock_org/passport';

const Provider = ({ children }) => {
  return (
    <BedrockPassportProvider
      baseUrl='https://api.bedrockpassport.com' // Base API URL – no need to change this. Leave as is.
      authCallbackUrl='https://orange-integration.endlessrunner.pages.dev/auth/callback' // Replace with your actual callback URL
      tenantId='orange-lnzb7mm3wy'  // Your assigned tenant ID - you can request one at https://vibecodinglist.com/orange-id-integration
      subscriptionKey='ee85e16ceba64e279a1811582221b1ff'
    >
      {children}
    </BedrockPassportProvider>
  );
};

export default Provider;
