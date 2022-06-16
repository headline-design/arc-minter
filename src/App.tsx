// @ts-nocheck
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';
import { configureReduxStores } from 'redux/store';
import { Provider } from 'react-redux';
import Arc19Minter from './Arc19Minter';
import ConfigModule from './ConfigModule';
import DocsModule from './DocsModule';
import Header from './Header';
import AccountModule from './AccountModule';
import NetworkSwitch from './components/shared/NetworkSwitch';
import MetaChain from './metaChain';

const store = configureReduxStores();

function App() {
  const [HeaderPromo, setHeaderPromo] = useState('true');

  function toggle() {
    if (HeaderPromo === 'none') {
      setHeaderPromo('flex');
    } else {
      setHeaderPromo('none');
    }
  }

  return (
    <Provider store={store}>
      <div>
        <div
          className="bg-primary-500 text-white w-full py-4 justify-center sm:justify-between sm:px-5 items-center relative header-flex"
          style={{ display: HeaderPromo }}
        >
          <div className="jss1-2">
            <div className="jss1-3">
              <div className="label-md mr-10 sm:mr-0 sm:max-w-[60%]">Built by HEADLINE</div>
              <a
                href="https://www.twitter.com/headline_crypto"
                target="_blank"
                rel="noreferrer"
                className="p-2 px-4 bg-white text-black label-sm rounded-full cta-rounded"
              >
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                >
                  <path stroke="#000" strokeWidth="1.5" d="M5 5h7v7" />
                  <rect
                    width="1.5"
                    height="11.229"
                    fill="#000"
                    transform="rotate(45.006 -.565 15.703)"
                  />
                </svg>
              </a>
            </div>

            <NetworkSwitch />
          </div>
        </div>

        <HashRouter>
          <Header></Header>
          <Switch>
            <Route exact path="/">
              <Redirect to="/mint" />
            </Route>
            <Route>
              <Route exact strict path="/mint">
                <Arc19Minter></Arc19Minter>
              </Route>
              <Route exact strict path="/config">
                <ConfigModule />
              </Route>
              <Route exact strict path="/docs">
                <DocsModule />
              </Route>
              <Route exact strict path="/account">
                <AccountModule />
              </Route>
              <Route exact strict path="/meta-chain">
                <MetaChain />
              </Route>
            </Route>
          </Switch>
        </HashRouter>
      </div>
    </Provider>
  );
}

export default App;
