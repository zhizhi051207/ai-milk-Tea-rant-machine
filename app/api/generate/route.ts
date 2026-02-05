import { NextRequest, NextResponse } from 'next/server';
import { generateMilkTeaTextAI, generateImagePromptAI, generateImageWithGemini } from '@/lib/generateMilkTeaText';
import { generateImageWithFlux, generateMockImage } from '@/lib/replicateClient';

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json(
        { error: '请输入有效的内容' },
        { status: 400 }
      );
    }
    
    // 为整个API设置全局超时（22秒，留出3秒余量）
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error('API请求超时，请稍后重试'));
      }, 22000);
    });

    // 主逻辑函数
    async function mainLogic() {
      // 并行执行两个AI调用以减少总响应时间
      const [textResult, imagePrompt] = await Promise.all([
        generateMilkTeaTextAI(userInput),
        generateImagePromptAI(userInput)
      ]);
      
      const { text: milkTeaText, recommendation } = textResult;

      // 3. 生成图片（优先使用 Gemini AI，然后 Replicate，最后模拟）
      let imageUrl: string | null = null;
      let imageGenerationNote = '';
      let isAIImageGenerated = false;
      
      // 首先尝试使用 OpenRouter Gemini 生成图像
      const geminiImageUrl = await generateImageWithGemini(imagePrompt);
      
      if (geminiImageUrl) {
        imageUrl = geminiImageUrl;
        imageGenerationNote = '使用 Google Gemini 3 Pro Image Preview AI 生成的图像';
        isAIImageGenerated = true;
      } else if (process.env.REPLICATE_API_TOKEN) {
        // 如果 Gemini 失败但配置了 Replicate，尝试使用 Replicate
        imageUrl = await generateImageWithFlux(imagePrompt);
        imageGenerationNote = '使用 Replicate Flux AI 模型生成的图像';
        isAIImageGenerated = true;
      } else {
        // 如果都没有配置，使用模拟图片
        imageUrl = await generateMockImage(imagePrompt);
        imageGenerationNote = '当前使用模拟图片（需要有效的 AI 图像生成服务配置）';
        isAIImageGenerated = false;
      }

      return {
        success: true,
        milkTeaText,
        recommendation,
        imageUrl,
        imagePrompt,
        imageGenerationNote,
        allAIImageGenerated: isAIImageGenerated, // 标记是否所有内容都是 AI 生成
      };
    }

    // 执行主逻辑，与超时竞争
    const result = await Promise.race([mainLogic(), timeoutPromise]);
    
    return NextResponse.json(result);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: '生成失败，请稍后重试' },
      { status: 500 }
    );
  }
}

// 配置运行环境
export const runtime = 'edge'; // 使用 Edge Runtime 提高响应速度