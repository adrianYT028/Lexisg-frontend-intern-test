import { useState, useRef, useEffect } from "react";
import { Scale, User, Send, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PdfViewerModal from "./pdf-viewer-modal";

interface Citation {
  text: string;
  source: string;
  paragraph: number;
  link: string;
}

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'loading';
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    setMessages([{
      id: '1',
      type: 'assistant',
      content: "Hello! I'm Lexi, your legal research assistant. I can help you find answers to legal questions with proper citations from case law and legal documents. How can I assist you today?",
      timestamp: new Date()
    }]);
  }, []);

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockResponse = {
        answer: "Yes, under Section 166 of the Motor Vehicles Act, 1988, the claimants are entitled to an addition for future prospects even when the deceased was self-employed and aged 54–55 years at the time of the accident. In Dani Devi v. Pritam Singh, the Court held that 10% of the deceased's annual income should be added as future prospects.",
        citations: [
          {
            text: "as the age of the deceased at the time of accident was held to be about 54–55 years by the learned Tribunal, being self-employed, as such, 10% of annual income should have been awarded on account of future prospects.",
            source: "Dani_Devi_v_Pritam_Singh.pdf",
            paragraph: 7,
            link: "https://lexisingapore-my.sharepoint.com/:b:/g/personal/harshit_lexi_sg/EdOegeiR_gdBvQxdyW4xE6oBCDgj5E4Bo5wjvhPHpqgIuQ?e=TEu4vz"
          }
        ]
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: mockResponse.answer,
        citations: mockResponse.citations,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleCitationClick = (citation: Citation) => {
    setSelectedCitation(citation);
    setShowPdfModal(true);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <>
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 h-[calc(100vh-200px)] flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 ${message.type === 'user' ? 'justify-end' : ''} ${message.type === 'assistant' ? 'fade-in' : 'slide-up'}`}>
              {message.type === 'assistant' && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Scale className="text-white" size={12} />
                </div>
              )}
              
              <div className="flex-1 max-w-2xl">
                <div className={`rounded-lg p-4 ${
                  message.type === 'user' 
                    ? 'bg-primary text-white ml-auto' 
                    : 'bg-gray-50'
                }`}>
                  <div className={`flex items-center space-x-2 mb-2 ${message.type === 'user' ? 'justify-end' : ''}`}>
                    <span className={`text-xs ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {message.type === 'user' ? 'You' : 'Lexi'}
                    </span>
                    <span className={`font-medium ${message.type === 'user' ? 'text-white' : 'text-gray-900'}`}>
                      {message.type === 'user' ? 'User' : 'Legal Assistant'}
                    </span>
                    {message.type === 'assistant' && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                        Answered
                      </Badge>
                    )}
                  </div>
                  <p className={`leading-relaxed ${message.type === 'user' ? 'text-white text-right' : 'text-gray-700'}`}>
                    {message.content}
                  </p>
                  
                  {/* Citations */}
                  {message.citations && message.citations.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Citations</h4>
                      <div className="space-y-3">
                        {message.citations.map((citation, index) => (
                          <div
                            key={index}
                            className="citation-item bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleCitationClick(citation)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                <FileText className="text-blue-600" size={12} />
                              </div>
                              <div className="flex-1">
                                <blockquote className="text-sm text-gray-700 italic leading-relaxed mb-2">
                                  "{citation.text}"
                                </blockquote>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                  <span className="font-medium">{citation.source.replace('.pdf', '').replace(/_/g, ' ')}</span>
                                  <span>•</span>
                                  <span>Paragraph {citation.paragraph}</span>
                                  <span>•</span>
                                  <span className="text-blue-600">Click to view document</span>
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                <ExternalLink className="text-gray-400" size={12} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="text-white" size={12} />
                </div>
              )}
            </div>
          ))}
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-start space-x-3 fade-in">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Scale className="text-white" size={12} />
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-4 max-w-2xl">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="font-medium text-gray-900">Lexi</span>
                    <span className="text-xs text-gray-500">Researching...</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">Analyzing legal precedents...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-end space-x-4">
            <div className="flex-1">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a legal question..."
                className="resize-none min-h-[48px] max-h-[120px]"
                rows={1}
              />
            </div>
            <Button
              onClick={handleSubmit}
              disabled={!inputValue.trim() || isLoading}
              className="px-6 py-3 h-auto"
            >
              <Send size={16} className="mr-2" />
              Send
            </Button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </Card>

      {/* PDF Viewer Modal */}
      <PdfViewerModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        citation={selectedCitation}
      />
    </>
  );
}
