import React, { useState, useMemo } from 'react';
import './App.scss';

import { AuthContext } from './utils/AuthContext';
import Routes from './Routes';

function App(props) {
  const [user, setUser] = useState(null);
  const providerValue = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div className="App">
      <AuthContext.Provider value={providerValue}>
        <Routes />
      </AuthContext.Provider>
    </div>
  );
}

export default App;