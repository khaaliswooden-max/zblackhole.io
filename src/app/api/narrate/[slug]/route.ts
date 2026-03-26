import { NextRequest, NextResponse } from 'next/server';
import { canonicalPapers, orbPaper } from '@/lib/papers';

const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? 'pNInz6obpgDQGcFmaJgB'; // Adam
const MODEL_ID = 'eleven_turbo_v2_5';

function getNarration(slug: string): string | null {
  const paper = canonicalPapers.find((p) => p.audioBase === slug);
  if (paper) return paper.narration;
  if (slug === orbPaper.audioBase) return orbPaper.narration;
  return null;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const narration = getNarration(slug);

  if (!narration) {
    return new NextResponse('Not found', { status: 404 });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return new NextResponse('Audio service not configured', { status: 503 });
  }

  const upstream = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: narration,
        model_id: MODEL_ID,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 },
      }),
    }
  );

  if (!upstream.ok) {
    return new NextResponse('Audio generation failed', { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
