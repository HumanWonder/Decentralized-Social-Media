import React from 'react';
import { useAuthState } from './authState';
import Web3 from 'web3';

function UserLogin() {
  const { isLoggedIn, setLoggedIn, setLoggedOut } = useAuthState();
  const [walletAddress, setWalletAddress] = React.useState("");
  const [accountInfo, setAccountInfo] = React.useState(null);

  async function requestAccount() {
    console.log('Requesting account...');

    if (window.ethereum) {
      console.log('MetaMask detected.');

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setWalletAddress(accounts[0]);

        const web3 = new Web3(window.ethereum);
        const networkId = await web3.eth.net.getId();
        const balance = await web3.eth.getBalance(accounts[0]);
        const chainId = parseInt(networkId, 10);

        const accountData = {
          address: accounts[0],
          balance: web3.utils.fromWei(balance, 'ether'),
          chainId: chainId,
        };

        setAccountInfo(accountData);
        setLoggedIn();
      } catch (error) {
        console.error('Error connecting:', error);
      }
    } else {
      alert('MetaMask not detected.');
    }
  }

  function handleLogout() {
    setWalletAddress("");
    setAccountInfo(null);
    setLoggedOut();
  }

  return (
<>
    {!isLoggedIn && (
      <li className="nav-item align-items-end">
        <button className="nav-link" onClick={requestAccount}>
          Login
        </button>
      </li>
    )}
    {isLoggedIn && (
      <>
        <li className="nav-item align-items-end">
          <span className="nav-link">Wallet Address: {walletAddress}</span>
        </li>
        <li className="nav-item align-items-end">
          <span className="nav-link">
            Balance: {accountInfo.balance} ETH | Chain ID: {accountInfo.chainId}
          </span>
        </li>
        <li className="nav-item align-items-end">
          <button className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </>
    )}
  </>
  );
}

export default UserLogin;
