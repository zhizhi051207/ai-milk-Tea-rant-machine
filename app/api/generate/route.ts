import { NextRequest, NextResponse } from 'next/server';
import { generateMilkTeaTextAI } from '@/lib/generateMilkTeaText';
import { generateImageWithFlux, generateMockImage, generateTeaEggPrompt } from '@/lib/replicateClient';

export async function POST(request: NextRequest) {
  try {
    const { userInput } = await request.json();

    if (!userInput || typeof userInput !== 'string') {
      return NextResponse.json(
        { error: '请输入有效的内容' },
        { status: 400 }
      );
    }

    // 1. 生成奶茶文案
    const { text: milkTeaText, recommendation } = await generateMilkTeaTextAI(userInput);

    // 2. 生成图片提示词
    const imagePrompt = generateTeaEggPrompt(userInput);

    // 3. 生成图片（根据是否有 API token 决定使用真实或模拟生成）
    let imageUrl: string | null = null;
    
    if (process.env.REPLICATE_API_TOKEN) {
      imageUrl = await generateImageWithFlux(imagePrompt);
    } else {
      // 开发环境下使用模拟图片
      imageUrl = await generateMockImage(imagePrompt);
    }

    return NextResponse.json({
      success: true,
      milkTeaText,
      recommendation,
      imageUrl,
      imagePrompt,
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