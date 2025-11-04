import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Heart, MessageCircle, Share2, Users, Calendar, BookOpen, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface Post {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  trimester: string;
  isLiked: boolean;
}

export function Community() {
  const [newPost, setNewPost] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      timeAgo: '2 hours ago',
      content: 'Just had my 20-week ultrasound! Everything looks perfect. Feeling so grateful and excited! 💙',
      likes: 24,
      comments: 8,
      trimester: '2nd Trimester',
      isLiked: false
    },
    {
      id: '2',
      author: 'Emily Chen',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      timeAgo: '5 hours ago',
      content: 'Anyone else dealing with back pain? What stretches or exercises have helped you? Looking for recommendations! 🤰',
      likes: 18,
      comments: 15,
      trimester: '3rd Trimester',
      isLiked: true
    },
    {
      id: '3',
      author: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      timeAgo: '1 day ago',
      content: 'Finally got the nursery set up! It turned out better than I imagined. Can\'t wait to meet our little one! 🌸',
      likes: 42,
      comments: 12,
      trimester: '3rd Trimester',
      isLiked: false
    }
  ]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        author: 'You',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
        timeAgo: 'Just now',
        content: newPost,
        likes: 0,
        comments: 0,
        trimester: '2nd Trimester',
        isLiked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  const upcomingEvents = [
    { title: 'Prenatal Yoga Class', date: 'Nov 5, 2025', participants: 12 },
    { title: 'Nutrition Workshop', date: 'Nov 8, 2025', participants: 24 },
    { title: 'Virtual Support Group', date: 'Nov 12, 2025', participants: 18 }
  ];

  const articles = [
    { title: 'Managing Morning Sickness', category: 'Health', readTime: '5 min' },
    { title: 'Creating a Birth Plan', category: 'Planning', readTime: '8 min' },
    { title: 'Exercise During Pregnancy', category: 'Fitness', readTime: '6 min' },
    { title: 'Preparing for Breastfeeding', category: 'Nutrition', readTime: '10 min' }
  ];

  return (
    <div className="space-y-6">
      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Community Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#5B7FDB]" />
              <span className="text-2xl">2,847</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">+127 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Discussions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-[#FF69B4]" />
              <span className="text-2xl">384</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Updated today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Support Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#87CEEB]" />
              <span className="text-2xl">98%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Positive feedback</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <Card>
            <CardHeader>
              <CardTitle>Share with the Community</CardTitle>
              <CardDescription>Connect with other expecting mothers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Share your thoughts, questions, or experiences..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-[#E8EFFF]">
                    2nd Trimester
                  </Badge>
                </div>
                <Button 
                  onClick={handlePostSubmit}
                  className="bg-[#5B7FDB] hover:bg-[#4A6ECA]"
                  disabled={!newPost.trim()}
                >
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          <Tabs defaultValue="all">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="trimester1">1st Trimester</TabsTrigger>
              <TabsTrigger value="trimester2">2nd Trimester</TabsTrigger>
              <TabsTrigger value="trimester3">3rd Trimester</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 mt-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={post.avatar} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{post.author}</span>
                              <Badge variant="secondary" className="text-xs">
                                {post.trimester}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                          </div>
                        </div>
                        <p className="mb-4">{post.content}</p>
                        <div className="flex gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={post.isLiked ? 'text-[#FF69B4]' : ''}
                          >
                            <Heart
                              className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`}
                            />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trimester2" className="space-y-4 mt-4">
              {posts.filter(p => p.trimester === '2nd Trimester').map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={post.avatar} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span>{post.author}</span>
                              <Badge variant="secondary" className="text-xs">
                                {post.trimester}
                              </Badge>
                            </div>
                            <span className="text-sm text-muted-foreground">{post.timeAgo}</span>
                          </div>
                        </div>
                        <p className="mb-4">{post.content}</p>
                        <div className="flex gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(post.id)}
                            className={post.isLiked ? 'text-[#FF69B4]' : ''}
                          >
                            <Heart
                              className={`w-4 h-4 mr-2 ${post.isLiked ? 'fill-current' : ''}`}
                            />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {post.comments}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#5B7FDB]" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-[#E8EFFF] hover:bg-[#D8DFEF] transition-colors cursor-pointer"
                >
                  <h4 className="mb-1">{event.title}</h4>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{event.date}</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {event.participants}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Events
              </Button>
            </CardContent>
          </Card>

          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FF69B4]" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {['#PregnancyNutrition', '#BabyKicks', '#NurseryIdeas', '#SelfCare', '#BirthPlan'].map(
                (topic, index) => (
                  <div
                    key={index}
                    className="p-2 rounded hover:bg-[#FFE8F5] transition-colors cursor-pointer"
                  >
                    <span style={{ color: '#FF69B4' }}>{topic}</span>
                  </div>
                )
              )}
            </CardContent>
          </Card>

          {/* Educational Resources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#87CEEB]" />
                Must-Read Articles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg border hover:border-[#87CEEB] transition-colors cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm">{article.title}</h4>
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
