import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Page from "./layout/Page/Page";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#03A0B5",
        dark: "#027888"
      },
      secondary: {
        main: "#cc0a57"
      }
    },
    status: {
      danger: "orange"
    }
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Page />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
