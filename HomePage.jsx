import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Eye,
  Calendar,
  User,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react'
import { formatAddress } from '@/lib/web3'

// 模拟数据
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with Web3 Development',
    summary: 'A comprehensive guide to building decentralized applications using modern Web3 technologies...',
    content: 'Full content here...',
    author: '0x1234567890123456789012345678901234567890',
    authorName: 'Alice Developer',
    authorAvatar: '',
    category: 'Web3',
    tags: ['Web3', 'Blockchain', 'DApp'],
    coverImage: '',
    createdAt: Date.now() - 86400000, // 1 day ago
    stats: {
      views: 1234,
      likes: 89,
      comments: 23,
      mints: 5
    }
  },
  {
    id: '2',
    title: 'The Future of Decentralized Social Media',
    summary: 'Exploring how blockchain technology is revolutionizing social media platforms...',
    content: 'Full content here...',
    author: '0x2345678901234567890123456789012345678901',
    authorName: 'Bob Crypto',
    authorAvatar: '',
    category: 'Social',
    tags: ['Social Media', 'Decentralization', 'Privacy'],
    coverImage: '',
    createdAt: Date.now() - 172800000, // 2 days ago
    stats: {
      views: 856,
      likes: 67,
      comments: 15,
      mints: 3
    }
  },
  {
    id: '3',
    title: 'NFT Art and Digital Ownership',
    summary: 'Understanding the impact of NFTs on digital art and creative ownership...',
    content: 'Full content here...',
    author: '0x3456789012345678901234567890123456789012',
    authorName: 'Carol Artist',
    authorAvatar: '',
    category: 'NFT',
    tags: ['NFT', 'Art', 'Digital Rights'],
    coverImage: '',
    createdAt: Date.now() - 259200000, // 3 days ago
    stats: {
      views: 2341,
      likes: 156,
      comments: 42,
      mints: 12
    }
  }
]

const categories = [
  { name: 'All', count: 156 },
  { name: 'Web3', count: 45 },
  { name: 'DeFi', count: 32 },
  { name: 'NFT', count: 28 },
  { name: 'Social', count: 21 },
  { name: 'Gaming', count: 18 },
  { name: 'AI', count: 12 }
]

export function HomePage() {
  const [posts, setPosts] = useState(mockPosts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('latest') // latest, trending, popular

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays === 1) return '1 day ago'
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  const getSortIcon = () => {
    switch (sortBy) {
      case 'trending': return <TrendingUp className="w-4 h-4" />
      case 'popular': return <Star className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Shikyou
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A decentralized blogging platform where you own your content, connect with your audience, and earn from your creativity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link to="/write">Start Writing</Link>
          </Button>
          <Button variant="outline" size="lg">
            Explore Posts
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-sm transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent'
                    }`}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Featured Authors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Featured Authors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback>
                        {post.authorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {post.authorName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatAddress(post.author)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Sort Controls */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Latest Posts</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant={sortBy === 'latest' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('latest')}
                className="flex items-center gap-1"
              >
                <Clock className="w-4 h-4" />
                Latest
              </Button>
              <Button
                variant={sortBy === 'trending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('trending')}
                className="flex items-center gap-1"
              >
                <TrendingUp className="w-4 h-4" />
                Trending
              </Button>
              <Button
                variant={sortBy === 'popular' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSortBy('popular')}
                className="flex items-center gap-1"
              >
                <Star className="w-4 h-4" />
                Popular
              </Button>
            </div>
          </div>

          {/* Posts Grid */}
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Author Avatar */}
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback>
                        {post.authorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    {/* Post Content */}
                    <div className="flex-1 min-w-0">
                      {/* Author Info */}
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium">{post.authorName}</span>
                        <span className="text-muted-foreground">·</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                      </div>

                      {/* Post Title */}
                      <Link to={`/post/${post.id}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                      </Link>

                      {/* Post Summary */}
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Post Stats */}
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.stats.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.stats.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.stats.comments}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{post.stats.mints} mints</span>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Posts
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

