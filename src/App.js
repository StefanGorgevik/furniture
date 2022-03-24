import React, { Suspense } from "react";
import { AppRoutes } from "pages/pages";
import { BrowserRouter } from "react-router-dom";

import Authenticator from "hooks/Authenticator";
import ModalsContent from "components/UI/Modal/ModalsContent/ModalsContent";
import Layout from "components/Layout/Layout";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "components/UI/Theme/Theme";
import CircularProgress from "@material-ui/core/CircularProgress";

const App = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Authenticator>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Layout>
              <ModalsContent />
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </Authenticator>
    </Suspense>
  );
};

export default App;
