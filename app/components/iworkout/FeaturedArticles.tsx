import { XCircleIcon } from '@heroicons/react/24/solid';
import { Link } from '@remix-run/react';
import React from 'react';
import { slugify } from '~/utils/slugify';
import { ArticleCard } from './ArticleCard';

interface FeaturedArticlesProps {
  articles: any;
}

export const FeaturedArticles = ({ articles }: any) => {
  return (
    <div className="mb-4 mt-4">
      <p className="font-bold">Articles</p>

      <p>nbr: {articles?.data?.length ?? 0}</p>

      <div
        className={`mt-4 grid grid-cols-${
          articles?.data?.length >= 4 ? 4 : articles?.data?.length
        } gap-4`}
      >
        {articles?.data?.map((item: any) => (
          <React.Fragment key={item.id}>
            <ArticleCard
              image={
                item.attributes.Images[0]?.data?.attributes?.formats[
                  'thumbnail'
                ].url
              }
              name={item.attributes.Title}
              to={`/articles/${slugify(item.attributes.Title)}/`}
            ></ArticleCard>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
