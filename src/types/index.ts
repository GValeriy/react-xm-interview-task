export interface IErrors {
    email?: string
}

export interface ICompany {
    'Company name': string,
    'Financial Status': string,
    'Market Category': string,
    'Round Lot Size': string,
    'Security Name': string,
    'Symbol': string,
    'Test issue': string,
}

export interface IPrice {
    adjclose: number,
    close: number,
    data: number,
    high: number,
    low: number,
    open: number,
    volume: number,
}

export interface IFormProps {
    /* eslint-disable no-unused-vars */
    dispatch: (action:{ type: string, payload: any}) => void,
    /* eslint-enable no-unused-vars */
    companies: []
}

export interface ITableProps {
    items: [],
    fields: string[]
}

export interface IChartProps {
    data: []
}

export interface IWithLoaderProps {
    isLoading: boolean,
    loadingMessage: string,
    items?: [],
    data?: [],
    fields?: string[]
}
