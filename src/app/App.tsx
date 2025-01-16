import { Router } from './routers/Router';
import { UserContextProvider } from '@shared/contexts';

import './styles/index.scss';

function App() {
  return (
    <>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </>
  );
}

export default App;
