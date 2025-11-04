import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import logoImage from 'figma:asset/417d9628279f39c868f8da196fe2000c098eb308.png';

interface SignupPageProps {
  onSignup: (name: string, email: string, password: string, role: 'user' | 'doctor') => void;
  onSwitchToLogin: () => void;
}

export function SignupPage({ onSignup, onSwitchToLogin }: SignupPageProps) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');
  const [doctorLicense, setDoctorLicense] = useState('');

  const handleUserSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(userName, userEmail, userPassword, 'user');
  };

  const handleDoctorSignup = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(doctorName, doctorEmail, doctorPassword, 'doctor');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ 
      background: 'linear-gradient(135deg, #E8EFFF 0%, #FFE8F5 100%)' 
    }}>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logoImage} alt="Gravida Care Logo" className="h-16" />
          </div>
          <CardTitle>Join Gravida Care</CardTitle>
          <CardDescription>Create your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="user">Patient Signup</TabsTrigger>
              <TabsTrigger value="doctor">Doctor Signup</TabsTrigger>
            </TabsList>
            
            <TabsContent value="user">
              <form onSubmit={handleUserSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="user-name">Full Name</Label>
                  <Input
                    id="user-name"
                    type="text"
                    placeholder="Sarah Johnson"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user-password">Password</Label>
                  <Input
                    id="user-password"
                    type="password"
                    placeholder="••••••••"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" style={{ backgroundColor: '#5B7FDB' }}>
                  Create Patient Account
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="doctor">
              <form onSubmit={handleDoctorSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="doctor-name">Full Name</Label>
                  <Input
                    id="doctor-name"
                    type="text"
                    placeholder="Dr. Emily Roberts"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-email">Email</Label>
                  <Input
                    id="doctor-email"
                    type="email"
                    placeholder="doctor.email@hospital.com"
                    value={doctorEmail}
                    onChange={(e) => setDoctorEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-license">Medical License Number</Label>
                  <Input
                    id="doctor-license"
                    type="text"
                    placeholder="MD123456"
                    value={doctorLicense}
                    onChange={(e) => setDoctorLicense(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="doctor-password">Password</Label>
                  <Input
                    id="doctor-password"
                    type="password"
                    placeholder="••••••••"
                    value={doctorPassword}
                    onChange={(e) => setDoctorPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" style={{ backgroundColor: '#FF69B4' }}>
                  Create Doctor Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <button 
                onClick={onSwitchToLogin}
                className="text-primary hover:underline"
                style={{ color: '#5B7FDB' }}
              >
                Sign In
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
