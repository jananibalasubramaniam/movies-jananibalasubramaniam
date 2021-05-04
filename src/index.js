import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StoreContext } from 'with-resources';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import store from './data/store';
import BrowseList from './containers/BrowseList';
import MovieDetail from './containers/MovieDetail';
import CastDetail from './containers/CastDetail';

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
        <Route path='/cast/:personId' component={CastDetail} />
          <Route path='/movie/:movieId' component={MovieDetail} />
          <Route component={BrowseList} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </StoreContext.Provider>,
  document.getElementById('root'),
);
