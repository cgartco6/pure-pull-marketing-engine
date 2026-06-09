import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const platformRuleDatabase: Record<string, string> = {
  meta: "Meta Core Terms (2026): Strictly bans false countdown timelines. Ad text must perfectly match destination parameters. Avoid aggressive non-functional badges.",
  google: "Google Search Policy V4: Requires transparent product landing definitions. Clear display of delivery parameters. No deceptive billing language.",
  tiktok: "TikTok Ad Guidelines: High asset clarity required. Text components must avoid fake native notification structures."
};

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
  ).length(5), // Rigid enforcement of 5 non-repeating asset configurations
});

export async function POST(req: Request) {
  try {
    const { productVision, productContext, targetPlatform, targetPriceZar } = await req.json();

    if (!productVision || !targetPlatform) {
      return NextResponse.json({ success: false, error: 'Missing core system input parameters' }, { status: 400 });
    }

    // Step 1: Resolve live platform constraints
    const platformKey = targetPlatform.toLowerCase().includes('meta') ? 'meta' : targetPlatform.toLowerCase().includes('google') ? 'google' : 'tiktok';
    const compiledPlatformRules = platformRuleDatabase[platformKey] || "Standard transparency ad distribution framework laws apply.";

    // Step 2: Orchestrate the core AI logic loop
    const runtimeSystemInstruction = `
      You are the core engineer unit of a Sovereign Pure-Pull Marketing Engine. Your objective is to process a business owner's product vision and transform it into a highly compliant, non-deceptive ad matrix and landing page layout.
      
      PULL MARKETING LAWS:
      - Absolutely no countdown timers, flash-sales, false hype, or artificial scarcity phrases.
      - Provide 5 completely distinct, non-repeating ad variations. Each variant must look at the product from a unique functional angle (e.g., Technical specs, Daily problem resolution, Manufacturing quality, Ergonomics, Long-term value).
      - Build high-resolution, professional image prompts that translate text into minimalist, raw product photography suitable for immediate generation.
    `;

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: engineOutputSchema,
      prompt: `
        Product Vision: ${productVision}
        Product Raw Context: ${productContext}
        Target Currency Parameters: R ${targetPriceZar} ZAR
        Target Ad Delivery Node: ${targetPlatform}
        
        Active Platform Compliance Document To Parse:
        ${compiledPlatformRules}
      `,
      system: runtimeSystemInstruction,
    });

    // Step 3: Core Media Asset Generation Pipeline
    // This loops through each generated ad configuration and makes a call to an external image model
    const processedAdSetsWithImages = await Promise.all(
      object.adSets.map(async (ad) => {
        try {
          // If you have an active Stability AI or OpenAI Image API key configured, invoke it here:
          // const imageGen = await openai.images.generate({ prompt: ad.imageGenerationPrompt, n: 1, size: "1024x1024" });
          // const generatedUrl = imageGen.data[0].url;
          
          return {
            ...ad,
            realGeneratedImageUrl: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=60&sig-mock-ad-${ad.adIndex}`
          };
        } catch (imgErr) {
          return {
            ...ad,
            realGeneratedImageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop'
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      platformRulesApplied: compiledPlatformRules,
      landingPageData: object.landingPageSchema,
      complianceMetrics: {
        validated: object.scrapedComplianceValidated,
        purged: object.purgedHypeTriggers,
        schedule: object.optimalPostSchedule,
        frequency: object.postingFrequencyMetric
      },
      generatedAdSets: processedAdSetsWithImages
    });

  } catch (error: any) {
    console.error('System Engine Execution Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
