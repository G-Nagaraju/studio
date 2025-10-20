import { College } from './types';

export const colleges: College[] = [
  {
    id: 1,
    name: 'Andhra University College of Engineering',
    city: 'Visakhapatnam',
    district: 'Visakhapatnam',
    description:
      'A premier institution for engineering education in Andhra Pradesh, known for its strong faculty and research facilities. It has a sprawling campus with a vibrant student life.',
    courses: [
      { id: 'cse', name: 'Computer Science and Engineering', department: 'Engineering' },
      { id: 'ece', name: 'Electronics and Communication Engineering', department: 'Engineering' },
      { id: 'mech', name: 'Mechanical Engineering', department: 'Engineering' },
      { id: 'civil', name: 'Civil Engineering', department: 'Engineering' },
    ],
    facilities: ['Library', 'Wi-Fi Campus', 'Sports Complex', 'Auditorium', 'Labs'],
    hostelInfo: 'Separate hostels for boys and girls with mess facilities. Capacity of 2000+ students.',
    admissionCutoff: 'Based on AP EAMCET rank. Top 5000 rank required for CSE.',
    rating: 4.5,
    reviews: [
      { id: 1, author: 'Ravi Kumar', rating: 5, comment: 'Excellent faculty and campus life. Placements are great for CSE.', date: '2023-05-10' },
      { id: 2, author: 'Priya Sharma', rating: 4, comment: 'Good infrastructure, but the hostel food could be better.', date: '2023-04-22' },
    ],
    images: ['college-campus-1', 'college-campus-2', 'college-campus-5'],
    logoUrl: 'college-logo-1',
    location: { lat: 17.729, lng: 83.322 },
    mapImage: 'map-placeholder-1',
  },
  {
    id: 2,
    name: 'Gitam University, Vizag',
    city: 'Visakhapatnam',
    district: 'Visakhapatnam',
    description:
      'A leading private university with a focus on technology and management. It offers a wide range of undergraduate and postgraduate programs.',
    courses: [
      { id: 'cse', name: 'Computer Science and Engineering', department: 'Engineering' },
      { id: 'it', name: 'Information Technology', department: 'Engineering' },
      { id: 'bba', name: 'Bachelor of Business Administration', department: 'Management' },
      { id: 'bcom', name: 'Bachelor of Commerce', department: 'Commerce' },
    ],
    facilities: ['Modern Library', 'AC Classrooms', 'Swimming Pool', 'Gym', 'Cafeteria'],
    hostelInfo: 'Well-maintained hostels with single and double occupancy rooms available.',
    admissionCutoff: 'Admission through GAT (GITAM Admission Test).',
    rating: 4.2,
    reviews: [
      { id: 1, author: 'Arjun Reddy', rating: 4, comment: 'Great campus and facilities. The curriculum is very modern.', date: '2023-06-15' },
      { id: 2, author: 'Sneha Rao', rating: 5, comment: 'I loved my time at GITAM. The faculty is very supportive.', date: '2023-03-18' },
    ],
    images: ['college-campus-3', 'college-campus-4'],
    logoUrl: 'college-logo-2',
    location: { lat: 17.781, lng: 83.379 },
    mapImage: 'map-placeholder-2',
  },
  {
    id: 3,
    name: 'Sri Venkateswara University College of Engineering',
    city: 'Tirupati',
    district: 'Chittoor',
    description:
      'Established in 1959, SVUCE is one of the oldest and most respected engineering colleges in the state. It is located in the temple town of Tirupati.',
    courses: [
      { id: 'cse', name: 'Computer Science and Engineering', department: 'Engineering' },
      { id: 'eee', name: 'Electrical and Electronics Engineering', department: 'Engineering' },
      { id: 'mech', name: 'Mechanical Engineering', department: 'Engineering' },
      { id: 'bsc', name: 'Bachelor of Science (Physics)', department: 'Science' },
    ],
    facilities: ['Central Library', 'Computer Center', 'Workshops', 'Medical Center'],
    hostelInfo: 'Comprehensive hostel facilities for all students.',
    admissionCutoff: 'Admission through AP EAMCET rank.',
    rating: 4.3,
    reviews: [
      { id: 1, author: 'Karthik N', rating: 4, comment: 'Good college with a lot of history. Faculty is experienced.', date: '2023-02-01' },
      { id: 2, author: 'Lakshmi P', rating: 5, comment: 'Peaceful campus environment. Good for focused studies.', date: '2023-01-25' },
    ],
    images: ['college-campus-1', 'college-campus-4', 'college-campus-5'],
    logoUrl: 'college-logo-3',
    location: { lat: 13.633, lng: 79.419 },
    mapImage: 'map-placeholder-3',
  },
];

export const allCourses = Array.from(new Set(colleges.flatMap(c => c.courses.map(course => course.department)))).sort();
export const allDistricts = Array.from(new Set(colleges.map(c => c.district))).sort();
