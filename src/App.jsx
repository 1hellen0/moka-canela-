import { BrowserRouter } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <BrowserRouter>
      <OrderProvider>
        <AppRoutes />
      </OrderProvider>
    </BrowserRouter>
  );
}

export default App;
