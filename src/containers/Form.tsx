import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import { oldDateInMs, formatDate, getTime } from '../utils/dates';
import { getPrices, sendEmail } from '../api';
import { IFormProps, IErrors, ICompany } from '../types';

const initialValues = {
  startDate: formatDate(new Date(oldDateInMs)),
  endDate: formatDate(new Date()),
  companyName: '',
  email: '',
};

const validateForm = (values) => {
  const errors: IErrors = {
  };

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

export const Form = ({ config, dispatch, companies }:IFormProps) => {
  const onSubmit = ({
    email, startDate, endDate, companyName,
  }) => {
    const subject = companies.find((company: ICompany) => company.Symbol === companyName)?.['Company Name'];
    const templateParams = {
      to_email: email,
      subject,
      startDate,
      endDate,
    };

    sendEmail(config, templateParams);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    // @ts-ignore
    validateForm,
  });

  const {
    companyName,
    startDate,
    endDate,
  } = formik.values;

  const onChange = async () => {
    const params = {
      period1: getTime(startDate),
      period2: getTime(endDate),
      symbol: companyName,
    };
    dispatch({ type: 'loading', payload: true });
    const item = await getPrices('/get-historical-data', params);
    dispatch({ type: 'prices', payload: item.prices || [] });
    dispatch({ type: 'loading', payload: false });
  };

  useEffect(() => {
    if (companyName) {
      onChange();
    }
  }, [companyName, startDate, endDate]);

  const handleDateChange = (e) => {
    const { target: { value, name } } = e;
    const isEndDate = name === 'endDate';
    const start = isEndDate ? startDate : value;
    const end = isEndDate ? value : endDate;

    if (Date.parse(end) < Date.parse(start)) {
      formik.setFieldValue('startDate', value);
      formik.setFieldValue('endDate', value);
    } else {
      formik.handleChange(e);
    }
  };

  const defaultOptionLabel = ' -- select an option -- ';

  const selectOptions = companies.map((company:ICompany) => {
    const value = company.Symbol;
    return <option value={value} key={value}>{value}</option>;
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="companyName">
        Company name
      </label>
      <br />
      <select
        id="companyName"
        name="companyName"
        value={formik.values.companyName}
        onChange={formik.handleChange}
        required
      >
        <option disabled value="">{defaultOptionLabel}</option>
        {selectOptions}
      </select>
      <br />
      <label htmlFor="start">
        Start date
      </label>
      <br />
      <input
        type="date"
        id="start"
        name="startDate"
        value={formik.values.startDate}
        onChange={handleDateChange}
      />
      <br />
      <label htmlFor="end">
        End date
      </label>
      <br />
      <input
        type="date"
        id="end"
        name="endDate"
        value={formik.values.endDate}
        onChange={handleDateChange}
      />
      <br />
      <label htmlFor="email">Email Address</label>
      <br />
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        required
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};
