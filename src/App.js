import React, { Suspense } from "react";
import { AppRoutes } from "pages/pages";
import { BrowserRouter } from "react-router-dom";

import Authenticator from "hooks/Authenticator";
import ModalsContent from "components/UI/Modal/ModalsContent/ModalsContent";
import Layout from "components/Layout/Layout";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "components/UI/Theme/Theme";
import { Loading } from "components/UI/loading";
import { history } from "./store/reducer";
import configureStore from "./store";
import { Provider } from "react-redux";

const store = configureStore(history);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Authenticator>
          <ThemeProvider theme={theme}>
            <Layout>
              <ModalsContent />
              <Suspense fallback={<Loading />}>
                <AppRoutes />
              </Suspense>
            </Layout>
          </ThemeProvider>
        </Authenticator>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
