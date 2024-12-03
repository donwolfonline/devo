import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AIInsightsService } from '@/lib/analytics/ai-insights';
import AIThemeGenerator from '@/components/link-bio/AIThemeGenerator';
import { OpenAI } from 'openai';

// Mock OpenAI
vi.mock('openai', () => ({
  OpenAI: vi.fn(() => ({
    chat: {
      completions: {
        create: vi.fn(),
      },
    },
  })),
}));

describe('AI Features Tests', () => {
  describe('AI Insights Service', () => {
    const mockAnalyticsData = {
      visitors: {
        uniqueVisitors: 1000,
        returningVisitors: 30,
        bounceRate: 45,
      },
      engagement: {
        averageTimeOnPage: 120,
        scrollDepth: { '25%': 80, '50%': 60, '75%': 40, '100%': 20 },
        interactionRate: 25,
      },
      funnel: {
        completionRate: 15,
        dropOffPoints: {
          'view': 1000,
          'click': 300,
          'convert': 150,
        },
      },
      realTime: {
        currentVisitors: 50,
        recentClicks: 25,
      },
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('generates insights from analytics data', async () => {
      const aiService = AIInsightsService.getInstance();
      const insights = await aiService.generateInsights('test-profile');

      expect(insights).toBeDefined();
      expect(insights.length).toBeGreaterThan(0);
      expect(insights[0]).toHaveProperty('type');
      expect(insights[0]).toHaveProperty('confidence');
    });

    it('provides predictive analytics', async () => {
      const aiService = AIInsightsService.getInstance();
      const predictions = await aiService.getPredictiveAnalytics('test-profile');

      expect(predictions).toHaveProperty('expectedVisitors');
      expect(predictions).toHaveProperty('projectedGrowth');
      expect(predictions).toHaveProperty('peakTimes');
    });

    it('generates competitive insights', async () => {
      const aiService = AIInsightsService.getInstance();
      const competitors = ['competitor1', 'competitor2'];
      const insights = await aiService.getCompetitiveInsights('test-profile', competitors);

      expect(insights).toHaveProperty('marketPosition');
      expect(insights).toHaveProperty('strengthsWeaknesses');
      expect(insights).toHaveProperty('opportunities');
    });

    it('segments audience effectively', async () => {
      const aiService = AIInsightsService.getInstance();
      const segments = await aiService.getAudienceSegments('test-profile');

      expect(segments).toHaveProperty('segments');
      expect(segments).toHaveProperty('recommendations');
      expect(Array.isArray(segments.segments)).toBe(true);
    });

    it('handles API errors gracefully', async () => {
      const aiService = AIInsightsService.getInstance();
      
      // Mock API error
      vi.mocked(OpenAI).mockImplementationOnce(() => {
        throw new Error('API Error');
      });

      await expect(aiService.generateInsights('test-profile'))
        .rejects
        .toThrow('API Error');
    });
  });

  describe('AI Theme Generator', () => {
    const mockProfile = {
      customization: {
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        fontFamily: 'Inter',
        buttonStyle: 'rounded',
        layoutType: 'stack',
        backgroundEffect: 'none',
      },
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('generates themes based on user prompt', async () => {
      const onUpdate = vi.fn();
      render(
        <AIThemeGenerator
          profile={mockProfile as any}
          onUpdate={onUpdate}
        />
      );

      // Fill in prompt
      const promptInput = screen.getByPlaceholderText(/describe your desired theme/i);
      fireEvent.change(promptInput, {
        target: { value: 'Modern and minimalist with neon accents' },
      });

      // Adjust creativity
      const creativitySlider = screen.getByRole('slider');
      fireEvent.change(creativitySlider, { target: { value: 80 } });

      // Generate themes
      const generateButton = screen.getByText(/generate themes/i);
      fireEvent.click(generateButton);

      await waitFor(() => {
        expect(OpenAI).toHaveBeenCalled();
      });
    });

    it('applies selected theme correctly', async () => {
      const onUpdate = vi.fn();
      render(
        <AIThemeGenerator
          profile={mockProfile as any}
          onUpdate={onUpdate}
        />
      );

      // Mock theme generation
      const mockTheme = {
        colors: {
          primary: '#ff0000',
          secondary: '#00ff00',
          background: '#0000ff',
          text: '#ffffff',
          accent: ['#ffff00'],
        },
        typography: {
          fontFamily: 'Roboto',
          headingSize: '2rem',
          bodySize: '1rem',
          lineHeight: '1.5',
        },
        effects: {
          buttonStyle: 'rounded',
          animations: 'smooth',
          backgroundEffect: 'gradient',
          specialEffects: ['glow'],
        },
        spacing: {
          layout: 'grid',
          padding: '2rem',
          gap: '1rem',
        },
      };

      // Simulate theme selection
      const themeElement = screen.getByText(/theme 1/i);
      fireEvent.click(themeElement);

      expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({
        primaryColor: mockTheme.colors.primary,
        fontFamily: mockTheme.typography.fontFamily,
      }));
    });

    it('handles theme generation errors', async () => {
      const onUpdate = vi.fn();
      render(
        <AIThemeGenerator
          profile={mockProfile as any}
          onUpdate={onUpdate}
        />
      );

      // Mock API error
      vi.mocked(OpenAI).mockImplementationOnce(() => {
        throw new Error('API Error');
      });

      // Generate themes
      const generateButton = screen.getByText(/generate themes/i);
      fireEvent.click(generateButton);

      await waitFor(() => {
        expect(screen.getByText(/failed to generate themes/i)).toBeInTheDocument();
      });
    });

    it('previews themes accurately', async () => {
      const onUpdate = vi.fn();
      render(
        <AIThemeGenerator
          profile={mockProfile as any}
          onUpdate={onUpdate}
        />
      );

      // Check color preview elements
      const colorPreviews = screen.getAllByRole('button');
      expect(colorPreviews.length).toBeGreaterThan(0);

      // Check typography preview
      const fontPreview = screen.getByText(mockProfile.customization.fontFamily);
      expect(fontPreview).toBeInTheDocument();

      // Check effects preview
      const effectsPreview = screen.getAllByRole('button');
      expect(effectsPreview.length).toBeGreaterThan(0);
    });
  });
});
