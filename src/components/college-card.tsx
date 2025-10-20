import Image from 'next/image';
import Link from 'next/link';
import { College } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Building, Check, Pin } from 'lucide-react';

interface CollegeCardProps {
  college: College;
  onCompareToggle: (id: number, selected: boolean) => void;
  isComparing: boolean;
  distance?: number;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating)
              ? 'fill-accent text-accent'
              : 'fill-muted text-muted-foreground'
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-muted-foreground">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

export function CollegeCard({ college, onCompareToggle, isComparing, distance }: CollegeCardProps) {
  const logo = PlaceHolderImages.find((p) => p.id === college.logoUrl);
  const mainImage = PlaceHolderImages.find((p) => p.id === college.images[0]);

  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/colleges/${college.id}`}>
          <div className="relative h-48 w-full">
            {mainImage ? (
              <Image
                src={mainImage.imageUrl}
                alt={college.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={mainImage.imageHint}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <Building className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            {distance !== undefined && (
                 <Badge variant="default" className="absolute top-2 right-2 flex items-center gap-1">
                    <Pin className="h-3 w-3" />
                    {distance.toFixed(1)} km away
                </Badge>
            )}
            <div className="absolute bottom-2 left-2">
                {logo && 
                    <div className="relative h-16 w-16 overflow-hidden rounded-lg border-2 border-background bg-background shadow-md">
                        <Image src={logo.imageUrl} alt={`${college.name} logo`} fill className="object-contain p-1" data-ai-hint={logo.imageHint} />
                    </div>
                }
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
           <CardTitle className="mb-2 text-lg font-bold leading-tight">
                <Link href={`/colleges/${college.id}`} className="hover:text-primary">
                    {college.name}
                </Link>
            </CardTitle>
        </div>
        
        <div className="mb-3 flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-1.5 h-4 w-4" />
          <span>
            {college.city}, {college.district}
          </span>
        </div>

        <div className="mb-4">
          <StarRating rating={college.rating} />
        </div>
        
        <div className="mb-4 flex flex-wrap gap-2">
            {college.facilities.slice(0, 3).map(facility => (
                <Badge key={facility} variant="secondary">{facility}</Badge>
            ))}
            {college.facilities.length > 3 && (
                <Badge variant="outline">+{college.facilities.length - 3} more</Badge>
            )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <Link href={`/colleges/${college.id}`} className="flex-grow">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
          <Button 
            variant={isComparing ? "default" : "secondary"} 
            onClick={() => onCompareToggle(college.id, !isComparing)}
            className="w-full flex-grow"
          >
            {isComparing && <Check className="mr-2 h-4 w-4" />}
            {isComparing ? 'Selected' : 'Compare'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
