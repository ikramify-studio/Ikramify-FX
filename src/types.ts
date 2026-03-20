export type TransformationStyle = 'pencil' | 'written' | 'cartoon' | 'neon';

export interface TransformationOption {
  id: TransformationStyle;
  label: string;
  description: string;
  icon: string;
}

export interface AppState {
  originalImage: string | null;
  processedImage: string | null;
  isProcessing: boolean;
  selectedStyle: TransformationStyle | null;
  isPremium: boolean;
  showSplash: boolean;
}
