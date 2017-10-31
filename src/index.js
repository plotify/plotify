import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import { MuiThemeProvider } from 'material-ui/styles';
import theme from './theme';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers);
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));

console.log(theme);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
