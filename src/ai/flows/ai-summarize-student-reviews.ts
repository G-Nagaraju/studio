'use server';
/**
 * @fileOverview Summarizes student reviews for a given college.
 *
 * - summarizeStudentReviews - A function that summarizes the student reviews.
 * - SummarizeStudentReviewsInput - The input type for the summarizeStudentReviews function.
 * - SummarizeStudentReviewsOutput - The return type for the summarizeStudentReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeStudentReviewsInputSchema = z.object({
  collegeName: z.string().describe('The name of the college to summarize reviews for.'),
  reviews: z.array(z.string()).describe('An array of student reviews for the college.'),
});
export type SummarizeStudentReviewsInput = z.infer<
  typeof SummarizeStudentReviewsInputSchema
>;

const SummarizeStudentReviewsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the student reviews, highlighting key themes and sentiment.'),
});
export type SummarizeStudentReviewsOutput = z.infer<
  typeof SummarizeStudentReviewsOutputSchema
>;

export async function summarizeStudentReviews(
  input: SummarizeStudentReviewsInput
): Promise<SummarizeStudentReviewsOutput> {
  return summarizeStudentReviewsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeStudentReviewsPrompt',
  input: {schema: SummarizeStudentReviewsInputSchema},
  output: {schema: SummarizeStudentReviewsOutputSchema},
  prompt: `You are an AI assistant helping students understand college reviews.

  Summarize the following student reviews for {{collegeName}}. Focus on the overall sentiment and key pros and cons mentioned in the reviews.

  Reviews:
  {{#each reviews}}
  - {{{this}}}
  {{/each}}
  `,
});

const summarizeStudentReviewsFlow = ai.defineFlow(
  {
    name: 'summarizeStudentReviewsFlow',
    inputSchema: SummarizeStudentReviewsInputSchema,
    outputSchema: SummarizeStudentReviewsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
