import { search, searchFacetValues } from '~/providers/products/products';
import { sdk } from '~/graphqlWrapper';

/**
 * This loader deals with loading product searches, which is used in both the search page and the
 * category list page.
 */
export async function filteredSearchLoaderCustom({
  slug,
  term,
  facetValueIds,
  request,
}: {
  slug: string;
  term: string;
  facetValueIds: string[];
  request: Request;
}) {
  const collectionSlug = slug;

  let resultPromises: [
    ReturnType<typeof search>,
    ReturnType<typeof searchFacetValues>,
  ];
  const searchResultPromise = search(
    {
      input: {
        groupByProduct: true,
        term,
        facetValueIds,
        collectionSlug: slug,
      },
    },
    { request },
  );
  if (facetValueIds.length) {
    resultPromises = [
      searchResultPromise,
      searchFacetValues(
        {
          input: {
            groupByProduct: true,
            term,
            collectionSlug: slug,
          },
        },
        { request },
      ),
    ];
  } else {
    resultPromises = [searchResultPromise, searchResultPromise];
  }
  const [result, resultWithoutFacetValueFilters] = await Promise.all(
    resultPromises,
  );
  return {
    term,
    facetValueIds,
    result: result.search,
    resultWithoutFacetValueFilters: resultWithoutFacetValueFilters.search,
  };
}
