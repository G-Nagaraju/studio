
'use client';
import { useState, useEffect } from 'react';
import { getDistance } from '@/lib/utils';

interface Location {
  latitude: number;
  longitude: number;
  distanceTo: (lat: number, lng: number) => number;
}

export const useLocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({
          latitude,
          longitude,
          distanceTo: (lat, lng) => getDistance(latitude, longitude, lat, lng),
        });
        setLoading(false);
      },
      (err) => {
        setError('Location access was denied. Please enable it in your browser settings to see nearby colleges.');
        setLoading(false);
      }
    );
  };
  
  useEffect(() => {
    requestLocation();
  }, []);

  return { location, loading, error, requestLocation };
};
