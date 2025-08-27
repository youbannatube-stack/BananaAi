
import { GoogleGenAI, Modality } from "@google/genai";
import { GenerateImageResult, EditResult, ReferenceImage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (prompt: string, aspectRatio: string, model: string, referenceImages: ReferenceImage[] = []): Promise<GenerateImageResult> => {
    try {
        if (model.startsWith('imagen')) {
            const response = await ai.models.generateImages({
                model: model,
                prompt: prompt,
                config: {
                    numberOfImages: 1,
                    outputMimeType: 'image/png',
                    aspectRatio: aspectRatio,
                },
            });

            if (response.generatedImages && response.generatedImages.length > 0) {
                const image = response.generatedImages[0];
                return {
                    base64: image.image.imageBytes,
                    mimeType: 'image/png'
                };
            } else {
                throw new Error('No images were generated.');
            }
        } else if (model === 'gemini-2.5-flash-image-preview') {
            const textPart = { text: prompt };
            const imageParts = referenceImages.map(img => ({
                inlineData: {
                    data: img.base64,
                    mimeType: img.mimeType,
                }
            }));

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts: [textPart, ...imageParts] },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            if (response.candidates && response.candidates.length > 0) {
                const imagePart = response.candidates[0].content.parts.find(part => part.inlineData);
                if (imagePart?.inlineData) {
                    return {
                        base64: imagePart.inlineData.data,
                        mimeType: imagePart.inlineData.mimeType || 'image/png',
                    };
                }
            }
            throw new Error('The model did not return an image. Try a different prompt.');
        } else {
             throw new Error(`Unsupported model selected: ${model}`);
        }
    } catch (error) {
        console.error('Error generating image:', error);
        throw new Error('Failed to generate image. Please check your prompt or API key.');
    }
};

export const editImage = async (prompt: string, imageBase64: string, mimeType: string): Promise<EditResult> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: imageBase64,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: prompt,
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        if (response.candidates && response.candidates.length > 0) {
            const result: EditResult = {
                base64: null,
                mimeType: null,
                text: null
            };

            for (const part of response.candidates[0].content.parts) {
                if (part.text) {
                    result.text = part.text;
                } else if (part.inlineData) {
                    result.base64 = part.inlineData.data;
                    result.mimeType = part.inlineData.mimeType;
                }
            }
            if(!result.base64 && !result.text) {
                throw new Error("The model did not return an image or text. Try a different prompt.");
            }
            return result;
        } else {
            throw new Error('Image editing resulted in an empty response.');
        }

    } catch (error) {
        console.error('Error editing image:', error);
        throw new Error('Failed to edit image. The model might be unable to fulfill this request.');
    }
};

export const getTextFromImage = async (base64: string, mimeType: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: "Describe this image in detail. Be descriptive and creative, as this description will be used as a prompt to generate a new image.",
                    },
                ],
            },
        });

        return response.text;
    } catch (error) {
        console.error('Error getting text from image:', error);
        throw new Error('Failed to analyze the image. Please try another one.');
    }
};