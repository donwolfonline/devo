'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { OpenAI } from 'openai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Wand2,
  Palette,
  Sparkles,
  RefreshCcw,
  Check,
  X,
} from 'lucide-react';
import { LinkBioProfile } from '@/types/link-bio';

interface AIThemeGeneratorProps {
  profile: LinkBioProfile;
  onUpdate: (updates: Partial<LinkBioProfile['customization']>) => void;
}

interface GeneratedTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string[];
  };
  typography: {
    fontFamily: string;
    headingSize: string;
    bodySize: string;
    lineHeight: string;
  };
  effects: {
    buttonStyle: string;
    animations: string;
    backgroundEffect: string;
    specialEffects: string[];
  };
  spacing: {
    layout: string;
    padding: string;
    gap: string;
  };
}

export default function AIThemeGenerator({
  profile,
  onUpdate,
}: AIThemeGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [themes, setThemes] = useState<GeneratedTheme[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<GeneratedTheme | null>(null);
  const [creativity, setCreativity] = useState(0.7);
  const [error, setError] = useState('');

  const generateThemes = async () => {
    try {
      setGenerating(true);
      setError('');

      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      });

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an expert UI/UX designer. Generate unique and creative themes for a Link in Bio profile.
                     Consider color theory, typography, spacing, and modern design trends.
                     The theme should be cohesive and align with the user's brand and preferences.`
          },
          {
            role: "user",
            content: `Generate 3 unique themes based on this description: ${prompt}
                     Current profile style:
                     - Primary Color: ${profile.customization.primaryColor}
                     - Font: ${profile.customization.fontFamily}
                     - Style: ${profile.customization.buttonStyle}
                     
                     Return the themes in a structured format that includes:
                     1. Color scheme (primary, secondary, background, text, accents)
                     2. Typography (font family, sizes, line heights)
                     3. Effects (animations, backgrounds, special effects)
                     4. Spacing and layout`
          }
        ],
        temperature: creativity,
      });

      const generatedThemes = parseThemes(completion.choices[0].message.content);
      setThemes(generatedThemes);
    } catch (err) {
      setError('Failed to generate themes. Please try again.');
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  const parseThemes = (response: string): GeneratedTheme[] => {
    // Implementation of theme parsing from AI response
    // This would convert the AI's text response into structured theme objects
    return [];
  };

  const applyTheme = (theme: GeneratedTheme) => {
    onUpdate({
      primaryColor: theme.colors.primary,
      secondaryColor: theme.colors.secondary,
      backgroundColor: theme.colors.background,
      fontFamily: theme.typography.fontFamily,
      buttonStyle: theme.effects.buttonStyle as any,
      layoutType: theme.spacing.layout as any,
      backgroundEffect: theme.effects.backgroundEffect as any,
      // Apply other theme properties
    });
    setSelectedTheme(theme);
  };

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Wand2 className="w-5 h-5" />
          AI Theme Generator
        </h3>
        
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your desired theme (e.g., 'Modern and minimalist with a touch of neon, inspired by cyberpunk aesthetics')"
          className="h-24"
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Creativity Level</label>
          <Slider
            value={[creativity * 100]}
            min={0}
            max={100}
            step={10}
            onValueChange={(value) => setCreativity(value[0] / 100)}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Conservative</span>
            <span>Experimental</span>
          </div>
        </div>

        <Button
          onClick={generateThemes}
          disabled={generating || !prompt}
          className="w-full"
        >
          {generating ? (
            <RefreshCcw className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Sparkles className="w-4 h-4 mr-2" />
          )}
          Generate Themes
        </Button>

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
      </div>

      {themes.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium">Generated Themes</h4>
          <div className="grid gap-4">
            {themes.map((theme, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 border rounded-lg cursor-pointer transition-all
                           ${selectedTheme === theme ? 'border-primary ring-2 ring-primary/20' : 'hover:border-gray-400'}
                `}
                onClick={() => applyTheme(theme)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h5 className="font-medium">Theme {index + 1}</h5>
                  {selectedTheme === theme ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => applyTheme(theme)}
                    >
                      <Palette className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Color Preview */}
                  <div className="flex gap-2">
                    {[
                      theme.colors.primary,
                      theme.colors.secondary,
                      theme.colors.background,
                      theme.colors.text,
                      ...theme.colors.accent
                    ].map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Typography Preview */}
                  <div className="space-y-1">
                    <p style={{ fontFamily: theme.typography.fontFamily }}
                       className="text-sm truncate">
                      {theme.typography.fontFamily}
                    </p>
                  </div>

                  {/* Effects Preview */}
                  <div className="flex flex-wrap gap-2">
                    {theme.effects.specialEffects.map((effect, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                      >
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
