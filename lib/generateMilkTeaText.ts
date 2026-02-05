// 模拟 Grok 式阴阳怪气奶茶文案生成

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

const grokPrefixes = [
  "哎呦喂，这不是",
  "笑死，原来你",
  "哇塞，居然有人",
  "啧啧，看看这是谁",
  "啊这，不会真的有人",
  "救命，这也太",
  "蚌埠住了，你居然",
  "绝了，这不得",
  "好家伙，我直接",
  "天呐，怎么会有人",
];

const milkTeaAdjectives = [
  "怨气冲天珍珠奶茶",
  "阴阳怪气奶盖红茶",
  "暴躁如雷芋圆奶茶",
  "笑里藏刀芝士奶绿",
  "暗中观察布丁奶茶",
  "表面平静实则翻江倒海水果茶",
  "无语凝噎黑糖珍珠",
  "内心OS满杯葡萄",
  "职场老油条椰果奶茶",
  "表面笑嘻嘻心里MMP奶昔",
];

const sarcasticComments = [
  "建议加一份「老板看不见」牌珍珠，专治各种职场PUA。",
  "这杯奶茶的含糖量刚好等于你今天的血压值。",
  "喝一口，保证你瞬间看透人间不值得。",
  "本奶茶采用「选择性耳聋」技术，自动过滤领导画饼。",
  "温馨提示：喝前摇一摇，把今天的烦恼都摇匀。",
  "内含「表面笑嘻嘻」果粒，助你完美演绎职场假笑。",
  "这杯奶茶的温度，刚好是你对这个世界最后的温柔。",
  "采用「左耳进右耳出」工艺，无效沟通自动过滤。",
  "喝完后建议搭配一首《大悲咒》，效果更佳。",
  "本产品含有微量「人间清醒」成分，请谨慎饮用。",
];

const recommendations = [
  "三倍珍珠七分甜少冰暴打柠檬奶茶（专治各种不服款）",
  "五分糖去冰茉莉奶白（职场保命款）",
  "全糖多冰芝士奶盖红茶（今日摆烂限定版）",
  "无糖热乌龙奶茶加仙草（佛系养生特调）",
  "七分糖正常冰珍珠奶茶加布丁（表面笑嘻嘻款）",
  "三分糖少冰芋圆奶茶（暗中观察摸鱼版）",
  "半糖去冰椰果奶茶（默默努力加班款）",
  "全糖多冰草莓奶昔（迟早跑路狂欢版）",
  "无糖热抹茶拿铁（未来可期清醒款）",
  "随机糖度随机冰水果茶（选择性困难治愈款）",
  "隐藏菜单：老板看不见珍珠奶茶（PUA防御特调）",
  "限定款：左耳进右耳出奶绿（无效沟通过滤版）",
  "秘制配方：表面平静实则翻江倒海水果茶（内心戏满分）",
  "特调：人间清醒美式咖啡奶茶（混合双打版）",
  "定制款：选择性耳聋芋圆奶茶（自动过滤画饼技术）",
];

export function generateMilkTeaText(userInput: string): { text: string; recommendation: string } {
  // 简单分析输入情绪（模拟）
  const input = userInput.toLowerCase();
  let emotion = 'neutral';
  
  if (input.includes('加班') || input.includes('deadline') || input.includes('压力')) {
    emotion = 'stressed';
  } else if (input.includes('老板') || input.includes('领导') || input.includes('同事')) {
    emotion = 'annoyed';
  } else if (input.includes('开心') || input.includes('高兴') || input.includes('快乐')) {
    emotion = 'happy';
  } else if (input.includes('累') || input.includes('困') || input.includes('烦')) {
    emotion = 'tired';
  }

  // 随机选择组件
  const prefix = grokPrefixes[Math.floor(Math.random() * grokPrefixes.length)];
  const adjective = milkTeaAdjectives[Math.floor(Math.random() * milkTeaAdjectives.length)];
  const comment = sarcasticComments[Math.floor(Math.random() * sarcasticComments.length)];
  const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];

  // 根据情绪调整文案
  let baseText = '';
  switch (emotion) {
    case 'stressed':
      baseText = `${prefix}被工作压得喘不过气来的小可怜？来一杯「${adjective}」吧！${comment}`;
      break;
    case 'annoyed':
      baseText = `${prefix}又在职场上演宫斗大戏了？试试这杯「${adjective}」，${comment}`;
      break;
    case 'happy':
      baseText = `${prefix}今天居然还有心情开心？奖励你一杯「${adjective}」，${comment}`;
      break;
    case 'tired':
      baseText = `${prefix}已经累成狗了还在硬撑？这杯「${adjective}」专为你设计，${comment}`;
      break;
    default:
      baseText = `${prefix}今天又是平凡的一天？这杯「${adjective}」送给你，${comment}`;
  }

  return {
    text: baseText,
    recommendation,
  };
}

