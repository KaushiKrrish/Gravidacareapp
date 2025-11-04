import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, Eye, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Patient {
  id: string;
  name: string;
  age: number;
  weeks: number;
  lastVisit: string;
  nextAppointment: string;
  status: 'healthy' | 'monitor' | 'critical';
  weight: number;
  bloodPressure: string;
  heartRate: number;
  emotionScore: number;
}

interface PatientListProps {
  highlightCritical?: boolean;
  onHighlightComplete?: () => void;
}

export function PatientList({ highlightCritical = false, onHighlightComplete }: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const criticalPatientRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const patients: Patient[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      age: 28,
      weeks: 24,
      lastVisit: '2025-10-28',
      nextAppointment: '2025-11-11',
      status: 'critical',
      weight: 65,
      bloodPressure: '121/81',
      heartRate: 75,
      emotionScore: 92
    },
    {
      id: '2',
      name: 'Emily Chen',
      age: 32,
      weeks: 32,
      lastVisit: '2025-10-25',
      nextAppointment: '2025-11-08',
      status: 'monitor',
      weight: 72,
      bloodPressure: '135/88',
      heartRate: 82,
      emotionScore: 75
    },
    {
      id: '3',
      name: 'Maria Garcia',
      age: 26,
      weeks: 28,
      lastVisit: '2025-10-30',
      nextAppointment: '2025-11-13',
      status: 'healthy',
      weight: 68,
      bloodPressure: '118/76',
      heartRate: 72,
      emotionScore: 88
    },
    {
      id: '4',
      name: 'Lisa Anderson',
      age: 35,
      weeks: 18,
      lastVisit: '2025-10-27',
      nextAppointment: '2025-11-10',
      status: 'critical',
      weight: 62,
      bloodPressure: '142/95',
      heartRate: 88,
      emotionScore: 65
    },
    {
      id: '5',
      name: 'Jennifer Martinez',
      age: 29,
      weeks: 20,
      lastVisit: '2025-10-29',
      nextAppointment: '2025-11-12',
      status: 'healthy',
      weight: 64,
      bloodPressure: '120/80',
      heartRate: 76,
      emotionScore: 90
    }
  ];

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (highlightCritical) {
      // Find first critical patient
      const firstCriticalPatient = filteredPatients.find(p => p.status === 'critical');
      if (firstCriticalPatient && criticalPatientRefs.current[firstCriticalPatient.id]) {
        // Scroll to the first critical patient
        criticalPatientRefs.current[firstCriticalPatient.id]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
      
      // Reset highlight after animation completes
      const timer = setTimeout(() => {
        onHighlightComplete?.();
      }, 7000);
      
      return () => clearTimeout(timer);
    }
  }, [highlightCritical, filteredPatients, onHighlightComplete]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-300';
      case 'monitor': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4" />;
      case 'monitor': return <AlertCircle className="w-4 h-4" />;
      case 'critical': return <AlertCircle className="w-4 h-4" />;
    }
  };

  const mockWeightData = [
    { week: 'Week 14', weight: 58 },
    { week: 'Week 16', weight: 59 },
    { week: 'Week 18', weight: 60 },
    { week: 'Week 20', weight: 62 },
    { week: 'Week 22', weight: 63 },
    { week: 'Week 24', weight: 65 }
  ];

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Management</CardTitle>
          <CardDescription>Track and monitor all your patients</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search patients by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="whitespace-nowrap">
              Filter by Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Patient Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Healthy</p>
                <p className="text-2xl" style={{ color: '#5B7FDB' }}>
                  {patients.filter(p => p.status === 'healthy').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monitoring</p>
                <p className="text-2xl" style={{ color: '#FF69B4' }}>
                  {patients.filter(p => p.status === 'monitor').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical</p>
                <p className="text-2xl text-red-600">
                  {patients.filter(p => p.status === 'critical').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader>
          <CardTitle>All Patients ({filteredPatients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredPatients.map((patient) => {
              const isCritical = patient.status === 'critical';
              const shouldHighlight = highlightCritical && isCritical;
              
              return (
              <Dialog key={patient.id}>
                <div 
                  ref={(el) => {
                    if (isCritical) {
                      criticalPatientRefs.current[patient.id] = el;
                    }
                  }}
                  className={`p-4 rounded-lg border transition-all bg-white hover:shadow-md ${
                    shouldHighlight 
                      ? 'border-red-500 shadow-lg shadow-red-200 bg-red-50' 
                      : 'hover:border-[#5B7FDB]'
                  }`}
                  style={shouldHighlight ? {
                    animation: 'critical-highlight 1.5s ease-in-out 3'
                  } : undefined}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5B7FDB] to-[#FF69B4] flex items-center justify-center text-white">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4>{patient.name}</h4>
                          <Badge variant="outline" className={getStatusColor(patient.status)}>
                            <span className="flex items-center gap-1">
                              {getStatusIcon(patient.status)}
                              {patient.status.toUpperCase()}
                            </span>
                          </Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{patient.age} years</span>
                          <span>•</span>
                          <span>{patient.weeks} weeks pregnant</span>
                          <span>•</span>
                          <span>Next: {patient.nextAppointment}</span>
                        </div>
                      </div>
                    </div>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                  </div>
                </div>

                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <span>{patient.name}</span>
                      <Badge className={getStatusColor(patient.status)}>
                        {patient.status.toUpperCase()}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription>
                      {patient.age} years old • {patient.weeks} weeks pregnant
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="overview">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="health">Health Data</TabsTrigger>
                      <TabsTrigger value="emotion">Emotion Tracking</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Last Visit</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>{patient.lastVisit}</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm">Next Appointment</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>{patient.nextAppointment}</p>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>Current Vitals</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-[#E8EFFF] rounded-lg">
                              <p className="text-sm text-muted-foreground mb-1">Weight</p>
                              <p className="text-xl" style={{ color: '#5B7FDB' }}>{patient.weight} kg</p>
                            </div>
                            <div className="text-center p-3 bg-[#FFE8F5] rounded-lg">
                              <p className="text-sm text-muted-foreground mb-1">BP</p>
                              <p className="text-xl" style={{ color: '#FF69B4' }}>{patient.bloodPressure}</p>
                            </div>
                            <div className="text-center p-3 bg-[#E8EFFF] rounded-lg">
                              <p className="text-sm text-muted-foreground mb-1">Heart Rate</p>
                              <p className="text-xl" style={{ color: '#5B7FDB' }}>{patient.heartRate} bpm</p>
                            </div>
                            <div className="text-center p-3 bg-[#FFE8F5] rounded-lg">
                              <p className="text-sm text-muted-foreground mb-1">Emotion</p>
                              <p className="text-xl" style={{ color: '#FF69B4' }}>{patient.emotionScore}%</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="health" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Weight Progress</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={mockWeightData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="week" />
                              <YAxis />
                              <Tooltip />
                              <Line 
                                type="monotone" 
                                dataKey="weight" 
                                stroke="#5B7FDB" 
                                strokeWidth={3}
                                dot={{ fill: '#5B7FDB', r: 5 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="emotion" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Emotional Health Timeline</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {[
                            { date: 'Oct 30, 2025', emotion: 'Happy', score: 92 },
                            { date: 'Oct 28, 2025', emotion: 'Calm', score: 88 },
                            { date: 'Oct 26, 2025', emotion: 'Anxious', score: 70 },
                            { date: 'Oct 24, 2025', emotion: 'Happy', score: 85 }
                          ].map((record, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-[#E8EFFF] rounded-lg">
                              <div>
                                <p>{record.emotion}</p>
                                <p className="text-sm text-muted-foreground">{record.date}</p>
                              </div>
                              <Badge>{record.score}%</Badge>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
