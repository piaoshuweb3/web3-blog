import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId from https://cloud.walletconnect.com
const projectId = 'YOUR_PROJECT_ID' // 需要替换为实际的项目ID

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const polygon = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com'
}

const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://sepolia.etherscan.io',
  rpcUrl: 'https://rpc.sepolia.org'
}

// 3. Create a metadata object
const metadata = {
  name: 'Shikyou Blog',
  description: 'Web3 Personal Blog Platform',
  url: 'https://shikyou.fun',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
  rpcUrl: '...',
  defaultChainId: 1
})

// 5. Create a Web3Modal instance
export const web3Modal = createWeb3Modal({
  ethersConfig,
  chains: [mainnet, polygon, sepolia],
  projectId,
  enableAnalytics: true
})

// 支持的钱包类型
export const SUPPORTED_WALLETS = {
  METAMASK: 'MetaMask',
  WALLETCONNECT: 'WalletConnect',
  COINBASE: 'Coinbase Wallet',
  INJECTED: 'Injected'
}

// 网络配置
export const NETWORKS = {
  ETHEREUM: {
    chainId: '0x1',
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://cloudflare-eth.com'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  POLYGON: {
    chainId: '0x89',
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com']
  },
  SEPOLIA: {
    chainId: '0xaa36a7',
    chainName: 'Sepolia Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://rpc.sepolia.org'],
    blockExplorerUrls: ['https://sepolia.etherscan.io']
  }
}

// 切换网络
export const switchNetwork = async (networkKey) => {
  if (!window.ethereum) {
    throw new Error('No wallet found')
  }

  const network = NETWORKS[networkKey]
  if (!network) {
    throw new Error('Unsupported network')
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }]
    })
  } catch (switchError) {
    // 如果网络不存在，尝试添加网络
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [network]
        })
      } catch (addError) {
        throw new Error('Failed to add network')
      }
    } else {
      throw switchError
    }
  }
}

// 格式化地址
export const formatAddress = (address) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// 格式化余额
export const formatBalance = (balance, decimals = 4) => {
  if (!balance) return '0'
  const num = parseFloat(balance)
  return num.toFixed(decimals)
}

