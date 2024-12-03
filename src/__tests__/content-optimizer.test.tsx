import { vi } from 'vitest';
import { contentOptimizer } from '@/lib/ai/content-optimizer';
import { enhancedCache } from '@/lib/enhanced-cache';
import { OpenAI } from 'openai';

// Mock OpenAI and cache
vi.mock('openai');
vi.mock('@/lib/enhanced-cache');

describe('Content Optimizer Tests', () => {
  const mockProfile = {
    id: 'test-id',
    name: 'Test User',
    bio: 'A passionate developer sharing insights about tech',
    customLinks: [
      { id: '1', title: 'My Blog', url: 'https://blog.test.com' },
      { id: '2', title: 'Projects', url: 'https://projects.test.com' },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Bio Optimization', () => {
    it('optimizes bio content effectively', async () => {
      // Mock OpenAI response
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify([{
                    type: 'bio',
                    originalContent: mockProfile.bio,
                    suggestedContent: 'Innovative developer crafting the future of tech | Sharing insights and best practices',
                    reason: 'Improved engagement and clarity',
                    impact: 'high',
                  }]),
                },
              }],
            }),
          },
        },
      } as any));

      const suggestions = await contentOptimizer.optimizeBio(mockProfile as any);
      
      expect(suggestions).toHaveLength(1);
      expect(suggestions[0].type).toBe('bio');
      expect(suggestions[0].impact).toBe('high');
    });

    it('uses cached bio optimization when available', async () => {
      const cachedSuggestions = [{
        type: 'bio',
        originalContent: mockProfile.bio,
        suggestedContent: 'Cached optimization',
        reason: 'Cached reason',
        impact: 'medium',
      }];

      vi.mocked(enhancedCache.get).mockResolvedValue(cachedSuggestions);

      const suggestions = await contentOptimizer.optimizeBio(mockProfile as any);
      
      expect(suggestions).toEqual(cachedSuggestions);
      expect(OpenAI).not.toHaveBeenCalled();
    });
  });

  describe('Link Title Optimization', () => {
    it('optimizes all link titles', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: 'Optimized Link Title',
                },
              }],
            }),
          },
        },
      } as any));

      const suggestions = await contentOptimizer.optimizeLinkTitles(mockProfile as any);
      
      expect(suggestions).toHaveLength(mockProfile.customLinks.length);
      expect(suggestions[0].type).toBe('link');
    });

    it('handles empty link list gracefully', async () => {
      const emptyProfile = { ...mockProfile, customLinks: [] };
      const suggestions = await contentOptimizer.optimizeLinkTitles(emptyProfile as any);
      
      expect(suggestions).toHaveLength(0);
    });
  });

  describe('SEO Tag Generation', () => {
    it('generates complete SEO tags', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify({
                    title: 'Test User | Developer & Tech Insights',
                    description: 'Passionate developer sharing valuable insights about technology and development practices.',
                    keywords: ['developer', 'tech', 'insights'],
                    openGraph: {
                      title: 'Test User - Tech Portfolio',
                      description: 'Tech insights and development expertise',
                    },
                  }),
                },
              }],
            }),
          },
        },
      } as any));

      const seoTags = await contentOptimizer.generateSEOTags(mockProfile as any);
      
      expect(seoTags).toHaveProperty('title');
      expect(seoTags).toHaveProperty('description');
      expect(seoTags).toHaveProperty('keywords');
      expect(seoTags).toHaveProperty('openGraph');
    });
  });

  describe('Content Scoring', () => {
    it('provides accurate content scores', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify({
                    clarity: 85,
                    engagement: 75,
                    seo: 90,
                    accessibility: 80,
                    overall: 82.5,
                  }),
                },
              }],
            }),
          },
        },
      } as any));

      const scores = await contentOptimizer.scoreContent('Test content');
      
      expect(scores.clarity).toBeGreaterThan(0);
      expect(scores.engagement).toBeGreaterThan(0);
      expect(scores.seo).toBeGreaterThan(0);
      expect(scores.accessibility).toBeGreaterThan(0);
      expect(scores.overall).toBeGreaterThan(0);
    });
  });

  describe('A/B Testing Variations', () => {
    it('generates requested number of variations', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify([
                    'Variation 1',
                    'Variation 2',
                    'Variation 3',
                  ]),
                },
              }],
            }),
          },
        },
      } as any));

      const variations = await contentOptimizer.generateABVariations('Original content', 3);
      
      expect(variations).toHaveLength(3);
      expect(variations[0]).toBeDefined();
    });
  });

  describe('Accessibility Improvements', () => {
    it('suggests valid accessibility improvements', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify([{
                    type: 'accessibility',
                    originalContent: 'Click here',
                    suggestedContent: 'View blog post about development',
                    reason: 'More descriptive link text for screen readers',
                    impact: 'high',
                  }]),
                },
              }],
            }),
          },
        },
      } as any));

      const suggestions = await contentOptimizer.generateAccessibilityImprovements(mockProfile as any);
      
      expect(suggestions[0].type).toBe('accessibility');
      expect(suggestions[0].impact).toBe('high');
    });
  });

  describe('Error Handling', () => {
    it('handles API errors gracefully', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockRejectedValue(new Error('API Error')),
          },
        },
      } as any));

      await expect(contentOptimizer.optimizeBio(mockProfile as any))
        .rejects
        .toThrow('API Error');
    });

    it('handles invalid API responses', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: 'Invalid JSON',
                },
              }],
            }),
          },
        },
      } as any));

      const suggestions = await contentOptimizer.optimizeBio(mockProfile as any);
      expect(suggestions).toEqual([]);
    });
  });
});
