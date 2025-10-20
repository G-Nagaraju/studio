import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-headline text-lg font-bold">
              <GraduationCap className="h-7 w-7 text-primary" />
              <span>EduGuide AP</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted guide to finding the best colleges in Andhra Pradesh.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link href="/colleges" className="text-muted-foreground hover:text-primary">Colleges</Link></li>
              <li><Link href="/compare" className="text-muted-foreground hover:text-primary">Compare</Link></li>
              <li><Link href="/recommendations" className="text-muted-foreground hover:text-primary">AI Advisor</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">About Us</h4>
            <ul className="space-y-1 text-sm">
              <li><p className="text-muted-foreground">Our Mission</p></li>
              <li><p className="text-muted-foreground">Why Choose Us?</p></li>
              <li><p className="text-muted-foreground">Contact</p></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-headline font-semibold">Contact</h4>
            <p className="text-sm text-muted-foreground">
              Email: support@eduguideap.in
            </p>
            <p className="text-sm text-muted-foreground">
              Andhra Pradesh, India
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EduGuide AP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
