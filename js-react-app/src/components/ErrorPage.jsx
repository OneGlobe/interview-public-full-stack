import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error('Routing error:', error);

  return (
    <div id="error-page">
      <h1 className="mb-4 text-xl text-appPrimary">Wrong page!</h1>
      <p>
        An unexpected error has occurred.{' '}
        <Link replace={false} className="underline" to="/">
          Redirect to the home page.
        </Link>
      </p>
    </div>
  );
}
