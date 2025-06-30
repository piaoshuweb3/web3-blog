import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react'

// 简化版钱包连接组件，用于演示
export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')

  const connectWallet = async () => {
    // 模拟钱包连接
    setIsConnected(true)
    setAddress('0x1234567890123456789012345678901234567890')
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress('')
  }

  const formatAddress = (addr) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const copyAddress = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
    }
  }

  if (!isConnected) {
    return (
      <Button 
        onClick={connectWallet} 
        className="flex items-center gap-2"
        size="sm"
      >
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <Badge variant="secondary" className="text-xs">
              Ethereum
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={disconnectWallet}
            className="text-xs"
          >
            <LogOut className="w-3 h-3" />
          </Button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address:</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-mono">
                {formatAddress(address)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyAddress}
                className="h-6 w-6 p-0"
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance:</span>
            <span className="text-sm font-mono">1.234 ETH</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 简化版钱包连接按钮
export function WalletConnectButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')

  const toggleConnection = () => {
    if (isConnected) {
      setIsConnected(false)
      setAddress('')
    } else {
      setIsConnected(true)
      setAddress('0x1234567890123456789012345678901234567890')
    }
  }

  const formatAddress = (addr) => {
    if (!addr) return ''
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (!isConnected) {
    return (
      <Button 
        onClick={toggleConnection} 
        className="flex items-center gap-2"
        variant="outline"
      >
        <Wallet className="w-4 h-4" />
        Connect
      </Button>
    )
  }

  return (
    <Button 
      onClick={toggleConnection} 
      variant="outline"
      className="flex items-center gap-2"
    >
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      {formatAddress(address)}
    </Button>
  )
}

