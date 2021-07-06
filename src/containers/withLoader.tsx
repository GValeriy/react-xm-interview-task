import React from 'react';

export const withLoader = (WrappedComponent) => ({ isLoading, ...props }) => {
  if (isLoading) {
    return <div> Loading ...</div>;
  }
  return <WrappedComponent {...props} />;
};
