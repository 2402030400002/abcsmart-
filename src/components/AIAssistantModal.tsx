import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Mic,
  MicOff,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  ChevronDown
} from "lucide-react";
import { sendChatMessage, ChatMessage } from "../services/aiService";

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content:
        "**Assalamu Alaikum & Welcome to Kashmir!** 🏔️\n\nI am your **SmartSafar AI Assistant**. I can help you with:\n- High-altitude & weather safety advice\n- Gondola passes & official ticketing guidance\n- Custom day-by-day itineraries (Srinagar, Gulmarg, Pahalgam, Sonamarg, Gurez)\n- Fair prices for shikaras, taxis, and authentic Pashmina/Saffron verification\n\nWhat would you like to ask?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      source: "knowledge_engine"
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Best places to visit in Kashmir for 3 days?",
    "Is Gulmarg suitable for families & kids?",
    "What should I carry for high altitude trekking?",
    "What should I do if a taxi overcharges me?",
    "How to book Gulmarg Gondola officially?",
    "Where is the nearest hospital in Pahalgam?"
  ];

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (customText?: string) => {
    const text = (customText || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }));
      const result = await sendChatMessage(text, history);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: "assistant",
        content: result.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: result.source as any
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeechInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1A2F23]/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full max-w-xl h-[85vh] sm:h-[650px] flex flex-col overflow-hidden border border-[#E5EAE7]">
        {/* Header */}
        <div className="bg-[#064E3B] text-white px-5 py-4 flex items-center justify-between shadow-xs border-b border-[#134E39]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#FBBF24]">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-normal font-editorial text-lg tracking-tight text-white">SmartSafar AI Guide</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#FBBF24] text-[#1A2F23]">
                  Online
                </span>
              </div>
              <p className="text-xs text-[#D1DBD5]">Grounded in Jammu & Kashmir Tourism & Safety</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#D1DBD5] hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F9FBFA]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-[#064E3B] text-[#FBBF24] flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-xs ${
                  msg.role === "user"
                    ? "bg-[#064E3B] text-white rounded-br-none"
                    : "bg-white text-[#1A2F23] border border-[#E5EAE7] rounded-bl-none"
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
                <div
                  className={`text-[10px] mt-1.5 flex items-center justify-between ${
                    msg.role === "user" ? "text-[#D1DBD5]" : "text-[#4A5D52]"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {msg.source && (
                    <span className="font-mono text-[9px] uppercase tracking-wider">
                      {msg.source === "gemini" ? "✨ Gemini 3.7" : "SmartSafar Verified"}
                    </span>
                  )}
                </div>
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-[#1A2F23] text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-center text-[#4A5D52] text-xs italic">
              <div className="w-8 h-8 rounded-full bg-[#064E3B] text-[#FBBF24] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-3 rounded-2xl border border-[#E5EAE7] shadow-xs flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#064E3B]" />
                <span>SmartSafar AI is retrieving local safety & travel insights...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-[#F0F4F2] border-t border-[#E5EAE7] overflow-x-auto">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-[#4A5D52] whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> Suggested:
            </span>
            <div className="flex gap-1.5">
              {suggestedPrompts.slice(0, 3).map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F0FDF4] border border-[#E5EAE7] hover:border-[#CBD5D0] text-[#1A2F23] text-[11px] font-medium whitespace-nowrap transition cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#E5EAE7]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleSpeechInput}
              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                isListening
                  ? "bg-[#991B1B] text-white border-[#7F1D1D] animate-pulse"
                  : "bg-[#F9FBFA] text-[#4A5D52] border-[#E5EAE7] hover:bg-[#F0F4F2]"
              }`}
              title="Voice Input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Kashmir tourism, roads, or safety..."
              className="flex-1 px-4 py-2.5 bg-[#F9FBFA] border border-[#E5EAE7] rounded-xl text-sm text-[#1A2F23] focus:outline-none focus:ring-2 focus:ring-[#064E3B] focus:bg-white transition"
            />

            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-xl bg-[#064E3B] hover:bg-[#085a44] text-white shadow-xs disabled:opacity-50 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
