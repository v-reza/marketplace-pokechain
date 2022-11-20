import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import Notification from "@/components/Notification";
import { Provider } from "react-redux";
import { store, wrapper } from "@/redux/store";
import "../styles/globals.css";
import { AuthContextProvider as AuthGuard } from "src/contexts/AuthContext";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "next/app";
import { useEffect, useState } from "react";
import Script from "next/script";
import getSession from "@/middleware/getSession";

const ComponentApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const CustomComponent = ({ Component, pageProps, isAuth }) => {
  return (
    <Sidebar isAuth={isAuth}>
      <Sidebar.MainContent>
        <Component {...pageProps} />
      </Sidebar.MainContent>
    </Sidebar>
  );
};

function MyApp({ Component, pageProps, hiddenSidebar, isAuth, ...props }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <Script
        data-client-key={`${process.env.MIDTRANS_CLIENT_KEY}`}
        async={true}
        crossOrigin="anonymous"
        src="https://app.sandbox.midtrans.com/snap/snap.js"
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AuthGuard>
            <Notification />
            {hiddenSidebar ? (
              <ComponentApp Component={Component} pageProps={pageProps} />
            ) : (
              <CustomComponent
                Component={Component}
                pageProps={pageProps}
                isAuth={isAuth}
              />
            )}
          </AuthGuard>
          <ReactQueryDevtools
            initialIsOpen={process.env.NODE_ENV !== "production" ? true : false}
          />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}
MyApp.getInitialProps = async (appContext) => {
  const { pathname, req, res } = appContext.ctx;

  const appProps = await App.getInitialProps(appContext);
  const session = await getSession(appContext.ctx);
  return {
    hiddenSidebar:
      pathname === "/auth/login" || pathname === "/auth/register"
        ? true
        : false,
    ...appProps,
    isAuth: session.props.isAuth,
  };
};

export default wrapper.withRedux(MyApp);
