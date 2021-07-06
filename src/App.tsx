import React, { useReducer, useEffect } from 'react';
import { Form } from './containers';
import { getCompanies } from './api';

interface IState {
    companies: { id: number, name: string }[],
    prices: { id: number, name: string }[],
    loading: boolean,
    error: boolean
}

const initialState:IState = {
  companies: [],
  prices: [],
  loading: false,
  error: false,
};

function reducer(state: IState, action) {
  const { payload, type } = action;
  switch (type) {
    case 'companies':
      return { ...state, companies: payload };
    case 'prices':
      return { ...state, prices: payload };
    case 'loading':
      return { ...state, loading: payload };
    default:
      break;
  }
  return state;
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { companies } = state;

  const fetchCompanies = async () => {
    const data = await getCompanies();
    dispatch({ type: 'companies', payload: data || [] });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <>
      <Form dispatch={dispatch} companies={companies} />
    </>
  );
};

export default App;
