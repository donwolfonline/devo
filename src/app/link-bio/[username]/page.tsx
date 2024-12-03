'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { LinkBioProfile } from '@/types/link-bio';
import MinimalTemplate from '@/components/link-bio/templates/MinimalTemplate';
import GradientTemplate from '@/components/link-bio/templates/GradientTemplate';
import GlassTemplate from '@/components/link-bio/templates/GlassTemplate';
import CyberpunkTemplate from '@/components/link-bio/templates/CyberpunkTemplate';
import { useParams } from 'next/navigation';

const templateComponents = {
  minimal: MinimalTemplate,
  gradient: GradientTemplate,
  glass: GlassTemplate,
  cyberpunk: CyberpunkTemplate,
};

export default function LinkBioPage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<LinkBioProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile/${username}`);
        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
        
        // Update analytics
        await fetch(`/api/analytics/${data.id}`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    notFound();
  }

  const TemplateComponent = templateComponents[profile.template as keyof typeof templateComponents] || MinimalTemplate;

  return <TemplateComponent profile={profile} />;
}
