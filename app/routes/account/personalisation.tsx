import { Form, Link, useLoaderData } from '@remix-run/react';
import {
  DataFunctionArgs,
  json,
  MetaFunction,
  redirect,
} from '@remix-run/server-runtime';
import { APP_META_TITLE } from '~/constants';
import { logout } from '~/providers/account/account';
import { getGoals } from '~/providers/cms/goal';
import { getLevels } from '~/providers/cms/level';
import { getMuscles } from '~/providers/cms/muscle';
import { getActiveCustomer } from '~/providers/customer/customer';

export const meta: MetaFunction = ({ data }) => {
  return {
    title: `Personalisation - ${APP_META_TITLE}`,
  };
};

export async function loader({ request, params }: DataFunctionArgs) {
  const { activeCustomer } = await getActiveCustomer({ request });

  const goals: any = await getGoals();
  const levels: any = await getLevels();
  const muscles: any = await getMuscles();

  if (!activeCustomer) {
    return redirect('/sign-in');
  }
  return json({
    activeCustomer,
    goals: goals!,
    levels: levels!,
    muscles: muscles!,
  });
}

export async function action({ request, params }: DataFunctionArgs) {
  const body = await request.formData();
  const formAction = body.get('action');
  switch (formAction) {
    case 'logout':
      const result = await logout({ request });
      return redirect('/', { headers: result._headers });
  }
  return {};
}

export default function AccountOrders() {
  const { activeCustomer, goals, levels, muscles } =
    useLoaderData<typeof loader>();
  const { firstName, lastName } = activeCustomer!;
  return (
    <div className="max-w-6xl xl:mx-auto px-4">
      <h2 className="text-3xl sm:text-5xl font-light text-gray-900 my-8">
        Personalisation
      </h2>
      <p className="text-gray-700 text-lg -mt-4">
        Welcome back, {firstName} {lastName}
      </p>
      <Form method="post">
        <input type="hidden" name="action" value="logout" />
        <button
          type="submit"
          className="underline my-4 text-primary-600 hover:text-primary-800"
        >
          Sign out
        </button>
      </Form>
      <div className="h-96 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center">
        <div className="text-xl text-gray-500">
          <h1>My...</h1>

          <h3 className="font-bold">Levels</h3>
          <div className="flex space-x-2">
            {levels?.data.map((level: any) => (
              <span className="rounded-full bg-pink-400 text-white px-4 py-2 text-sm">
                {level.attributes.Name}
              </span>
            ))}
          </div>

          <h3 className="font-bold">Goals</h3>
          <div className="flex space-x-2">
            {goals?.data.map((goal: any) => (
              <span className="rounded-full bg-pink-400 text-white px-4 py-2 text-sm">
                {goal.attributes.Name}
              </span>
            ))}
          </div>

          <h3 className="font-bold">Muscles</h3>
          <div className="flex space-x-2">
            {muscles?.data.map((muscle: any) => (
              <span className="rounded-full bg-pink-400 text-white px-4 py-2 text-sm">
                {muscle.attributes.Name}
              </span>
            ))}
          </div>

          <p>
            <Link to="/account">Back to account dash</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
