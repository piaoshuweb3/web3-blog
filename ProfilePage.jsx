import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
// import { useWeb3ModalAccount } from '@web3modal/ethers/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  User, 
  Edit, 
  Share2, 
  Heart, 
  MessageCircle, 
  Eye,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Github
} from 'lucide-react'
import { formatAddress } from '@/lib/web3'

// 模拟用户数据
const mockUserProfile = {
  address: '0x1234567890123456789012345678901234567890',
  username: 'Alice Developer',
  bio: 'Web3 developer passionate about decentralized technologies and building the future of the internet.',
  avatar: '',
  coverImage: '',
  location: 'San Francisco, CA',
  website: 'https://alice.dev',
  social: {
    twitter: 'alice_dev',
    github: 'alice-dev'
  },
  joinedAt: Date.now() - 86400000 * 365, // 1 year ago
  stats: {
    posts: 42,
    followers: 1234,
    following: 567,
    totalViews: 45678,
    totalLikes: 2345
  }
}

const mockUserPosts = [
  {
    id: '1',
    title: 'Getting Started with Web3 Development',
    summary: 'A comprehensive guide to building decentralized applications...',
    category: 'Web3',
    createdAt: Date.now() - 86400000,
    stats: { views: 1234, likes: 89, comments: 23 }
  },
  {
    id: '2',
    title: 'Smart Contract Security Best Practices',
    summary: 'Essential security considerations when developing smart contracts...',
    category: 'Security',
    createdAt: Date.now() - 172800000,
    stats: { views: 856, likes: 67, comments: 15 }
  }
]

export function ProfilePage() {
  const { address: paramAddress } = useParams()
  // const { address: connectedAddress, isConnected } = useWeb3ModalAccount()
  const connectedAddress = '0x1234567890123456789012345678901234567890'
  const isConnected = true
  const [profile, setProfile] = useState(mockUserProfile)
  const [posts, setPosts] = useState(mockUserPosts)
  const [isFollowing, setIsFollowing] = useState(false)
  const [activeTab, setActiveTab] = useState('posts')

  const isOwnProfile = isConnected && connectedAddress?.toLowerCase() === (paramAddress || connectedAddress)?.toLowerCase()
  const profileAddress = paramAddress || connectedAddress

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // 这里会集成实际的关注功能
  }

  if (!profileAddress) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-muted-foreground mb-8">
          Please connect your wallet or provide a valid address.
        </p>
        <Button onClick={() => window.location.href = '/'}>
          Go Back Home
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-6 relative">
        {profile.coverImage && (
          <img
            src={profile.coverImage}
            alt="Cover"
            className="w-full h-full object-cover rounded-lg"
          />
        )}
      </div>

      {/* Profile Header */}
      <div className="relative mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
          {/* Avatar */}
          <Avatar className="w-32 h-32 border-4 border-background -mt-16">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback className="text-2xl">
              {profile.username.charAt(0)}
            </AvatarFallback>
          </Avatar>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">{profile.username}</h1>
                <p className="text-muted-foreground font-mono">
                  {formatAddress(profileAddress)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                {isOwnProfile ? (
                  <Button className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </Button>
                ) : (
                  <>
                    <Button
                      variant={isFollowing ? 'outline' : 'default'}
                      onClick={handleFollow}
                      className="flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="mt-4 text-muted-foreground max-w-2xl">
                {profile.bio}
              </p>
            )}

            {/* Profile Details */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-1">
                  <LinkIcon className="w-4 h-4" />
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    {profile.website.replace('https://', '')}
                  </a>
                </div>
              )}
              {profile.social.twitter && (
                <div className="flex items-center gap-1">
                  <Twitter className="w-4 h-4" />
                  <a
                    href={`https://twitter.com/${profile.social.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    @{profile.social.twitter}
                  </a>
                </div>
              )}
              {profile.social.github && (
                <div className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  <a
                    href={`https://github.com/${profile.social.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    {profile.social.github}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Joined {formatDate(profile.joinedAt)}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.posts}</div>
            <div className="text-sm text-muted-foreground">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.followers}</div>
            <div className="text-sm text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.following}</div>
            <div className="text-sm text-muted-foreground">Following</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.totalViews}</div>
            <div className="text-sm text-muted-foreground">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profile.stats.totalLikes}</div>
            <div className="text-sm text-muted-foreground">Total Likes</div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="liked">Liked</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-6">
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(post.createdAt)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 hover:text-primary cursor-pointer">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {post.summary}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="liked" className="mt-6">
          <div className="text-center py-12">
            <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No liked posts yet</h3>
            <p className="text-muted-foreground">
              Posts that this user has liked will appear here.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="nfts" className="mt-6">
          <div className="text-center py-12">
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4" />
            <h3 className="text-lg font-semibold mb-2">No NFTs yet</h3>
            <p className="text-muted-foreground">
              NFT posts created by this user will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

