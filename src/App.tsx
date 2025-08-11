import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import Header from './components/Header/Header';
import UserTable from './components/UserTable/UserTable';
import Footer from './components/Footer/Footer';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <QueryClientProvider client={queryClient}>
          <UserTable />
        </QueryClientProvider>
      </div>

      <Footer />
    </>
  );
}

export default App;
