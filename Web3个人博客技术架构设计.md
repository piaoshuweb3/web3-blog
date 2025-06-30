# Web3个人博客技术架构设计

## 项目概述

### 项目名称
Shikyou Blog - 基于Web3的去中心化个人博客平台

### 核心特性
- 多钱包支持（MetaMask、Phantom、WalletConnect等）
- 去中心化内容存储（IPFS）
- NFT文章铸造功能
- 社交互动（点赞、评论、关注）
- 响应式现代化UI设计
- 域名：shikyou.fun

## 技术架构

### 前端技术栈
```
React 18 + TypeScript
├── UI框架：Tailwind CSS + Shadcn/UI
├── 状态管理：Zustand
├── 路由：React Router v6
├── Web3集成：
│   ├── ethers.js v6
│   ├── @web3modal/react
│   └── @solana/wallet-adapter
├── IPFS集成：ipfs-http-client
├── 图标：Lucide React
├── 动画：Framer Motion
└── 构建工具：Vite
```

### 后端技术栈
```
Flask + Python
├── 数据库：Firebase Firestore
├── 文件存储：IPFS (Pinata)
├── 认证：Web3 签名验证
├── API：RESTful API
├── 部署：Vercel/Railway
└── 域名：shikyou.fun
```

### Web3集成方案
```
区块链网络：
├── Ethereum (主网/测试网)
├── Polygon (低gas费)
├── Solana (高性能)
└── Base (Coinbase L2)

钱包支持：
├── MetaMask (Ethereum系)
├── Phantom (Solana)
├── WalletConnect (通用)
├── Coinbase Wallet
└── Rainbow Wallet
```

## 数据库设计

### Firestore集合结构
```javascript
// 用户集合
users: {
  [walletAddress]: {
    address: string,
    username: string,
    bio: string,
    avatar: string,
    social: {
      twitter?: string,
      github?: string,
      website?: string
    },
    createdAt: timestamp,
    updatedAt: timestamp
  }
}

// 文章集合
posts: {
  [postId]: {
    id: string,
    title: string,
    content: string,
    summary: string,
    author: string, // wallet address
    category: string,
    tags: string[],
    coverImage?: string,
    ipfsHash: string,
    nftTokenId?: string,
    nftContract?: string,
    isPublished: boolean,
    createdAt: timestamp,
    updatedAt: timestamp,
    stats: {
      views: number,
      likes: number,
      comments: number,
      mints: number
    }
  }
}

// 评论集合
comments: {
  [commentId]: {
    id: string,
    postId: string,
    author: string,
    content: string,
    ipfsHash: string,
    parentId?: string, // 回复功能
    createdAt: timestamp,
    likes: number
  }
}

// 社交关系
follows: {
  [followId]: {
    follower: string,
    following: string,
    createdAt: timestamp
  }
}

// 点赞记录
likes: {
  [likeId]: {
    user: string,
    postId?: string,
    commentId?: string,
    createdAt: timestamp
  }
}
```

## 智能合约设计

### NFT文章合约 (ERC-721)
```solidity
contract BlogPostNFT {
    struct Post {
        string ipfsHash;
        address author;
        uint256 timestamp;
        string title;
    }
    
    mapping(uint256 => Post) public posts;
    
    function mintPost(
        address to,
        string memory ipfsHash,
        string memory title
    ) external returns (uint256);
    
    function getPost(uint256 tokenId) 
        external view returns (Post memory);
}
```

### 社交代币合约 (ERC-20)
```solidity
contract BlogToken {
    // 用于奖励创作者和读者互动
    function rewardAuthor(address author, uint256 amount) external;
    function rewardReader(address reader, uint256 amount) external;
}
```

## 功能模块设计

### 1. 用户认证模块
- Web3钱包连接
- 签名验证身份
- 用户资料管理
- 多钱包绑定

### 2. 内容管理模块
- Markdown编辑器
- 图片上传（IPFS）
- 文章发布/草稿
- 分类标签管理

### 3. Web3功能模块
- 文章NFT铸造
- 代币奖励系统
- 去中心化存储
- 链上数据同步

### 4. 社交互动模块
- 关注/粉丝系统
- 评论回复
- 点赞收藏
- 分享功能

### 5. 搜索发现模块
- 全文搜索
- 标签筛选
- 热门推荐
- 个性化推荐

## 页面结构设计

### 主要页面
```
/                    - 首页（文章列表）
/post/[id]          - 文章详情页
/write              - 写作页面
/profile/[address]  - 用户主页
/settings           - 设置页面
/explore            - 发现页面
/following          - 关注动态
/search             - 搜索结果
```

### 组件结构
```
src/
├── components/
│   ├── common/         # 通用组件
│   ├── layout/         # 布局组件
│   ├── post/          # 文章相关
│   ├── user/          # 用户相关
│   └── web3/          # Web3组件
├── pages/             # 页面组件
├── hooks/             # 自定义Hook
├── utils/             # 工具函数
├── stores/            # 状态管理
├── types/             # TypeScript类型
└── constants/         # 常量配置
```

## 部署架构

### 前端部署
- **平台**：Vercel
- **域名**：shikyou.fun
- **CDN**：Vercel Edge Network
- **SSL**：自动HTTPS

### 后端部署
- **平台**：Railway/Render
- **数据库**：Firebase Firestore
- **文件存储**：Pinata IPFS
- **监控**：Sentry

### 环境配置
```bash
# 生产环境变量
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_PINATA_API_KEY=
VITE_PINATA_SECRET_KEY=
VITE_ALCHEMY_API_KEY=
VITE_WALLETCONNECT_PROJECT_ID=
```

## 开发计划

### Phase 1: 基础架构搭建
- [x] 代码检查和修正
- [x] 设计研究分析
- [ ] 项目初始化
- [ ] 基础组件开发

### Phase 2: Web3集成
- [ ] 钱包连接功能
- [ ] IPFS存储集成
- [ ] 智能合约部署
- [ ] Web3状态管理

### Phase 3: 核心功能
- [ ] 文章编辑发布
- [ ] 用户系统
- [ ] 社交功能
- [ ] 搜索功能

### Phase 4: 测试部署
- [ ] 本地测试
- [ ] 功能测试
- [ ] 性能优化
- [ ] 生产部署

## 性能优化策略

### 前端优化
- 代码分割（React.lazy）
- 图片懒加载
- 虚拟滚动
- 缓存策略

### 后端优化
- 数据库索引优化
- API响应缓存
- IPFS内容缓存
- CDN加速

### Web3优化
- 批量交易处理
- Gas费优化
- 网络切换优化
- 钱包连接缓存

## 安全考虑

### 前端安全
- XSS防护
- CSRF防护
- 输入验证
- 敏感信息保护

### Web3安全
- 签名验证
- 合约安全审计
- 私钥安全
- 交易确认

### 数据安全
- 数据加密
- 访问控制
- 备份策略
- 隐私保护

