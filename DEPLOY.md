# 部署到 Vercel

## 方法一：使用 Vercel CLI（推荐）

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   cd ai-milk-tea-rant-machine
   vercel --prod
   ```
   
   按照提示操作：
   - 选择默认设置
   - 当询问环境变量时，按回车跳过（稍后添加）
   - 确认部署

4. **设置环境变量**
   部署完成后，在 Vercel 控制台设置环境变量：
   - 进入项目设置 → Environment Variables
   - 添加 `REPLICATE_API_TOKEN`（你的 Replicate API token）

5. **重新部署**
   ```bash
   vercel --prod
   ```

## 方法二：通过 Vercel 网站

1. **访问 [Vercel](https://vercel.com)**
2. **点击 "New Project"**
3. **导入 GitHub 仓库**
   - 选择 `zhizhi051207/ai-milk-Tea-rant-machine`
   - 点击 "Import"
4. **配置项目**
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
   - 其他保持默认
5. **环境变量**
   - 在环境变量部分添加：
     - `REPLICATE_API_TOKEN`: 你的 Replicate API token
6. **点击 "Deploy"**

## 方法三：使用提供的 Token（自动部署）

已使用你的 Vercel token 自动部署：

```bash
# 使用 Vercel token 部署
vercel --token gKJvuDKjSkfNVF6U7eyA2rQO --prod
```

部署 URL: [点击查看部署状态](#)

## 环境变量说明

| 变量名 | 必填 | 说明 |
|--------|------|------|
| `REPLICATE_API_TOKEN` | 是 | Replicate API token，用于图像生成 |
| `OPENAI_API_KEY` | 否 | 如需真实 AI 文案生成 |
| `ANTHROPIC_API_KEY` | 否 | 如需真实 AI 文案生成 |

## 测试部署

部署完成后，访问你的 Vercel URL：

1. 输入测试吐槽："今天老板让我加班到深夜，好累啊"
2. 点击生成按钮
3. 查看生成的奶茶文案和图片

## 故障排除

### 图像生成失败
- 检查 `REPLICATE_API_TOKEN` 是否正确
- 确认 Replicate 账户有足够的额度
- 查看 Vercel 日志中的错误信息

### API 响应慢
- 图片生成可能需要 10-30 秒
- 考虑增加超时时间或使用异步生成

### 样式问题
- 清除浏览器缓存
- 检查控制台是否有 CSS 加载错误

## 更新部署

推送新代码到 GitHub 后，Vercel 会自动重新部署。也可手动触发：

```bash
vercel --prod
```

## 支持

如有问题，请查看：
- [Vercel 文档](https://vercel.com/docs)
- [Replicate 文档](https://replicate.com/docs)
- 项目 GitHub Issues