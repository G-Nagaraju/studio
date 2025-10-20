'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  GraduationCap,
  Menu,
  University,
  Search,
  Users,
  BrainCircuit,
  LayoutPanelLeft,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

const navLinks = [
  {
    href: '/',
    label: 'Home',
    icon: University,
  },
  {
    href: '/colleges',
    label: 'Colleges',
    icon: Search,
  },
  {
    href: '/compare',
    label: 'Compare',
    icon: LayoutPanelLeft,
  },
  {
    href: '/recommendations',
    label: 'AI Advisor',
    icon: BrainCircuit,
  },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
          <GraduationCap className="h-7 w-7 text-primary" />
          <span>EduGuide AP</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col p-6">
                  <Link href="/" className="mb-8 flex items-center gap-2 font-headline text-lg font-bold">
                    <GraduationCap className="h-7 w-7 text-primary" />
                    <span>EduGuide AP</span>
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <SheetClose asChild key={link.href}>
                        <Link
                          href={link.href}
                          className={cn(
                            buttonVariants({ variant: 'ghost' }),
                            'justify-start gap-3 text-base',
                            pathname === link.href
                              ? 'bg-accent text-accent-foreground'
                              : ''
                          )}
                        >
                          <link.icon className="h-5 w-5 text-muted-foreground" />
                          {link.label}
                        </Link>
                      </SheetClose>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <Link
            href="/colleges"
            className={cn(
              buttonVariants({
                className:
                  'hidden sm:flex bg-accent text-accent-foreground hover:bg-accent/90',
              })
            )}
          >
            Find a College
          </Link>
        </div>
      </div>
    </header>
  );
}
