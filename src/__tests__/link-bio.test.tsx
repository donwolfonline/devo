import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Session } from 'next-auth';
import ImageUpload from '@/components/link-bio/ImageUpload';
import MinimalTemplate from '@/components/link-bio/templates/MinimalTemplate';
import GradientTemplate from '@/components/link-bio/templates/GradientTemplate';
import GlassTemplate from '@/components/link-bio/templates/GlassTemplate';
import CyberpunkTemplate from '@/components/link-bio/templates/CyberpunkTemplate';

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

describe('Link in Bio Components', () => {
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
      totalViews: 0,
      linkClicks: {},
    },
  };

  describe('ImageUpload', () => {
    it('renders upload area correctly', () => {
      render(<ImageUpload onUpload={() => {}} />);
      expect(screen.getByText(/drag & drop/i)).toBeInTheDocument();
    });

    it('handles file upload', async () => {
      const onUpload = vi.fn();
      render(<ImageUpload onUpload={onUpload} />);

      const file = new File(['test'], 'test.png', { type: 'image/png' });
      const input = screen.getByRole('button');

      await waitFor(() => {
        fireEvent.drop(input, {
          dataTransfer: {
            files: [file],
          },
        });
      });

      expect(onUpload).toHaveBeenCalled();
    });
  });

  describe('Templates', () => {
    it('renders Minimal template correctly', () => {
      render(<MinimalTemplate profile={mockProfile} />);
      expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
      expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
    });

    it('renders Gradient template correctly', () => {
      render(<GradientTemplate profile={mockProfile} />);
      expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
      expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
    });

    it('renders Glass template correctly', () => {
      render(<GlassTemplate profile={mockProfile} />);
      expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
      expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
    });

    it('renders Cyberpunk template correctly', () => {
      render(<CyberpunkTemplate profile={mockProfile} />);
      expect(screen.getByText(mockProfile.name)).toBeInTheDocument();
      expect(screen.getByText(mockProfile.bio)).toBeInTheDocument();
    });

    it('renders social links correctly', () => {
      render(<MinimalTemplate profile={mockProfile} />);
      mockProfile.socialLinks.forEach(link => {
        const socialLink = screen.getByRole('link', { name: new RegExp(link.platform, 'i') });
        expect(socialLink).toHaveAttribute('href', link.url);
      });
    });

    it('renders custom links correctly', () => {
      render(<MinimalTemplate profile={mockProfile} />);
      mockProfile.customLinks.forEach(link => {
        const customLink = screen.getByRole('link', { name: new RegExp(link.title, 'i') });
        expect(customLink).toHaveAttribute('href', link.url);
      });
    });
  });
});
