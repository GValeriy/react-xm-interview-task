import React, { useReducer, useEffect } from 'react';
import { Form } from './containers';
import { getCompanies, getApiKeys } from './api';
import Table from './components/Table';
import Chart from './components/Chart';
import { tableFields, tableLoadingMessage, chartLoadingMessage } from './constants';
import { withLoader } from './containers/withLoader';

interface IState {
    companies: { id: number, name: string }[],
    prices: { id: number, name: string }[],
    loading: boolean,
    error: boolean,
    config: {}
}

const initialState:IState = {
  companies: [],
  prices: [],
  loading: false,
  error: false,
  config: {},
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
    case 'config':
      return { ...state, config: payload };
    default:
      break;
  }
  return state;
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    companies, prices, loading, config,
  } = state;

  const fetchCompanies = async () => {
    const data = await getCompanies();
    dispatch({ type: 'companies', payload: data || [] });
  };
  const fetchApiKeys = async () => {
    const data = await getApiKeys();
    dispatch({ type: 'config', payload: data || {} });
  };

  useEffect(() => {
    fetchCompanies();
    fetchApiKeys();
  }, []);

  const TableWithLoader = withLoader(Table);
  const ChartWithLoader = withLoader(Chart);

  return (
    <>
      <Form dispatch={dispatch} companies={companies} config={config} />
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
