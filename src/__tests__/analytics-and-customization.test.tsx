import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AdvancedCustomizationPanel from '@/components/link-bio/AdvancedCustomizationPanel';
import { analyticsService } from '@/lib/analytics/enhanced-analytics';
import { enhancedCache } from '@/lib/enhanced-cache';

// Mock Redis client
vi.mock('@upstash/redis', () => ({
  Redis: vi.fn(() => ({
    get: vi.fn(),
    set: vi.fn(),
    incr: vi.fn(),
    hincrby: vi.fn(),
    expire: vi.fn(),
    mget: vi.fn(),
    hgetall: vi.fn(),
  })),
}));

describe('Analytics and Customization Tests', () => {
  const mockProfile = {
    id: 'test-id',
    customization: {
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
      fontFamily: 'Inter',
      buttonStyle: 'rounded',
      layoutType: 'stack',
      spacing: 'normal',
      containerWidth: '600',
      animationIntensity: 'medium',
      glassmorphism: false,
      textGradient: false,
      neonEffects: false,
      backgroundEffect: 'none',
      customCSS: '',
      customAttributes: '',
      metaTags: '',
    },
  };

  describe('AdvancedCustomizationPanel', () => {
    it('updates style settings correctly', async () => {
      const onUpdate = vi.fn();
      render(
        <AdvancedCustomizationPanel
          profile={mockProfile as any}
          onUpdate={onUpdate}
        />
      );

      // Test color picker
      const primaryColorInput = screen.getByLabelText('Primary Color');
      fireEvent.change(primaryColorInput, { target: { value: '#ff0000' } });
      expect(onUpdate).toHaveBeenCalledWith({ primaryColor: '#ff0000' });

      // Test font family
      const fontSelect = screen.getByRole('combobox');
      fireEvent.change(fontSelect, { target: { value: 'Roboto' } });
      expect(onUpdate).toHaveBeenCalledWith({ fontFamily: 'Roboto' });

      // Test button style
      const pillButton = screen.getByText('pill');
      fireEvent.click(pillButton);
      expect(onUpdate).toHaveBeenCalledWith({ buttonStyle: 'pill' });
    });

    it('validates custom CSS input', async () => {
      const onUpdate = vi.fn();
      render(
        <AdvancedCustomizationPanel
          profile={mockProfile as any}
          onUpdate={onUpdate}
        />
      );

      // Navigate to advanced tab
      const advancedTab = screen.getByText('Advanced');
      fireEvent.click(advancedTab);

      // Test valid CSS
      const cssTextarea = screen.getByPlaceholderText('.custom-style { ... }');
      fireEvent.change(cssTextarea, {
        target: { value: '.test { color: red; }' },
      });
      expect(screen.queryByText('Invalid CSS syntax')).not.toBeInTheDocument();

      // Test invalid CSS
      fireEvent.change(cssTextarea, {
        target: { value: '.test { color: }' },
      });
      expect(screen.getByText('Invalid CSS syntax')).toBeInTheDocument();
    });

    it('handles layout changes', async () => {
      const onUpdate = vi.fn();
      render(
        <AdvancedCustomizationPanel
          profile={mockProfile as any}
          onUpdate={onUpdate}
        />
      );

      // Navigate to layout tab
      const layoutTab = screen.getByText('Layout');
      fireEvent.click(layoutTab);

      // Test layout type
      const gridLayout = screen.getByText('grid');
      fireEvent.click(gridLayout);
      expect(onUpdate).toHaveBeenCalledWith({ layoutType: 'grid' });

      // Test spacing
      const spacingSlider = screen.getByRole('slider');
      fireEvent.change(spacingSlider, { target: { value: 100 } });
      expect(onUpdate).toHaveBeenCalledWith({ spacing: 'relaxed' });
    });
  });

  describe('Analytics Service', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    const mockVisitorData = {
      timestamp: Date.now(),
      userAgent: 'test-agent',
      ip: '127.0.0.1',
      referrer: 'test-referrer',
      device: 'desktop',
      browser: 'chrome',
      country: 'US',
      city: 'Test City',
      path: '/test',
      timeOnPage: 60,
      scrollDepth: 100,
      interactions: ['click'],
    };

    it('tracks page views correctly', async () => {
      await analyticsService.trackPageView('test-profile', mockVisitorData);
      
      // Verify Redis calls
      expect(Redis).toHaveBeenCalled();
      // Add more specific Redis call verifications
    });

    it('tracks link clicks with attribution', async () => {
      const mockClickData = {
        linkId: 'test-link',
        timestamp: Date.now(),
        referrer: 'test-referrer',
        device: 'desktop',
        country: 'US',
      };

      await analyticsService.trackLinkClick('test-profile', mockClickData);
      
      // Verify Redis calls
      expect(Redis).toHaveBeenCalled();
      // Add more specific Redis call verifications
    });

    it('retrieves real-time stats', async () => {
      const stats = await analyticsService.getRealTimeStats('test-profile');
      
      expect(stats).toHaveProperty('currentVisitors');
      expect(stats).toHaveProperty('recentClicks');
      expect(stats).toHaveProperty('activeCountries');
    });

    it('aggregates visitor insights correctly', async () => {
      const insights = await analyticsService.getVisitorInsights('test-profile');
      
      expect(insights).toHaveProperty('uniqueVisitors');
      expect(insights).toHaveProperty('returningVisitors');
      expect(insights).toHaveProperty('averageTimeOnPage');
      expect(insights).toHaveProperty('bounceRate');
      expect(insights).toHaveProperty('topReferrers');
    });
  });

  describe('Enhanced Cache', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('implements multi-layer caching correctly', async () => {
      const testKey = 'test-key';
      const testValue = { data: 'test' };

      // Test set operation
      await enhancedCache.set(testKey, testValue);
      
      // Test get operation
      const cachedValue = await enhancedCache.get(testKey);
      expect(cachedValue).toEqual(testValue);
    });

    it('handles cache invalidation', async () => {
      const testKey = 'test-key';
      
      await enhancedCache.set(testKey, 'test');
      await enhancedCache.invalidate(testKey);
      
      const cachedValue = await enhancedCache.get(testKey);
      expect(cachedValue).toBeNull();
    });

    it('performs batch operations efficiently', async () => {
      const entries: [string, any][] = [
        ['key1', 'value1'],
        ['key2', 'value2'],
      ];

      await enhancedCache.mset(entries);
      
      const values = await enhancedCache.mget(['key1', 'key2']);
      expect(values).toEqual(['value1', 'value2']);
    });
  });
});