// 使用 OpenRouter API 调用 Grok-4-fast 生成真实的奶茶文案和推荐
export async function generateMilkTeaTextAI(userInput: string): Promise<{ text: string; recommendation: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  // 如果没有 API key，回退到模拟生成
  if (!apiKey || apiKey === '') {
    console.log('No OPENROUTER_API_KEY found, using simulated generation');
    return generateMilkTeaText(userInput);
  }

   // 调试日志：显示API key状态（不显示完整key）
   console.log(`OpenRouter API key found, length: ${apiKey ? apiKey.length : 0}, starts with: ${apiKey ? apiKey.substring(0, 10) + '...' : 'none'}`);
  try {
    // 构造提示词，指导模型生成 Grok 式阴阳怪气文案和创意奶茶推荐
    const systemPrompt = `你是一个"奶茶吐槽大师"，擅长用 Grok 式阴阳怪气的幽默风格将用户的心情吐槽转化为创意奶茶文案。

请根据用户的输入，生成以下内容：
1. 一段 Grok 式阴阳怪气的奶茶描述文案（使用中文网络流行语、幽默调侃语气，100-150字）
2. 推荐一杯"解气奶茶"（请发挥创意，不要局限于茉莉奶白，可以是任何有趣的奶茶名称和配方）

奶茶文案要求：
- 幽默风趣，带点小毒舌但友好
- 使用中文网络流行语和梗
- 反映用户输入的情绪

奶茶推荐要求：
- 可以是任何创意奶茶名称
- 包括配料、糖度、冰度等具体描述
- 与用户的吐槽内容相关
- 富有创意和幽默感

用户输入：${userInput}

请用以下 JSON 格式回复：
{
  "text": "奶茶文案内容",
  "recommendation": "创意奶茶推荐，如：'三倍珍珠七分甜少冰暴打柠檬奶茶（专治各种不服款）'"
}`;

    const response = await fetchWithTimeout('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ai-milk-tea-rant-machine.vercel.app',
        'X-Title': 'AI Milk Tea Rant Machine'
      },
      body: JSON.stringify({
        model: 'x-ai/grok-4-fast',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `根据我的吐槽生成奶茶文案和推荐：${userInput}`
          }
        ],
        temperature: 0.8,
        max_tokens: 600
      })
    }, 8000); // 8秒超时

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // 尝试解析 JSON 响应
    try {
      const parsed = JSON.parse(content);
      return {
        text: parsed.text || 'AI 生成失败，请稍后重试',
        recommendation: parsed.recommendation || '随机解气奶茶'
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError, 'Content:', content);
      // 如果解析失败，尝试从文本中提取信息或使用模拟数据
      return generateMilkTeaText(userInput);
    }
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    // API 调用失败时回退到模拟生成
     console.log('Falling back to simulated generation due to API error');
    return generateMilkTeaText(userInput);
  }
}

// 使用 OpenRouter API 生成创意图像提示词
export async function generateImagePromptAI(userInput: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  // 如果没有 API key，回退到模拟生成
  if (!apiKey || apiKey === '') {
    console.log('No OPENROUTER_API_KEY found, using simulated image prompt');
    const keywords = userInput.split(' ').slice(0, 5).join(', ');
    return `Abstract surrealist painting of a tea egg drinking milk tea in a cosmic cafe, ${keywords}, digital art, vibrant colors, dreamlike atmosphere, liquid textures, by James Jean and Moebius, trending on artstation`;
  }

  try {
    // 构造提示词，指导模型生成创意图像描述
    const systemPrompt = `你是一个"艺术指导专家"，擅长将用户的心情和吐槽转化为创意图像提示词。

请根据用户的输入，生成一个用于AI图像生成的创意提示词（英文）。
主题要求：以"茶叶蛋喝奶茶"为创意核心，结合用户的心情场景，创作超现实主义、抽象艺术的图像描述。

提示词要求：
1. 必须是英文描述
2. 包含艺术风格（如：abstract surrealist painting, digital art）
3. 包含视觉元素（如：tea egg drinking milk tea, cosmic cafe, liquid textures）
4. 包含艺术家参考（如：by James Jean and Moebius）
5. 包含质量标签（如：trending on artstation, 4K, masterpiece）
6. 与用户的心情相关

用户输入：${userInput}

请直接返回英文提示词，不要添加任何额外说明。`;

    const response = await fetchWithTimeout('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ai-milk-tea-rant-machine.vercel.app',
        'X-Title': 'AI Milk Tea Rant Machine'
      },
      body: JSON.stringify({
        model: 'x-ai/grok-4-fast',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: `根据我的心情生成图像提示词：${userInput}`
          }
        ],
        temperature: 0.9,
        max_tokens: 300
      })
    }, 8000); // 8秒超时

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const prompt = data.choices[0].message.content.trim();
    
    // 确保返回的是有效的提示词
    if (!prompt || prompt.length < 10) {
      throw new Error('Generated prompt is too short or empty');
    }
    
    return prompt;
  } catch (error) {
    console.error('Error generating image prompt via AI:', error);
    // API 调用失败时回退到模拟提示词
    const keywords = userInput.split(' ').slice(0, 5).join(', ');
    return `Abstract surrealist painting of a tea egg drinking milk tea in a cosmic cafe, ${keywords}, digital art, vibrant colors, dreamlike atmosphere, liquid textures, by James Jean and Moebius, trending on artstation`;
  }
}

// 使用 OpenRouter API 调用 Gemini 生成图像
export async function generateImageWithGemini(prompt: string): Promise<string | null> {
  // 暂时禁用 Gemini 图像生成，因为 OpenRouter 可能不支持通过 chat completions 返回图像
  // 这会导致 API 调用超时，影响整体性能
  console.log('Gemini image generation temporarily disabled to prevent API timeout');
  return null;
}