import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

interface VoiceSearchProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export function VoiceSearch({ placeholder = "Search...", onSearch, className = "" }: VoiceSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        onSearch(transcript);
        toast.success(`Voice input: "${transcript}"`);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          toast.error('Microphone access denied. Please allow microphone access.');
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
    };
  }, [onSearch]);

  const toggleVoiceSearch = () => {
    if (!isSupported) {
      toast.error('Voice search is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
      toast.info('Listening... Speak now');
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`flex gap-2 ${className}`}>
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      </div>
      {isSupported && (
        <Button
          type="button"
          variant={isListening ? "default" : "outline"}
          size="icon"
          onClick={toggleVoiceSearch}
          className={isListening ? "bg-[#FF69B4] hover:bg-[#FF89C4]" : ""}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </Button>
      )}
    </form>
  );
}
