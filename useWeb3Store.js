import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWeb3Store = create(
  persist(
    (set, get) => ({
      // 连接状态
      isConnected: false,
      isConnecting: false,
      
      // 用户信息
      address: null,
      balance: null,
      chainId: null,
      
      // 错误状态
      error: null,
      
      // 操作方法
      setConnected: (connected) => set({ isConnected: connected }),
      setConnecting: (connecting) => set({ isConnecting: connecting }),
      setAddress: (address) => set({ address }),
      setBalance: (balance) => set({ balance }),
      setChainId: (chainId) => set({ chainId }),
      setError: (error) => set({ error }),
      
      // 重置状态
      reset: () => set({
        isConnected: false,
        isConnecting: false,
        address: null,
        balance: null,
        chainId: null,
        error: null
      }),
      
      // 连接钱包
      connect: async () => {
        set({ isConnecting: true, error: null })
        try {
          // 这里会在组件中实现具体的连接逻辑
          // 因为需要使用Web3Modal的hooks
        } catch (error) {
          set({ error: error.message, isConnecting: false })
          throw error
        }
      },
      
      // 断开连接
      disconnect: async () => {
        try {
          // 断开连接逻辑
          get().reset()
        } catch (error) {
          set({ error: error.message })
          throw error
        }
      }
    }),
    {
      name: 'web3-storage',
      partialize: (state) => ({
        address: state.address,
        chainId: state.chainId
      })
    }
  )
)

// 用户状态管理
export const useUserStore = create(
  persist(
    (set, get) => ({
      // 用户资料
      profile: null,
      posts: [],
      followers: [],
      following: [],
      
      // 加载状态
      isLoading: false,
      
      // 操作方法
      setProfile: (profile) => set({ profile }),
      setPosts: (posts) => set({ posts }),
      setFollowers: (followers) => set({ followers }),
      setFollowing: (following) => set({ following }),
      setLoading: (loading) => set({ isLoading: loading }),
      
      // 更新用户资料
      updateProfile: async (updates) => {
        set({ isLoading: true })
        try {
          const currentProfile = get().profile
          const updatedProfile = { ...currentProfile, ...updates }
          set({ profile: updatedProfile, isLoading: false })
          return updatedProfile
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },
      
      // 添加文章
      addPost: (post) => {
        const currentPosts = get().posts
        set({ posts: [post, ...currentPosts] })
      },
      
      // 更新文章
      updatePost: (postId, updates) => {
        const currentPosts = get().posts
        const updatedPosts = currentPosts.map(post =>
          post.id === postId ? { ...post, ...updates } : post
        )
        set({ posts: updatedPosts })
      },
      
      // 删除文章
      removePost: (postId) => {
        const currentPosts = get().posts
        const filteredPosts = currentPosts.filter(post => post.id !== postId)
        set({ posts: filteredPosts })
      },
      
      // 关注用户
      followUser: (userAddress) => {
        const currentFollowing = get().following
        if (!currentFollowing.includes(userAddress)) {
          set({ following: [...currentFollowing, userAddress] })
        }
      },
      
      // 取消关注
      unfollowUser: (userAddress) => {
        const currentFollowing = get().following
        const updatedFollowing = currentFollowing.filter(addr => addr !== userAddress)
        set({ following: updatedFollowing })
      },
      
      // 重置用户状态
      reset: () => set({
        profile: null,
        posts: [],
        followers: [],
        following: [],
        isLoading: false
      })
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        profile: state.profile,
        following: state.following
      })
    }
  )
)

// 应用状态管理
export const useAppStore = create((set, get) => ({
  // 主题
  theme: 'light',
  
  // 侧边栏状态
  sidebarOpen: false,
  
  // 搜索状态
  searchQuery: '',
  searchResults: [],
  isSearching: false,
  
  // 通知
  notifications: [],
  
  // 操作方法
  setTheme: (theme) => set({ theme }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (results) => set({ searchResults: results }),
  setSearching: (searching) => set({ isSearching: searching }),
  
  // 添加通知
  addNotification: (notification) => {
    const id = Date.now().toString()
    const newNotification = { id, ...notification }
    set((state) => ({
      notifications: [...state.notifications, newNotification]
    }))
    
    // 自动移除通知
    setTimeout(() => {
      get().removeNotification(id)
    }, notification.duration || 5000)
    
    return id
  },
  
  // 移除通知
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id)
    }))
  },
  
  // 清空通知
  clearNotifications: () => set({ notifications: [] })
}))

