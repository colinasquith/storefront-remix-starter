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
import { getArticleBySlug } from '~/providers/cms/article';
import { Breadcrumbs } from '~/components/Breadcrumbs';
import { slugify } from '~/utils/slugify';

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.article?.attributes.Title
      ? `${data.article.attributes.Title} - ${APP_META_TITLE}`
      : APP_META_TITLE,
  };
};

export async function loader({ params, request }: DataFunctionArgs) {
  const { article } = await getArticleBySlug(params.slug!);

  if (!article) {
    throw new Response('Not Found', {
      status: 404,
    });
  }

  const breadcrumbs: { name: string; slug: string; id: string; to?: string }[] =
    [
      { name: 'Articles', to: '/articles/', slug: '', id: '' },
      {
        name: article.attributes.Title,
        to: `/articles/${params.slug}/`,
        slug: '',
        id: '',
      },
    ];

  return json({ article: article!, breadcrumbs });
}

export default function ArticleSlug() {
  const { article, breadcrumbs } = useLoaderData<typeof loader>();
  const caught = useCatch();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};

  if (!article) {
    return <div>Article not found!</div>;
  }

  // const htmlDecode = (input: string) => {
  //   var e = document.createElement('div');
  //   e.innerHTML = input;
  //   return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  // };

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {article.attributes.Title}
        </h2>
        <Breadcrumbs items={breadcrumbs}></Breadcrumbs>

        <div className="mt-4 mb-4 rounded md-rounded px-6 py-2 bg-gray-100 flex space-x-2">
          <p>Goals:</p>
          <div className="flex space-x-2">
            {article.attributes.goals?.data.map((goal: any) => (
              <span
                key={goal.id}
                className="rounded-full bg-blue-300 text-blue-800 p-2 text-sm"
              >
                <Link to={`/goals/${slugify(goal.attributes.Name)}/`}>
                  {goal.attributes.Name}
                </Link>
              </span>
            ))}
          </div>
          <p>Levels:</p>
          <div className="flex space-x-2">
            {article.attributes.ability_levels?.data.map((level: any) => (
              <span
                key={level.id}
                className="rounded-full bg-green-300 text-green-800 p-2 text-sm"
              >
                <Link to={`/ability-levels/${slugify(level.attributes.Name)}/`}>
                  {level.attributes.Name}
                </Link>
              </span>
            ))}
          </div>
          <p>Muscles:</p>
          <div className="flex space-x-2">
            {article.attributes.muscles?.data.map((muscle: any) => (
              <span
                key={muscle.id}
                className="rounded-full bg-orange-300 text-orange-800 p-2 text-sm"
              >
                <Link to={`/muscles/${slugify(muscle.attributes.Name)}/`}>
                  {muscle.attributes.Name}
                </Link>
              </span>
            ))}
          </div>
        </div>
        <div
          className="mt-4 mb-4 article-content"
          dangerouslySetInnerHTML={{
            __html: article.attributes.Content,
          }}
        ></div>

        <div className="rounded md-rounded p-6 bg-gray-200">
          <p>Related Articles...</p>
          <Link to="/articles/endurance/whatever">Demo Article</Link>
          <p>Equipment...</p>
          <p>Nutrition...</p>
        </div>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
        Article not found!
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
