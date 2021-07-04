import React from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import routesConfig from './routes';
import store from '@/rematch';

export default function App() {
  const routes = routesConfig.map(config => (
    <Route
      key={config.path}
      path={config.path}
      exact={config.exact}
      render={props => {
        document.title = config.meta.title;
        return <config.component {...props} />;
      }}
    />
  ));
  return (
    <Provider store={store}>
        <HashRouter>
          <Switch>{routes}</Switch>
        </HashRouter>
    </Provider>
  );
}
