import React, { memo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatDate } from '../utils/dates';
import { IChartProps } from '../types';

const Chart = memo(({ data }:IChartProps) => {
  if (!data.length) {
    return <div>Empty Chart</div>;
  }

  return (
    <div style={{ height: '500px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            domain={['auto', 'auto']}
            name="Time"
            tickFormatter={(unixTime) => formatDate(new Date(unixTime))}
            type="number"
          />
          <YAxis />
          <Tooltip labelFormatter={(t) => formatDate(new Date(t))} />
          <Legend />
          <Line type="monotone" dataKey="open" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="close" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

export default Chart;
