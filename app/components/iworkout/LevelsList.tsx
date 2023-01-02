import React from 'react';
import { slugify } from '~/utils/slugify';
import { JumpCard } from './JumpCard';

interface LevelsListProps {
  levels: any;
}

export const LevelsList = (props: LevelsListProps) => {
  return (
    <div className="mb-4 mt-4">
      <p className="font-bold">Ability Levels</p>

      <div
        className={`mt-4 grid grid-cols-${
          props.levels?.data?.length >= 4 ? 4 : props.levels?.data?.length
        } gap-4`}
      >
        {props.levels?.data.map((item: any) => (
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
