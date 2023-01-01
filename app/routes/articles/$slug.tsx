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

export const meta: MetaFunction = ({ data }) => {
  return {
    title: data?.goal?.attributes.Name
      ? `${data.goal.attributes.Name} - ${APP_META_TITLE}`
      : APP_META_TITLE,
  };
};

async function getArticleBySlug(slug: string): Promise<any> {
  const url = 'http://localhost:1337/api/articles';
  //process.env.STRAPI_JWT
  const bearer =
    'd026e0e3c644174974de2cb463336c76116a98eae2533b1749cc2fc7b25cd220422943f58b377a91f3582571708eda9582c7d64936379ba0c31b51c126aae313f6c81220dbdb902481f8ca1db4a47e41ba7940151845faac33868a7dc1be1df9bf608eba16c669ab2f73233fbe43110b81631daa045c244aa8249b910d29bcd8';

  // Fetch data from url with bearer token
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearer}`,
    },
  });

  if (!res.ok) {
    return [];
  }

  // Find the goal with the matching slug
  const articles: any = await res.json();

  // Better way to compare strings in JS
  const article = articles.data.find(
    (article: any) =>
      article.attributes.Name.toLowerCase() === slug.replace('-', ' '),
  );

  console.log('GREGGY', article);

  return { article: article };
}

export async function loader({ params, request }: DataFunctionArgs) {
  const { article } = await getArticleBySlug(params.slug!);

  console.log('GOALZY', article);

  if (!article) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  //  const session = await sessionStorage.getSession(
  //    request?.headers.get('Cookie'),
  //  );
  //  const error = session.get('activeOrderError');
  return json({ article: article! });
}

export default function ArticleSlug() {
  const { article } = useLoaderData<typeof loader>();
  const caught = useCatch();
  const { activeOrderFetcher } = useOutletContext<{
    activeOrderFetcher: FetcherWithComponents<CartLoaderData>;
  }>();
  const { activeOrder } = activeOrderFetcher.data ?? {};

  if (!article) {
    return <div>Article not found!</div>;
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-gray-900 my-8">
          {article.attributes.Name}
        </h2>
        {/* <Breadcrumbs
          items={
            article.collections[article.collections.length - 1]?.breadcrumbs ?? []
          }
        ></Breadcrumbs> */}

        <p>Articles...</p>
        <Link to="/articles/endurance/whatever">Demo Article</Link>
        <p>Equipment...</p>
        <p>Nutrition...</p>

        <Link to="/">back to Home</Link>
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
