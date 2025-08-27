
export interface GenerateImageResult {
    base64: string;
    mimeType: string;
}

export interface EditResult {
    base64: string | null;
    mimeType: string | null;
    text: string | null;
}

export interface HistoryItem {
    id: number;
    type: 'generate' | 'edit';
    prompt: string;
    imageData: string;
    mimeType: string;
    timestamp: string;
}

export interface ReferenceImage {
    base64: string;
    mimeType: string;
    name: string;
}
