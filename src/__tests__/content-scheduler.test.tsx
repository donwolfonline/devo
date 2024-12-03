import { vi } from 'vitest';
import { contentScheduler } from '@/lib/ai/content-scheduler';
import { enhancedCache } from '@/lib/enhanced-cache';
import { OpenAI } from 'openai';

vi.mock('@/lib/enhanced-cache');
vi.mock('openai');

describe('Content Scheduler Tests', () => {
  const mockProfile = {
    id: 'test-profile',
    name: 'Test User',
    bio: 'Content creator',
    customLinks: [],
  };

  const mockAnalytics = {
    engagementRates: {
      morning: 0.8,
      afternoon: 0.6,
      evening: 0.9,
    },
    audienceTimezones: {
      'America/New_York': 0.4,
      'Europe/London': 0.3,
      'Asia/Tokyo': 0.3,
    },
    peakHours: [9, 14, 20],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Schedule Generation', () => {
    it('generates optimal schedule based on analytics', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify({
                    recommendedTimes: [
                      {
                        day: 'Monday',
                        hour: 9,
                        score: 0.9,
                        reason: 'Peak engagement time',
                      },
                    ],
                    frequency: 'daily',
                    timezone: 'UTC',
                    audienceInsights: {
                      primaryTimezones: ['America/New_York'],
                      peakActivityHours: [9, 14, 20],
                      demographicFactors: {},
                    },
                  }),
                },
              }],
            }),
          },
        },
      } as any));

      const schedule = await contentScheduler.generateOptimalSchedule(
        mockProfile,
        mockAnalytics
      );

      expect(schedule.recommendedTimes).toHaveLength(1);
      expect(schedule.frequency).toBe('daily');
      expect(schedule.timezone).toBe('UTC');
    });

    it('respects user preferences', async () => {
      const preferences = {
        timezone: 'America/New_York',
        excludedDays: ['Sunday'],
        minPostsPerWeek: 3,
        maxPostsPerWeek: 5,
      };

      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify({
                    recommendedTimes: [
                      {
                        day: 'Monday',
                        hour: 9,
                        score: 0.9,
                        reason: 'Peak engagement time',
                      },
                    ],
                    frequency: 'custom',
                    timezone: 'America/New_York',
                    audienceInsights: {
                      primaryTimezones: ['America/New_York'],
                      peakActivityHours: [9, 14, 20],
                      demographicFactors: {},
                    },
                  }),
                },
              }],
            }),
          },
        },
      } as any));

      const schedule = await contentScheduler.generateOptimalSchedule(
        mockProfile,
        mockAnalytics,
        preferences
      );

      expect(schedule.timezone).toBe('America/New_York');
      expect(schedule.recommendedTimes.some(t => t.day === 'Sunday')).toBe(false);
    });
  });

  describe('Content Plan Generation', () => {
    const mockSchedule = {
      recommendedTimes: [
        {
          day: 'Monday',
          hour: 9,
          score: 0.9,
          reason: 'Peak engagement time',
        },
      ],
      frequency: 'daily',
      timezone: 'UTC',
      audienceInsights: {
        primaryTimezones: ['America/New_York'],
        peakActivityHours: [9, 14, 20],
        demographicFactors: {},
      },
    };

    it('generates content variations for each time slot', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify({
                    content: 'Optimized content variation',
                    targetAudience: 'Tech professionals',
                    expectedEngagement: 0.8,
                  }),
                },
              }],
            }),
          },
        },
      } as any));

      const plan = await contentScheduler.generateContentPlan(
        mockProfile,
        mockSchedule,
        'Original content template'
      );

      expect(plan.contentVariations).toHaveLength(mockSchedule.recommendedTimes.length);
      expect(plan.contentVariations[0].content).toBe('Optimized content variation');
    });
  });

  describe('Audience Analysis', () => {
    it('analyzes audience engagement patterns', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify({
                    bestTimes: [
                      {
                        day: 'Monday',
                        hour: 9,
                        score: 0.9,
                        reason: 'High engagement',
                      },
                    ],
                    audienceSegments: {
                      'Tech professionals': 0.6,
                      'Students': 0.4,
                    },
                    engagementPatterns: {
                      weekday: 0.8,
                      weekend: 0.5,
                    },
                  }),
                },
              }],
            }),
          },
        },
      } as any));

      const analysis = await contentScheduler.analyzeAudienceEngagement(
        mockProfile,
        mockAnalytics
      );

      expect(analysis.bestTimes).toBeDefined();
      expect(analysis.audienceSegments).toBeDefined();
      expect(analysis.engagementPatterns).toBeDefined();
    });
  });

  describe('Engagement Prediction', () => {
    const mockTimeSlot = {
      day: 'Monday',
      hour: 9,
      score: 0.9,
      reason: 'Peak time',
    };

    it('predicts engagement accurately', async () => {
      vi.mocked(OpenAI).mockImplementation(() => ({
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{
                message: {
                  content: JSON.stringify({
                    score: 0.85,
                    factors: {
                      timing: 0.9,
                      content: 0.8,
                      audience: 0.85,
                    },
                    recommendations: [
                      'Add more visual content',
                      'Include call to action',
                    ],
                  }),
                },
              }],
            }),
          },
        },
      } as any));

      const prediction = await contentScheduler.predictEngagement(
        'Test content',
        mockTimeSlot,
        mockAnalytics
      );

      expect(prediction.score).toBeGreaterThan(0);
      expect(prediction.factors).toBeDefined();
      expect(prediction.recommendations).toHaveLength(2);
    });
  });

  describe('Real-time Optimization', () => {
    const mockSchedule = {
      recommendedTimes: [
        {
          day: 'Monday',
          hour: 9,
          score: 0.9,
          reason: 'Peak engagement time',
        },
      ],
      frequency: 'daily',
      timezone: 'UTC',
      audienceInsights: {
        primaryTimezones: ['America/New_York'],
        peakActivityHours: [9, 14, 20],
        demographicFactors: {},
      },
    };

    it('adjusts schedule based on real-time data', async () => {
      const realTimeData = {
        currentEngagement: 0.95,
        trending: true,
        competitorActivity: 'low',
      };

      const optimizedSchedule = await contentScheduler.optimizePostTiming(
        mockSchedule,
        realTimeData
      );

      expect(optimizedSchedule.recommendedTimes[0].score)
        .not.toBe(mockSchedule.recommendedTimes[0].score);
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

      await expect(contentScheduler.generateOptimalSchedule(mockProfile, mockAnalytics))
        .rejects
        .toThrow('API Error');
    });

    it('uses cache when available', async () => {
      const cachedSchedule = {
        recommendedTimes: [],
        frequency: 'daily',
        timezone: 'UTC',
        audienceInsights: {
          primaryTimezones: [],
          peakActivityHours: [],
          demographicFactors: {},
        },
      };

      vi.mocked(enhancedCache.get).mockResolvedValue(cachedSchedule);

      const schedule = await contentScheduler.generateOptimalSchedule(
        mockProfile,
        mockAnalytics
      );

      expect(schedule).toEqual(cachedSchedule);
      expect(OpenAI).not.toHaveBeenCalled();
    });
  });
});
