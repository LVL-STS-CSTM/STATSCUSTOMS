
import { GoogleGenAI } from "@google/genai";

interface Env {
  API_KEY: string;
}

export const onRequestPost = async (context: { env: Env; request: Request }) => {
  const { request } = context;

  try {
    const body: any = await request.json();
    const { type, payload } = body;
    
    // As per guidelines: Always initialize new instance right before the call
    // The API key must be obtained exclusively from the environment variable process.env.API_KEY.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    if (type === 'description') {
      const { productName, category } = payload;
      // Use ai.models.generateContent directly with model name and prompt
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a 2-line technical marketing spec for ${productName} (${category}). No markdown. Focus on high-performance B2B apparel.`,
      });
      // Extract generated text directly from response.text property
      return new Response(JSON.stringify({ text: response.text?.trim() || "Quality technical apparel." }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } else if (type === 'advisor') {
      const { messages, allProducts } = payload;
      
      const productContext = allProducts.map((p: any) => 
          `ID: ${p.id}, Name: ${p.name}, Category: ${p.category}, Price: ${p.price ? `$${p.price}` : 'N/A'}`
      ).join('\n');

      const systemInstruction = `You are a technical product advisor for STATS CUSTOMS. 
      Catalogue Data:
      ${productContext}
      
      Identify the best match for the user. Be concise. One sentence max.`;

      const contents = messages.slice(1).map((m: any) => ({
          role: m.sender === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
      }));

      // Use ai.models.generateContent with systemInstruction in config
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: { systemInstruction }
      });

      return new Response(JSON.stringify({ text: response.text || "Scanning catalogue..." }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response('Protocol Error', { status: 400 });

  } catch (error: any) {
    console.error("Uplink Error:", error);
    return new Response(JSON.stringify({ message: 'Service Unavailable' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
