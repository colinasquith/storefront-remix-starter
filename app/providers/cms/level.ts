import { fetchAbsoluteWithBearerToken } from './helpers';

export async function getLevels() {
  const url = '/api/ability-levels';

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function getLevelBySlug(slug: string): Promise<any> {
  const url = '/api/ability-levels';

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  // Find the goal with the matching slug
  const levels: any = await res.json();

  // Better way to compare strings in JS
  const level = levels.data.find(
    (level: any) =>
      level.attributes.Name.toLowerCase() === slug.replace('-', ' '),
  );

  return { level: level };
}
