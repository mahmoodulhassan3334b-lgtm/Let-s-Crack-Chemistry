import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, Sparkles, AlertCircle, ChefHat } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiChefAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const PRESET_PROMPTS = [
  '🌶️ How do I decrease the spice in Biryani?',
  '🧀 What can I substitute for Paneer?',
  '♨️ What is the traditional "Dum" cooking technique?',
  '🍽️ Suggest a Pakistani & Indian feast menu!'
];

export default function AiChefAssistant({ isOpen, onClose }: AiChefAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Adaab! Khushamdeed! I am your Zafran AI Chef. 👨‍🍳\n\nI specialize in authentic Pakistani & Indian spices, secret techniques, and custom recipe modifications. How can I help you perfect your culinary masterwork today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg = textToSend.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      // Map history for API
      const history = messages.slice(1).map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chef/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMsg,
          history
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to spice up chat response.');
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I apologize, my friend. A small spice jar has spilled in my thinking engine. Please make sure my Gemini API key is configured and try cooking again soon!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          id="ai-chef-assistant-sidebar"
          className="fixed right-0 top-0 bottom-0 z-40 flex w-full max-w-md flex-col bg-[#FFFBF0] text-black shadow-neo-lg border-l-4 border-black"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b-4 border-black bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-black bg-yellow-300 shadow-neo-sm text-black">
                <ChefHat className="text-black" size={22} />
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-black uppercase flex items-center gap-1.5">
                  Zafran AI Chef <Sparkles size={14} className="animate-pulse" />
                </h3>
                <p className="text-xs font-bold text-gray-700">Subcontinent Culinary Expert</p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="ai-chef-close-btn"
              className="border-2 border-black bg-white p-2 text-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-black shadow-neo-sm font-bold"
                  >
                    {m.role === 'user' ? '👤' : <Bot size={16} />}
                  </div>
                  <div
                    className={`border-2 border-black px-4 py-3 text-sm font-bold leading-relaxed shadow-neo-sm ${
                      m.role === 'user'
                        ? 'bg-[#FF9933] text-black'
                        : 'bg-[#FFFBF0] text-black'
                    } whitespace-pre-wrap`}
                  >
                    {m.content}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-yellow-300 text-black shadow-neo-sm">
                    <Bot size={16} />
                  </div>
                  <div className="border-2 border-black bg-[#FFFBF0] px-4 py-3 shadow-neo-sm">
                    <div className="flex gap-1.5 py-1.5">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-black" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-black" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-black" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Prompts */}
          <div className="px-5 pb-4 pt-2 bg-white">
            <p className="text-[10px] font-black uppercase tracking-wider text-black mb-2">Ask about South Asian cooking:</p>
            <div className="flex flex-col gap-1.5">
              {PRESET_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left text-xs bg-white border-2 border-black hover:bg-yellow-300 px-3 py-2 text-black font-black transition-all shadow-neo-sm hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Panel */}
          <div className="border-t-4 border-black bg-[#FFFBF0] p-4">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
                placeholder="Ask recipe substitutes, spice edits..."
                className="w-full border-3 border-black bg-white py-3.5 pl-4 pr-12 text-sm text-black font-bold focus:outline-none placeholder:text-gray-500 shadow-neo-sm"
              />
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || loading}
                id="ai-chef-send-btn"
                className="absolute right-2.5 border-2 border-black bg-[#FF9933] p-2 text-black hover:bg-yellow-300 transition-all shadow-neo-sm hover:shadow-none disabled:opacity-50 cursor-pointer"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-center text-black font-black uppercase mt-2">
              Powered by Google Gemini Models
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
