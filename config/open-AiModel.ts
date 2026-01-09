import { OpenAI } from "openai";

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const OPENROUTER_KEY = process.env.OPEN_ROUTER_API_KEY;

let clientConfig: any = {};
if (OPENAI_KEY) {
  clientConfig = { apiKey: OPENAI_KEY };
} else if (OPENROUTER_KEY) {
  clientConfig = { apiKey: OPENROUTER_KEY, baseURL: "https://openrouter.ai/api/v1" };
} else {
  console.warn("No OPENAI_API_KEY or OPEN_ROUTER_API_KEY found in env — AI requests will fail until a key is provided.");
}

export const openai = new OpenAI(clientConfig);
export const provider = OPENAI_KEY ? "openai" : OPENROUTER_KEY ? "openrouter" : "none";