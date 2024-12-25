'use client';

import { base } from 'wagmi/chains';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import type { ReactNode } from 'react';

export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
  apiKey={process.env.ONCHAINKIT_API_KEY}
  chain={base}
  config={{
    appearance: {
      name: 'MotherNatureAi',        // Displayed in modal header
      logo: 'https://your-logo.com',// Displayed in modal header
      mode: 'auto',                 // 'light' | 'dark' | 'auto'
      theme: 'default',             // 'default' or custom theme
    },
    wallet: { 
      display: 'modal', 
      termsUrl: 'https://...', 
      privacyUrl: 'https://...', 
    },
  }}
>
  {props.children}
</OnchainKitProvider>
  );
}