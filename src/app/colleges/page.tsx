'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { CollegeCard } from '@/components/college-card';
import { colleges, allDistricts, allCourses } from '@/lib/data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, LayoutPanelLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CollegesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [sortBy, setSortBy] = useState('rating_desc');
  const [compareList, setCompareList] = useState<number[]>([]);

  const filteredColleges = useMemo(() => {
    let filtered = colleges.filter((college) => {
      const term = searchTerm.toLowerCase();
      const nameMatch = college.name.toLowerCase().includes(term);
      const cityMatch = college.city.toLowerCase().includes(term);
      const districtMatch = college.district.toLowerCase().includes(term);
      const districtFilter =
        selectedDistrict === 'all' || college.district === selectedDistrict;
      const courseFilter =
        selectedCourse === 'all' ||
        college.courses.some((c) => c.department === selectedCourse);

      return (nameMatch || cityMatch || districtMatch) && districtFilter && courseFilter;
    });

    return filtered.sort((a, b) => {
      if (sortBy === 'rating_desc') return b.rating - a.rating;
      if (sortBy === 'rating_asc') return a.rating - b.rating;
      if (sortBy === 'name_asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name_desc') return b.name.localeCompare(a.name);
      return 0;
    });
  }, [searchTerm, selectedDistrict, selectedCourse, sortBy]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedDistrict('all');
    setSelectedCourse('all');
    setSortBy('rating_desc');
  };

  const handleCompareToggle = (id: number, selected: boolean) => {
    if (selected) {
      if(compareList.length < 4) {
        setCompareList((prev) => [...prev, id]);
      }
    } else {
      setCompareList((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleGoToCompare = () => {
    if (compareList.length > 1) {
      router.push(`/compare?ids=${compareList.join(',')}`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold">Explore Colleges</h1>
        <p className="mt-2 text-muted-foreground">
          Find, filter, and sort through all colleges in Andhra Pradesh.
        </p>
      </div>

      <Card className="mb-8 p-4 md:p-6">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <div className="relative sm:col-span-2 lg:col-span-1 xl:col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, city, or district..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by District" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Districts</SelectItem>
                {allDistricts.map((district) => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {allCourses.map((course) => (
                  <SelectItem key={course} value={course}>
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating_desc">Rating: High to Low</SelectItem>
                <SelectItem value="rating_asc">Rating: Low to High</SelectItem>
                <SelectItem value="name_asc">Name: A to Z</SelectItem>
                <SelectItem value="name_desc">Name: Z to A</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="ghost" onClick={handleClearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {compareList.length > 0 && (
        <Card className="sticky top-20 z-40 mb-6 bg-primary/90 text-primary-foreground backdrop-blur-sm">
          <CardContent className="flex items-center justify-between p-4">
            <p className="font-semibold">
              {compareList.length} college(s) selected for comparison.
            </p>
            <Button 
              onClick={handleGoToCompare}
              disabled={compareList.length < 2}
              className="bg-accent text-accent-foreground hover:bg-accent/90 disabled:bg-accent/50 disabled:cursor-not-allowed"
            >
              <LayoutPanelLeft className="mr-2 h-4 w-4" />
              Compare ({compareList.length})
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredColleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
            onCompareToggle={handleCompareToggle}
            isComparing={compareList.includes(college.id)}
          />
        ))}
      </div>
      {filteredColleges.length === 0 && (
        <div className="col-span-full mt-12 text-center text-muted-foreground">
          <p>No colleges found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
