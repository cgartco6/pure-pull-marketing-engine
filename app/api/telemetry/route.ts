import { NextResponse } from 'next/server';
import { z } from 'zod';

const telemetryPayloadSchema = z.object({
  campaignId: z.string(),
  eventType: z.enum(['impression', 'click', 'conversion', 'bounce']),
  variantIdentifier: z.string(),
  metadata: z.object({
    country: z.string().optional(),
    device: z.string().optional(),
    durationSeconds: z.number().optional(),
  }),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const verifiedPayload = telemetryPayloadSchema.parse(rawBody);

    // Operational Database Pipeline Integration Hook
    // Replace this console log with your direct Supabase/Prisma/Postgres ingestion script:
    // await db.telemetry.create({ data: verifiedPayload });
    console.log('Telemetry Packet Logged Cleanly:', verifiedPayload);

    return NextResponse.json({ success: true, logged: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
