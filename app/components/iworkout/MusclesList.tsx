import React from 'react';
import { slugify } from '~/utils/slugify';
import { JumpCard } from './JumpCard';

interface MusclesListProps {
  muscles: any;
}

export const MusclesList = ({ muscles }: MusclesListProps) => {
  return (
    <div className="mb-4 mt-4">
      <p className="font-bold">Muscles</p>

      <div
        className={`mt-4 grid grid-cols-${
          muscles?.data?.length >= 4 ? 4 : muscles?.data?.length
        } gap-4`}
      >
        {muscles?.data.map((item: any) => (
          <React.Fragment key={item.id}>
            <JumpCard
              image={
                item.attributes.Image?.data?.attributes?.formats['thumbnail']
                  .url
              }
              name={item.attributes.Name}
              to={`/muscles/${slugify(item.attributes.Name)}/`}
            ></JumpCard>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
