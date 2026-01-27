import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Globe, MapPin, X } from 'lucide-react';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage, ChatRole } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'standard' | 'search' | 'maps'>('standard');
  const [location, setLocation] = useState<{lat: number, lng: number} | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "Привет! Я AI-ассистент GMF. Я могу помочь с поиском информации (Search), навигацией (Maps) или общими вопросами." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  // Get location when Maps mode is selected
  useEffect(() => {
    if (mode === 'maps' && !location) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error("Error getting location", error);
            setMessages(prev => [...prev, { role: ChatRole.MODEL, text: "Для работы режима карт необходим доступ к геолокации." }]);
            setMode('standard');
          }
        );
      }
    }
  }, [mode, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: ChatRole.USER, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Format history for Gemini API
      const history = messages.filter(m => m.text).map(m => ({
        role: m.role === ChatRole.USER ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      // Create a placeholder for the model response
      setMessages(prev => [...prev, { role: ChatRole.MODEL, text: '' }]);
      
      const stream = streamChatResponse(history, userMessage.text, mode, location);
      let fullResponse = "";
      let finalGroundingMetadata: any = null;

      for await (const chunk of stream) {
        if (chunk.text) {
          fullResponse += chunk.text;
        }
        if (chunk.groundingMetadata) {
          finalGroundingMetadata = chunk.groundingMetadata;
        }
        
        setMessages(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = {
            role: ChatRole.MODEL,
            text: fullResponse,
            groundingMetadata: finalGroundingMetadata
          };
          return newHistory;
        });
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: ChatRole.MODEL, text: "Извините, произошла ошибка связи с сервером." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderGrounding = (metadata: any) => {
    if (!metadata) return null;
    
    // Search Grounding
    if (metadata.groundingChunks) {
      const sources = metadata.groundingChunks
        .map((chunk: any, i: number) => {
            if (chunk.web?.uri) {
                return <a key={i} href={chunk.web.uri} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-400 hover:underline block truncate max-w-full">• {chunk.web.title || chunk.web.uri}</a>
            }
            if (chunk.web?.title) {
                return <span key={i} className="text-xs text-slate-400 block">• {chunk.web.title}</span>
            }
            return null;
        })
        .filter(Boolean);

      if (sources.length > 0) {
        return (
          <div className="mt-2 pt-2 border-t border-slate-700">
            <p className="text-xs font-semibold text-slate-500 mb-1">Источники:</p>
            {sources}
          </div>
        );
      }
    }
    return null;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-brand-600 hover:bg-brand-500 rounded-full shadow-lg z-50 text-white transition-all hover:scale-105"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[600px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-brand-900/50 border-b border-slate-700">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Bot className="w-4 h-4 text-brand-400" />
                GMF Smart Assistant
              </h3>
            </div>
            
            {/* Mode Toggles */}
            <div className="flex gap-2 p-1 bg-slate-800 rounded-lg">
              <button 
                onClick={() => setMode('standard')}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1 ${mode === 'standard' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Sparkles className="w-3 h-3" />
                Chat
              </button>
              <button 
                onClick={() => setMode('search')}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1 ${mode === 'search' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Globe className="w-3 h-3" />
                Search
              </button>
              <button 
                onClick={() => setMode('maps')}
                className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1 ${mode === 'maps' ? 'bg-green-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <MapPin className="w-3 h-3" />
                Maps
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === ChatRole.USER ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === ChatRole.USER ? 'bg-slate-700' : 'bg-brand-700'}`}>
                  {msg.role === ChatRole.USER ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`flex flex-col max-w-[85%]`}>
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.role === ChatRole.USER 
                      ? 'bg-slate-700 text-slate-100 rounded-tr-none' 
                      : 'bg-brand-900/50 border border-brand-500/20 text-slate-100 rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    {renderGrounding(msg.groundingMetadata)}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700 bg-slate-900">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'search' ? "Искать в вебе..." : mode === 'maps' ? "Найти места рядом..." : "Спросить GMF..."}
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-500"
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className={`p-2 rounded-lg disabled:opacity-50 text-white ${
                    mode === 'search' ? 'bg-blue-600 hover:bg-blue-500' :
                    mode === 'maps' ? 'bg-green-600 hover:bg-green-500' :
                    'bg-brand-600 hover:bg-brand-500'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;
