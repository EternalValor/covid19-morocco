import React from 'react';
import { colors } from '../constants';

export const AppContext = React.createContext();

const LOG_BASE = 2.5;
const MAX_INDEX = colors.length - 1;
const REFRESH_DELAY = 1.5;

export default function AppProvider({ children }) {
  const [state, setState] = React.useState({
    regions: {}
  });

  React.useEffect(() => {
    const expiresAt = window.localStorage.getItem('EXPIRES_AT');
    if (!!expiresAt) {
      if (+new Date() - parseInt(expiresAt) > 0) {
        fetchData(setState);
      } else {
        const data = JSON.parse(window.localStorage.getItem('DATA'));
        if (data && !data.error) {
          if (data.Total) setState(mapApiToStateFromSmallTable(data));
          else setState(mapApiToState(data));
        }
      }
    } else {
      fetchData(setState);
    }
  }, []);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

async function fetchData(setState) {
  fetch('https://angry-knuth.netlify.com/.netlify/functions/api/covid-19')
    .then(res => res.json())
    .then(data => {
      if (!data.error) {
        if (data.Total) setState(mapApiToStateFromSmallTable(data));
        else setState(mapApiToState(data));
        window.localStorage.setItem(
          'EXPIRES_AT',
          +new Date() + REFRESH_DELAY * 60000 + ''
        );
        window.localStorage.setItem('DATA', JSON.stringify(data));
      }
    });
}

function mapApiToState(data) {
  let totalCases = 0;
  const regions = Object.keys(data.regionResults).reduce((prev, curr) => {
    const total = data.regionResults[curr];
    totalCases += total;
    const colorIndex = Math.floor(Math.log(total) / Math.log(LOG_BASE));
    return {
      ...prev,
      [curr]: {
        total,
        color: colorIndex > MAX_INDEX ? colors[MAX_INDEX] : colors[colorIndex]
      }
    };
  }, {});

  return {
    regions,
    deaths: data.resolved.deaths,
    recovered: data.resolved.recoveries,
    total: totalCases
  };
}

function mapApiToStateFromSmallTable(data) {
  const regions = Object.keys(data).reduce((prev, curr) => {
    if (curr !== 'Total') {
      const total = data[curr].cases;
      const { deaths, recoveries: recovered } = data[curr];
      const colorIndex = Math.floor(Math.log(total) / Math.log(LOG_BASE));
      return {
        ...prev,
        [curr]: {
          total,
          deaths,
          recovered,
          color: colorIndex > MAX_INDEX ? colors[MAX_INDEX] : colors[colorIndex]
        }
      };
    }
    return prev;
  }, {});

  return {
    regions,
    deaths: data.Total.deaths,
    recovered: data.Total.recoveries,
    total: data.Total.cases
  };
}
