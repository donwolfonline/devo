'use client';

import { useTheme } from 'next-themes';
import { Check, Monitor, Moon, Sun } from 'lucide-react';
import * as React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

const themes = [
  {
    name: 'Light',
    value: 'light',
    icon: Sun,
  },
  {
    name: 'Dark',
    value: 'dark',
    icon: Moon,
  },
  {
    name: 'System',
    value: 'system',
    icon: Monitor,
  },
] as const;

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background hover:bg-accent">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[150px] rounded-lg border bg-background p-1 shadow-md"
          align="end"
        >
          {themes.map(({ name, value, icon: Icon }) => (
            <DropdownMenu.Item
              key={value}
              className={`
                flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5
                text-sm outline-none transition-colors
                hover:bg-accent focus:bg-accent
                ${theme === value ? 'bg-accent' : ''}
              `}
              onClick={() => setTheme(value)}
            >
              <Icon className="h-4 w-4" />
              {name}
              {theme === value && (
                <Check className="ml-auto h-4 w-4" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
