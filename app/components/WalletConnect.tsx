import {
  ConnectWallet,
  Wallet,
  WalletDefault,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownLink,
  WalletDropdownDisconnect,
  } from '@coinbase/onchainkit/wallet'; // adjust import based on your actual wallet SDK

  import {
    Address,
    Avatar,
    Badge,
    EthBalance,
    Name,
    Identity,
  } from '@coinbase/onchainkit/identity';

  function WalletDefaultDemo() {
    return <WalletDefault />
  }

  export default function WalletConnect() {
    return (
      <Wallet>
        <ConnectWallet className='bg-blue-800'>
          <ConnectWallet>Log In</ConnectWallet>
          <Avatar className="h-6 w-6" />
          <Name className='text-white' />
        </ConnectWallet>
        <WalletDropdown>
          <Identity 
            className="px-4 pt-3 pb-2 hover:bg-blue-200"
            hasCopyAddressOnClick
          >
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownLink 
            className='hover:bg-blue-200'
            icon="wallet" 
            href="https://keys.coinbase.com"
          >
            Wallet
          </WalletDropdownLink>
          <WalletDropdownDisconnect className='hover:bg-blue-200' />
        </WalletDropdown>
      </Wallet>
    );
  }
