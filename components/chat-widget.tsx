"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Gem } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  typing?: boolean;
}

const WELCOME =
  "Hi! I'm Pradap, your gemstone assistant at Pradap Prada.\nAsk me about gemstones, jewelry styles, pricing, or what might suit your energy best.";

const QUICK_SUGGESTIONS = [
  "Which gemstone matches my personality?",
  "What is the starting price?",
  "Recommend a stone for luck and success",
  "How can I contact your team?",
];

function getMockResponse(input: string): string {
  const t = input.toLowerCase();

  if (/price|cost|how much|ราคา|เท่าไร|กี่บาท|ราคาเท่า/.test(t))
    return "Our signature jewelry pieces currently start around ฿1,290 – ฿1,990, depending on style and gemstone. If you have a specific design in mind, I can give you a more precise estimate.";

  if (/ruby|ทับทิม/.test(t))
    return "Our Siam ruby from Trat is known for its deep red tone and is often associated with courage, passion, and vitality. Typical starting range is around ฿1,790 and up.";

  if (/sapphire|blue|ไพลิน/.test(t))
    return "Blue Sapphire is associated with wisdom, calmness, and mental clarity. It is a great choice for focus and decision-making. Typical starting range is around ฿1,990 and up.";

  if (/yellow sapphire|yellow|บุษราคัม|เหลือง/.test(t))
    return "Yellow Sapphire carries warm golden energy and is often linked to prosperity, confidence, and success. Typical starting range is around ฿1,490 and up.";

  if (/recommend|which gem|what gem|match|แนะนำ|เหมาะ|พลอยอะไร|ควรซื้อ/.test(t))
    return "A great first step is taking our \"Find Your Gem\" quiz. It helps match gemstones to your personality and energy. You can try it at pradapprada.com/quiz.";

  if (/contact|phone|call|line|email|ติดต่อ|โทร|เบอร์|ไลน์/.test(t))
    return "You can reach us directly here.\nPhone: +66 820108685\nEmail: iberico.th@gmail.com\nOr continue chatting here—I'm happy to help.";

  if (/thank|thanks|ขอบคุณ/.test(t))
    return "You're very welcome. If you need anything else, just ask anytime.";

  if (/hello|hi|hey|สวัสดี/.test(t))
    return "Hi there! I can help with gemstones, jewelry styles, and recommendations. What are you looking for today?";

  return "Great question. I can help with gemstone guidance, style suggestions, and pricing. If you need urgent support, contact us at +66 820108685 or iberico.th@gmail.com.";
}

let idCounter = 1;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showDot, setShowDot] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setDismissed(window.localStorage.getItem("pp-chat-dismissed") === "1");
  }, []);

  // Welcome message on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setShowDot(false);
      typeMessage(WELCOME, "assistant");
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function typeMessage(text: string, role: "user" | "assistant") {
    const id = idCounter++;
    setMessages((prev) => [...prev, { id, role, text: "", typing: true }]);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, text: text.slice(0, i), typing: i < text.length } : m
        )
      );
      if (i >= text.length) clearInterval(interval);
    }, 18);
  }

  async function send(prefilled?: string) {
    const trimmed = (prefilled ?? input).trim();
    if (!trimmed || isTyping) return;
    if (!prefilled) setInput("");

    // Add user message immediately
    const userId = idCounter++;
    setMessages((prev) => [...prev, { id: userId, role: "user", text: trimmed }]);

    // Simulate thinking delay then typewriter response
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 600));
    setIsTyping(false);
    typeMessage(getMockResponse(trimmed), "assistant");
  }

  function dismissWidget() {
    setOpen(false);
    setDismissed(true);
    setShowDot(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("pp-chat-dismissed", "1");
    }
  }

  function restoreWidget() {
    setDismissed(false);
    setOpen(true);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("pp-chat-dismissed");
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && !dismissed && (
        <div
          className="fixed bottom-24 right-6 z-50 flex w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-[0_20px_40px_rgba(0,0,0,0.18)] ring-1 ring-[#EBEBEB] animate-in slide-in-from-bottom-4 duration-300"
          style={{ maxHeight: "70vh" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-[#2A2A2A] to-[#1F1F1F] px-4 py-3.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#C4956A]/20">
              <Gem className="h-4 w-4 text-[#E7C7AA]" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#2A2A2A] bg-emerald-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Pradap · Gemstone Expert</p>
              <p className="text-[10px] text-[#DCC7B2]/80">Pradap Prada · Online</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-[#DCC7B2]/80 transition-colors hover:text-white"
              aria-label="Close chat panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-[#FAFAF8] px-4 py-4">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="mr-2 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#EFE7DE]">
                    <Gem className="h-3 w-3 text-[#C4956A]" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "rounded-br-sm bg-[#2A2A2A] text-white"
                      : "rounded-bl-sm bg-white text-foreground shadow-sm ring-1 ring-[#EBEBEB]"
                  }`}
                >
                  {m.text}
                  {m.typing && (
                    <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-current opacity-60" />
                  )}
                </div>
              </div>
            ))}

            {/* Thinking indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EFE7DE]">
                  <Gem className="h-3 w-3 text-[#C4956A]" />
                </div>
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-sm ring-1 ring-[#EBEBEB]">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-stone-400 animate-bounce"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {!isTyping && (
              <div className="flex flex-wrap gap-2 pl-8">
                {QUICK_SUGGESTIONS.map((question) => (
                  <button
                    key={question}
                    onClick={() => send(question)}
                    className="rounded-full border border-[#E7D4BF] bg-white px-3 py-1.5 text-[11px] font-light text-[#8A6C50] transition-colors hover:bg-[#F7F1EA]"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-[#EBEBEB] bg-white px-3 py-3">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your question..."
              className="flex-1 rounded-xl bg-[#FAFAF8] px-3.5 py-2 text-sm outline-none placeholder:text-[#B0A89A] focus:ring-2 focus:ring-[#C4956A]/40"
            />
            <button
              onClick={send}
              disabled={!input.trim() || isTyping}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A2A2A] text-white transition-all hover:bg-[#3A3A3A] disabled:opacity-30"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      {!dismissed && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#EBEBEB] bg-[#2A2A2A] shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3A3A3A]"
            aria-label="Open chat"
          >
            {open ? (
              <X className="h-5 w-5 text-white" />
            ) : (
              <>
                <MessageCircle className="h-5 w-5 text-white" />
                {showDot && (
                  <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#C4956A]" />
                )}
              </>
            )}
          </button>

          {!open && (
            <button
              onClick={dismissWidget}
              className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#EBEBEB] bg-white text-[#8C8C8C] shadow-[0_4px_10px_rgba(0,0,0,0.14)] transition-colors hover:text-[#2A2A2A]"
              aria-label="Hide chat widget"
              title="Hide chat"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}

      {dismissed && (
        <button
          onClick={restoreWidget}
          className="fixed bottom-6 right-6 z-50 rounded-full border border-[#EBEBEB] bg-white px-4 py-2 text-xs font-light tracking-[0.04em] text-[#2A2A2A] shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition-colors hover:bg-[#FAFAF8]"
          aria-label="Restore chat widget"
        >
          Chat
        </button>
      )}
    </>
  );
}
