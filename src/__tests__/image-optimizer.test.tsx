import { vi } from 'vitest';
import sharp from 'sharp';
import { imageOptimizer } from '@/lib/ai/image-optimizer';
import { enhancedCache } from '@/lib/enhanced-cache';
import { uploadToStorage } from '@/lib/storage/storage-service';
import { OpenAI } from 'openai';

vi.mock('sharp');
vi.mock('@/lib/enhanced-cache');
vi.mock('@/lib/storage/storage-service');
vi.mock('openai');

describe('Image Optimizer Tests', () => {
  const mockImageBuffer = Buffer.from('test-image');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Image Optimization', () => {
    it('optimizes image with default settings', async () => {
      // Mock sharp functions
      vi.mocked(sharp).mockReturnValue({
        metadata: vi.fn().mockResolvedValue({
          width: 1000,
          height: 800,
          format: 'jpeg',
        }),
        resize: vi.fn().mockReturnThis(),
        toFormat: vi.fn().mockReturnThis(),
        toBuffer: vi.fn().mockResolvedValue(Buffer.from('optimized')),
      } as any);

      vi.mocked(uploadToStorage).mockResolvedValue('https://storage.test/image.jpg');

      const result = await imageOptimizer.optimizeImage(mockImageBuffer);

      expect(result.optimizedUrl).toBe('https://storage.test/image.jpg');
      expect(result.format).toBe('jpeg');
      expect(result.optimizationScore).toBeGreaterThan(0);
    });

    it('respects custom optimization options', async () => {
      vi.mocked(sharp).mockReturnValue({
        metadata: vi.fn().mockResolvedValue({
          width: 2000,
          height: 1600,
          format: 'png',
        }),
        resize: vi.fn().mockReturnThis(),
        toFormat: vi.fn().mockReturnThis(),
        toBuffer: vi.fn().mockResolvedValue(Buffer.from('optimized')),
      } as any);

      const options = {
        format: 'webp',
        quality: 90,
        maxWidth: 1000,
        maxHeight: 800,
      };

      const result = await imageOptimizer.optimizeImage(mockImageBuffer, options);

      expect(result.format).toBe('webp');
      expect(result.width).toBeLessThanOrEqual(1000);
      expect(result.height).toBeLessThanOrEqual(800);
    });
  });

  describe('AI Image Analysis', () => {
    it('provides image enhancement suggestions', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify([{
                    type: 'composition',
                    suggestion: 'Adjust image composition for better balance',
                    impact: 'high',
                    confidence: 0.9,
                  }]),
                },
              }],
            }),
          },
        },
      } as any));

      const suggestions = await imageOptimizer.analyzeImage(mockImageBuffer);
      
      expect(suggestions).toHaveLength(1);
      expect(suggestions[0].type).toBe('composition');
      expect(suggestions[0].impact).toBe('high');
    });

    it('generates optimal alt text', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: 'A professional developer working on code',
                },
              }],
            }),
          },
        },
      } as any));

      const altText = await imageOptimizer.generateOptimalAltText(
        mockImageBuffer,
        'Developer portfolio image'
      );
      
      expect(altText).toBe('A professional developer working on code');
    });
  });

  describe('Image Enhancement', () => {
    it('suggests appropriate image enhancements', async () => {
      vi.mocked(sharp).mockReturnValue({
        metadata: vi.fn().mockResolvedValue({
          width: 1000,
          height: 800,
        }),
        stats: vi.fn().mockResolvedValue({
          channels: [{
            mean: 128,
            stdev: 0.05,
          }],
        }),
      } as any);

      const enhancements = await imageOptimizer.suggestImageEnhancements(mockImageBuffer);
      
      expect(enhancements.filters).toBeDefined();
      expect(enhancements.adjustments).toHaveProperty('brightness');
      expect(enhancements.adjustments).toHaveProperty('contrast');
    });
  });

  describe('Error Handling', () => {
    it('handles invalid image data', async () => {
      vi.mocked(sharp).mockImplementation(() => {
        throw new Error('Invalid image data');
      });

      await expect(imageOptimizer.optimizeImage(mockImageBuffer))
        .rejects
        .toThrow('Invalid image data');
    });

    it('handles API errors gracefully', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockRejectedValue(new Error('API Error')),
          },
        },
      } as any));

      await expect(imageOptimizer.analyzeImage(mockImageBuffer))
        .rejects
        .toThrow('API Error');
    });
  });

  describe('Performance', () => {
    it('optimizes large images efficiently', async () => {
      const largeImageBuffer = Buffer.alloc(1024 * 1024 * 10); // 10MB image
      
      vi.mocked(sharp).mockReturnValue({
        metadata: vi.fn().mockResolvedValue({
          width: 4000,
          height: 3000,
          format: 'jpeg',
        }),
        resize: vi.fn().mockReturnThis(),
        toFormat: vi.fn().mockReturnThis(),
        toBuffer: vi.fn().mockResolvedValue(Buffer.alloc(1024 * 1024)), // 1MB result
      } as any);

      const result = await imageOptimizer.optimizeImage(largeImageBuffer);
      
      expect(result.optimizationScore).toBeGreaterThan(80); // Expect >80% reduction
    });
  });

  describe('Format Handling', () => {
    it('handles various input formats', async () => {
      const formats = ['jpeg', 'png', 'webp', 'avif'];
      
      for (const format of formats) {
        vi.mocked(sharp).mockReturnValue({
          metadata: vi.fn().mockResolvedValue({
            width: 1000,
            height: 800,
            format,
          }),
          resize: vi.fn().mockReturnThis(),
          toFormat: vi.fn().mockReturnThis(),
          toBuffer: vi.fn().mockResolvedValue(Buffer.from('optimized')),
        } as any);

        const result = await imageOptimizer.optimizeImage(mockImageBuffer);
        expect(result.format).toBe(format);
      }
    });
  });
});
