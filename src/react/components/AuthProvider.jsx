import { BedrockPassportProvider } from '@bedrock_org/passport';

export default function AuthProvider ({ children }) {
  return (
    <BedrockPassportProvider
      baseUrl='https://api.bedrockpassport.com'
      authCallbackUrl='https://endless-runner-steel.vercel.app/auth/callback' // Replace with your actual callback URL
      tenantId='orange-lnzb7mm3wy' // Replace with your assigned tenant ID
      SubscriptionKey='ee85e16ceba64e279a1811582221b1ff'
    >
      {children}
    </BedrockPassportProvider>
  );
}
