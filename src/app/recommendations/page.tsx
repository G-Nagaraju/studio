import { RecommendationForm } from '@/components/recommendation-form';
import { BrainCircuit } from 'lucide-react';

export default function RecommendationsPage() {
  return (
    <div className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <BrainCircuit className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 font-headline text-3xl font-bold tracking-tight md:text-4xl">
            Personalized College Recommendations
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Let our AI-powered advisor help you find the perfect college based
            on your unique profile and aspirations. The more detail you
            provide, the better the recommendations.
          </p>
        </div>
        <div className="mt-12">
          <RecommendationForm />
        </div>
      </div>
    </div>
  );
}
