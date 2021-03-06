import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import RedBox from 'redbox-react';

import AppRoot from './app-root';
import styles from './app.css';

const appEl = document.querySelector('.<%= camelCaseName %>');
appEl.classList.add(...styles.<%= camelCaseName %>.split(' '));
const rootEl = document.createElement('div');

let renderApp = () => {
  render(
    <AppRoot/>,
    rootEl
  );
};

/* Hot Replacement support, won't be bundled to production */
/* eslint-disable modules/no-exports-typo */
if (module.hot) {
  const renderAppHot = renderApp;
  const renderError = error => {
    render(
      <RedBox error={error}/>,
      rootEl
    );
  };

  renderApp = () => {
    try {
      renderAppHot();
    } catch (error) {
      renderError(error);
    }
  };

  module.hot.accept('./app-root', () => {
    setTimeout(renderApp);
  });
}

renderApp();
appEl.appendChild(rootEl);
