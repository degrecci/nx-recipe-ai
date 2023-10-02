import { Recipe } from '@web-app/app/types';
import { useState } from 'react';
import { useTrackAttempts } from './use-track-attempts';

interface RecipeGeneratorHook {
  isLoading: boolean;
  recipe?: Recipe;
  generateRecipe: (text: string) => Promise<Recipe | null> | Error;
  cleanRecipe: () => void;
  error?: Error;
}

const useRecipeGenerator = (): RecipeGeneratorHook => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [recipe, setRecipe] = useState<Recipe>();
  const cleanRecipe = () => setRecipe(undefined);
  const { trackAttempt } = useTrackAttempts();

  const generateRecipe = async (text: string) => {
    setIsLoading(true);

    const prompt = `
      Generate a ${text} recipe as a JSON object with the following fields:
      - description: string or null
      - difficulty_level: string or null
      - ingredients: object with string arrays as values or null
      - instructions: object with string arrays as values or null
      - prep_time: number or null
      - serves: number or null
      - tips_and_variations: string or null
      - title: string
      - total_time: number or null
    `;

    try {
      const { error } = await trackAttempt();

      if (error) {
        setError(error);
        return error;
      }

      const response = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPEN_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
          }),
        }
      );

      const data = await response.json();
      const recipe = JSON.parse(
        data.choices[0].message.content.trim()
      ) as Recipe;
      setRecipe(recipe);
      return null;
    } catch (err) {
      console.error('Error generating recipe:', err);
      setError(err as Error);
      return err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, recipe, generateRecipe, cleanRecipe };
};

export default useRecipeGenerator;
