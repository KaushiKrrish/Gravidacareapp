import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PatientList } from './PatientList';
import { MedicationSuggestion } from './MedicationSuggestion';
import { Home, Users, Pill, Activity, TrendingUp, Clock, LogOut } from 'lucide-react';
import logoImage from 'figma:asset/417d9628279f39c868f8da196fe2000c098eb308.png';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface DoctorDashboardProps {
  doctorName: string;
  onLogout: () => void;
}

export function DoctorDashboard({ doctorName, onLogout }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [highlightCritical, setHighlightCritical] = useState(false);

  const weeklyData = [
    { day: 'Mon', appointments: 12, consultations: 8 },
    { day: 'Tue', appointments: 5, consultations: 10 },
    { day: 'Wed', appointments: 10, consultations: 7 },
    { day: 'Thu', appointments: 18, consultations: 12 },
    { day: 'Fri', appointments: 14, consultations: 9 },
    { day: 'Sat', appointments: 8, consultations: 5 },
    { day: 'Sun', appointments: 4, consultations: 3 }
  ];

  const patientStats = [
    { trimester: '1st', count: 28 },
    { trimester: '2nd', count: 42 },
    { trimester: '3rd', count: 35 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8EFFF] to-[#FFE8F5]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Gravida Care" className="h-10" />
            <div className="border-l pl-3 ml-3">
              <span className="text-sm text-muted-foreground">Doctor Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">Dr. {doctorName}</span>
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
            <TabsTrigger value="home" className="data-[state=active]:bg-[#FF69B4] data-[state=active]:text-white">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="patients" className="data-[state=active]:bg-[#FF69B4] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Patients
            </TabsTrigger>
            <TabsTrigger value="medication" className="data-[state=active]:bg-[#FF69B4] data-[state=active]:text-white">
              <Pill className="w-4 h-4 mr-2" />
              AI Medication
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-[#000000] to-[#FF89C4] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/90">Total Patients</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="text-3xl">105</span>
                  </div>
                  <p className="text-xs text-white/80 mt-1">+8 this month</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#000000] to-[#7B9EEB] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/90">Today's Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-3xl">12</span>
                  </div>
                  <p className="text-xs text-white/80 mt-1">3 remaining</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#000000] to-[#A7DEFF] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/90">Critical Cases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    <span className="text-3xl">3</span>
                  </div>
                  <p className="text-xs text-white/80 mt-1">Requires attention</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-[#000000] to-[#FFC6D1] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-white/90">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-3xl">98%</span>
                  </div>
                  <p className="text-xs text-white/80 mt-1">Positive outcomes</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Appointments and consultations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="appointments" 
                        stroke="#5B7FDB" 
                        strokeWidth={3}
                        name="Appointments"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="consultations" 
                        stroke="#FF69B4" 
                        strokeWidth={3}
                        name="Consultations"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Distribution</CardTitle>
                  <CardDescription>By trimester</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={patientStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="trimester" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#FF69B4" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Frequently used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2"
                    onClick={() => setActiveTab('patients')}
                  >
                    <Users className="w-6 h-6 text-[#5B7FDB]" />
                    <span>View All Patients</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2"
                    onClick={() => setActiveTab('medication')}
                  >
                    <Pill className="w-6 h-6 text-[#FF69B4]" />
                    <span>AI Prescriptions</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2"
                    onClick={() => {
                      setHighlightCritical(true);
                      setActiveTab('patients');
                    }}
                  >
                    <Activity className="w-6 h-6 text-[#87CEEB]" />
                    <span>Critical Alerts</span>
                  </Button>
      
                  
                </div>
              </CardContent>
            </Card>

            {/* Recent Patients */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Consultations</CardTitle>
                <CardDescription>Latest patient interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Johnson', time: '10:30 AM', status: 'Completed', trimester: '24 weeks' },
                    { name: 'Emily Chen', time: '11:15 AM', status: 'Completed', trimester: '32 weeks' },
                    { name: 'Maria Garcia', time: '2:00 PM', status: 'Upcoming', trimester: '28 weeks' },
                    { name: 'Lisa Anderson', time: '3:30 PM', status: 'Upcoming', trimester: '18 weeks' }
                  ].map((patient, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-[#E8EFFF] hover:bg-[#D8DFEF] transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#FF69B4] flex items-center justify-center text-white">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div>{patient.name}</div>
                          <div className="text-sm text-muted-foreground">{patient.trimester}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm">{patient.time}</div>
                        <div className={`text-xs ${patient.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
                          {patient.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients">
            <PatientList 
              highlightCritical={highlightCritical} 
              onHighlightComplete={() => setHighlightCritical(false)}
            />
          </TabsContent>

          <TabsContent value="medication">
            <MedicationSuggestion />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
