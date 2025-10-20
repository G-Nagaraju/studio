'use server';
/**
 * @fileOverview A personalized college recommendation AI agent.
 *
 * - personalizedCollegeRecommendations - A function that handles the personalized college recommendation process.
 * - PersonalizedCollegeRecommendationsInput - The input type for the personalizedCollegeRecommendations function.
 * - PersonalizedCollegeRecommendationsOutput - The return type for the personalizedCollegeRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCollegeRecommendationsInputSchema = z.object({
  academicProfile: z
    .string()
    .describe('The academic profile of the student, including grades, test scores, and subjects studied.'),
  preferences: z.string().describe('The preferences of the student, including preferred location, college type, and size.'),
  interests: z.string().describe('The interests of the student, including extracurricular activities, hobbies, and career goals.'),
});
export type PersonalizedCollegeRecommendationsInput = z.infer<
  typeof PersonalizedCollegeRecommendationsInputSchema
>;

const PersonalizedCollegeRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized college recommendations based on the student profile.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type PersonalizedCollegeRecommendationsOutput = z.infer<
  typeof PersonalizedCollegeRecommendationsOutputSchema
>;

export async function personalizedCollegeRecommendations(
  input: PersonalizedCollegeRecommendationsInput
): Promise<PersonalizedCollegeRecommendationsOutput> {
  return personalizedCollegeRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCollegeRecommendationsPrompt',
  input: {schema: PersonalizedCollegeRecommendationsInputSchema},
  output: {schema: PersonalizedCollegeRecommendationsOutputSchema},
  prompt: `You are an expert college advisor specializing in providing personalized college recommendations for students in Andhra Pradesh.

You will use the student's academic profile, preferences, and interests to generate a list of colleges that are a good fit for them.

Academic Profile: {{{academicProfile}}}
Preferences: {{{preferences}}}
Interests: {{{interests}}}

Please provide a list of college recommendations and the reasoning behind the recommendations.
`,
});

const personalizedCollegeRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCollegeRecommendationsFlow',
    inputSchema: PersonalizedCollegeRecommendationsInputSchema,
    outputSchema: PersonalizedCollegeRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
