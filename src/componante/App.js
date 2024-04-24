import React from 'react';
import Header from './Header';
import Divider from './Divider';
import AppContent from './AppContent'; 

const App = () => {
  return (
    <React.StrictMode>
      <Header />
      <Divider />
      <AppContent />
    </React.StrictMode>
  );
};

export default App;
