import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 抽象奶茶吐槽机 | Grok 式阴阳怪气奶茶生成器",
  description: "输入心情吐槽，AI 生成阴阳怪气奶茶文案 + 抽象茶叶蛋喝奶茶图片。专治各种不开心！",
  keywords: ["奶茶", "吐槽", "AI", "阴阳怪气", "Grok", "抽象艺术", "茶叶蛋", "解压"],
  openGraph: {
    title: "AI 抽象奶茶吐槽机",
    description: "生成你的专属阴阳怪气奶茶，搭配抽象茶叶蛋艺术",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍵</text></svg>" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
        
        {/* 可爱的浮动元素 */}
        <div className="fixed top-10 left-5 animate-float hidden md:block">
          <div className="text-4xl">🧋</div>
        </div>
        <div className="fixed bottom-20 right-5 animate-float animation-delay-1000 hidden md:block">
          <div className="text-4xl">🥚</div>
        </div>
        <div className="fixed top-1/4 right-10 animate-pulse-subtle hidden md:block">
          <div className="text-3xl">💢</div>
        </div>
      </body>
    </html>
  );
}
