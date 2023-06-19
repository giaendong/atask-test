import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './router/Router';

const App: React.FC = () => {
  const [client] = useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
