// Replicate API 客户端
// 需要环境变量：REPLICATE_API_TOKEN

// 带有超时的 fetch 辅助函数
async function fetchWithTimeout(url: string, options: RequestInit, timeout = 8000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';

// Flux 模型 ID
const FLUX_MODEL_VERSION = 'black-forest-labs/flux-schnell';

export async function generateImageWithFlux(prompt: string): Promise<string | null> {
  // 为了确保在Vercel 25秒限制内完成，暂时禁用Replicate API调用
  // 即使有REPLICATE_API_TOKEN，图像生成通常也需要30+秒，会超时
  console.log('Replicate image generation disabled to prevent Vercel timeout');
  return null;
}

// 为茶叶蛋喝奶茶生成提示词
export function generateTeaEggPrompt(userInput: string): string {
  const keywords = userInput.split(' ').slice(0, 5).join(', ');
  return `Abstract surrealist painting of a tea egg drinking milk tea in a cosmic cafe, ${keywords}, digital art, vibrant colors, dreamlike atmosphere, liquid textures, by James Jean and Moebius, trending on artstation`;
}

// 模拟图像生成（用于开发环境）
export async function generateMockImage(prompt: string): Promise<string> {
  // 模拟生成延迟（减少到100ms以避免超时）
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // 返回一个随机的奶茶相关图片（来自 Unsplash）
  const images = [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop',
  ];
  
  return images[Math.floor(Math.random() * images.length)];
}