import { Router } from './routers/Router';
import { UserContextProvider } from '@shared/contexts';
import { Provider } from 'react-redux';

import store from './store';

import './styles/index.scss';

function App() {
  return (
    <>
      <UserContextProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </UserContextProvider>
    </>
  );
}

export default App;
