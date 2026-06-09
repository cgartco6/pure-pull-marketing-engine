import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Bypasses Vercel's standard 10s serverless timeout

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productVision, targetPriceZar } = body;

    // Craft a strict system instructions prompt focused on organic, high-trust "pull marketing"
    const systemPrompt = `You are a strict compliance and copywriting engine. 
    Analyze the following product concept. Output a JSON object containing exactly 5 non-repeating ad variants.
    CRITICAL RULE: Strip out all countdown timers, fake specials, or aggressive clickbait marketing hype. Keep the tone grounded, honest, and high-trust.
    
    Structure the output precisely like this:
    {
      "success": true,
      "generatedAdSets": [
        { "adIndex": 1, "hookStyle": "Technical Specs", "headlineText": "...", "primaryText": "...", "imageGenerationPrompt": "Minimalist product photography, crisp natural light..." }
      ]
    }`;

    // SWAP ENDPOINTS HERE: Pointing to OpenRouter's Free Gateway Core
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // Fallback to your free tier token
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.3-70b-instruct:free", // Utilizing elite, completely free open models
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Product: ${productVision}. Target Price: R${targetPriceZar}` }
        ],
        response_format: { type: "json_object" } // Enforces pristine structural returns
      })
    });

    const data = await response.json();
    
    // Parse out the model content response safely
    const contentText = data.choices[0].message.content;
    return NextResponse.json(JSON.parse(contentText));

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
