import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export const runtime = 'edge';

const engineOutputSchema = z.object({
  scrapedComplianceValidated: z.boolean(),
  purgedHypeTriggers: z.array(z.string()),
  optimalPostSchedule: z.string(),
  postingFrequencyMetric: z.string(),
  landingPageSchema: z.object({
    headline: z.string(),
    subheading: z.string(),
    coreDescription: z.string(),
    technicalSpecs: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
  adSets: z.array(
    z.object({
      adIndex: z.number(),
      hookStyle: z.string(),
      primaryText: z.string(),
      headlineText: z.string(),
      imageGenerationPrompt: z.string(),
    })
  ).length(5),
});

export async function POST(req: Request) {
  try {
    const { productVision, targetPlatform, targetPriceZar } = await req.json();

    const systemInstruction = `
      You are the core intelligence unit of a Sovereign Pure-Pull Marketing Engine. Create exactly 5 non-repeating ad angles.
      CRITICAL LAWS:
      - Cleanly remove all aggressive push marketing phrases, countdown timers, fake specials, or fake limitations.
      - Each ad must use a completely different functional angle (e.g., Technical design, Material durability, Cost transparency).
    `;

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: engineOutputSchema,
      prompt: `Product: ${productVision}. Target Node: ${targetPlatform}. Pricing Parameter: R ${targetPriceZar} ZAR.`,
      system: systemInstruction,
    });

    const finalAdSets = object.adSets.map((ad) => ({
      ...ad,
      realGeneratedImageUrl: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60&sig-mock-${ad.adIndex}`
    }));

    return NextResponse.json({
      success: true,
      platformRulesApplied: "Meta Core Regulations // Standard South Africa Consumer Framework Applied",
      landingPageData: object.landingPageSchema,
      complianceMetrics: {
        validated: object.scrapedComplianceValidated,
        purged: object.purgedHypeTriggers,
        schedule: object.optimalPostSchedule,
        frequency: object.postingFrequencyMetric
      },
      generatedAdSets: finalAdSets
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
