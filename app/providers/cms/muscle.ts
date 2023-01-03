import { fetchAbsoluteWithBearerToken } from './helpers';

export async function getMuscles() {
  const url = '/api/muscles';

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function getMuscleBySlug(slug: string): Promise<any> {
  const url = '/api/muscles';

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  // Find the goal with the matching slug
  const muscles: any = await res.json();

  // Better way to compare strings in JS
  const muscle = muscles.data.find(
    (muscle: any) =>
      muscle.attributes.Name.toLowerCase() === slug.replace('-', ' '),
  );

  console.log('FOUND MUSC:', muscle);

  return { muscle: muscle };
}
