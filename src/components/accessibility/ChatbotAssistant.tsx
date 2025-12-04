import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Volume2, VolumeX, Mic, MicOff } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { toast } from 'sonner@2.0.3';
import logoImage from 'figma:asset/417d9628279f39c868f8da196fe2000c098eb308.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatbotAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Gravida assistant. I can help guide you through the app, answer questions about your pregnancy journey, and provide information. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        handleSendMessage(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please allow microphone access in your browser settings.');
        } else if (event.error === 'no-speech') {
          toast.error('No speech detected. Please try again.');
        } else {
          toast.error('Voice recognition error. Please try again.');
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const speak = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast.error('Voice input is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      toast.info('Listening... Speak now');
    }
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Navigation help
    if (lowerMessage.includes('emotion') || lowerMessage.includes('mood')) {
      return "To track your emotions, click on the 'Emotion Check' tab. This feature uses camera-based analysis to understand your emotional state and provides personalized recommendations.";
    }
    if (lowerMessage.includes('health') || lowerMessage.includes('vitals')) {
      return "The Health Tracker allows you to monitor blood pressure, glucose levels, weight, and other vital signs. Navigate to the 'Health Tracker' tab to view and add new measurements.";
    }
    if (lowerMessage.includes('diet') || lowerMessage.includes('meal') || lowerMessage.includes('nutrition')) {
      return "The Diet Planner helps you plan nutritious meals tailored to your pregnancy stage. Go to the 'Diet Planner' tab to see meal recommendations and track your daily nutrition.";
    }
    if (lowerMessage.includes('community') || lowerMessage.includes('forum')) {
      return "Connect with other expecting mothers in the Community section. Share experiences, ask questions, and get support from peers going through similar journeys.";
    }
    if (lowerMessage.includes('reminder') || lowerMessage.includes('appointment')) {
      return "You can set reminders for checkups, medications, and appointments. Look for the bell icon in your dashboard to manage all your reminders.";
    }
    if (lowerMessage.includes('accessibility') || lowerMessage.includes('settings')) {
      return "Accessibility settings are available in your dashboard. You can adjust text size, enable high contrast mode, reduce animations, and customize voice guidance.";
    }

    // Pregnancy information
    if (lowerMessage.includes('trimester')) {
      return "Your pregnancy is divided into three trimesters. Each trimester brings different changes and requirements. The app provides trimester-specific guidance and tracking.";
    }
    if (lowerMessage.includes('week')) {
      return "Your current pregnancy week is shown in your dashboard overview. Each week brings new developments for your baby. Check the Health Tracker for week-specific information.";
    }

    // General help
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "I can help you navigate the app, explain features, set reminders, or answer pregnancy-related questions. Try asking about specific features like 'emotion tracker' or 'diet planner'.";
    }
    if (lowerMessage.includes('doctor')) {
      return "Your doctor can access your health data through the doctor portal. They can monitor your progress, suggest medications, and manage your appointments.";
    }

    // Default responses
    const defaultResponses = [
      "I'm here to help! You can ask me about app features, pregnancy information, or how to use specific tools. What would you like to know?",
      "I can guide you through the Gravida app. Try asking about the emotion tracker, health monitoring, diet planning, or community features.",
      "Need assistance navigating the app? I can help you understand any feature or answer pregnancy-related questions."
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputMessage;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      
      if (voiceEnabled) {
        speak(botResponse.text);
      }
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-br from-[#5B7FDB] to-[#FF69B4] hover:from-[#4A6FCA] hover:to-[#FF59A4] z-50"
          size="icon"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-[#5B7FDB] to-[#FF69B4] text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={logoImage} alt="Gravida" className="h-6" />
                <CardTitle className="text-white">Gravida Assistant</CardTitle>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setVoiceEnabled(!voiceEnabled)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
                {isSpeaking && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={stopSpeaking}
                    className="h-8 w-8 text-white hover:bg-white/20"
                  >
                    <VolumeX className="w-4 h-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-[#5B7FDB] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1"
                />
                {recognitionRef.current && (
                  <Button
                    type="button"
                    variant={isListening ? "default" : "outline"}
                    size="icon"
                    onClick={toggleVoiceInput}
                    className={isListening ? "bg-[#FF69B4]" : ""}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                )}
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-[#5B7FDB] hover:bg-[#4A6FCA]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
