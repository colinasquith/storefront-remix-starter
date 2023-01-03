import { strapi_api_key, strapi_url } from './constants';

export async function fetchAbsolute(url: string, ...otherParams: any) {
  if (url.startsWith('/')) {
    url = strapi_url + url;
  }

  return fetch(url, ...otherParams);
}

export async function fetchAbsoluteWithBearerToken(
  url: string,
  ...otherParams: any
) {
  // TODO: handle additional params?
  return await fetchAbsolute(url, {
    headers: {
      Authorization: `Bearer ${strapi_api_key}`,
    },
  });
}
