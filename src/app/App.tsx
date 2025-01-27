import { Router } from './routers/Router';
import { Provider } from 'react-redux';

import store from './store';

import './styles/index.scss';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
