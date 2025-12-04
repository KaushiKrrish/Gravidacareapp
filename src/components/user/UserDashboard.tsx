import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { EmotionTracker } from './EmotionTracker';
import { HealthTracker } from './HealthTracker';
import { DietPlanner } from './DietPlanner';
import { Community } from './Community';
import { AccessibilitySettings } from '../accessibility/AccessibilitySettings';
import { ChatbotAssistant } from '../accessibility/ChatbotAssistant';
import { Reminders } from '../accessibility/Reminders';
import { Home, Camera, Activity, Utensils, Users, LogOut, Menu, Bell } from 'lucide-react';
import logoImage from 'figma:asset/417d9628279f39c868f8da196fe2000c098eb308.png';

interface UserDashboardProps {
  userName: string;
  onLogout: () => void;
}

export function UserDashboard({ userName, onLogout }: UserDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { value: 'home', icon: Home, label: 'Home' },
    { value: 'emotion', icon: Camera, label: 'Emotion Check' },
    { value: 'health', icon: Activity, label: 'Health Tracker' },
    { value: 'diet', icon: Utensils, label: 'Diet Planner' },
    { value: 'community', icon: Users, label: 'Community' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EFFF] to-[#FFE8F5]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Gravida Care" className="h-8 md:h-10" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {userName}</span>
            <AccessibilitySettings />
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <img src={logoImage} alt="Gravida" className="h-8" />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <div className="pb-4 border-b">
                    <p className="text-sm text-muted-foreground">Welcome,</p>
                    <p className="font-medium">{userName}</p>
                  </div>
                  
                  {/* Navigation Items */}
                  <div className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Button
                          key={item.value}
                          variant={activeTab === item.value ? "default" : "ghost"}
                          className={`w-full justify-start ${
                            activeTab === item.value 
                              ? 'bg-[#5B7FDB] text-white hover:bg-[#4A6ECA]' 
                              : ''
                          }`}
                          onClick={() => {
                            setActiveTab(item.value);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {item.label}
                        </Button>
                      );
                    })}
                  </div>

                  {/* Settings */}
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Accessibility</span>
                      <AccessibilitySettings />
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
                      onClick={onLogout}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-3 md:p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
          {/* Desktop Tabs */}
          <TabsList className="hidden md:flex bg-white p-1 shadow-sm w-full">
            <TabsTrigger value="home" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white flex-1">
              <Home className="w-4 h-4 mr-2" />
              Home
            </TabsTrigger>
            <TabsTrigger value="emotion" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white flex-1">
              <Camera className="w-4 h-4 mr-2" />
              Emotion Check
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white flex-1">
              <Activity className="w-4 h-4 mr-2" />
              Health Tracker
            </TabsTrigger>
            <TabsTrigger value="diet" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white flex-1">
              <Utensils className="w-4 h-4 mr-2" />
              Diet Planner
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-[#5B7FDB] data-[state=active]:text-white flex-1">
              <Users className="w-4 h-4 mr-2" />
              Community
            </TabsTrigger>
          </TabsList>

          {/* Mobile - Show current page title */}
          <div className="md:hidden bg-white p-3 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {menuItems.find(item => item.value === activeTab) && (
                <>
                  {(() => {
                    const Icon = menuItems.find(item => item.value === activeTab)!.icon;
                    return <Icon className="w-5 h-5 text-[#5B7FDB]" />;
                  })()}
                  {menuItems.find(item => item.value === activeTab)!.label}
                </>
              )}
            </h2>
          </div>

          <TabsContent value="home" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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
                <CardTitle className="text-base md:text-lg">Your Journey Overview</CardTitle>
                <CardDescription className="text-sm">Track your pregnancy milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
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

            {/* Reminders */}
            <Reminders />
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

      {/* Chatbot Assistant */}
      <ChatbotAssistant />
    </div>
  );
}
