import { Link } from '@remix-run/react';

export const JumpCard = ({
  name,
  to,
  image,
}: {
  name: string;
  to: string;
  image: string;
}) => {
  const strapi_url = 'http://localhost:1337';

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
