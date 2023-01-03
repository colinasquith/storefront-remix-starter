import { Link } from '@remix-run/react';
import { strapi_url } from '~/providers/cms/constants';

interface ArticleCardProps {
  name: string;
  to: string;
  image: string;
}

export const ArticleCard = ({ name, to, image }: ArticleCardProps) => {
  const imgStyle = image
    ? {
        backgroundImage: `url('${strapi_url}${image}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <div
      className={`bg-gray-800 rounded-md mb-2 h-36 flex justify-center items-center`}
      style={imgStyle}
    >
      <Link to={to} className="text-white font-bold">
        {name}
      </Link>
    </div>
  );
};
