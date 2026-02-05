// 快速测试OpenRouter API的响应时间
const apiKey = "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";

async function testOpenRouter() {
  const start = Date.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
            content: 'Test'
          },
          {
            role: 'user',
            content: 'Test response'
          }
        ],
        temperature: 0.8,
        max_tokens: 50
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    const data = await response.json();
    const end = Date.now();
    console.log(`API成功: ${end - start}ms`);
    console.log(`响应: ${JSON.stringify(data.choices[0].message.content)}`);
  } catch (error) {
    const end = Date.now();
    console.log(`API错误: ${error.message}, 耗时: ${end - start}ms`);
  }
}

testOpenRouter();
