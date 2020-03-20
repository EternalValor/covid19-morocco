import React from 'react';

import '../css/RegionInfo.css';
import { locations } from '../constants';
import { AppContext } from '../context/AppProvider';

export default function RegionInfo({ id }) {
  const { regions } = React.useContext(AppContext);
  let title, top, left;
  if (locations[id]) {
    title = locations[id].title;
    top = locations[id].top;
    left = locations[id].left;
  }
  return (
    <div
      className="region-info"
      style={{
        top: `${top}%`,
        left: locations[id] && !locations[id].right ? `${left}%` : '',
        display: id === null ? 'none' : 'block',
        right: locations[id] && locations[id].right ? '3rem' : ''
      }}>
      <h3 className="region__heading">{title}</h3>
      <div className="region-stats">
        <div className="region__total">
          <div className="region-stats__heading">Total Confirmed</div>
          <div
            className="region-stats__number"
            style={
              regions[title] && regions[title].recovered >= 0
                ? { fontSize: '2.2rem' }
                : {}
            }>
            {regions[title] ? regions[title].total : 0}
          </div>
        </div>
        {regions[title] && regions[title].recovered >= 0 && (
          <div className="region__sub-totals">
            <div className="region__sub-totals-container">
              <div className="region__sub-total">
                <div className="region-stats__heading">Deaths</div>
                <div className="region-stats__number region-stats__number--small">
                  {regions[title].deaths}
                </div>
              </div>
              <div className="region__sub-total">
                <div className="region-stats__heading">Recovered</div>
                <div className="region-stats__number region-stats__number--small region-stats__number--green">
                  {regions[title].recovered}
                </div>
              </div>
              <div className="region__sub-total">
                <div className="region-stats__heading">Active</div>
                <div className="region-stats__number region-stats__number--small region-stats__number--yellow">
                  {regions[title].total -
                    regions[title].recovered -
                    regions[title].deaths}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
