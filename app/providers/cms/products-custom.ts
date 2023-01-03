import { filteredSearchLoaderCustom } from '~/utils/filtered-search-loader-custom';

export async function getProductsForGoal(goal: any, request: Request) {
  console.log('goalalala', goal.attributes.Name);
  const lookupTableForNow = [
    { name: 'Endurance', id: 62 },
    { name: 'Weight Loss', id: 41 },
    { name: 'Wedding Ready', id: 70 },
    { name: 'Build Muscle', id: 71 },
    { name: 'Lose Fat', id: 72 },
    { name: 'Prgenancy', id: 73 },
    { name: 'Strength', id: 74 },
    { name: 'Summer Ready', id: 75 },
    { name: 'Toning', id: 76 },
  ];

  const fvid: string[] = [];
  const slug = '';
  const term = '';

  const facetValue = lookupTableForNow.find(
    (x) => x.name === goal.attributes.Name,
  );

  if (!facetValue) {
    return undefined;
  }

  console.log('JEBBY2', facetValue);

  fvid.push(facetValue?.id?.toString()!);

  const { result, resultWithoutFacetValueFilters, facetValueIds } =
    await filteredSearchLoaderCustom({
      slug,
      term,
      facetValueIds: fvid,
      request,
    });

  console.log('getProductsForGoal::result', result);
  console.log('getProductsForGoal::fvid', facetValueIds);

  return result;
}

export async function getProductsForLevel(level: any, request: Request) {
  const lookupTableForNow = [
    { name: 'Beginner', id: 65 },
    { name: 'Intermediate', id: 66 },
    { name: 'Advanced', id: 67 },
  ];

  const fvid: string[] = [];
  const slug = '';
  const term = '';

  const facetValue = lookupTableForNow.find(
    (x) => x.name === level.attributes.Name,
  );

  if (!facetValue) {
    return undefined;
  }

  fvid.push(facetValue?.id?.toString()!);

  console.log('getProductsForLevel::IOJSOS', fvid);

  const { result, resultWithoutFacetValueFilters, facetValueIds } =
    await filteredSearchLoaderCustom({
      slug,
      term,
      facetValueIds: fvid,
      request,
    });

  console.log('getProductsForLevel::result', result);
  console.log('getProductsForLevel::fvid', facetValueIds);

  return result;
}

export async function getProductsForMuscle(muscle: any, request: Request) {
  const lookupTableForNow = [
    { name: 'Deltoid', id: 68 },
    { name: 'Biceps Brachii', id: 80 },
  ];

  const fvid: string[] = [];
  const slug = '';
  const term = '';

  const facetValue = lookupTableForNow.find(
    (x) => x.name === muscle.attributes.Name,
  );

  console.log('getProductsForMuscle::JEBBY', facetValue);

  if (!facetValue) {
    return undefined;
  }

  fvid.push(facetValue?.id?.toString()!);

  const { result, resultWithoutFacetValueFilters, facetValueIds } =
    await filteredSearchLoaderCustom({
      slug,
      term,
      facetValueIds: fvid,
      request,
    });

  console.log('getProductsForMuscle::result', result);
  console.log('getProductsForMuscle::fvid', facetValueIds);

  return result;
}
