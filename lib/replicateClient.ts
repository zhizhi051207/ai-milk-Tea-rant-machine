// Replicate API 客户端
// 需要环境变量：REPLICATE_API_TOKEN

const REPLICATE_API_URL = 'https://api.replicate.com/v1/predictions';

// Flux 模型 ID
const FLUX_MODEL_VERSION = 'black-forest-labs/flux-schnell';

export async function generateImageWithFlux(prompt: string): Promise<string | null> {
  // 如果没有设置 API token，返回模拟图片URL
  if (!process.env.REPLICATE_API_TOKEN) {
    console.warn('REPLICATE_API_TOKEN not set, using mock image');
    // 返回一个占位图片URL（实际项目中应替换为真实生成）
    return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop';
  }

  try {
    const response = await fetch(REPLICATE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: FLUX_MODEL_VERSION,
        input: {
          prompt: prompt,
          width: 768,
          height: 768,
          num_outputs: 1,
          scheduler: "DPMSolverMultistep",
          num_inference_steps: 20,
          guidance_scale: 7.5,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Replicate API error:', error);
      throw new Error(`Replicate API error: ${response.status}`);
    }

    const data = await response.json();
    const predictionId = data.id;

    // 轮询获取结果
    let resultUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusResponse = await fetch(`${REPLICATE_API_URL}/${predictionId}`, {
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });
      
      const statusData = await statusResponse.json();
      
      if (statusData.status === 'succeeded') {
        resultUrl = statusData.output?.[0];
        break;
      } else if (statusData.status === 'failed') {
        console.error('Image generation failed:', statusData);
        break;
      }
    }

    return resultUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    return null;
  }
}

// 为茶叶蛋喝奶茶生成提示词
export function generateTeaEggPrompt(userInput: string): string {
  const keywords = userInput.split(' ').slice(0, 5).join(', ');
  return `Abstract surrealist painting of a tea egg drinking milk tea in a cosmic cafe, ${keywords}, digital art, vibrant colors, dreamlike atmosphere, liquid textures, by James Jean and Moebius, trending on artstation`;
}

// 模拟图像生成（用于开发环境）
export async function generateMockImage(prompt: string): Promise<string> {
  // 模拟生成延迟
  await new Promise(resolve => setTimeout(resolve, 3000));
  
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