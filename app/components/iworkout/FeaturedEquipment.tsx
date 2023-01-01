import { XCircleIcon } from '@heroicons/react/24/solid';

interface FeaturedEquipmentProps {
  equipment: any;
}

export const FeaturedEquipment = (props: FeaturedEquipmentProps) => {
  //  const { collections } = useLoaderData<typeof loader>();

  return (
    <div className="rounded-md bg-red-50 p-4 mb-4 mt-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Featured Equipment
          </h3>
        </div>
      </div>
    </div>
  );
};
