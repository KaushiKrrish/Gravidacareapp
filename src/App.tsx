import { useState } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { UserDashboard } from './components/user/UserDashboard';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { Toaster } from './components/ui/sonner';

type AuthState = 'login' | 'signup' | 'authenticated';
type UserRole = 'user' | 'doctor' | null;

interface User {
  name: string;
  email: string;
  role: 'user' | 'doctor';
}

export default function App() {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string, role: 'user' | 'doctor') => {
    // Mock authentication - in a real app, this would validate credentials
    const name = email.split('@')[0];
    const user: User = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email,
      role
    };
    
    setCurrentUser(user);
    setAuthState('authenticated');
  };

  const handleSignup = (name: string, email: string, password: string, role: 'user' | 'doctor') => {
    // Mock signup - in a real app, this would create a new account
    const user: User = {
      name,
      email,
      role
    };
    
    setCurrentUser(user);
    setAuthState('authenticated');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthState('login');
  };

  return (
    <>
      <div className="min-h-screen">
        {authState === 'login' && (
          <LoginPage
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthState('signup')}
          />
        )}

        {authState === 'signup' && (
          <SignupPage
            onSignup={handleSignup}
            onSwitchToLogin={() => setAuthState('login')}
          />
        )}

        {authState === 'authenticated' && currentUser && (
          <>
            {currentUser.role === 'user' ? (
              <UserDashboard
                userName={currentUser.name}
                onLogout={handleLogout}
              />
            ) : (
              <DoctorDashboard
                doctorName={currentUser.name}
                onLogout={handleLogout}
              />
            )}
          </>
        )}
      </div>
      <Toaster />
    </>
  );
}
