import Link from 'next/link';
import Image from 'next/image';
import {
  Button,
  buttonVariants,
} from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Search, BrainCircuit } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Genuine Information',
    description: '100% verified and up-to-date details on all colleges.',
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Easy-to-Use',
    description: 'A student-friendly platform for seamless navigation.',
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-primary" />,
    title: 'Side-by-Side Comparison',
    description: 'Compare colleges to find the perfect fit for you.',
  },
];

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');

  return (
    <div className="flex flex-col">
      <section className="relative w-full bg-primary/10 py-20 md:py-32">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 text-center md:grid-cols-2 md:text-left">
          <div className="space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Find Your Perfect College in Andhra Pradesh
            </h1>
            <p className="text-lg text-primary-foreground/80 md:text-xl">
              EduGuide AP is your one-stop platform to explore, compare, and
              choose the best engineering and degree colleges with confidence.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
              <Link
                href="/colleges"
                className={buttonVariants({
                  size: 'lg',
                  className: 'bg-accent text-accent-foreground hover:bg-accent/90',
                })}
              >
                <Search className="mr-2 h-5 w-5" />
                Explore Colleges
              </Link>
              <Link
                href="/recommendations"
                className={buttonVariants({ variant: 'secondary', size: 'lg' })}
              >
                <BrainCircuit className="mr-2 h-5 w-5" />
                Get AI Recommendations
              </Link>
            </div>
          </div>
          <div className="relative h-64 w-full md:h-96">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="rounded-lg object-cover shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Why Choose EduGuide AP?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We aim to save students time, effort, and money by giving them all
              the information they need in one trusted place.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="flex flex-col items-center text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="font-headline text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-20 md:py-24">
        <div className="container mx-auto text-center">
           <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
             Join thousands of students making smarter decisions about their future.
            </p>
            <div className="mt-8">
               <Link
                href="/colleges"
                className={buttonVariants({
                  size: 'lg',
                  className: 'bg-accent text-accent-foreground hover:bg-accent/90',
                })}
              >
                Begin Your College Search
              </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
