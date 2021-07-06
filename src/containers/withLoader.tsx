import React from 'react';
import { defaultLoadingMessage } from '../constants';
import { IWithLoaderProps } from '../types';

export const withLoader = (WrappedComponent) => (
  {
    isLoading,
    loadingMessage = defaultLoadingMessage,
    ...props
  }:IWithLoaderProps,
) => {
  if (isLoading) {
    return <div>{loadingMessage}</div>;
  }
  return <WrappedComponent {...props} />;
};
