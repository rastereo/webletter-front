import { Router } from './routers/Router';
import { UserContextProvider } from './contexts/UserContext';

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
