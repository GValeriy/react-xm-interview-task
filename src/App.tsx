import React, { useReducer, useEffect } from 'react';
import { Form } from './containers';
import { getCompanies } from './api';
import Table from './components/Table';
import Chart from './components/Chart';
import { tableFields, tableLoadingMessage, chartLoadingMessage } from './constants';
import { withLoader } from './containers/withLoader';

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
  const { companies, prices, loading } = state;

  const fetchCompanies = async () => {
    const data = await getCompanies();
    dispatch({ type: 'companies', payload: data || [] });
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const TableWithLoader = withLoader(Table);
  const ChartWithLoader = withLoader(Chart);

  return (
    <>
      <Form dispatch={dispatch} companies={companies} />
      <ChartWithLoader
        data={state.prices}
        isLoading={loading}
        loadingMessage={chartLoadingMessage}
      />
      <TableWithLoader
        items={prices}
        fields={tableFields}
        isLoading={loading}
        loadingMessage={tableLoadingMessage}
      />
    </>
  );
};

export default App;
