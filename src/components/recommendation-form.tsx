'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getRecommendations, type RecommendationFormState } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { BrainCircuit, Loader, Send } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export function RecommendationForm() {
  const initialState: RecommendationFormState = {
    message: '',
    success: false,
  };
  const [state, formAction] = useFormState(getRecommendations, initialState);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle className="font-headline">Your Profile</CardTitle>
            <CardDescription>
              Tell us about yourself so our AI can find the perfect colleges for
              you.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="academicProfile">Academic Profile</Label>
              <Textarea
                id="academicProfile"
                name="academicProfile"
                placeholder="e.g., Intermediate (MPC), 95% GPA, 15000 EAMCET rank..."
                rows={4}
                required
              />
              {state.errors?.academicProfile && (
                <p className="text-sm text-destructive">
                  {state.errors.academicProfile.join(', ')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="preferences">College Preferences</Label>
              <Textarea
                id="preferences"
                name="preferences"
                placeholder="e.g., Prefer large university in Visakhapatnam, looking for good hostel facilities and a coding culture..."
                rows={4}
                required
              />
              {state.errors?.preferences && (
                <p className="text-sm text-destructive">
                  {state.errors.preferences.join(', ')}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Interests & Career Goals</Label>
              <Textarea
                id="interests"
                name="interests"
                placeholder="e.g., Passionate about AI and machine learning, enjoy hackathons. Aiming for a software engineering role at a top tech company."
                rows={4}
                required
              />
              {state.errors?.interests && (
                <p className="text-sm text-destructive">
                  {state.errors.interests.join(', ')}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <SubmitButton />
            {state.errors?._form && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{state.errors._form.join(', ')}</AlertDescription>
              </Alert>
            )}
             {!state.success && state.message && !state.errors &&(
                 <Alert variant="destructive">
                    <AlertTitle>No Results</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                 </Alert>
            )}
          </CardFooter>
        </form>
      </Card>
      <div className="space-y-4">
        <h2 className="font-headline text-2xl font-bold">
          AI Recommendations
        </h2>
        {state.success && state.recommendations ? (
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="text-primary" />
                <span>Your Personalized List</span>
              </CardTitle>
              <CardDescription>{state.message}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-bold">Recommended Colleges:</h3>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {state.recommendations.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Reasoning:</h3>
                <p className="mt-2 text-sm">{state.recommendations.reasoning}</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="flex h-full min-h-[400px] items-center justify-center">
            <div className="text-center text-muted-foreground">
              <BrainCircuit className="mx-auto h-12 w-12" />
              <p className="mt-4">
                Your recommended colleges will appear here.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
