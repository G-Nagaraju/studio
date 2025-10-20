'use client';
import { useState, useMemo } from 'react';
import { useLocation } from '@/hooks/use-location';
import { CollegeCard } from '@/components/college-card';
import { colleges } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

export default function NearMePage() {
  const { location, loading, error, requestLocation } = useLocation();
  const [radius, setRadius] = useState(50); // Default radius in km
  const [compareList, setCompareList] = useState<number[]>([]);

  const nearbyColleges = useMemo(() => {
    if (!location) return [];
    return colleges
      .map(college => ({
        ...college,
        distance: location.distanceTo(college.location.lat, college.location.lng),
      }))
      .filter(college => college.distance <= radius)
      .sort((a, b) => a.distance - b.distance);
  }, [location, radius]);

  const handleCompareToggle = (id: number, selected: boolean) => {
    if (selected) {
      if (compareList.length < 4) {
        setCompareList(prev => [...prev, id]);
      }
    } else {
      setCompareList(prev => prev.filter(item => item !== id));
    }
  };

  const handleRadiusChange = (value: string) => {
    setRadius(parseInt(value));
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold">Colleges Near You</h1>
        <p className="mt-2 text-muted-foreground">
          Find colleges within your preferred distance.
        </p>
      </div>

      <Card className="mb-8 p-4 md:p-6">
        <div className="flex items-center justify-center gap-4">
            <p className="text-sm font-medium">Show colleges within:</p>
            <Select value={String(radius)} onValueChange={handleRadiusChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select distance" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="10">10 km</SelectItem>
                    <SelectItem value="25">25 km</SelectItem>
                    <SelectItem value="50">50 km</SelectItem>
                    <SelectItem value="100">100 km</SelectItem>
                    <SelectItem value="200">200 km</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </Card>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="mt-2 h-4 w-1/2" />
                <Skeleton className="mt-4 h-5 w-1/3" />
                </CardContent>
            </Card>
        ))}
        </div>
      )}

      {!loading && error && (
        <Card className="text-center p-12">
            <MapPin className="h-12 w-12 text-destructive mx-auto" />
            <p className="mt-4 text-lg text-muted-foreground">{error}</p>
            <Button onClick={requestLocation} className="mt-6">
            Try Again
          </Button>
        </Card>
      )}

      {!loading && !error && location && (
        <>
          {nearbyColleges.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {nearbyColleges.map(college => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  onCompareToggle={handleCompareToggle}
                  isComparing={compareList.includes(college.id)}
                  distance={college.distance}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full mt-12 text-center text-muted-foreground">
              <p>No colleges found within {radius}km. Try increasing the radius.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
