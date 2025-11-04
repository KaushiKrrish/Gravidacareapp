import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { EmotionTracker } from './EmotionTracker';
import { HealthTracker } from './HealthTracker';
import { DietPlanner } from './DietPlanner';
import { Community } from './Community';
import { Home, Camera, Activity, Utensils, Users, LogOut } from 'lucide-react';
import logoImage from 'figma:asset/417d9628279f39c868f8da196fe2000c098eb308.png';

interface UserDashboardProps {
  userName: string;
  onLogout: () => void;
}

export function UserDashboard({ userName, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EFFF] to-[#FFE8F5]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Gravida Care" className="h-10" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Welcome, {userName}</span>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white p-1 shadow-sm">
            <TabsTrigger value="home" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white">
              <Home className="w-4 h-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="emotion" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white">
              <Camera className="w-4 h-4 mr-2" />
              Emotion Check
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Health Tracker
            </TabsTrigger>
            <TabsTrigger value="diet" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white">
              <Utensils className="w-4 h-4 mr-2" />
              Diet Planner
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-[#000000] to-[#7B9EEB] text-white">
                <CardHeader>
                  <CardTitle>Daily Check-In</CardTitle>
                  <CardDescription className="text-white/80">Track your mood today</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => setActiveTab('emotion')}
                  >
                    Start Emotion Check
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#000000] to-[#FF89C4] text-white">
                <CardHeader>
                  <CardTitle>Health Vitals</CardTitle>
                  <CardDescription className="text-white/80">Monitor your progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => setActiveTab('health')}
                  >
                    View Health Stats
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#000000] to-[#A7DEFF] text-white">
                <CardHeader>
                  <CardTitle>Meal Planning</CardTitle>
                  <CardDescription className="text-white/80">Plan your nutrition</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => setActiveTab('diet')}
                  >
                    View Diet Plan
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Journey Overview</CardTitle>
                <CardDescription>Track your pregnancy milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-[#E8EFFF] rounded-lg">
                    <div className="text-2xl mb-1" style={{ color: '#5B7FDB' }}>24</div>
                    <div className="text-sm text-muted-foreground">Weeks</div>
                  </div>
                  <div className="text-center p-4 bg-[#FFE8F5] rounded-lg">
                    <div className="text-2xl mb-1" style={{ color: '#FF69B4' }}>98%</div>
                    <div className="text-sm text-muted-foreground">Health Score</div>
                  </div>
                  <div className="text-center p-4 bg-[#E8EFFF] rounded-lg">
                    <div className="text-2xl mb-1" style={{ color: '#5B7FDB' }}>2100</div>
                    <div className="text-sm text-muted-foreground">Daily Calories</div>
                  </div>
                  <div className="text-center p-4 bg-[#FFE8F5] rounded-lg">
                    <div className="text-2xl mb-1" style={{ color: '#FF69B4' }}>8</div>
                    <div className="text-sm text-muted-foreground">Check-ins</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emotion">
            <EmotionTracker />
          </TabsContent>

          <TabsContent value="health">
            <HealthTracker />
          </TabsContent>

          <TabsContent value="diet">
            <DietPlanner />
          </TabsContent>

          <TabsContent value="community">
            <Community />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
