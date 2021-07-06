import React, { Component } from 'react';
import { logServiceErrors } from '../api';

interface IProps {
  children: React.ReactNode
}
interface IState {
  hasError: boolean
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logServiceErrors(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return children;
  }
}
