import {
  DataFunctionArgs,
  MetaFunction,
  json,
} from '@remix-run/server-runtime';
import {
  FetcherWithComponents,
  Link,
  useCatch,
  useLoaderData,
  useOutletContext,
} from '@remix-run/react';
import { APP_META_TITLE } from '~/constants';
import { CartLoaderData } from '~/routes/api/active-order';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { FeaturedArticles } from '~/components/iworkout/FeaturedArticles';
import { FeaturedEquipment } from '~/components/iworkout/FeaturedEquipment';
import { FeaturedNutrition } from '~/components/iworkout/FeaturedNutrition';
import { getLevelBySlug } from '~/providers/cms/level';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { getArticlesByLevel } from '~/providers/cms/article';
import { getProductsForLevel } from '~/providers/cms/products-custom';

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.level?.attributes.Name
      ? `Level: ${data.level.attributes.Name} - ${APP_META_TITLE}`
      : APP_META_TITLE,
  };
};

export async function loader({ params, request }: DataFunctionArgs) {
  const { level } = await getLevelBySlug(params.slug!);

  if (!level) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const { articles } = await getArticlesByLevel(level.id);
  const equipment = await getProductsForLevel(level, request);

  const breadcrumbs: { name: string; slug: string; id: string; to?: string }[] =
    [
      { name: 'Ability Levels', to: '/ability-levels/', slug: '', id: '' },
      {
        name: level.attributes.Name,
        to: `/ability-levels/${params.slug}/`,
        slug: '',
        id: '',
      },
    ];

  return json({ level: level!, articles, equipment, breadcrumbs });
}

export default function AbilityLevelSlug() {
  const { level, articles, equipment, breadcrumbs } =
    useLoaderData<typeof loader>();
  const caught = useCatch();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};

  if (!level) {
    return <div>Ability Level not found!</div>;
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {level.attributes.Name}
        </h2>
        <Breadcrumbs items={breadcrumbs}></Breadcrumbs>

        <FeaturedArticles articles={articles} />
        <FeaturedEquipment equipment={equipment} />
        <FeaturedNutrition equipment={[]} />
      </div>
    </div>
  );
}

export function CatchBoundary() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        Ability Level not found!
      </h2>
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start mt-4 md:mt-12">
        {/* Image gallery */}
        <div className="w-full max-w-2xl mx-auto sm:block lg:max-w-none">
          <span className="rounded-md overflow-hidden">
            <div className="w-full h-96 bg-slate-200 rounded-lg flex content-center justify-center">
              <PhotoIcon className="w-48 text-white"></PhotoIcon>
            </div>
          </span>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <div className="">We couldn't find any goal at that address!</div>
          <div className="flex-1 space-y-3 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
              <div className="h-2 bg-slate-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
