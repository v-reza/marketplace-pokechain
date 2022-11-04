import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import Notification from "@/components/Notification";
import { Provider, useDispatch } from "react-redux";
import { store, persistor, wrapper } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import jwt_decode from "jwt-decode";
import "../styles/globals.css";
import { setDecodeUser } from "@/redux/action/userActions";
import { setUser } from "@/redux/reducer/userReducer";

function MyApp({ Component, pageProps, hiddenSidebar, user }) {
  console.log(user);
  const dispatch = useDispatch();
  dispatch(setUser({ user }));
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
    const accessToken = appContext.ctx.req?.cookies?.access_token;
    let user;
    if (accessToken != null && accessToken != "null") {
      const { userId, email, username, exp } = jwt_decode(accessToken);
      const data = {
        userId,
        email,
        username,
        exp,
      };
      console.log("dispact on");
      await store.dispatch(setUser({ user: data }));
      const user = store.getState((state) => state).user;
      return {
        hiddenSidebar:
          pathname === "/auth/login" || pathname === "/auth/register"
            ? true
            : false,
        user: user,
      };
    }

    return {
      hiddenSidebar:
        pathname === "/auth/login" || pathname === "/auth/register"
          ? true
          : false,
    };
  }
);

export default wrapper.withRedux(MyApp);
