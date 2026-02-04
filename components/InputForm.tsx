'use client';

import { useState } from 'react';

interface InputFormProps {
  onSubmit: (input: string) => Promise<void>;
  isLoading: boolean;
}

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      await onSubmit(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="mb-6">
        <label htmlFor="rant" className="block text-lg font-medium text-gray-700 mb-3">
          今天有什么想吐槽的？ 💢
        </label>
        <textarea
          id="rant"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例：老板又让我加班到深夜，项目 deadline 提前了一周，同事甩锅给我..."
          className="w-full h-40 px-4 py-3 border-2 border-pink-300 rounded-2xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 resize-none text-lg"
          disabled={isLoading}
        />
        <div className="mt-2 text-sm text-gray-500">
          尽情发泄吧！AI 会给你调配一杯专属的「解气奶茶」🍵
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isLoading ? (
            <>
              <span className="inline-block animate-spin mr-2">🌀</span>
              正在冲泡你的解气奶茶...
            </>
          ) : (
            <>
              <span className="mr-2">🍵</span>
              生成阴阳怪气奶茶文案
            </>
          )}
        </button>
      </div>
    </form>
  );
}