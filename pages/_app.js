import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import Notification from "@/components/Notification";
import { Provider } from "react-redux";
import { store, persistor, wrapper } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps, hiddenSidebar }) {
  return (
    <Provider store={store}>
      <PersistGate loading="" persistor={persistor}>
        <Head>
          <meta name="google" content="notranslate" />
        </Head>
        <Notification />
        {hiddenSidebar ? (
          <Component {...pageProps} />
        ) : (
          <Sidebar>
            <Sidebar.MainContent>
              <Component {...pageProps} />
            </Sidebar.MainContent>
          </Sidebar>
        )}
      </PersistGate>
    </Provider>
  );
}

MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (appContext) => {
    const { pathname, store } = appContext.ctx;
    const accessToken = appContext.ctx.req?.cookies?.access_token
    console.log(accessToken);
    
    return {
      hiddenSidebar:
        pathname === "/auth/login" || pathname === "/auth/register"
          ? true
          : false,
    };
  }
);

export default wrapper.withRedux(MyApp);
