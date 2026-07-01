import Link from 'next/link';

import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-border/50 bg-card/30 mt-24 w-full border-t backdrop-blur-md max-sm:pb-4">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Ліва частина: Лого і копірайт */}
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <span className="text-foreground font-bold tracking-tight">NextOne</span>
            <p className="text-muted-foreground text-xs">&copy; {2026} All rights reserved.</p>
          </div>

          {/* Центральна частина: Твій бренд */}
          <div className="text-muted-foreground text-center text-sm">
            Designed & Engineered by{' '}
            <span className="text-foreground font-medium transition-colors hover:text-emerald-500">
              Mark Studzinskyi
            </span>
          </div>

          {/* Права частина: Соціалки */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/StudzinskyiMark"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/mark-studzinskyi/"
              target="_blank"
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="size-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <a
              href="mailto:mark.studzinskiy@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="size-4" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
