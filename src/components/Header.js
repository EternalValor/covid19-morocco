import React from 'react';
import '../css/Header.css';
import { AppContext } from '../context/AppProvider';

export default function Header() {
  const { deaths, recovered, total } = React.useContext(AppContext);

  return (
    <div className="header">
      <h1 className="heading">COVID-19 Cases In Morocco by Region</h1>
      <div className="header__stats">
        {total && (
          <div className="header__total">
            <div
              className={`stats-heading ${!deaths &&
                !recovered &&
                'stats-heading--large'}`}>
              Total Confirmed
            </div>
            <div
              className={`stats-number ${!deaths &&
                !recovered &&
                'stats-number--large'}`}>
              {total}
            </div>
          </div>
        )}
        {deaths && recovered && (
          <div className="header__sub-totals">
            <div className="header__sub-totals-container">
              <div className="header__sub-total">
                <div className="stats-heading">Deaths</div>
                <div className="stats-number stats-number--small">{deaths}</div>
              </div>
              {/* <div className="header__sub-total">
                <div className="stats-heading">Recovered</div>
                <div className="stats-number stats-number--green stats-number--small">
                  {recovered}
                </div>
              </div>
              <div className="header__sub-total">
                <div className="stats-heading">Active</div>
                <div className="stats-number stats-number--yellow stats-number--small">
                  {total - deaths - recovered}
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
