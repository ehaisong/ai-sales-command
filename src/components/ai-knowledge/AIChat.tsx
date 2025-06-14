
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bot } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock chat history
const initialMessages = [
  { sender: "bot", content: "欢迎来到品牌知识库，有什么可以帮您？" },
];

type AIChatProps = {
  onAddEntry: () => void;
};

const AIChat = ({ onAddEntry }: AIChatProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { sender: "user", content: input },
      { sender: "bot", content: "（AI模拟回复）" },
    ]);
    setInput("");
  };

  return (
    <Card className="flex flex-col h-full relative p-3 shadow-md">
      <div className="flex-1 overflow-y-auto mb-2 space-y-3 pr-1">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex items-center gap-2 max-w-xs px-3 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-primary text-white"
                  : "bg-background border"
              }`}
            >
              {msg.sender === "bot" && <Bot className="w-4 h-4" />}
              <span className="break-words">{msg.content}</span>
              {msg.sender === "user" && <User className="w-4 h-4" />}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          className="text-sm"
          placeholder="向AI提问或添加知识..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button size="sm" onClick={handleSend}>
          发送
        </Button>
      </div>
    </Card>
  );
};

export default AIChat;
