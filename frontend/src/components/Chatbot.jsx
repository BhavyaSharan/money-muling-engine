import { useState } from "react";
import knowledgeBase from "../data/knowledgeBase";

export default function Chatbot({ result }) {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! I can explain money muling, fraud patterns, or your analysis results."
    }
  ]);
  const [input, setInput] = useState("");

  const findAnswer = (question) => {
    const lower = question.toLowerCase();

    // 🔥 Context-aware answers using result
    if (result) {
      if (lower.includes("fraud ring")) {
        return `This analysis detected ${result.fraud_rings?.length || 0} fraud rings in the uploaded data.`;
      }

      if (lower.includes("suspicious")) {
        return `There are ${result.summary?.suspicious_accounts_flagged || 0} suspicious accounts flagged in this dataset.`;
      }

      if (lower.includes("risk")) {
        return result.summary?.fraud_rings_detected > 0
          ? "High risk detected due to organized transaction patterns."
          : "No major fraud risk detected in the current dataset.";
      }
    }

    // 🔹 Knowledge base matching
    for (const item of knowledgeBase) {
      if (item.keywords.some((k) => lower.includes(k))) {
        return item.answer;
      }
    }

    return "Try asking about money muling, smurfing, cycles, layered shell networks, or the analysis result.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botReply = { from: "bot", text: findAnswer(input) };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 text-white">
      {/* Minimized Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg font-semibold"
        >
          💬 Chat
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 bg-zinc-900 border border-white/20 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-black/40 px-4 py-2 border-b border-white/10">
            <span className="font-semibold text-yellow-400">
              Fraud Assistant
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/60 hover:text-white"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="p-3 max-h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${
                  msg.from === "user"
                    ? "text-right text-yellow-400"
                    : "text-left text-zinc-300"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 p-2 border-t border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/10 px-3 py-2 rounded-lg outline-none text-sm"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="bg-yellow-500 text-black px-3 rounded-lg font-semibold"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}