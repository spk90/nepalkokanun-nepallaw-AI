
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Mic, MicOff, Scale, User, Copy, ThumbsUp, ThumbsDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  citations?: {
    article: string;
    text: string;
    relevance: number;
  }[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'नमस्कार! म नेपाल कानून AI सहायक हुँ। तपाईं नेपाली संविधान र कानुनी प्रावधानहरूको बारेमा प्रश्न सोध्न सक्नुहुन्छ। कसरी सहायता गर्न सक्छु?',
      timestamp: new Date(),
      citations: []
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ne'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getSimulatedResponse(inputMessage),
        timestamp: new Date(),
        citations: [
          {
            article: "Article 17",
            text: "Right to freedom: (1) No person shall be deprived of his or her personal liberty except in accordance with law.",
            relevance: 0.95
          },
          {
            article: "Article 18",
            text: "Right to equality: (1) All citizens shall be equal before law. No person shall be denied the equal protection of laws.",
            relevance: 0.87
          }
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const getSimulatedResponse = (question: string): string => {
    const responses = [
      "Based on the Nepali Constitution, Article 17 guarantees the right to freedom. This means no person can be deprived of their personal liberty except according to law. This fundamental right protects citizens from arbitrary detention and ensures due process.",
      "According to Article 18 of the Constitution, all citizens are equal before the law. This principle of equality ensures that no person can be discriminated against and everyone has equal protection under the law.",
      "The Constitution of Nepal 2072 provides comprehensive rights and freedoms. Could you be more specific about which aspect you'd like to know about? I can help you understand specific articles or provisions."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive"
      });
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = language === 'ne' ? 'ne-NP' : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice input error",
        description: "Could not recognize speech. Please try again.",
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Message copied successfully."
    });
  };

  const sampleQuestions = [
    "What are fundamental rights in Nepal?",
    "नेपालको संविधानमा मौलिक अधिकारहरू के के छन्?",
    "How can I file a case in court?",
    "What is the procedure for citizenship?",
    "संविधानसभाको शक्ति के छ?"
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-red-600 to-green-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5" />
              <span>Nepal Law AI Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'ne' : 'en')}
                className="text-white hover:bg-white/20"
              >
                {language === 'en' ? 'English' : 'नेपाली'}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={
                        message.type === 'user' 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gradient-to-r from-red-100 to-green-100 text-red-600'
                      }>
                        {message.type === 'user' ? <User className="w-4 h-4" /> : <Scale className="w-4 h-4" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="text-sm mb-1">{message.content}</div>
                      
                      {message.citations && message.citations.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <div className="text-xs font-semibold text-gray-600">Legal References:</div>
                          {message.citations.map((citation, index) => (
                            <div key={index} className="bg-white p-2 rounded border-l-4 border-red-500">
                              <Badge variant="outline" className="text-xs mb-1">
                                {citation.article}
                              </Badge>
                              <div className="text-xs text-gray-700">{citation.text}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                        {message.type === 'ai' && (
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyMessage(message.content)}
                              className="h-6 w-6 p-0 hover:bg-white/20"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-white/20"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 hover:bg-white/20"
                            >
                              <ThumbsDown className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-r from-red-100 to-green-100 text-red-600">
                        <Scale className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Sample Questions */}
          {messages.length === 1 && (
            <div className="p-4 bg-gray-50 border-t">
              <div className="text-sm font-medium text-gray-700 mb-2">Try asking:</div>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputMessage(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={language === 'en' 
                    ? "Ask a legal question..." 
                    : "कानुनी प्रश्न सोध्नुहोस्..."
                  }
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  className="pr-10"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleVoiceInput}
                disabled={isListening}
                className={isListening ? 'bg-red-100 text-red-600' : ''}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
