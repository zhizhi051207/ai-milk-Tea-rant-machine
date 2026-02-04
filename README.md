# AI 抽象奶茶吐槽机 🍵

一个有趣的 AI 应用，将你的心情吐槽转化为 Grok 式阴阳怪气奶茶文案，并生成抽象茶叶蛋喝奶茶的艺术图片。

## ✨ 功能特性

- **心情吐槽输入**：写下今天的工作烦恼、生活吐槽
- **Grok 式奶茶文案**：AI 生成阴阳怪气风格的奶茶描述
- **解气奶茶推荐**：推荐一杯定制化的「解气奶茶」（五分糖去冰茉莉奶白变体）
- **抽象艺术图片**：使用 Replicate Flux 模型生成「抽象茶叶蛋喝奶茶」图片
- **响应式设计**：美观的 UI，支持移动端和桌面端

## 🚀 快速开始

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/zhizhi051207/ai-milk-Tea-rant-machine.git
   cd ai-milk-Tea-rant-machine
   ```

2. **安装依赖**
   ```bash
   npm install
   # 或使用 yarn/pnpm
   ```

3. **配置环境变量**
   ```bash
   cp .env.local.example .env.local
   ```
   编辑 `.env.local` 文件，添加你的 API keys：
   - `REPLICATE_API_TOKEN`：从 [Replicate](https://replicate.com/account/api-tokens) 获取
   - （可选）`OPENAI_API_KEY` 或 `ANTHROPIC_API_KEY`：用于真实 AI 文案生成

4. **启动开发服务器**
   ```bash
   npm run dev
   ```
   打开 [http://localhost:3000](http://localhost:3000)

### Vercel 部署

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **在 Vercel 导入项目**
   - 登录 [Vercel](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库
   - 配置环境变量：
     - `REPLICATE_API_TOKEN`: 你的 Replicate API token
   - 点击 "Deploy"

3. **获取部署链接**
   - 部署完成后，Vercel 会提供一个可访问的 URL

## 🛠️ 技术栈

- **前端框架**: [Next.js 14](https://nextjs.org/) (App Router)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 组件**: 自定义组件 + 动画
- **AI 图像生成**: [Replicate](https://replicate.com/) + Flux 模型
- **AI 文案生成**: 模拟 AI（可替换为真实 API）
- **部署**: [Vercel](https://vercel.com) (Edge Runtime)

## 🔧 配置说明

### 环境变量

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `REPLICATE_API_TOKEN` | 是 | Replicate API token，用于图像生成 |
| `OPENAI_API_KEY` | 否 | OpenAI API key，如需真实 AI 文案 |
| `ANTHROPIC_API_KEY` | 否 | Claude API key，如需真实 AI 文案 |

### 自定义提示词

要修改图像生成的提示词模板，编辑 `lib/replicateClient.ts` 中的 `generateTeaEggPrompt` 函数。

## 📁 项目结构

```
ai-milk-tea-rant-machine/
├── app/
│   ├── api/
│   │   └── generate/        # API 路由
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页面
│   └── globals.css         # 全局样式
├── components/
│   ├── InputForm.tsx       # 输入表单组件
│   └── ResultDisplay.tsx   # 结果展示组件
├── lib/
│   ├── generateMilkTeaText.ts  # 奶茶文案生成
│   └── replicateClient.ts      # Replicate 客户端
├── public/                 # 静态资源
├── .env.local.example     # 环境变量示例
├── next.config.js         # Next.js 配置
└── README.md              # 项目说明
```

## 🎨 自定义

### 修改奶茶文案风格

编辑 `lib/generateMilkTeaText.ts` 中的数组，添加更多阴阳怪气语句：

```typescript
const grokPrefixes = [
  // 添加你的自定义前缀
  "哎呦喂，这不是",
  // ...
];
```

### 替换真实 AI API

要使用真实的 AI API（如 OpenAI GPT-4 或 Claude），修改以下文件：

1. `lib/generateMilkTeaText.ts` 中的 `generateMilkTeaTextAI` 函数
2. 使用相应的 API SDK 调用

### 更换图像生成模型

修改 `lib/replicateClient.ts` 中的 `FLUX_MODEL_VERSION`，使用其他 Replicate 模型。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- [Replicate](https://replicate.com/) 提供优秀的 AI 图像生成服务
- [Next.js](https://nextjs.org/) 强大的 React 框架
- [Vercel](https://vercel.com/) 出色的部署平台
- 所有奶茶爱好者和吐槽星人 🍵💖

## 📞 联系

如有问题或建议，请通过 GitHub Issues 联系。

---

<p align="center">
  <b>喝杯奶茶，吐个槽，继续向前冲！ 💪</b>
</p>