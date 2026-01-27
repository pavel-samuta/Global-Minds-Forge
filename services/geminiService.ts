import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction for the assistant
const GMF_CONTEXT = `
You are the AI assistant for Global Minds Forge (GMF). 
GMF is a scientific-informational social network for engineers, investors, and researchers.
Founder: Pavel Samuta.
Mission: Accelerate global research and improve engineering implementation.
Key Features:
1. Engineering Rating Identifier (ERI).
2. Professional interaction & semantic search.
3. Project assessment & investment matching.
Answer questions briefly and professionally in Russian.
`;

export interface StreamResponseChunk {
  text: string;
  groundingMetadata?: any;
}

export const streamChatResponse = async function* (
  history: { role: string; parts: { text: string }[] }[], 
  newMessage: string,
  mode: 'standard' | 'search' | 'maps' = 'standard',
  location?: { lat: number, lng: number }
): AsyncGenerator<StreamResponseChunk> {
  
  let model = 'gemini-3-flash-preview';
  let tools: any[] | undefined = undefined;
  let toolConfig: any = undefined;

  if (mode === 'search') {
    model = 'gemini-3-flash-preview';
    tools = [{ googleSearch: {} }];
  } else if (mode === 'maps') {
    model = 'gemini-2.5-flash';
    tools = [{ googleMaps: {} }];
    if (location) {
      toolConfig = {
        retrievalConfig: {
          latLng: {
            latitude: location.lat,
            longitude: location.lng
          }
        }
      };
    }
  }

  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: GMF_CONTEXT,
      tools,
      toolConfig
    },
    history: history,
  });

  const responseStream = await chat.sendMessageStream({ message: newMessage });
  
  for await (const chunk of responseStream) {
    const c = chunk as GenerateContentResponse;
    const text = c.text || "";
    const groundingMetadata = c.candidates?.[0]?.groundingMetadata;
    
    yield {
      text,
      groundingMetadata
    };
  }
};

export const analyzeProjectIdea = async (idea: string): Promise<string> => {
  const prompt = `
    Please analyze the following engineering project idea based on the principles of Global Minds Forge (viability, scientific value, potential investment).
    Provide a concise assessment in Russian with 3 key bullet points (Pros, Cons, Next Steps).
    
    Idea: ${idea}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });

  return response.text || "Could not analyze project.";
};

export const generateSpeech = async (text: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};
