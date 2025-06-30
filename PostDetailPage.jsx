import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Eye,
  Calendar,
  ArrowLeft,
  Star,
  Send
} from 'lucide-react'
import { formatAddress } from '@/lib/web3'

// 模拟文章数据
const mockPost = {
  id: '1',
  title: 'Getting Started with Web3 Development',
  content: `# Getting Started with Web3 Development

Web3 development represents a paradigm shift in how we build and interact with applications. Unlike traditional web applications that rely on centralized servers, Web3 applications (dApps) leverage blockchain technology to create decentralized, trustless systems.

## What is Web3?

Web3, also known as the decentralized web, is the next evolution of the internet. It's built on blockchain technology and emphasizes:

- **Decentralization**: No single point of control
- **Transparency**: All transactions are publicly verifiable
- **Ownership**: Users own their data and digital assets
- **Permissionless**: Anyone can participate without gatekeepers

## Key Technologies

### Blockchain
The foundation of Web3, providing immutable and transparent record-keeping.

### Smart Contracts
Self-executing contracts with terms directly written into code.

### IPFS (InterPlanetary File System)
Distributed file storage system for decentralized applications.

### Wallets
Digital wallets that store cryptocurrencies and interact with dApps.

## Getting Started

1. **Learn the Basics**: Understand blockchain fundamentals
2. **Choose a Blockchain**: Ethereum, Polygon, Solana, etc.
3. **Set Up Development Environment**: Install necessary tools
4. **Build Your First dApp**: Start with a simple project
5. **Deploy and Test**: Use testnets before mainnet deployment

## Conclusion

Web3 development is an exciting field with immense potential. While there's a learning curve, the opportunities to build innovative, decentralized applications make it worthwhile.

Happy coding! 🚀`,
  summary: 'A comprehensive guide to building decentralized applications using modern Web3 technologies...',
  author: '0x1234567890123456789012345678901234567890',
  authorName: 'Alice Developer',
  authorAvatar: '',
  category: 'Web3',
  tags: ['Web3', 'Blockchain', 'DApp', 'Tutorial'],
  coverImage: '',
  createdAt: Date.now() - 86400000, // 1 day ago
  updatedAt: Date.now() - 86400000,
  stats: {
    views: 1234,
    likes: 89,
    comments: 23,
    mints: 5
  },
  isLiked: false,
  isMinted: false
}

const mockComments = [
  {
    id: '1',
    author: '0x2345678901234567890123456789012345678901',
    authorName: 'Bob Reader',
    authorAvatar: '',
    content: 'Great article! This really helped me understand the basics of Web3 development.',
    createdAt: Date.now() - 43200000, // 12 hours ago
    likes: 5,
    isLiked: false
  },
  {
    id: '2',
    author: '0x3456789012345678901234567890123456789012',
    authorName: 'Carol Crypto',
    authorAvatar: '',
    content: 'Thanks for sharing this comprehensive guide. Looking forward to more content like this!',
    createdAt: Date.now() - 21600000, // 6 hours ago
    likes: 3,
    isLiked: false
  }
]

export function PostDetailPage() {
  const { id } = useParams()
  const [post, setPost] = useState(mockPost)
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      stats: {
        ...prev.stats,
        likes: prev.isLiked ? prev.stats.likes - 1 : prev.stats.likes + 1
      }
    }))
  }

  const handleMint = () => {
    setPost(prev => ({
      ...prev,
      isMinted: true,
      stats: {
        ...prev.stats,
        mints: prev.stats.mints + 1
      }
    }))
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    // 这里可以添加分享通知
  }

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      author: '0x1111111111111111111111111111111111111111',
      authorName: 'Current User',
      authorAvatar: '',
      content: newComment,
      createdAt: Date.now(),
      likes: 0,
      isLiked: false
    }

    setComments(prev => [comment, ...prev])
    setNewComment('')
  }

  const handleCommentLike = (commentId) => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId 
        ? {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </Button>

      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="secondary">{post.category}</Badge>
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={post.authorAvatar} />
              <AvatarFallback>
                {post.authorName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.authorName}</p>
              <p className="text-sm text-muted-foreground">
                {formatAddress(post.author)}
              </p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.createdAt)}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {post.stats.views} views
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt="Cover"
          className="w-full h-64 object-cover rounded-lg mb-8"
        />
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <pre className="whitespace-pre-wrap font-sans leading-relaxed">
          {post.content}
        </pre>
      </div>

      {/* Article Actions */}
      <div className="flex items-center justify-between py-6 border-y">
        <div className="flex items-center space-x-4">
          <Button
            variant={post.isLiked ? "default" : "outline"}
            onClick={handleLike}
            className="flex items-center gap-2"
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
            {post.stats.likes}
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            {post.stats.comments}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleShare}
            className="flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={post.isMinted ? "secondary" : "default"}
            onClick={handleMint}
            disabled={post.isMinted}
            className="flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            {post.isMinted ? 'Minted' : 'Mint NFT'}
          </Button>
          <span className="text-sm text-muted-foreground">
            {post.stats.mints} mints
          </span>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">
          Comments ({comments.length})
        </h2>

        {/* Add Comment */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="mb-3"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
                className="flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Post Comment
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.authorAvatar} />
                    <AvatarFallback>
                      {comment.authorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium">{comment.authorName}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    
                    <p className="text-sm mb-3">{comment.content}</p>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCommentLike(comment.id)}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Heart className={`w-3 h-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                      {comment.likes}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
            <p className="text-muted-foreground">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

