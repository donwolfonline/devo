import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Session } from 'next-auth';
import RetroTemplate from '@/components/link-bio/templates/RetroTemplate';
import MinimalistTemplate from '@/components/link-bio/templates/MinimalistTemplate';
import AdvancedAnalytics from '@/components/link-bio/analytics/AdvancedAnalytics';
import CustomizationPanel from '@/components/link-bio/CustomizationPanel';
import { cache } from '@/lib/cache';
import { rateLimit } from '@/lib/rate-limit';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  useParams: () => ({
    username: 'testuser',
  }),
}));

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        id: 'test-user-id',
        name: 'Test User',
        email: 'test@example.com',
      },
    } as Session,
    status: 'authenticated',
  }),
}));

// Mock Redis cache
vi.mock('@/lib/cache', () => ({
  cache: {
    get: vi.fn(),
    set: vi.fn(),
    del: vi.fn(),
    invalidatePattern: vi.fn(),
  },
}));

describe('Advanced Link in Bio Tests', () => {
  const mockProfile = {
    id: 'test-id',
    userId: 'test-user-id',
    username: 'testuser',
    subdomain: 'testuser',
    name: 'Test User',
    bio: 'Test bio',
    avatar: '/test-avatar.jpg',
    template: 'minimal',
    customization: {
      primaryColor: '#9333EA',
      secondaryColor: '#A855F7',
      backgroundColor: '#000000',
      fontFamily: 'Inter',
      buttonStyle: 'rounded',
      avatarStyle: 'circle',
      buttonAnimation: 'scale',
      backgroundEffect: 'gradient',
      textGradient: true,
      glassmorphism: false,
      neonEffects: false,
      borderStyle: 'solid',
      spacing: 'normal',
      iconStyle: 'minimal',
      layoutType: 'stack',
      animationIntensity: 'medium',
    },
    socialLinks: [
      { platform: 'github', url: 'https://github.com/testuser' },
      { platform: 'twitter', url: 'https://twitter.com/testuser' },
    ],
    customLinks: [
      {
        id: '1',
        title: 'Test Link',
        url: 'https://test.com',
        clicks: 0,
      },
    ],
    analytics: {
      totalViews: 100,
      viewsChange: 10,
      totalClicks: 50,
      clicksChange: 5,
      clickThroughRate: 50,
      ctrChange: 2,
      viewsByCountry: {
        US: 50,
        UK: 30,
        CA: 20,
      },
      clicksByLink: {
        'Test Link': 50,
      },
      viewsOverTime: [
        { date: '2024-01-01', views: 10, uniqueVisitors: 8 },
        { date: '2024-01-02', views: 15, uniqueVisitors: 12 },
      ],
      deviceTypes: {
        mobile: 60,
        desktop: 30,
        tablet: 10,
      },
      browserTypes: {
        chrome: 50,
        firefox: 30,
        safari: 20,
      },
      referralSources: {
        'Direct': 40,
        'Twitter': 30,
        'GitHub': 30,
      },
      engagementMetrics: {
        averageTimeOnPage: 120,
        bounceRate: 30,
        returnVisitorRate: 40,
      },
      peakHours: {
        '9': 20,
        '14': 30,
        '18': 25,
      },
      socialShareStats: {
        twitter: 20,
        linkedin: 15,
        facebook: 10,
      },
      heatmapData: [
        { x: 0, y: 0, value: 10 },
        { x: 1, y: 1, value: 20 },
      ],
    },
  };

  describe('Template Tests', () => {
    it('renders Retro template with all features', () => {
      render(<RetroTemplate profile={mockProfile} />);
      expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
      expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
      expect(screen.getByText('SYSTEM.BIO.1337')).toBeInTheDocument();
    });

    it('renders Minimalist template with proper styling', () => {
      render(<MinimalistTemplate profile={mockProfile} />);
      const nameElement = screen.getByText(mockProfile.name);
      expect(nameElement).toHaveClass('tracking-wide');
      expect(screen.getByText(mockProfile.bio)).toHaveClass('text-sm');
    });

    it('applies custom animations based on profile settings', () => {
      render(<RetroTemplate profile={{
        ...mockProfile,
        customization: {
          ...mockProfile.customization,
          animationIntensity: 'high',
        },
      }} />);
      // Check for animation classes
      const container = screen.getByRole('main');
      expect(container).toHaveStyle({
        '--animation-duration': '0.5s',
      });
    });
  });

  describe('Analytics Tests', () => {
    it('renders all analytics sections', () => {
      render(<AdvancedAnalytics profile={mockProfile} analytics={mockProfile.analytics} />);
      expect(screen.getByText('Traffic')).toBeInTheDocument();
      expect(screen.getByText('Engagement')).toBeInTheDocument();
      expect(screen.getByText('Devices')).toBeInTheDocument();
      expect(screen.getByText('Geography')).toBeInTheDocument();
    });

    it('displays correct statistics', () => {
      render(<AdvancedAnalytics profile={mockProfile} analytics={mockProfile.analytics} />);
      expect(screen.getByText('100')).toBeInTheDocument(); // Total views
      expect(screen.getByText('50%')).toBeInTheDocument(); // CTR
    });

    it('handles date range changes', async () => {
      render(<AdvancedAnalytics profile={mockProfile} analytics={mockProfile.analytics} />);
      const dateRangePicker = screen.getByRole('button', { name: /select date range/i });
      fireEvent.click(dateRangePicker);
      // Add more date range picker interactions
    });
  });

  describe('Customization Panel Tests', () => {
    it('updates all customization options', async () => {
      const onChange = vi.fn();
      render(<CustomizationPanel options={mockProfile.customization} onChange={onChange} />);

      // Test color picker
      const colorPicker = screen.getByLabelText('Primary Color');
      fireEvent.change(colorPicker, { target: { value: '#FF0000' } });
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        primaryColor: '#FF0000',
      }));

      // Test select inputs
      const fontSelect = screen.getByLabelText('Font Family');
      fireEvent.change(fontSelect, { target: { value: 'Roboto' } });
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        fontFamily: 'Roboto',
      }));
    });

    it('validates custom CSS input', () => {
      const onChange = vi.fn();
      render(<CustomizationPanel options={mockProfile.customization} onChange={onChange} />);
      
      const cssEditor = screen.getByLabelText('Custom CSS');
      fireEvent.change(cssEditor, { target: { value: 'invalid css' } });
      expect(screen.getByText(/invalid css syntax/i)).toBeInTheDocument();
    });
  });

  describe('Cache and Rate Limiting Tests', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('caches profile data correctly', async () => {
      await cache.set('profile:testuser', mockProfile);
      expect(cache.set).toHaveBeenCalledWith(
        'profile:testuser',
        mockProfile,
        expect.any(Number)
      );
    });

    it('handles rate limiting correctly', async () => {
      const limiter = rateLimit({
        interval: 60000,
        uniqueTokenPerInterval: 500,
      });

      // Should allow first request
      await expect(limiter.check(5, 'testuser')).resolves.toBeUndefined();

      // Should block excess requests
      for (let i = 0; i < 6; i++) {
        await limiter.check(5, 'testuser');
      }
      await expect(limiter.check(5, 'testuser')).rejects.toThrow('Rate limit exceeded');
    });
  });
});
