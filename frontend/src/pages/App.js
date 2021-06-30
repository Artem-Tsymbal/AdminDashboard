import { BrowserRouter } from 'react-router-dom';
import { RootStoreProvider } from '../contexts/RootStoreProvider';

const App = () => (
  <RootStoreProvider>
    <BrowserRouter></BrowserRouter>
  </RootStoreProvider>
);

export default App;
