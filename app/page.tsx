'use client';

import { useState, useEffect } from 'react';
import InputForm from '@/components/InputForm';
import ResultDisplay from '@/components/ResultDisplay';

// 随机今日特调生成器
const generateTodaySpecial = () => {
  const adjectives = [
    '解气', '消愁', '抗压', '佛系', '职场', '摸鱼', '治愈', '摆烂', 
    '元气', '冷静', '智慧', '幸运', '暴富', '升职', '逆袭', '躺平'
  ];
  
  const teaBases = [
    '茉莉奶白', '乌龙奶茶', '珍珠奶茶', '奶盖红茶', '芝士奶绿',
    '芋圆奶茶', '水果茶', '黑糖珍珠', '椰果奶茶', '布丁奶茶',
    '抹茶拿铁', '巧克力奶茶', '草莓奶昔', '芒果冰沙', '柠檬茶'
  ];
  
  const modifiers = [
    '变体', '特调', '定制款', '限定版', '隐藏菜单', '秘制配方',
    'plus版', 'pro版', 'ultimate版', '特别款', '专属款'
  ];
  
  const sugarLevels = ['无糖', '三分糖', '五分糖', '七分糖', '全糖'];
  const iceLevels = ['去冰', '少冰', '正常冰', '多冰'];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const teaBase = teaBases[Math.floor(Math.random() * teaBases.length)];
  const modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
  const sugar = sugarLevels[Math.floor(Math.random() * sugarLevels.length)];
  const ice = iceLevels[Math.floor(Math.random() * iceLevels.length)];
  
  return `${adjective}奶茶（${sugar}${ice}${teaBase}${modifier}）`;
};

type GenerationResult = {
  milkTeaText: string;
  recommendation: string;
  imageUrl?: string;
  imagePrompt: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [todaySpecial, setTodaySpecial] = useState<string>('');

  // 在组件加载时生成今日特调
  useEffect(() => {
    setTodaySpecial(generateTodaySpecial());
  }, []);

  const handleSubmit = async (userInput: string) => {
    setIsLoading(true);
    setIsLoadingImage(true);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('生成失败');
      }

      const data = await response.json();
      setResult(data);
      setIsLoading(false);
      
      // 图片加载需要时间
      if (data.imageUrl) {
        setIsLoadingImage(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      setIsLoadingImage(false);
      alert('生成失败，请稍后重试');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100">
      {/* 头部 */}
      <header className="pt-12 pb-8 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            AI 抽象奶茶吐槽机 🍵
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            输入你的心情吐槽，收获一杯 Grok 式阴阳怪气奶茶 + 抽象茶叶蛋艺术
          </p>
          <div className="inline-flex items-center bg-white rounded-full px-6 py-2 shadow-lg">
            <span className="text-2xl mr-2">🔥</span>
            <span className="text-gray-700">今日特调：{todaySpecial || '加载中...'}</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex flex-col items-center">
          {/* 输入区域 */}
          <div className="w-full mb-12">
            <InputForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>

          {/* 结果展示 */}
          {result && (
            <ResultDisplay
              milkTeaText={result.milkTeaText}
              recommendation={result.recommendation}
              imageUrl={result.imageUrl}
              isLoadingImage={isLoadingImage}
            />
          )}

          {/* 使用说明 */}
          {!result && !isLoading && (
            <div className="mt-16 w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-pink-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🎯 使用说明
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">输入吐槽</h4>
                  <p className="text-gray-600 text-sm">
                    写下今天的心情、工作烦恼或任何想吐槽的事
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">AI 生成</h4>
                  <p className="text-gray-600 text-sm">
                    AI 创作阴阳怪气奶茶文案 + 抽象茶叶蛋喝奶茶图片
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🍵</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">解气享用</h4>
                  <p className="text-gray-600 text-sm">
                    收获专属奶茶推荐，让烦恼随奶茶一起喝掉
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 环境提示 */}
          <div className="mt-12 text-center text-sm text-gray-500">
            {!process.env.REPLICATE_API_TOKEN ? (
              <p>
                🔧 当前使用模拟模式。要启用真实图像生成，请设置 REPLICATE_API_TOKEN 环境变量。
              </p>
            ) : (
              <p>
                ✅ 真实图像生成已启用（使用 Replicate Flux 模型）
              </p>
            )}
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-pink-200 bg-white/50">
        <div className="max-w-4xl mx-auto px-4">
          <p>
            AI 抽象奶茶吐槽机 · 专治各种不开心 · 
            技术支持：Next.js + Vercel + Replicate Flux
          </p>
          <p className="mt-2">
            图片生成需要 Replicate API token，请在环境变量中配置 REPLICATE_API_TOKEN
          </p>
        </div>
      </footer>
    </div>
  );
}