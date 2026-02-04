// 模拟 Grok 式阴阳怪气奶茶文案生成

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
  "五分糖去冰茉莉奶白（解气特调版）",
  "五分糖去冰茉莉奶白（职场保命款）",
  "五分糖去冰茉莉奶白（内心平静型）",
  "五分糖去冰茉莉奶白（阴阳平衡款）",
  "五分糖去冰茉莉奶白（佛系养生款）",
  "五分糖去冰茉莉奶白（表面笑嘻嘻款）",
  "五分糖去冰茉莉奶白（暗中观察款）",
  "五分糖去冰茉莉奶白（默默努力款）",
  "五分糖去冰茉莉奶白（迟早跑路款）",
  "五分糖去冰茉莉奶白（未来可期款）",
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

// 使用 OpenRouter API 调用 Mistral AI 生成真实的奶茶文案
export async function generateMilkTeaTextAI(userInput: string): Promise<{ text: string; recommendation: string }> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  // 如果没有 API key，回退到模拟生成
  if (!apiKey || apiKey === '') {
    console.log('No OPENROUTER_API_KEY found, using simulated generation');
    return generateMilkTeaText(userInput);
  }

  try {
    // 构造提示词，指导模型生成 Grok 式阴阳怪气文案和推荐
    const systemPrompt = `你是一个"奶茶吐槽大师"，擅长用 Grok 式阴阳怪气的幽默风格将用户的心情吐槽转化为创意奶茶文案。

请根据用户的输入，生成以下内容：
1. 一段 Grok 式阴阳怪气的奶茶描述文案（使用中文网络流行语、幽默调侃语气）
2. 推荐一杯"解气奶茶"（必须是"五分糖去冰茉莉奶白"的变体，如："五分糖去冰茉莉奶白（职场保命款）"）

格式要求：
- 奶茶文案：100-150字，幽默风趣，带点小毒舌但友好
- 推荐奶茶：必须是"五分糖去冰茉莉奶白（XXX款）"格式，括号内为创意变体名

用户输入：${userInput}

请用以下 JSON 格式回复：
{
  "text": "奶茶文案内容",
  "recommendation": "五分糖去冰茉莉奶白（变体名）"
}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://ai-milk-tea-rant-machine.vercel.app',
        'X-Title': 'AI 奶茶吐槽机'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-small-creative',
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
        max_tokens: 500
      })
    });

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
        recommendation: parsed.recommendation || '五分糖去冰茉莉奶白（默认款）'
      };
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError, 'Content:', content);
      // 如果解析失败，尝试从文本中提取信息或使用模拟数据
      return generateMilkTeaText(userInput);
    }
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    // API 调用失败时回退到模拟生成
    return generateMilkTeaText(userInput);
  }
}