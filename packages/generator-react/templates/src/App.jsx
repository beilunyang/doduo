import React from 'react';
import { Switch, HashRouter, Route } from 'react-router-dom';
import routesConfig from './routes';

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
    <HashRouter>
      <Switch>{routes}</Switch>
    </HashRouter>
  );
}
