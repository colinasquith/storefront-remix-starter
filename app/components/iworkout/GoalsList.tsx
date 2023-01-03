import React from 'react';
import { slugify } from '~/utils/slugify';
import { JumpCard } from './JumpCard';

interface GoalsListProps {
  goals: any;
}

export const GoalsList = ({ goals }: GoalsListProps) => {
  return (
    <div className="mb-4 mt-4">
      <p className="font-bold">Goals</p>

      <div
        className={`mt-4 grid grid-cols-${
          goals?.data?.length >= 4 ? 4 : goals?.data?.length
        } gap-4`}
      >
        {goals?.data.map((item: any) => (
          <React.Fragment key={item.id}>
            <JumpCard
              image={
                item.attributes.Image?.data?.attributes?.formats['thumbnail']
                  .url
              }
              name={item.attributes.Name}
              to={`/goals/${slugify(item.attributes.Name)}/`}
            ></JumpCard>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
