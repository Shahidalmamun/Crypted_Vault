import React from 'react';
import { useWeb3Context } from '../contexts/UseWeb3Context';
import { connectWallet } from '../utils/connectWallet';

const Wallet = () => {
    const {updateWeb3State} = useWeb3Context();

    const handleWalletConnection = async () => {
      const {selectedAccount, contractInstance} = await connectWallet();
      updateWeb3State({selectedAccount, contractInstance});
    };
  return (
    <div>
        <button className='text-blue-400 border-2 ' onClick={handleWalletConnection}>Connect Wallet</button>
    </div>
  );
}

export default Wallet;

