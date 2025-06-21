"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

interface BackButtonProps {
  href?: string;
  className?: string;
}

export function BackButton({ href, className }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      className={`gap-2 ${className || ""}`}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
} 