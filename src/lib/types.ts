export interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Course {
  id: string;
  name: string;
  department: string;
}

export interface College {
  id: number;
  name: string;
  city: string;
  district: string;
  description: string;
  courses: Course[];
  facilities: string[];
  hostelInfo: string;
  admissionCutoff: string;
  rating: number;
  reviews: Review[];
  images: string[];
  logoUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  mapImage: string;
}
