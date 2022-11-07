import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import Notification from "@/components/Notification";
import { Provider } from "react-redux";
import { store, wrapper } from "@/redux/store";
import "../styles/globals.css";
import { AuthContextProvider as AuthGuard } from "src/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const ComponentApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

const CustomComponent = ({ Component, pageProps }) => {
  return (
    <Sidebar>
      <Sidebar.MainContent>
        <Component {...pageProps} />
      </Sidebar.MainContent>
    </Sidebar>
  );
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps, hiddenSidebar, ...props }) {
  return (
    <Provider store={store} >
      <Head>
        <meta name="google" content="notranslate" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <AuthGuard>
          <Notification />
          {hiddenSidebar ? (
            <ComponentApp Component={Component} pageProps={pageProps} />
          ) : (
            <CustomComponent Component={Component} pageProps={pageProps} />
          )}
        </AuthGuard>
        <ReactQueryDevtools
          initialIsOpen={process.env.NODE_ENV !== "production" ? true : false}
        />
      </QueryClientProvider>
    </Provider>
  );
}

MyApp.getInitialProps = wrapper.getInitialPageProps(
  (store) => async (appContext) => {
    const { pathname, store } = appContext.ctx;

    return {
      hiddenSidebar:
        pathname === "/auth/login" || pathname === "/auth/register"
          ? true
          : false,
    };
  }
);

export default wrapper.withRedux(MyApp);
