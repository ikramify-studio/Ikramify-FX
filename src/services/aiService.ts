import { GoogleGenAI } from "@google/genai";
import { TransformationStyle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const STYLE_PROMPTS: Record<TransformationStyle, string> = {
  pencil: "Convert this image into a realistic black and white pencil sketch. Use fine edge detection, smooth shading, and graphite textures. The result should look like it was hand-drawn on paper with a pencil.",
  written: "Convert this image into an artistic sketch made entirely of handwritten text strokes and calligraphy lines. The words and letters should form the shapes, shadows, and contours of the original image. Creative and calligraphic.",
  cartoon: "Convert this image into a smooth cartoon style. Use bold outlines, vibrant colors, and simplified shapes. It should look like high-quality 2D digital animation art.",
  neon: "Apply a neon glow effect to this image. The background should be dark, and the edges of objects should glow with vibrant blue, purple, and pink neon lighting. High contrast and futuristic cyberpunk vibe."
};

export async function transformImage(base64Image: string, style: TransformationStyle): Promise<string> {
  // Remove data URL prefix if present
  const base64Data = base64Image.split(',')[1] || base64Image;
  
  const prompt = STYLE_PROMPTS[style];
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Data,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    // Find the image part in the response
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image returned from AI model");
  } catch (error) {
    console.error("AI Transformation Error:", error);
    throw error;
  }
}
