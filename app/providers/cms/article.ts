import { fetchAbsoluteWithBearerToken } from './helpers';

export async function getArticles() {
  const url = '/api/articles?populate=*';

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export async function getArticleBySlug(slug: string): Promise<any> {
  const url = '/api/articles?populate=*';

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  // Find the goal with the matching slug
  const articles: any = await res.json();

  // Better way to compare strings in JS
  const article = articles.data.find(
    (article: any) =>
      article.attributes.Title.toLowerCase() === slug.replace('-', ' '),
  );

  return { article: article };
}

export async function getArticlesByGoal(goalId: number): Promise<any> {
  const url = `/api/articles?populate=*&filters[goals][id][$eq]=${goalId}`;

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  // Find the goal with the matching slug
  const articles: any = await res.json();

  return { articles: articles };
}

export async function getArticlesByLevel(levelId: number): Promise<any> {
  const url = `/api/articles?populate=*&filters[ability_levels][id][$eq]=${levelId}`;

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  // Find the goal with the matching slug
  const articles: any = await res.json();

  return { articles: articles };
}

export async function getArticlesByMuscle(muscleId: number): Promise<any> {
  const url = `/api/articles?populate=*&filters[muscles][id][$eq]=${muscleId}`;

  // Fetch data from url with bearer token
  const res = await fetchAbsoluteWithBearerToken(url);

  if (!res.ok) {
    return [];
  }

  // Find the goal with the matching slug
  const articles: any = await res.json();

  return { articles: articles };
}
