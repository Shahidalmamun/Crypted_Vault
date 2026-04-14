import React from 'react';
import Web3Provider from './contexts/Web3Provider';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/routes';

const App = () => {
  return (
    <div>
      <Web3Provider>
        <RouterProvider router = {routes} >
        </RouterProvider>
      </Web3Provider>
    </div>
  );
}

export default App;
