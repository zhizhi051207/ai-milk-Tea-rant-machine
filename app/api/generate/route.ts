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

    // 1. 生成奶茶文案（通过 AI）
    const { text: milkTeaText, recommendation } = await generateMilkTeaTextAI(userInput);

    // 2. 生成图片提示词（通过 AI）
    const imagePrompt = await generateImagePromptAI(userInput);

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

    return NextResponse.json({
      success: true,
      milkTeaText,
      recommendation,
      imageUrl,
      imagePrompt,
      imageGenerationNote,
      allAIGenerated: isAIImageGenerated, // 标记是否所有内容都是 AI 生成
    });

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