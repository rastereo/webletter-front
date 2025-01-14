import { Router } from './routers/Router';
import { UserContextProvider } from '@shared/contexts';

import './styles/index.css';

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
