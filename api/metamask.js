import detectEthereumProvider from '@metamask/detect-provider'

export const checkEth = async () => {
  const provider = await detectEthereumProvider()
  if (provider) {
    console.log('Ethereum successfully detected!')
    startApp(provider)
  } else {
   
    // if the provider is not detected, detectEthereumProvider resolves to null
    console.error('Please install MetaMask!', error)
  }
}

const startApp = (provider) => {
  if (provider !== window.ethereum) {
    console.error('Do you have multiple wallets installed?');
  } else {
    console.log(provider);
    // getChainId()
  }
}

async function getChainId() {
  const chainId = await ethereum.request({ method: 'eth_chainId' });
  handleChainChanged(chainId);
  ethereum.on('chainChanged', handleChainChanged);
}

function connectAccount() {
  let currentAccount = null;
  ethereum
    .request({ method: 'eth_accounts' })
    .then(handleAccountsChanged)
    .catch((err) => {
      // Some unexpected error.
      // For backwards compatibility reasons, if no accounts are available,
      // eth_accounts will return an empty array.
      console.error('eth_accounts error',err);
    });
}

function handleChainChanged(_chainId) {
  // We recommend reloading the page, unless you must do otherwise
  window.location.reload();
  connectAccount();
}

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else if (accounts[0] !== currentAccount) {
    // currentAccount = accounts[0];
    console.log(accounts[0]);
    // Do any other work!
  }
}