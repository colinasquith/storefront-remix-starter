import React from 'react';
import { slugify } from '~/utils/slugify';
import { ArticleCard } from './ArticleCard';

interface FeaturedArticlesProps {
  articles: any;
}

export const FeaturedArticles = ({ articles }: FeaturedArticlesProps) => {
  return (
    <div className="mb-4 mt-4">
      <p className="font-bold">Articles</p>

      <div
        className={`mt-4 grid grid-cols-${
          articles?.data?.length >= 4 ? 4 : articles?.data?.length
        } gap-4`}
      >
        {articles?.data?.map((item: any) => (
          <React.Fragment key={item.id}>
            <ArticleCard
              image={
                item?.attributes?.Images?.data
                  ? item?.attributes?.Images?.data[0]?.attributes?.formats[
                      'small'
                    ].url
                  : ''
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
