'use client';

import Link from 'next/link';  

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';
import ArrowSvg from './svg/ArrowSvg';
import ImageSvg from './svg/Image';
import OnchainkitSvg from './svg/OnchainKit';

const components = [
  {
    name: 'Transaction',
    url: 'https://onchainkit.xyz/transaction/transaction',
  },
  { name: 'Swap', url: 'https://onchainkit.xyz/swap/swap' },
  { name: 'Checkout', url: 'https://onchainkit.xyz/checkout/checkout' },
  { name: 'Wallet', url: 'https://onchainkit.xyz/wallet/wallet' },
  { name: 'Identity', url: 'https://onchainkit.xyz/identity/identity' },
];

const templates = [
  { name: 'NFT', url: 'https://github.com/coinbase/onchain-app-template' },
  { name: 'Commerce', url: 'https://github.com/coinbase/onchain-commerce-template'},
  { name: 'Fund', url: 'https://github.com/fakepixels/fund-component' },
];


export default function App() {
  return (
    <main className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">
      <div className="flex items-center">
        <ImageSvg />
        <div className="flex flex-col ml-3 space-y-2">
          <h1 className="text-4xl font-extrabold text-white tracking-tight whitespace-nowrap">
            MotherNature AI
          </h1>
          <Link href="/predict" className="w-fit">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Predict the future
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="wallet-container">
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownLink
                  icon="wallet"
                  href="https://keys.coinbase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wallet
                </WalletDropdownLink>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        </div>
    </main>
  );
}


