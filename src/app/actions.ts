'use server';

import {
  personalizedCollegeRecommendations,
  type PersonalizedCollegeRecommendationsOutput,
} from '@/ai/flows/personalized-college-recommendations';
import { z } from 'zod';

const formSchema = z.object({
  academicProfile: z
    .string()
    .min(20, 'Please provide more details about your academic profile.'),
  preferences: z
    .string()
    .min(20, 'Please provide more details about your preferences.'),
  interests: z
    .string()
    .min(20, 'Please provide more details about your interests.'),
});

export interface RecommendationFormState {
  message: string;
  recommendations?: PersonalizedCollegeRecommendationsOutput;
  errors?: {
    academicProfile?: string[];
    preferences?: string[];
    interests?: string[];
    _form?: string[];
  };
  success: boolean;
}

export async function getRecommendations(
  prevState: RecommendationFormState,
  formData: FormData
): Promise<RecommendationFormState> {
  const validatedFields = formSchema.safeParse({
    academicProfile: formData.get('academicProfile'),
    preferences: formData.get('preferences'),
    interests: formData.get('interests'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  try {
    const result = await personalizedCollegeRecommendations(validatedFields.data);
    if (!result || !result.recommendations || result.recommendations.length === 0) {
        return {
            message: 'Could not generate recommendations based on your input. Please try being more specific.',
            success: false
        }
    }
    return {
      message: 'Here are your personalized recommendations!',
      recommendations: result,
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message:
        'An error occurred while generating recommendations. Please try again later.',
      errors: {
        _form: ['The AI service is currently unavailable. Please try again.'],
      },
      success: false,
    };
  }
}
