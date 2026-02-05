import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const healthInfo = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'AI抽象奶茶吐槽机',
    version: '1.0.0',
    endpoints: {
      generate: '/api/generate',
      health: '/api/health',
    },
    environment: {
      node: process.version,
      replicate: !!process.env.REPLICATE_API_TOKEN ? 'configured' : 'not configured',
      vercel: process.env.VERCEL ? 'yes' : 'no',
    },
  };

  return NextResponse.json(healthInfo);
}

export const runtime = 'edge';