import { OpenAI } from 'openai';
import sharp from 'sharp';
import { enhancedCache } from '../enhanced-cache';
import { uploadToStorage } from '../storage/storage-service';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ImageOptimizationResult {
  optimizedUrl: string;
  originalSize: number;
  optimizedSize: number;
  format: string;
  width: number;
  height: number;
  quality: number;
  optimizationScore: number;
}

interface AIImageSuggestion {
  type: 'composition' | 'color' | 'quality' | 'accessibility';
  suggestion: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
}

export class ImageOptimizer {
  private static instance: ImageOptimizer;
  private readonly supportedFormats = ['jpeg', 'png', 'webp', 'avif'];
  private readonly maxDimension = 2048;

  private constructor() {}

  static getInstance(): ImageOptimizer {
    if (!ImageOptimizer.instance) {
      ImageOptimizer.instance = new ImageOptimizer();
    }
    return ImageOptimizer.instance;
  }

  async optimizeImage(
    imageBuffer: Buffer,
    options: {
      format?: string;
      quality?: number;
      maxWidth?: number;
      maxHeight?: number;
    } = {}
  ): Promise<ImageOptimizationResult> {
    const originalSize = imageBuffer.length;
    let image = sharp(imageBuffer);
    const metadata = await image.metadata();

    // Determine optimal format
    const format = options.format || await this.determineOptimalFormat(metadata.format || 'jpeg');
    
    // Determine optimal dimensions
    const { width, height } = await this.calculateOptimalDimensions(
      metadata.width || 800,
      metadata.height || 600,
      options.maxWidth,
      options.maxHeight
    );

    // Optimize image
    image = image
      .resize(width, height, { fit: 'inside', withoutEnlargement: true })
      .toFormat(format as keyof sharp.FormatEnum, {
        quality: options.quality || 80,
        compression: format === 'png' ? 9 : undefined,
      });

    const optimizedBuffer = await image.toBuffer();
    const optimizedMetadata = await image.metadata();

    // Upload optimized image
    const optimizedUrl = await uploadToStorage(optimizedBuffer, `optimized/${Date.now()}.${format}`);

    return {
      optimizedUrl,
      originalSize,
      optimizedSize: optimizedBuffer.length,
      format,
      width: optimizedMetadata.width || width,
      height: optimizedMetadata.height || height,
      quality: options.quality || 80,
      optimizationScore: this.calculateOptimizationScore(originalSize, optimizedBuffer.length),
    };
  }

  async analyzeImage(imageBuffer: Buffer): Promise<AIImageSuggestion[]> {
    const base64Image = imageBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "Analyze the image and provide suggestions for improvement in terms of composition, color, quality, and accessibility.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this image and provide specific suggestions for improvement." },
            { type: "image_url", image_url: `data:image/jpeg;base64,${base64Image}` },
          ],
        },
      ],
      max_tokens: 500,
    });

    return this.parseAISuggestions(response.choices[0].message.content);
  }

  async generateOptimalAltText(imageBuffer: Buffer, context: string): Promise<string> {
    const base64Image = imageBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "system",
          content: "Generate an SEO-friendly and accessible alt text for the image. Consider the context provided.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: `Context: ${context}\nGenerate optimal alt text for this image.` },
            { type: "image_url", image_url: `data:image/jpeg;base64,${base64Image}` },
          ],
        },
      ],
      max_tokens: 100,
    });

    return response.choices[0].message.content || '';
  }

  async suggestImageEnhancements(imageBuffer: Buffer): Promise<{
    filters: sharp.FilterEnum;
    adjustments: Record<string, number>;
  }> {
    const metadata = await sharp(imageBuffer).metadata();
    const stats = await sharp(imageBuffer).stats();

    // Analyze image statistics to suggest enhancements
    const brightness = stats.channels[0].mean / 255;
    const contrast = stats.channels[0].stdev;

    return {
      filters: this.determineOptimalFilter(brightness, contrast),
      adjustments: this.calculateOptimalAdjustments(brightness, contrast),
    };
  }

  private async determineOptimalFormat(currentFormat: string): Promise<string> {
    if (!this.supportedFormats.includes(currentFormat)) {
      return 'webp'; // Default to WebP for unsupported formats
    }
    return currentFormat;
  }

  private async calculateOptimalDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidth?: number,
    maxHeight?: number,
  ): Promise<{ width: number; height: number }> {
    const aspectRatio = originalWidth / originalHeight;
    
    let width = Math.min(originalWidth, maxWidth || this.maxDimension);
    let height = Math.min(originalHeight, maxHeight || this.maxDimension);

    if (width / height !== aspectRatio) {
      if (width / aspectRatio <= height) {
        height = Math.round(width / aspectRatio);
      } else {
        width = Math.round(height * aspectRatio);
      }
    }

    return { width, height };
  }

  private calculateOptimizationScore(originalSize: number, optimizedSize: number): number {
    const reduction = (originalSize - optimizedSize) / originalSize;
    return Math.round(reduction * 100);
  }

  private determineOptimalFilter(brightness: number, contrast: number): sharp.FilterEnum {
    if (contrast < 0.1) {
      return sharp.filter.mitchell;
    } else if (brightness < 0.3) {
      return sharp.filter.lanczos3;
    }
    return sharp.filter.lanczos2;
  }

  private calculateOptimalAdjustments(brightness: number, contrast: number): Record<string, number> {
    return {
      brightness: brightness < 0.4 ? 1.2 : brightness > 0.7 ? 0.8 : 1,
      contrast: contrast < 0.1 ? 1.2 : contrast > 0.3 ? 0.9 : 1,
      saturation: contrast < 0.15 ? 1.1 : 1,
    };
  }

  private parseAISuggestions(content: string | null): AIImageSuggestion[] {
    if (!content) return [];
    
    // Implementation of AI suggestion parsing
    // This would parse the OpenAI response into structured suggestions
    return [];
  }
}

export const imageOptimizer = ImageOptimizer.getInstance();
