import { useState, useRef, useEffect } from "react";
import knowledgeBase from "../data/knowledgeBase";

export default function Chatbot({ result }) {
  const [open, setOpen] = useState(true);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi! You can type or use voice to ask about fraud detection."
    }
  ]);
  const [input, setInput] = useState("");

  const recognitionRef = useRef(null);

  /* =======================
     TEXT TO SPEECH
     ======================= */
  const speak = (text) => {
    if (!voiceOn || !window.speechSynthesis) return;

    // Stop previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  /* =======================
     INIT SPEECH RECOGNITION
     ======================= */
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);

      setTimeout(() => {
        sendMessage(transcript);
      }, 300);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
  }, []);

  /* =======================
     START MIC
     ======================= */
  const startListening = () => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
      recognitionRef.current.start();
    } catch {
      console.warn("Mic already running");
    }
  };

  /* =======================
     ANSWER LOGIC
     ======================= */
  const findAnswer = (question) => {
    const lower = question.toLowerCase();

    if (result) {
      if (lower.includes("fraud ring")) {
        return `This dataset contains ${
          result.fraud_rings?.length || 0
        } detected fraud rings.`;
      }

      if (lower.includes("suspicious")) {
        return `There are ${
          result.summary?.suspicious_accounts_flagged || 0
        } suspicious accounts flagged.`;
      }

      if (lower.includes("risk")) {
        return result.summary?.fraud_rings_detected > 0
          ? "High fraud risk detected due to organized transaction patterns."
          : "No major fraud risk detected in this dataset.";
      }
    }

    for (const item of knowledgeBase) {
      if (item.keywords.some((k) => lower.includes(k))) {
        return item.answer;
      }
    }

    return "Try asking about money muling, smurfing, cycles, layered shell networks, or your analysis results.";
  };

  /* =======================
     SEND MESSAGE
     ======================= */
  const sendMessage = (voiceText) => {
    const text = voiceText || input;
    if (!text.trim()) return;

    const userMsg = { from: "user", text };
    const botText = findAnswer(text);
    const botReply = { from: "bot", text: botText };

    setMessages((prev) => [...prev, userMsg, botReply]);
    setInput("");

    // 🔊 SPEAK BOT RESPONSE
    speak(botText);
  };

  /* =======================
     UI
     ======================= */
  return (
    <div className="fixed bottom-4 right-4 z-50 text-white">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-500 text-black px-4 py-2 rounded-full shadow-lg font-semibold"
        >
          💬 Chat
        </button>
      )}

      {open && (
        <div className="w-80 bg-zinc-900 border border-white/20 rounded-xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center bg-black/40 px-4 py-2 border-b border-white/10">
            <span className="font-semibold text-yellow-400">
              Fraud Assistant
            </span>

            <div className="flex gap-2">
              {/* 🔊 Voice Toggle */}
              <button
                onClick={() => setVoiceOn(!voiceOn)}
                title="Toggle Voice"
                className="text-white/70 hover:text-white"
              >
                {voiceOn ? "🔊" : "🔇"}
              </button>

              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="p-3 max-h-64 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={
                  msg.from === "user"
                    ? "text-right text-yellow-400"
                    : "text-left text-zinc-300"
                }
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
              placeholder={listening ? "Listening..." : "Ask by text or voice..."}
            />

            {/* 🎙️ MIC */}
            <button
              onClick={startListening}
              className={`px-3 rounded-lg font-semibold transition ${
                listening
                  ? "bg-red-600 animate-pulse"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              🎙️
            </button>

            <button
              onClick={() => sendMessage()}
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