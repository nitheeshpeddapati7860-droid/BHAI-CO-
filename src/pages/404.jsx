import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center py-xl">
      <h1>404 - Page Not Found</h1>
      <p className="mt-md mb-lg">We couldn't find the page you're looking for.</p>
      <Link to="/" className="btn btn-primary">Return Home</Link>
    </div>
  );
};

export default NotFound;
