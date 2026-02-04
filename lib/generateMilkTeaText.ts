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

// 模拟 AI 生成（实际项目中可替换为真实 AI API）
export async function generateMilkTeaTextAI(userInput: string): Promise<{ text: string; recommendation: string }> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return generateMilkTeaText(userInput);
}