'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    async function loadTheme() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (data.theme) {
          setTheme(data.theme);
        }
      } catch (error) {
        console.error('Failed to fetch theme from settings:', error);
      } finally {
        setMounted(true);
      }
    }

    loadTheme();
  }, [setTheme]);

  const handleToggle = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: newTheme }),
      });
    } catch (error) {
      console.error('Failed to update theme in settings:', error);
    }
  };

  if (!mounted) return null;

  return (
    <Button variant="ghost" className="h-8 w-8 px-0" onClick={handleToggle}>
      {theme === 'dark' ? (
        <SunIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <MoonIcon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
