import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Camera, Smile, Frown, Meh, Heart, AlertCircle } from 'lucide-react';
import { Progress } from '../ui/progress';

interface EmotionResult {
  emotion: string;
  confidence: number;
  icon: React.ReactNode;
  color: string;
  recommendation: string;
}

export function EmotionTracker() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const emotions: EmotionResult[] = [
    {
      emotion: 'Happy',
      confidence: 92,
      icon: <Smile className="w-6 h-6" />,
      color: '#FFD700',
      recommendation: 'Great! Keep up the positive energy. Consider some light exercise or a walk.'
    },
    {
      emotion: 'Calm',
      confidence: 88,
      icon: <Heart className="w-6 h-6" />,
      color: '#87CEEB',
      recommendation: 'You seem relaxed. This is perfect for meditation or reading.'
    },
    {
      emotion: 'Anxious',
      confidence: 75,
      icon: <AlertCircle className="w-6 h-6" />,
      color: '#FFA500',
      recommendation: 'Try deep breathing exercises or talk to your support group.'
    },
    {
      emotion: 'Tired',
      confidence: 85,
      icon: <Meh className="w-6 h-6" />,
      color: '#9370DB',
      recommendation: 'Consider taking a rest. Your body needs proper sleep during pregnancy.'
    },
    {
      emotion: 'Stressed',
      confidence: 70,
      icon: <Frown className="w-6 h-6" />,
      color: '#FF6B6B',
      recommendation: 'Please reach out to your healthcare provider. Practice relaxation techniques.'
    }
  ];

  const startCamera = async () => {
    try {
      setCameraActive(true);
      // In a real app, this would access the camera
      // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // if (videoRef.current) {
      //   videoRef.current.srcObject = stream;
      // }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const analyzeEmotion = () => {
    setIsAnalyzing(true);
    
    // Simulate ML processing
    setTimeout(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setResult(randomEmotion);
      setIsAnalyzing(false);
      setCameraActive(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Emotion Check with AI</CardTitle>
          <CardDescription>
            Our ML model analyzes your facial expressions to understand your emotional state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Camera Preview */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
            {cameraActive ? (
              <div className="relative w-full h-full bg-gradient-to-br from-[#E8EFFF] to-[#FFE8F5] flex items-center justify-center">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="hidden"
                />
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto mb-4 text-[#5B7FDB] animate-pulse" />
                  <p className="text-muted-foreground">Camera Active - Analyzing...</p>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <Camera className="w-16 h-16 mx-auto mb-4 text-[#5B7FDB]" />
                <p className="text-muted-foreground mb-4">Click below to start emotion detection</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center">
            {!cameraActive && !isAnalyzing && !result && (
              <Button 
                onClick={startCamera}
                className="bg-[#5B7FDB] hover:bg-[#4A6ECA]"
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
            )}
            
            {cameraActive && !isAnalyzing && (
              <Button 
                onClick={analyzeEmotion}
                className="bg-[#FF69B4] hover:bg-[#E558A3]"
              >
                Analyze Emotion
              </Button>
            )}

            {isAnalyzing && (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#5B7FDB]"></div>
                <span className="text-muted-foreground">Processing with ML model...</span>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <Card className="border-2" style={{ borderColor: result.color }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-3 rounded-full" 
                      style={{ backgroundColor: result.color + '20', color: result.color }}
                    >
                      {result.icon}
                    </div>
                    <div>
                      <CardTitle>Detected: {result.emotion}</CardTitle>
                      <CardDescription>Confidence Level</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{result.confidence}%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={result.confidence} className="h-2" />
                
                <div className="bg-[#E8EFFF] p-4 rounded-lg">
                  <h4 className="mb-2" style={{ color: '#5B7FDB' }}>💡 Recommendation</h4>
                  <p className="text-sm">{result.recommendation}</p>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setResult(null);
                    setCameraActive(false);
                  }}
                >
                  Check Again
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Emotion History</CardTitle>
          <CardDescription>Your emotional tracking over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: 'Today, 10:30 AM', emotion: 'Happy', confidence: 92 },
              { date: 'Yesterday, 2:15 PM', emotion: 'Calm', confidence: 88 },
              { date: 'Oct 29, 9:00 AM', emotion: 'Anxious', confidence: 75 },
              { date: 'Oct 28, 11:45 AM', emotion: 'Happy', confidence: 90 },
            ].map((record, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-[#E8EFFF]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-full">
                    <Smile className="w-4 h-4 text-[#5B7FDB]" />
                  </div>
                  <div>
                    <div>{record.emotion}</div>
                    <div className="text-sm text-muted-foreground">{record.date}</div>
                  </div>
                </div>
                <Badge variant="secondary">{record.confidence}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
