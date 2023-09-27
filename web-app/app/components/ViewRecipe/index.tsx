import { Json } from 'web-app/lib/supabase';
import React from 'react';
import { Recipe } from 'web-app/app/types';

type Props = {
  recipe: Recipe;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showJsonList(json: Json) {
  if (!json) {
    return '';
  }

  return Object.entries(json).map(([key, values]) => (
    <li className="mb-4 list-none text-sm" key={key}>
      <strong>{capitalizeFirstLetter(key)}:</strong>
      <ul>
        {values.map((value: string, index: string) => (
          <li key={index}>- {value}</li>
        ))}
      </ul>
    </li>
  ));
}

function difficultyLevelColorClass(difficulty_level: string | null) {
  switch (difficulty_level) {
    case 'Easy':
      return 'text-green-500';
    case 'Intermediate':
      return 'text-yellow-500';
    case 'Hard':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
}

const ViewRecipe = ({ recipe }: Props) => {
  return (
    <div>
      <h3 className="mb-2 text-2xl font-bold text-red-500">{recipe.title}</h3>
      <p className="text-md mb-4">{recipe.description}</p>
      <p className="text-sm">
        Difficult level:{' '}
        <span className={difficultyLevelColorClass(recipe.difficulty_level)}>
          {recipe.difficulty_level}
        </span>
      </p>
      <p className="text-sm">
        Preparation time:{' '}
        <strong className="text-gray-600">{recipe.prep_time}</strong>
      </p>
      <p className="text-sm">
        Total time:{' '}
        <strong className="text-gray-600">{recipe.total_time}</strong>
      </p>
      <p className="mb-4 text-sm">
        Serves: <strong className="text-gray-600">{recipe.serves}</strong>
      </p>
      <p className="text-md mb-2 font-semibold text-red-500">Ingredients</p>
      {showJsonList(recipe.ingredients)}
      <p className="text-md mb-2 font-semibold text-red-500">Instructions</p>
      {showJsonList(recipe.instructions)}
      <p className="text-md mb-2 font-semibold text-red-500">Tips</p>
      <p className="mb-8 text-sm">{recipe.tips_and_variations}</p>
    </div>
  );
};

export default ViewRecipe;
