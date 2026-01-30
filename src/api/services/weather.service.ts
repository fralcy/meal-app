import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';

// Mock weather data
const mockWeatherData = {
  location: 'Ho Chi Minh City',
  temperature: 32,
  condition: 'Partly Cloudy',
  humidity: 75,
  windSpeed: 12,
  forecast: [
    { day: 'Mon', high: 33, low: 26, condition: 'Sunny' },
    { day: 'Tue', high: 32, low: 25, condition: 'Partly Cloudy' },
    { day: 'Wed', high: 30, low: 24, condition: 'Rain' },
    { day: 'Thu', high: 31, low: 25, condition: 'Thunderstorm' },
    { day: 'Fri', high: 32, low: 26, condition: 'Sunny' },
  ],
};

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  forecast: {
    day: string;
    high: number;
    low: number;
    condition: string;
  }[];
}

// Simulate API call delay
const fetchWeather = async (location: string): Promise<WeatherData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ...mockWeatherData, location };
};

// React Query hook for weather
export const useWeather = (location: string = 'Ho Chi Minh City') => {
  return useQuery({
    queryKey: queryKeys.weather.current(location),
    queryFn: () => fetchWeather(location),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};
