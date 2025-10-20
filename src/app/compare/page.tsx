'use client';

import { useSearchParams } from 'next/navigation';
import { colleges } from '@/lib/data';
import { College } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Check, X } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids')?.split(',').map(Number) || [];
  const selectedColleges = colleges.filter((c) => ids.includes(c.id));

  if (selectedColleges.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="font-headline text-3xl font-bold">Compare Colleges</h1>
        <p className="mt-4 text-muted-foreground">
          You haven't selected any colleges to compare.
        </p>
        <Link
          href="/colleges"
          className={cn(buttonVariants({ variant: 'default' }), 'mt-6')}
        >
          Select Colleges to Compare
        </Link>
      </div>
    );
  }

  const allFacilities = Array.from(new Set(selectedColleges.flatMap(c => c.facilities)));

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold">College Comparison</h1>
        <p className="mt-2 text-muted-foreground">
          Compare your selected colleges side-by-side.
        </p>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-1/5 font-semibold text-foreground">Feature</TableHead>
                  {selectedColleges.map((college) => {
                    const logo = PlaceHolderImages.find(p => p.id === college.logoUrl);
                    return (
                        <TableHead key={college.id} className="text-center">
                            <div className="flex flex-col items-center gap-2">
                                {logo && (
                                    <div className="relative h-12 w-12">
                                        <Image src={logo.imageUrl} alt={college.name} fill className="object-contain" data-ai-hint={logo.imageHint} />
                                    </div>
                                )}
                                <Link href={`/colleges/${college.id}`} className="font-semibold text-primary hover:underline">{college.name}</Link>
                            </div>
                        </TableHead>
                    )
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Rating</TableCell>
                  {selectedColleges.map((college) => (
                    <TableCell key={college.id} className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span>{college.rating.toFixed(1)}</span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Location</TableCell>
                  {selectedColleges.map((college) => (
                    <TableCell key={college.id} className="text-center">
                      {college.city}, {college.district}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Courses</TableCell>
                  {selectedColleges.map((college) => (
                    <TableCell key={college.id} className="text-center">
                      {college.courses.length} available
                    </TableCell>
                  ))}
                </TableRow>
                 <TableRow>
                  <TableCell className="font-medium">Hostel</TableCell>
                  {selectedColleges.map((college) => (
                    <TableCell key={college.id} className="text-center">
                       {college.hostelInfo ? <Check className="mx-auto h-5 w-5 text-green-500" /> : <X className="mx-auto h-5 w-5 text-destructive" />}
                    </TableCell>
                  ))}
                </TableRow>
                {allFacilities.map(facility => (
                    <TableRow key={facility}>
                        <TableCell className="font-medium">{facility}</TableCell>
                        {selectedColleges.map(college => (
                            <TableCell key={college.id} className="text-center">
                                {college.facilities.includes(facility) ? 
                                    <Check className="mx-auto h-5 w-5 text-green-500" /> : 
                                    <X className="mx-auto h-5 w-5 text-destructive" />}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
