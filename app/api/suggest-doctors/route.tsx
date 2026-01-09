import { NextRequest, NextResponse } from "next/server";
import { openai, provider } from "@/config/open-AiModel";
import { AIDoctor } from "@/shared/list";

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json();

    if (!notes) {
      return NextResponse.json({ error: "Notes are required" }, { status: 400 });
    }

    const doctorContext = AIDoctor.map(
      (doc) => `ID: ${doc.id}
Specialist: ${doc.specialist}
Description: ${doc.description}`
    ).join("\n\n");

    let completion: any = null;
    let models: string[] = [];
    if (provider === "openai") {
      models = ["gpt-4o-mini", "gpt-3.5-turbo", "gpt-4"];
    } else if (provider === "openrouter") {
      // OpenRouter may not expose all official OpenAI model names; prefer conservative choice
      models = ["gpt-3.5-turbo"];
    } else {
      // unknown provider -> try commonly-available model name
      models = ["gpt-3.5-turbo"];
    }

    // Try models in order. For each model, attempt up to 3 tries for transient (429) errors.
    for (const model of models) {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          console.info(`Attempting model ${model} (attempt ${attempt + 1})`);
          completion = await openai.chat.completions.create({
            model,
            messages: [
              {
                role: "system",
                content: `Return ONLY valid JSON.
Doctor List:
${doctorContext}

{
  "id": number,
  "specialist": string,
  "reason": string
}`,
              },
              {
                role: "user",
                content: `Patient symptoms: ${notes}`,
              },
            ],
            temperature: 0.2,
          });
          // success
          console.info(`Model ${model} succeeded.`);
          break;
        } catch (err: any) {
          // Model not found on the router/provider -> try the next model
          if (err?.status === 404) {
            console.warn(`Model ${model} not available, trying next model.`);
            break; // break attempts loop to move to next model
          }

          // Rate limited - exponential backoff
          if (err?.status === 429 && attempt < 2) {
            const backoff = 500 * Math.pow(2, attempt); // 500ms, 1000ms, 2000ms
            console.info(`Rate limited; backing off ${backoff}ms before retrying.`);
            await sleep(backoff);
            continue;
          }

          // Other errors -> rethrow to outer catch
          console.error(err);
          throw err;
        }
      }

      if (completion) break; // stop if we got a successful completion
    }

    if (!completion) {
      throw new Error("All models failed or were unavailable");
    }

    const raw = completion?.choices?.[0]?.message?.content ?? completion?.choices?.[0]?.text ?? "";
    let parsed = {};
    try {
      parsed = raw ? JSON.parse(raw) : {};
      console.info("Successfully parsed AI response:", parsed);
    } catch (e) {
      console.error("Failed to parse AI response as JSON:", raw);
      return NextResponse.json({ error: "Invalid AI response format" }, { status: 502 });
    }

    // Enrich parsed response with full doctor details from AIDoctor list
    let suggestedDoctors = Array.isArray(parsed) ? parsed : [parsed];
    suggestedDoctors = suggestedDoctors.map((doc: any) => {
      const fullDoctor = AIDoctor.find(d => d.id === doc.id);
      return {
        ...fullDoctor,
        ...doc, // keep AI-generated reason if any
      };
    });

    return NextResponse.json(suggestedDoctors);

  } catch (error: any) {
    console.error("Error in suggest-doctors:", error);
    
    // Return appropriate status codes based on error type
    if (error?.status === 401 || error?.status === 403) {
      return NextResponse.json(
        { error: "Invalid or missing API key." },
        { status: 401 }
      );
    }
    
    if (error?.status === 429) {
      return NextResponse.json(
        { error: "AI rate limit exceeded. Try again later." },
        { status: 429 }
      );
    }
    
    if (error?.status === 404) {
      return NextResponse.json(
        { error: "No available AI models. Check API provider." },
        { status: 502 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { error: error?.message || "Failed to suggest doctors. Please try again." },
      { status: 500 }
    );
  }
}
