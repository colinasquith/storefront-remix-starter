import { fetchAbsoluteWithBearerToken } from './helpers';

export async function getGoals() {
  //?populate=* fills in the image meta data
  const url = '/api/goals?populate=*';

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function getGoalBySlug(slug: string): Promise<any> {
  const url = '/api/goals?populate=*';

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  // Find the goal with the matching slug
  const goals: any = await res.json();

  // Better way to compare strings in JS
  const goal = goals.data.find(
    (goal: any) =>
      goal.attributes.Name.toLowerCase() === slug.replace('-', ' '),
  );

  return { goal: goal };
}
