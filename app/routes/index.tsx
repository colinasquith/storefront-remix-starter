import { useLoaderData } from '@remix-run/react';
import { getCollections } from '~/providers/collections/collections';
import { CollectionCard } from '~/components/collections/CollectionCard';
import { LoaderArgs, MetaFunction } from '@remix-run/server-runtime';
import { GoalsList } from '~/components/iworkout/GoalsList';
import { FeaturedArticles } from '~/components/iworkout/FeaturedArticles';
import { LevelsList } from '~/components/iworkout/LevelsList';
import { MusclesList } from '~/components/iworkout/MusclesList';

async function getGoals() {
  //?populate=* fills in the image meta data
  const url = 'http://localhost:1337/api/goals?populate=*';
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

  return res.json();
}

async function getLevels() {
  console.log('getting levels');

  const url = 'http://localhost:1337/api/ability-levels';
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

  return res.json();
}

async function getArticles() {
  const url = 'http://localhost:1337/api/articles?populate=*';
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

  return res.json();
}

async function getMuscles() {
  const url = 'http://localhost:1337/api/muscles';
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

  return res.json();
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: 'iWorkout - fitness equipment and advice',
    // title: data?.goal?.attributes.Name
    //   ? `${data.goal.attributes.Name} - ${APP_META_TITLE}`
    //   : APP_META_TITLE,
  };
};

export async function loader({ request }: LoaderArgs) {
  const collections = await getCollections(request);
  const articles: any = await getArticles();
  const goals = await getGoals();
  const levels = await getLevels();
  const muscles = await getMuscles();

  console.log('DATA', goals, levels, articles);
  console.log('articles', articles.data[0]);
  return {
    collections,
    articles,
    goals,
    levels,
    muscles,
  };
}

export default function Index() {
  const { collections, articles, levels, goals, muscles } =
    useLoaderData<typeof loader>();
  const headerImage = collections[0]?.featuredAsset?.preview;
  return (
    <>
      <div className="relative">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          {headerImage && (
            <img
              className="absolute inset-0 w-full"
              src={headerImage + '?w=800'}
              alt="header"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-400 to-black mix-blend-darken" />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900 opacity-50"
        />
        <div className="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
          <div className="relative bg-zinc-800 bg-opacity-0 rounded-lg p-0">
            <h1 className="text-6xl text-transparent bg-clip-text font-extrabold tracking-normal lg:text-6xl bg-gradient-to-r from-yellow-600 via-red-500 to-blue-600">
              iWorkout
            </h1>
          </div>

          <p className="mt-4 text-2xl text-white">
            Fitness and health for everyone
          </p>
          {/* <p className="mt-4 text-gray-300 space-x-1">
            <BookOpenIcon className="w-5 h-5 inline" />
            <span>Read more:</span>
            <a
              className="text-primary-200 hover:text-primary-400"
              href="https://www.vendure.io/blog/2022/05/lightning-fast-headless-commerce-with-vendure-and-remix"
            >
              Lightning Fast Headless Commerce with Vendure and Remix
            </a>
          </p> */}
        </div>
      </div>

      <section
        aria-labelledby="category-heading"
        className="pt-24 sm:pt-32 xl:max-w-7xl xl:mx-auto xl:px-8"
      >
        <div className="px-4 sm:px-6 lg:px-8 xl:px-0">
          <h2
            id="category-heading"
            className="text-2xl font-light tracking-tight text-gray-900"
          >
            Shop by Category
          </h2>
        </div>

        <div className="mt-4 flow-root">
          <div className="-my-2">
            <div className="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
              <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
                {collections.map((collection) => (
                  <CollectionCard key={collection.id} collection={collection} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <GoalsList goals={goals!} />
        <FeaturedArticles articles={articles!} />
        <LevelsList levels={levels!} />
        <MusclesList muscles={muscles!} />

        <div className="mt-6 px-4 sm:hidden">
          <a
            href="~/routes/__cart/index#"
            className="block text-sm font-semibold text-primary-600 hover:text-primary-500"
          >
            Browse all categories
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </section>
    </>
  );
}
