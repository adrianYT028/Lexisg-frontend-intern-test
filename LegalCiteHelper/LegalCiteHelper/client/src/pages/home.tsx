import { useState } from "react";
import { Scale, Settings } from "lucide-react";
import ChatInterface from "@/components/chat-interface";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Scale className="text-white" size={16} />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Lexi Legal Assistant</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">Legal Research Made Simple</span>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <ChatInterface />
      </main>
    </div>
  );
}
