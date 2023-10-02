import React, { Suspense } from 'react';

import { Button } from '../components/Button';
import { Database } from '@web-app/lib/supabase';
import Link from 'next/link';
import Loading from './loading';
import RecipesList from './components/List';
import { cookies } from 'next/headers';
import { supabaseServer } from '@web-app/services/server';

type Recipe = Database['public']['Tables']['recipes']['Row'];

export const revalidate = 0;

export default async function Dashboard() {
  const { data } = await supabaseServer({ cookies })
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <>
      <div className="flex w-full justify-end">
        <Link href="dashboard/new-recipe">
          <Button data-type="button">New Recipe</Button>
        </Link>
      </div>
      <Suspense fallback={<Loading />}>
        <RecipesList serverRecipes={data as Recipe[]} />
      </Suspense>
    </>
  );
}
