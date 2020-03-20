import React from 'react';
import '../css/Footer.css';

import { ReactComponent as GitHubLogo } from '../assets/github-logo.svg';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__credit">Maintained by Othmane Tayab</div>
      <div className="footer__github">
        <a
          href="https://github.com/EternalValor/covid19-morocco"
          alt="Github Link"
          className="link">
          <GitHubLogo />
          <span style={{ marginLeft: '5px' }}>GitHub</span>
        </a>
      </div>
      <div className="footer__source">
        <a
          href="https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Morocco"
          alt="Wikipedia Source Link"
          className="link">
          Source - Wikipedia
        </a>
      </div>
    </div>
  );
}
