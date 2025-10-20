'use client';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { colleges } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import {
  Star,
  MapPin,
  Building,
  GraduationCap,
  BookOpen,
  ClipboardList,
  Sparkles,
  MessageSquare,
  Bot,
} from 'lucide-react';
import { summarizeStudentReviews } from '@/ai/flows/ai-summarize-student-reviews';
import { useEffect, useState } from 'react';

const StarRating = ({ rating, count }: { rating: number; count: number }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < Math.floor(rating)
                ? 'fill-accent text-accent'
                : 'fill-muted text-muted-foreground/50'
            }`}
          />
        ))}
      </div>
      <span className="font-bold text-xl">{rating.toFixed(1)}</span>
      <span className="text-sm text-muted-foreground">({count} reviews)</span>
    </div>
  );
};

const ReviewSummary = ({ collegeName, reviews }: { collegeName: string; reviews: string[] }) => {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSummary() {
      try {
        setLoading(true);
        const result = await summarizeStudentReviews({ collegeName, reviews });
        setSummary(result.summary);
      } catch (error) {
        console.error('Error summarizing reviews:', error);
        setSummary('Could not generate a summary at this time.');
      } finally {
        setLoading(false);
      }
    }
    if (reviews.length > 0) {
      getSummary();
    } else {
        setLoading(false);
        setSummary('There are no reviews to summarize yet.');
    }
  }, [collegeName, reviews]);

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="text-primary" />
          AI Review Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <p className="h-4 w-full animate-pulse rounded-md bg-muted"></p>
            <p className="h-4 w-3/4 animate-pulse rounded-md bg-muted"></p>
            <p className="h-4 w-5/6 animate-pulse rounded-md bg-muted"></p>
          </div>
        ) : (
          <p className="text-sm text-foreground/90">{summary}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default function CollegeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const college = colleges.find((c) => c.id === parseInt(params.id));

  if (!college) {
    notFound();
  }

  const logo = PlaceHolderImages.find((p) => p.id === college.logoUrl);
  const mapImage = PlaceHolderImages.find((p) => p.id === college.mapImage);
  const galleryImages = college.images.map((id) =>
    PlaceHolderImages.find((p) => p.id === id)
  );
  
  const reviewComments = college.reviews.map(r => r.comment);

  return (
    <div className="bg-background">
      <div className="container mx-auto py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <Carousel className="w-full">
                  <CarouselContent>
                    {galleryImages.map(
                      (img, index) =>
                        img && (
                          <CarouselItem key={index}>
                            <div className="relative h-64 w-full md:h-96">
                              <Image
                                src={img.imageUrl}
                                alt={`${college.name} campus image ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="100vw"
                                data-ai-hint={img.imageHint}
                              />
                            </div>
                          </CarouselItem>
                        )
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="left-4" />
                  <CarouselNext className="right-4" />
                </Carousel>
              </CardContent>
            </Card>

            <div className="mt-8 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen /> About {college.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{college.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <GraduationCap /> Courses Offered
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {college.courses.map((course) => (
                    <div key={course.id} className="rounded-md border p-3">
                      <p className="font-semibold">{course.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.department}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MessageSquare /> Student Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ReviewSummary collegeName={college.name} reviews={reviewComments} />
                  {college.reviews.map((review) => (
                    <div key={review.id} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p className="font-semibold">{review.author}</p>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'fill-muted text-muted-foreground/50'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            "{review.comment}"
                        </p>
                        <p className="text-xs text-muted-foreground/80 text-right">{new Date(review.date).toLocaleDateString()}</p>
                        <Separator className="mt-4" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                {logo && (
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border bg-background p-1 shadow-sm">
                    <Image
                      src={logo.imageUrl}
                      alt={`${college.name} logo`}
                      fill
                      className="object-contain"
                      sizes="64px"
                      data-ai-hint={logo.imageHint}
                    />
                  </div>
                )}
                <div>
                  <CardTitle className="font-headline text-2xl">
                    {college.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {college.city},{' '}
                    {college.district}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <StarRating rating={college.rating} count={college.reviews.length} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Sparkles /> Facilities
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {college.facilities.map((facility) => (
                  <Badge key={facility} variant="secondary">
                    {facility}
                  </Badge>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Building /> Hostel Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {college.hostelInfo}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ClipboardList /> Admission Cutoff
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {college.admissionCutoff}
                </p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MapPin /> Location
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                 {mapImage && (
                    <div className="relative h-48 w-full">
                        <Image src={mapImage.imageUrl} alt={`Map of ${college.name}`} fill className="object-cover" data-ai-hint={mapImage.imageHint} />
                    </div>
                 )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
