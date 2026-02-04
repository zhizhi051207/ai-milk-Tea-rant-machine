'use client';

interface ResultDisplayProps {
  milkTeaText: string;
  recommendation: string;
  imageUrl?: string;
  isLoadingImage: boolean;
}

export default function ResultDisplay({ 
  milkTeaText, 
  recommendation, 
  imageUrl, 
  isLoadingImage 
}: ResultDisplayProps) {
  return (
    <div className="mt-12 w-full max-w-4xl">
      {/* 奶茶文案卡片 */}
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 rounded-3xl p-8 mb-8 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl">🍵</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Grok 式阴阳怪气奶茶文案</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-pink-100">
          <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
            {milkTeaText}
          </p>
        </div>
      </div>

      {/* 推荐奶茶卡片 */}
      <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-3xl p-8 mb-8 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl">💚</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">今日解气奶茶推荐</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-green-100">
          <div className="flex items-center">
            <div className="text-4xl mr-4">🧋</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{recommendation}</h3>
              <p className="text-gray-600">
                • 五分糖去冰 · 茉莉奶白变体<br/>
                • 专治各种职场郁闷、生活烦躁<br/>
                • 一口下去，烦恼全消 ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 生成的图片 */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-3xl p-8 shadow-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl">🎨</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">抽象茶叶蛋喝奶茶</h2>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-yellow-100">
          {isLoadingImage ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 border-4 border-yellow-300 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">AI 正在创作抽象茶叶蛋喝奶茶的艺术大作...</p>
            </div>
          ) : imageUrl ? (
            <div className="flex justify-center">
              <img 
                src={imageUrl} 
                alt="抽象茶叶蛋喝奶茶" 
                className="rounded-2xl max-w-full h-auto shadow-lg"
              />
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">提交吐槽后，AI 将为你生成一张抽象茶叶蛋喝奶茶的图片</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}