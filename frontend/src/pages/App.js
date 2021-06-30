import { BrowserRouter } from 'react-router-dom';
import { RouterConfig } from '../navigation/RouterConfig';
import { RootStoreProvider } from '../contexts/RootStoreProvider';

const App = () => (
  <RootStoreProvider>
    <BrowserRouter>
      <RouterConfig />
    </BrowserRouter>
  </RootStoreProvider>
);

export default App;
