'use client';

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { SettingsIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { useTheme } from "next-themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [loadedTheme, setLoadedTheme] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadThemeFromSettings() {
      try {
        const res = await fetch("/api/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data = await res.json();
        if (data.theme && (data.theme === "light" || data.theme === "dark")) {
          setTheme(data.theme);
          setLoadedTheme(data.theme);
        } else {
          setLoadedTheme(theme === "dark" ? "dark" : "light");
        }
      } catch (error) {
        console.error("Failed to fetch theme from settings:", error);
        setLoadedTheme(theme === "dark" ? "dark" : "light");
      } finally {
        setMounted(true);
      }
    }

    loadThemeFromSettings();
  }, [setTheme, theme]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-between px-6 py-4 border-b-[0.4px]">
        <h1>Outlier</h1>
        <div className="flex space-x-2 items-center">
          <ModeToggle />
          <Button asChild>
            <Link href="/">
              <HomeIcon />
              <span className="hidden md:flex">Home</span>
            </Link>
          </Button>
          <Button disabled>
            <SettingsIcon />
            <span className="hidden md:flex">Settings</span>
          </Button>
        </div>
      </div>
    );
  }

  const currentTheme = loadedTheme || (theme === "dark" ? "dark" : "light");

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b-[0.4px]">
      <h1>Outlier</h1>
      <div className="flex space-x-2 items-center">
        <ModeToggle />
        <Button asChild>
          <Link href="/">
            <HomeIcon />
            <span className="hidden md:flex">Home</span>
          </Link>
        </Button>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant={"outline"}>
                <SettingsIcon />
                <span className="hidden md:flex">Settings</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] space-y-6">
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>
                  Customize your preferences below.
                </DialogDescription>
              </DialogHeader>
              <section>
                <h2 className="text-lg font-semibold">Theme</h2>
                <p className="mb-3 text-sm text-muted-foreground">
                  Choose your preferred color scheme.
                </p>
                <RadioGroup
                  value={currentTheme}
                  onValueChange={async (value) => {
                    setTheme(value);
                    setLoadedTheme(value);
                    try {
                      await fetch("/api/settings", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ theme: value }),
                      });
                    } catch (error) {
                      console.error(
                        "Failed to update theme in settings:",
                        error
                      );
                    }
                  }}
                  aria-label="Theme selection"
                >
                  <div className="flex space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <label htmlFor="light">Light</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <label htmlFor="dark">Dark</label>
                    </div>
                  </div>
                </RadioGroup>
              </section>
              <section>
                <h2 className="text-lg font-semibold">Language</h2>
                <p className="mb-3 text-sm text-muted-foreground">
                  Select your preferred language. (Coming soon)
                </p>
                <Select disabled defaultValue="en">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </section>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </div>
  );
}
