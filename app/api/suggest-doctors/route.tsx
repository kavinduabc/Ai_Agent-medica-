import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/config/open-AiModel";
import { AIDoctor } from "@/shared/list";

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json();

    if (!notes) {
      return NextResponse.json(
        { error: "Notes are required" },
        { status: 400 }
      );
    }

    const doctorContext = AIDoctor.map(
      (doc) =>
        `ID: ${doc.id}
Specialist: ${doc.specialist}
Description: ${doc.description}`
    ).join("\n\n");

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.0-flash-exp:free",
      messages: [
        {
          role: "system",
          content: `
You are a medical AI assistant.
Choose the MOST suitable doctor from the list.
Return ONLY valid JSON.

Doctor List:
${doctorContext}

JSON format:
{
  "id": number,
  "specialist": string,
  "reason": string
}
          `,
        },
        {
          role: "user",
          content: `Patient symptoms: ${notes}`,
        },
      ],
      temperature: 0.2,
    });

    const response = completion.choices[0].message?.content;

    return NextResponse.json(JSON.parse(response || "{}"));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI suggestion failed" },
      { status: 500 }
    );
  }
}
