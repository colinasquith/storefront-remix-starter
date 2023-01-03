import { ProductCard } from '../products/ProductCard';

interface FeaturedEquipmentProps {
  equipment: any;
}

export const FeaturedEquipment = ({ equipment }: FeaturedEquipmentProps) => {
  return (
    <div className="rounded-md bg-gray-50 p-4 mb-4 mt-4">
      <p className="font-bold">Equipment ({equipment?.items?.length ?? 0})</p>

      {/* Fallback data? */}

      <div className="flex space-x-4">
        {equipment?.items?.map((item: any) => (
          <ProductCard key={item.productId} {...item}></ProductCard>
        ))}
      </div>
    </div>
  );
};
