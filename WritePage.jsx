import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
// import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import { 
  Save, 
  Send, 
  Eye, 
  Image, 
  Hash,
  X
} from 'lucide-react'

const categories = [
  'Web3', 'DeFi', 'NFT', 'Gaming', 'AI', 'Social', 'Tutorial', 'Opinion', 'News', 'Other'
]

export function WritePage() {
  const navigate = useNavigate()
  // const { address, isConnected } = useWeb3ModalAccount()
  const address = '0x1234567890123456789012345678901234567890'
  const isConnected = true
  
  const [post, setPost] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    tags: [],
    coverImage: ''
  })
  
  const [newTag, setNewTag] = useState('')
  const [isPreview, setIsPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  // 如果未连接钱包，显示连接提示
  if (!isConnected) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-muted-foreground mb-8">
          You need to connect your wallet to start writing and publishing posts.
        </p>
        <Button onClick={() => window.location.href = '/'}>
          Go Back Home
        </Button>
      </div>
    )
  }

  const handleInputChange = (field, value) => {
    setPost(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !post.tags.includes(newTag.trim()) && post.tags.length < 5) {
      setPost(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove) => {
    setPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
  }

  const saveDraft = async () => {
    setIsSaving(true)
    try {
      // 保存草稿逻辑
      console.log('Saving draft:', post)
      // 这里会集成Firebase保存功能
      await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟保存
    } catch (error) {
      console.error('Error saving draft:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const publishPost = async () => {
    if (!post.title.trim() || !post.content.trim()) {
      alert('Please fill in title and content')
      return
    }

    setIsPublishing(true)
    try {
      // 发布文章逻辑
      console.log('Publishing post:', post)
      // 这里会集成IPFS上传和区块链交互
      await new Promise(resolve => setTimeout(resolve, 2000)) // 模拟发布
      navigate('/')
    } catch (error) {
      console.error('Error publishing post:', error)
    } finally {
      setIsPublishing(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Write New Post</h1>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            onClick={saveDraft}
            disabled={isSaving}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            onClick={publishPost}
            disabled={isPublishing}
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isPublishing ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2">
          {!isPreview ? (
            <div className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter your post title..."
                  value={post.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>

              {/* Summary */}
              <div>
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Write a brief summary of your post..."
                  value={post.summary}
                  onChange={(e) => handleInputChange('summary', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Cover Image */}
              <div>
                <Label htmlFor="coverImage">Cover Image URL (Optional)</Label>
                <div className="flex space-x-2">
                  <Input
                    id="coverImage"
                    placeholder="https://example.com/image.jpg"
                    value={post.coverImage}
                    onChange={(e) => handleInputChange('coverImage', e.target.value)}
                  />
                  <Button variant="outline" size="sm">
                    <Image className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here... (Markdown supported)"
                  value={post.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={20}
                  className="font-mono"
                />
              </div>
            </div>
          ) : (
            /* Preview */
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{post.title || 'Untitled Post'}</CardTitle>
                {post.summary && (
                  <p className="text-muted-foreground">{post.summary}</p>
                )}
              </CardHeader>
              <CardContent>
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt="Cover"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="prose prose-sm max-w-none">
                  {post.content ? (
                    <pre className="whitespace-pre-wrap font-sans">
                      {post.content}
                    </pre>
                  ) : (
                    <p className="text-muted-foreground italic">No content yet...</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="space-y-6">
            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Category</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={post.category}
                  onValueChange={(value) => handleInputChange('category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={addTag}
                    disabled={!newTag.trim() || post.tags.length >= 5}
                    size="sm"
                  >
                    <Hash className="w-4 h-4" />
                  </Button>
                </div>
                
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-muted-foreground">
                  {post.tags.length}/5 tags
                </p>
              </CardContent>
            </Card>

            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Publishing Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mint as NFT</span>
                  <input type="checkbox" className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable Comments</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Public Post</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Author</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">Connected as:</p>
                  <p className="text-muted-foreground font-mono">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

