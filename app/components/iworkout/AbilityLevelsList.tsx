import React from 'react';
import { slugify } from '~/utils/slugify';
import { JumpCard } from './JumpCard';

interface AbilityLevelsListProps {
  levels: any;
}

export const AbilityLevelsList = ({ levels }: AbilityLevelsListProps) => {
  return (
    <div className="mb-4 mt-4">
      <p className="font-bold">Ability Levels</p>

      <div
        className={`mt-4 grid grid-cols-${
          levels?.data?.length >= 4 ? 4 : levels?.data?.length
        } gap-4`}
      >
        {levels?.data.map((item: any) => (
          <React.Fragment key={item.id}>
            <JumpCard
              image={
                item.attributes.Image?.data?.attributes?.formats['thumbnail']
                  .url
              }
              name={item.attributes.Name}
              to={`/ability-levels/${slugify(item.attributes.Name)}/`}
            ></JumpCard>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
