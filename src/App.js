import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#03A0B5',
        dark: '#027888'
      },
      secondary: {
        main: '#cc0a57'
      },
    },
    status: {
      danger: 'orange',
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <header className="App-header">
          <Navigation></Navigation>
        </header>
        <Footer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
