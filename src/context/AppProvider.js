import React from 'react';
import { colors } from '../constants';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [state, setState] = React.useState({
    regions: {}
  });

  React.useEffect(() => {
    if (+new Date() - window.localStorage.getItem('EXPIRES_AT') > 0) {
      fetch('http://angry-knuth.netlify.com/.netlify/functions/api/covid-19')
        .then(res => res.json())
        .then(data => {
          if (data.Total) setState(mapApiToStateFromSmallTable(data));
          else setState(mapApiToState(data));
        });
    }
  }, []);

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

function mapApiToState(data) {
  let totalCases = 0;
  const regions = Object.keys(data.regionResults).reduce((prev, curr) => {
    const total = data.regionResults[curr];
    totalCases += total;
    const colorIndex = Math.floor(Math.log(total) / Math.log(3));
    return {
      ...prev,
      [curr]: {
        total,
        color: colorIndex > 4 ? colors[4] : colors[colorIndex]
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
      const colorIndex = Math.floor(Math.log(total) / Math.log(3));
      return {
        ...prev,
        [curr]: {
          total,
          deaths,
          recovered,
          color: colorIndex > 4 ? colors[4] : colors[colorIndex]
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
